---
title: "Tiny on-device LLMs in 2026: which sub-1B models are worth running on a Raspberry Pi, an old laptop, or a CPU-only box"
date: 2026-09-12T08:10:00+09:00
draft: false
tags: ["on-device LLM", "small language models", "local LLM", "llama.cpp", "Needle 2", "LFM2.5", "Gemma 4", "Qwen3", "Raspberry Pi"]
description: "Six sub-1B to 2B models compared for low-spec hardware as of September 2026: Needle 2, FunctionGemma 270M, LFM2.5-350M, Qwen3 0.6B, Llama 3.2 1B, and Gemma 4 E2B. Memory, speed, what each is good at, what it cannot do, and a llama.cpp walkthrough. Numbers from official model cards, with sources."
summary: "Under 1GB of RAM you pick by task, not by benchmark. A 14MB tool-calling model beats a 1B chat model if all you need is tool calls. Here is the shortlist, the memory numbers, and where each one falls over."
ShowToc: true
TocOpen: true
---

> If you have less than 1GB of memory, decide what the model has to do before you decide which model. For fixed-format jobs like tool calling and JSON extraction, a 14MB Needle 2 or a 350M LFM2.5 is enough. For open-ended chat, 1B is the floor.

I get asked a lot about running a language model on a Raspberry Pi, a low-spec VPS, or a laptop from 2018. The honest answer as of September 2026 is that there is no single "best tiny model". For tasks with a fixed output shape (call this tool, extract these fields, classify this request), a 45M to 350M specialist model is often the better choice. For summarization or conversation, 1B is the minimum that produces more than a few coherent lines.

This post merges three earlier write-ups I did on on-device models, Needle 2, and local LLM hardware into one list. Every memory and speed number comes from the vendor's model card or docs. Where I did not measure something myself, I say so and link the source.

## Why small models are interesting again

Through 2024 the local LLM conversation was about how to fit a 7B or 13B model on a home GPU. In 2026 there is a second track. Vendors are now designing sub-1B models for on-device use from the start: Google's Gemma 3 270M and FunctionGemma, Liquid AI's LFM2.5-350M, Cactus Compute's Needle 2.

Two things changed. The first is training volume. LFM2.5-350M has 350 million parameters and was trained on 28 trillion tokens, roughly 80,000 tokens per parameter. That is far longer than earlier small models were trained, and instruction following improved noticeably at the same size.

The second is quantization. Storing weights in 4 bits instead of 16 cuts file size to about a quarter. Llama 3.2 1B at Q4_K_M needs around 1.5GB of RAM, and 30 to 50 tokens per second on Android phones has been reported.

## The shortlist, September 2026

> Pick on two axes: your memory ceiling, and the kind of task.

Sorted by memory, smallest first. Memory figures are vendor-published and vary with device and context length.

| Model | Params | Size / memory (official) | Good at | Not for |
|---|---|---|---|---|
| Needle 2 (Cactus) | 45M | 14MB binary, ~28MB per session | Tool calling, device control, JSON extraction | Chat, summarization, inputs over 256 tokens |
| FunctionGemma 270M (Google) | 270M | 288MB (S25 Ultra) | Function calling after fine-tuning on your commands | Chat, use without fine-tuning |
| LFM2.5-350M (Liquid AI) | 350M | Under 1GB, 32K context | Data extraction, structured output, tool use | Knowledge questions, coding |
| Qwen3 0.6B (Alibaba) | 0.6B | ~0.5GB at Q4, 32K context | Multilingual short chat, classification, thinking mode | Long reasoning, factual accuracy |
| Llama 3.2 1B (Meta) | 1.2B | ~1.5GB RAM at Q4_K_M | Routing, classification, autocomplete, short chat | Complex instructions, math |
| Gemma 4 E2B (Google) | ~2B effective | ~1.3GB download at Q4_K_M, 607MB peak on iOS | Audio and image input, function calling, summarization | Phones under 6GB RAM, microcontrollers |

### Needle 2: 14MB and only does tool calling

Needle 2 is a 45M parameter model released in summer 2026. The weights are compiled into the executable, so there is no separate model file, and one session runs in about 28MB. The official page claims over 500 tokens per second on a Raspberry Pi 5 and says it runs on an ESP32-S3 microcontroller.

The catch is a 256-token sliding window. Chat and summarization are simply out. On the official benchmarks it scores 63.7% on Mobile Actions and 42.6% on BFCL v4, behind LFM2.5 230M (69.1% and 60.8%) and about level with FunctionGemma 270M (64.0% and 46.1%). For a model 5 to 70 times smaller that is remarkable, but "remarkable for its size" is not the same as accurate. If your memory ceiling is 30MB, this is the only option. Otherwise it is not the default.

### FunctionGemma 270M: assumes you will fine-tune

Google retrained Gemma 3 270M for function calling and shipped it in December 2025. The model card lists 125.9 tokens per second decode on a Samsung S25 Ultra and a 288MB footprint. Context is 32K, so it takes much longer inputs than Needle 2.

Do not expect it to work out of the box. In Google's own Mobile Actions example the base model scores 58% and the fine-tuned one 85%. You need to teach it your app's command set once. That is why Google ships a fine-tuning tutorial and an AI Edge Gallery demo alongside it.

### LFM2.5-350M: the most balanced choice under 1GB

Liquid AI released this 350M model in April 2026. On IFEval (instruction following) the model card reports 76.96, ahead of Gemma 3 1B (63.49) and Qwen3.5-0.8B (59.94). On MMLU-Pro (knowledge) it scores 20.01, far behind Qwen3.5-0.8B at 37.42. Liquid's own guidance says not to use it for knowledge-heavy tasks or programming.

It runs in under 1GB, ships official GGUF files, and works in llama.cpp directly. The profile is clear: follows instructions well, uses tools well, knows almost nothing. That fits form filling, receipt extraction, and command classification, where the answer is already in the input. If I had to name one general-purpose model under 1GB, this is it. One caveat: the license is Liquid's own LFM license, not Apache, so read it before shipping commercially.

### Qwen3 0.6B: when you need multilingual or a thinking mode

The smallest model in the Qwen3 series from May 2025. Of the 0.6B parameters, 0.44B are non-embedding. It has 32K context, an Apache 2.0 license, over 100 languages, and a `/think` switch that toggles reasoning mode.

If you need non-English input, and for me that means Korean, this is the first model to test. Most of the others in the table are trained mainly on English. Do not expect factual accuracy from it. Use it to summarize or classify what you give it.

### Llama 3.2 1B: the floor for "real sentences"

Most local LLM comparisons agree on one point: below 1B, output stops holding together after a few lines. Llama 3.2 1B sits on that line. At Q4 it is about a 1GB file, 1.3 to 1.5GB of RAM, and 60 to 90 tokens per second on CPU has been reported.

It is a September 2024 model and the benchmarks show it. Liquid AI's published numbers put LFM2.5-1.2B at 86.23 on IFEval versus 52.37 for Llama 3.2 1B. It still gets used because it has the most examples and quantized files in llama.cpp, Ollama, MLC LLM, and the mobile SDKs. If you are setting up a pipeline for the first time, validate it with this model because everything supports it, then swap.

### Gemma 4 E2B: audio and images on a 6GB phone

The edge model in the Gemma 4 family from April 2026. "E2B" means about 2B effective parameters: the model is larger, but only part of it is active, so it runs in 2B-class memory. Google's AI Edge docs list 607MB peak memory on iOS and 160 tokens per second decode on a macOS GPU. Audio and image input and function calling are built in, under Apache 2.0.

It is the largest model on the list and does the most. If your target is a phone with 6GB or more or a laptop with 8GB or more, start here and save yourself the time. On a Raspberry Pi 4 or a 4GB laptop it is not realistic.

## What you get and what you give up

The upsides are the reasons people go on-device in the first place. Inference costs nothing per call and the input never leaves the device, which in healthcare, finance, or anywhere without a network is the whole business case. They are fast: models under 350M produce hundreds of tokens per second on CPU alone. LFM2.5-350M reports 313 tokens per second on an AMD CPU, Needle 2 over 500 on a Pi 5. And fine-tuning fits on a laptop. Needle 2 runs LoRA training from a one-line CLI, FunctionGemma has a tutorial you can follow verbatim. "Retrain on my data" becomes something you actually do.

The downsides are just as concrete. They know nothing. Sub-350M models score in the 20s on MMLU-Pro. Ask one what the minimum wage is this year and you will get a confident wrong number. Only give them tasks where the answer is in the input. Context is short, or if it is long, memory grows with it. Needle 2 caps at 256 tokens. Qwen3 0.6B supports 32K, but the KV cache (the stored computation for tokens already read) grows in proportion, so on low-spec hardware you limit context to 1K or 2K. And they run hot. Inference pins the processor near its ceiling. On an always-on device, measure energy per call before tokens per second.

## Hands-on: LFM2.5-350M on llama.cpp

Of the six, LFM2.5-350M is the one with official GGUF files, so it is the example. Needle 2 installs separately with `pip install cactus-needle`.

Build llama.cpp. On Apple Silicon, Metal acceleration is enabled automatically.

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build && cmake --build build --config Release -j
```

Pull the GGUF from Hugging Face and start the server. `-c 2048` caps context at 2K to save memory. `-ngl 0` means CPU only.

```bash
./build/bin/llama-server \
  -hf LiquidAI/LFM2.5-350M-GGUF \
  -c 2048 -ngl 0 --port 8080
```

That exposes an OpenAI-compatible API, so existing client code works unchanged:

```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Extract the date and amount as JSON: paid 45,000 KRW on September 12"}]}'
```

At this size the model card numbers put CPU throughput in the hundreds of tokens per second, so latency is not the problem. Format drift is. Small models will occasionally rename a field or wrap the JSON in prose. In production, pair it with llama.cpp's schema enforcement (`--grammar` or `response_format`) rather than hoping.

If you have any GPU at all, `-ngl 99` moves every layer onto it. A 350M model fits in 1GB of VRAM.

## Picks by situation

Voice commands to device actions on a Pi 5 or an ESP32: Needle 2. Stays under 30MB and the fine-tuning loop lives in the same repo.

Document field extraction or request classification on a 4GB mini PC: LFM2.5-350M behind llama-server. Follows instructions and is fast on CPU.

Multilingual input with about 1GB to spare: Qwen3 0.6B. The only tiny model on the list with broad multilingual training.

Audio or image input in a mobile app targeting 6GB+ phones: Gemma 4 E2B via LiteRT-LM. Kotlin, Swift, and Flutter SDKs are official.

An "on-device first, cloud if unsure" router: put Needle 2's confidence gating or LFM2.5's fast response in front, and forward only low-confidence requests to an API model. That is where the cost savings actually show up.

## Who this is for

Embedded and IoT developers building things that must work offline. Mobile developers who cannot send user data to a server. Backend developers who want to filter simple requests locally before paying for an API call.

If you want a general chatbot or code generation, every model here will disappoint you. Move up to at least 3B or 4B (Qwen3 4B, Gemma 4 E4B, Phi-4-mini) and plan for an 8GB GPU or 16GB of unified memory.

## Before you ship

Check the license first. Needle 2, Qwen3, and Gemma 4 are Apache 2.0. The Gemma 3 270M family is under the Gemma license and LFM2.5 under Liquid's LFM license. Commercial terms differ.

Measure accuracy on your own data. The benchmark numbers above are English, and tool-calling accuracy depends heavily on how well your tools are described. Fifty to a hundred representative requests with a pass/fail count is the starting point.

Budget context and memory together. Real memory is the model file plus the KV cache. Capping context at 2K keeps most devices in a predictable range.

Decide on an update cadence. LFM2.5-350M, Gemma 4, and Needle 2 all shipped in the first half of 2026. Half this table will probably be different in six months. Hide the model behind an OpenAI-compatible endpoint so swapping is a config change.

## FAQ

**Does this work on a Raspberry Pi 4 with 4GB?** Yes. Needle 2, LFM2.5-350M, and Qwen3 0.6B run comfortably. Llama 3.2 1B runs at Q4 but drops to a few tokens per second. Skip Gemma 4 E2B.

**No GPU at all?** For models under 350M, CPU is the primary target anyway. Needle 2 was built for CPUs and microcontrollers, and LFM2.5 markets its CPU speed. GPU acceleration starts to matter at 1B and above.

**Which one handles non-English best?** Among the tiny ones, Qwen3 0.6B has the widest multilingual training. The rest are English-centric and will drift on formatting in other languages. If language quality matters, go up to Qwen3 1.7B or Gemma 4 E2B.

## Wrapping up

The selection order is memory ceiling, then task, then language. Under 30MB, Needle 2. Under 1GB, LFM2.5-350M or Qwen3 0.6B. Around 1.5GB, Llama 3.2 1B. A 6GB phone or 8GB laptop, Gemma 4 E2B. That is the September 2026 answer.

The one piece of advice that applies to all of them: do not ask these models about the world. Give them tasks where the answer is in the input. Under that constraint a 350M model is genuinely useful. Spin up a llama-server this weekend and measure your success rate on your own data before you believe anyone's table, including this one.

## Sources

- [Google AI Edge, Gemma 4 model docs](https://developers.google.com/edge/litert-lm/models/gemma-4): E2B and E4B sizes, per-platform peak memory, decode speed, LiteRT-LM SDKs
- [Google, FunctionGemma model card](https://ai.google.dev/gemma/docs/functiongemma/model_card): 270M specs, BFCL scores, S25 Ultra speed, accuracy before and after fine-tuning
- [Hugging Face, google/gemma-3-270m](https://huggingface.co/google/gemma-3-270m): 270M base model specs and license
- [Hugging Face, LiquidAI/LFM2.5-350M](https://huggingface.co/LiquidAI/LFM2.5-350M): 350M benchmarks, per-device speed, recommended uses, license
- [Liquid AI blog, Introducing LFM2.5](https://www.liquid.ai/blog/introducing-lfm2-5-the-next-generation-of-on-device-ai): 1.2B benchmarks and CPU/NPU memory numbers
- [Hugging Face, Qwen/Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B): parameter breakdown, context, thinking mode
- [GitHub, cactus-compute/needle](https://github.com/cactus-compute/needle): Needle 2 specs, install, fine-tuning CLI
- [Cactus Compute, Needle 2 page](https://cactuscompute.com/needle): benchmark table, per-device speed, supported platforms
- [GitHub, ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp): build and server commands
- [Popular AI, Best CPU-only local LLMs in 2026](https://www.popularai.org/p/best-cpu-only-local-llm-2026): model size guide by RAM
