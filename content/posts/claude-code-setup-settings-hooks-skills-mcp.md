---
title: "A Claude Code setup that actually runs every day: settings.json, CLAUDE.md, hooks, skills, MCP"
date: 2026-09-12T08:00:00+09:00
draft: false
tags: ["Claude Code", "settings.json", "hooks", "CLAUDE.md", "MCP", "skills", "AI coding agents"]
description: "The Claude Code configuration I run daily, file by file. Permission allow/deny lists that survive auto mode, the real hook JSON shape, what belongs in CLAUDE.md versus a hook, skills and subagents, MCP scopes, and headless mode for CI."
summary: "Most people run Claude Code on defaults. This is the config I actually use, with the parts that saved me from myself this week, and the parts I would rip out."
ShowToc: true
TocOpen: true
---

Earlier today Claude Code tried to run `rm -rf` on a directory I had asked it to replace. It got denied. It tried a shorter variant. Denied. It tried `rmdir`. Denied again. Then it gave up and used the file tools instead, which is exactly what I wanted, and I did nothing. A three-line `deny` list in `~/.claude/settings.json` did the work, and it did it even though the session was running in auto mode.

That is the whole argument for spending an hour on your Claude Code setup. The model is good. The defaults are cautious. But the config is where you decide what "never" means, what runs without asking, and what the agent knows about your project before it reads a single file. This post walks through the files I run, in the order I would set them up on a new machine.

## Where settings live, and which one wins

Claude Code reads settings from several places and merges them. From highest to lowest priority:

1. Managed policy (set by an org admin, you cannot override it)
2. Command-line flags for the current session
3. `.claude/settings.local.json` in the project (gitignored, personal)
4. `.claude/settings.json` in the project (committed, shared with the team)
5. `~/.claude/settings.json` (your user defaults)

The one rule that matters more than the ordering is this: a `deny` entry wins over an `allow` entry from any level. You can allow `Bash(*)` in a project and still have `Bash(rm:*)` blocked from your user file. That is the mechanism that stopped the `rm -rf` above.

## settings.json, the parts worth copying

Here is a trimmed version of my user-level file. The full one has about 150 allow entries because I let the built-in `/fewer-permission-prompts` command mine my history for read-only calls, and I keep whatever it suggests.

```json
{
  "model": "opus[1m]",
  "effortLevel": "low",
  "includeCoAuthoredBy": false,
  "env": {
    "BASH_DEFAULT_TIMEOUT_MS": "30000"
  },
  "permissions": {
    "allow": [
      "Read", "Edit", "Write", "Glob", "Grep",
      "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)",
      "Bash(gh pr view:*)", "Bash(gh pr checks:*)", "Bash(gh run view:*)",
      "Bash(ls *)", "Bash(cat:*)", "Bash(rg:*)", "Bash(jq:*)",
      "WebSearch", "WebFetch",
      "mcp__context7__resolve-library-id",
      "mcp__context7__query-docs"
    ],
    "deny": [
      "Bash(rm:*)", "Bash(rm -rf:*)", "Bash(rmdir:*)",
      "Bash(sudo:*)", "Bash(chown:*)", "Bash(chmod 777:*)",
      "Bash(kill:*)", "Bash(killall:*)", "Bash(pkill:*)",
      "Bash(dd:*)", "Bash(mkfs:*)"
    ]
  }
}
```

A few notes on what each line buys you.

`"model": "opus[1m]"` pins the 1M-context variant. If you mostly plan and then execute, `"opusplan"` is a cheaper alias: Opus while in plan mode, Sonnet once it starts editing. Subagents get their own model through an environment variable, and I set it to the cheapest one that can still read code:

```bash
export CLAUDE_CODE_SUBAGENT_MODEL="haiku"
```

`effortLevel` is the default reasoning effort. I keep it low and raise it per session with `/model` when a task deserves it. Running everything on high is how you burn a plan quota by Wednesday.

The allow list is mostly read-only git and gh commands. The pattern `Bash(git log:*)` matches `git log` followed by anything. `Bash(ls *)` and `Bash(ls -*)` are two separate entries because the matcher is literal about the space.

The deny list is short on purpose. I do not deny `git push`. I want to be asked, not blocked, because sometimes I do want the agent to push. `rm` is different. There is no session where I want an agent deleting things without a human looking at the target first. Deleting is the one action where "adjust and use another tool" is always the right fallback, so I make it the only option.

`includeCoAuthoredBy: false` keeps the Claude trailer out of commit messages. Your call, but decide it once here instead of editing commits later.

### Permission modes and auto mode

The mode decides what happens when a call is neither allowed nor denied. `default` asks. `acceptEdits` auto-approves file edits and still asks for shell commands. `plan` is read-only. `bypassPermissions` asks nothing, and I only use it inside a throwaway container.

Auto mode sits between `acceptEdits` and `bypassPermissions`. Instead of a static list it runs a classifier over each call, and you can feed that classifier a plain-English description of the environment in `settings.json`:

```json
{
  "autoMode": {
    "environment": [
      "Solo developer on macOS, trusted local machine.",
      "Repositories are private unless the remote says otherwise.",
      "No production database credentials on this machine."
    ]
  }
}
```

The important detail from this morning: auto mode still respects `deny`. The classifier decides about the gray area. The deny list decides about the red area, and it never gets a vote.

## CLAUDE.md, what to put in it and what to move out

`CLAUDE.md` is prose the model reads at the start of every session. There is a user-level one in `~/.claude/` and a project-level one in the repo root, and both load. Mine at the project level for a Hugo blog looks like this, cut down:

```markdown
# CLAUDE.md

## Setup
pip install -r data_sources/requirements.txt

## Commands
- `/research [topic]` writes a brief to research/
- `/write [topic]` drafts to drafts/ and runs the SEO agents
- `/publish [slug]` publishes an approved post

## Content pipeline
topics/ -> research/ -> drafts/ -> review-required/ -> site/content/posts/

## Context files
context/brand-voice.md, context/style-guide.md, context/seo-guidelines.md
```

Build commands, directory layout, the names of your slash commands, the two or three rules people keep getting wrong. That is the job. Keep it short enough that you would reread it yourself. When the file grows past a couple of hundred lines the model starts treating parts of it as optional, which is what you would do too.

Two habits that help:

Write rules as positives. "Use named exports" lands better than "Do not use default exports". A negative rule requires the model to hold the banned thing in mind, which is a great way to get it.

Move anything you have repeated three times into a hook. `CLAUDE.md` is a request. A hook is a guarantee. If "run prettier after editing" is in your `CLAUDE.md`, it will happen most of the time. If it is a `PostToolUse` hook, it will happen every time, including at 3am in a headless run.

There is also a user-level `~/.claude/CLAUDE.md` for things that are about you rather than the project. Mine says to ask before anything hard to reverse, to run one subagent at a time unless parallelism reduces total work, and to report what was verified rather than what was intended. Those are instructions I would otherwise type into every session.

## Hooks, the only deterministic part

Hooks are shell commands (or a prompt, or an HTTP call) that fire on lifecycle events. They receive a JSON payload on stdin and can block a tool call by exiting with code 2. This is the piece of the setup most people get wrong because a lot of blog posts show a config shape that does not match what the CLI reads. The real shape is: event name, then a list of matchers, each with its own list of hooks.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I{} prettier --write {} 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

The `matcher` is a regex over tool names. An empty string or `*` matches everything. Each hook can carry a `timeout` in seconds and `"async": true` if you do not want the agent to wait for it.

Events I have wired up in my own file, and what they are good for:

| Event | What I use it for |
|---|---|
| `SessionStart` | Load a summary of the last session from a memory tool. Anything the hook prints to stdout is added to the context |
| `UserPromptSubmit` | Update a tmux window status so I can see which pane is working |
| `PreToolUse` | Block dangerous shell commands; rewrite `WebSearch` queries to include the current year |
| `PostToolUse` | Format files after edits; log tool calls for later review |
| `PostToolUseFailure` | Desktop notification when something breaks |
| `PermissionRequest` | Notify me that a session is waiting on a prompt |
| `Stop` | Notify, and mark the window "done" |
| `SubagentStart` / `SubagentStop` | Record which subagents ran and what they returned |
| `PreCompact` | Snapshot state before context compaction |
| `SessionEnd` | Write a handoff note for the next session |

Three recipes from that table that I would put on any machine.

Block the commands you never want, at the hook level too. The deny list handles the exact patterns. This catches the creative ones.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' | grep -qE 'rm -rf /|git push --force (origin )?(main|master)|DROP TABLE' && exit 2 || exit 0"
          }
        ]
      }
    ]
  }
}
```

Tell the agent what day it is before it searches. Models have a training cutoff and will happily search for "best X 2025" in September 2026. A `PreToolUse` hook on `WebSearch` that appends the current year to the query fixed most of my stale-result problems.

Get pinged when it stops. The macOS version is one line:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code finished\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Keep hooks fast. Every synchronous hook adds latency to every matching tool call, and `PostToolUse` with `matcher: "*"` runs hundreds of times a session. Anything that talks to a network or a database gets `"async": true`.

## Skills, commands, and agents

Three directories under `.claude/` turn markdown into behavior.

`.claude/commands/name.md` becomes `/name`. The body is a prompt; `$ARGUMENTS` is whatever you typed after the command. My blog repo has `/research`, `/write`, `/publish` and a dozen more, and they are the reason a non-writer can run the pipeline.

`.claude/skills/name/SKILL.md` is the newer, richer version: a directory with frontmatter, optional scripts, and a description the model uses to decide when to load it on its own. A minimal one:

```markdown
---
name: deploy-check
description: Run the pre-deploy checklist (lint, tests, build, clean tree) and report pass or fail.
allowed-tools: ["Bash", "Read", "Grep"]
disable-model-invocation: true
---

Run these in order and stop at the first failure:

1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `git status --porcelain` must be empty

If $ARGUMENTS names a branch, check it out first.
Print PASS or FAIL with the failing step and its output.
```

`disable-model-invocation: true` means only I can trigger it. Anything with side effects gets that flag. Skills without it are fair game for the model to invoke whenever the description matches, which is what you want for reference material and what you do not want for "publish to production".

`.claude/agents/name.md` defines a subagent: a system prompt plus a tool allowlist and an optional model. My blog has `seo-optimizer`, `meta-creator`, `internal-linker`, `editor`. They run after `/write` with their own context, which keeps the main conversation from filling up with the intermediate output.

On subagents generally: run one at a time unless running two actually reduces total work. Parallel agents look productive and mostly produce parallel mess that you then reconcile. The bottleneck is never generation. It is verification, and verification is serial because it is you.

## MCP servers

MCP is how the agent gets tools that are not built in: GitHub, a database, a browser, a docs index. Adding one is a single command:

```bash
claude mcp add context7 --transport http --url https://mcp.context7.com/mcp
claude mcp add-json postgres '{"type":"stdio","command":"npx","args":["@anthropic-ai/mcp-server-postgres","postgresql://localhost/mydb"]}'
```

Servers live in one of three scopes. Local (`~/.claude.json`, just you, just this machine). Project (`.mcp.json` in the repo, committed, shared). User (`~/.claude/settings.json`, every project). Project scope is the right one for anything a teammate would need.

Each MCP tool shows up in permissions as `mcp__server__tool`, so you can allow `mcp__github__get_pull_request` and still be asked about `mcp__github__merge_pull_request`. Do that. A database server gets a read-only connection string. No exceptions.

I run about eight servers and use three daily: Context7 for library docs, a browser driver, and a memory server. The rest are project-specific. Tool schemas are deferred until the agent searches for them, so unused servers cost little context, but every server is code you are trusting with your shell. Read the source of community ones before adding them.

## Headless mode and CI

Everything above works without a terminal attached:

```bash
claude -p "Run the test suite and summarize failures as JSON" --output-format json
```

That is the shape I use in scripts and cron. For pull requests there is an official action:

```yaml
name: Claude PR review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR for bugs and security issues.
            Be specific: file, line, why it is wrong, what to do instead.
```

The same `.claude/settings.json` and `CLAUDE.md` in the repo apply in CI, which is the strongest reason to commit them.

## The order I would do this in

On a new machine, in this order, about an hour total:

1. `~/.claude/settings.json` with a deny list for `rm`, `sudo`, `kill`, and a model choice. Ten minutes, and it is the ten minutes that matter.
2. `claude /init` in the project to draft `CLAUDE.md`, then cut it to the commands, layout, and three rules.
3. A `PostToolUse` formatter hook and a `PreToolUse` blocker hook.
4. One skill for the thing you do every day, with `disable-model-invocation: true` if it deploys anything.
5. One MCP server, project scope, read-only.
6. Commit `.claude/settings.json`, `.mcp.json`, and `CLAUDE.md`. Gitignore `settings.local.json`.

Everything else, the notification hooks, the memory servers, the agent teams, is nice to have. The deny list is not.
