---
title: "React ref"
description: "HTML에서 DOM 요소에 이름을 달 때 id를 사용합니다.리액트도 프로젝트 내부에서 DOM에 이름을 다는 방법은 ref(reference)입니다.리액트 컴포넌트에서 id도 사용은 가능한데 JSX안에서 DOM에 id를 달면 해당 DOM에 렌더링시 그대로 전달됩니다. 컴"
date: 2021-04-19T06:45:36.686Z
tags: ["React"]
---
## Ref란
- HTML에서 DOM 요소에 이름을 달 때 id를 사용합니다.
리액트도 프로젝트 내부에서 DOM에 이름을 다는 방법은 ref(reference)입니다.
- 리액트 컴포넌트에서 id도 사용은 가능한데 JSX안에서 DOM에 id를 달면 해당 DOM에 렌더링시 그대로 전달됩니다. 컴포넌트를 여러 번 사용할 경우 HTML에서 DOM id는 유일해야 하는데 이런 상황에서는 중복 id를 가진 DOM이 발생합니다.
- ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하여 이런 문제가 발생하지 않습니다.

### ref를 사용해야 하는 상황
DOM을 직접 건드려야 할 때 사용합니다.
