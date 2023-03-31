---
title: Developer Documentation
sidebar_label: Developer Documentation Overview
slug: /
hide_table_of_contents: false
#demoUrl: https://docs-demo.ionic.io/
#demoSourceUrl: https://github.com/ionic-team/docs-demo
---

import DocsCard from '@components/global/DocsCard';
import DocsCards from '@components/global/DocsCards';

<head>
  <title>Developer Documentation</title>
  <meta
    name="description"
    content="Developer Documentation"
  />
   
  <link rel="canonical" href="https://velog.io/@csk917work" />
  <link rel="alternate" href="https://velog.io/@csk917work" hreflang="x-default" />
  <link rel="alternate" href="https://velog.io/@csk917work" hreflang="en" />
  <meta property="og:url" content="https://velog.io/@csk917work" /> 

</head>



> 전체 문제에 대한 최적의 솔루션은 하위 문제에 대한 최적의 솔루션에 따라 달라진다



### 개발 규칙
- S : 단일 책임 원칙: "한 클래스가 변경되는 데는 두 가지 이상의 이유가 있어서는 안 된다. 즉, 모든 클래스는 **단 하나의 책임**만 가져야 한다."
- O : 개방-폐쇄 원칙: "소프트웨어 엔티티는 ... **확장을 위해서는 개방적**이어야 하지만 **수정을 위해서는 폐쇄적**이어야 한다."
- L : 리스코프 치환 원칙: "기본 클래스에 대한 포인터나 참조를 사용하는 함수는 파생 클래스의 객체를 자신도 모르게 사용할 수 있어야 한다. (계약에 의한 설계)."
- I : 인터페이스 분리 원칙: "하나의 범용 인터페이스보다 **다수의 클라이언트별 인터페이스**가 더 낫다."
- D : 의존성 반전 원칙: "구체화가 아닌 추상화에 의존하라."
- 명확한 사용자 요구사항 파악 및 기능 설명
- 지속 가능 (다음 개발자를 배려하는) 소프트웨어 개발
  - 가독성 높고 명확한 변수, 주석, 커밋 로그 작성
  - 코드 리펙토링 (중복 제거, 예외 처리)
  - 문서화, 로깅, 코드 리뷰, 디자인 패턴

<!--
Ionic is an open source UI toolkit for building performant, high-quality mobile apps using web technologies — HTML, CSS, and JavaScript — with integrations for popular frameworks like [Angular](angular/overview.md), [React](react.md), and [Vue](vue/overview.md).

Get started building by [installing Ionic](intro/cli.md) or following our [First App Tutorial](intro/next.md#build-your-first-app) to learn the main concepts.
-->

<intro-end />


<!--
<DocsCards>
  <DocsCard header="Installation Guide" href="/intro/cli" icon="/icons/guide-installation-icon.svg" hoverIcon="/icons/guide-installation-icon-hover.svg">
    <p>Step-by-step guides to setting up your system and installing the framework.</p>
  </DocsCard>

<DocsCard
  header="UI Components"
  href="/components"
  icon="/icons/guide-components-icon.svg"
  hoverIcon="/icons/guide-components-icon-hover.svg"
>
  <p>Dive into Ionic beautifully designed UI component library.</p>
</DocsCard>

<DocsCard
  header="Native Functionality"
  href="/native"
  icon="/icons/guide-native-icon.svg"
  hoverIcon="/icons/guide-native-icon-hover.svg"
>
  <p>Integrate native device plugins, like Bluetooth, Maps, HealthKit, and more.</p>
</DocsCard>

  <DocsCard header="Theming" href="/theming/basics" icon="/icons/guide-theming-icon.svg" hoverIcon="/icons/guide-theming-icon-hover.svg">
    <p>Learn to easily customize and modify your Ionic app's visual design to fit your brand.</p>
  </DocsCard>
</DocsCards>
-->

<!--
## Overview

Ionic focuses on the frontend UX and UI interaction of an app — UI controls, interactions, gestures, animations. It's easy to learn, and integrates with other libraries or frameworks, such as [Angular](angular/overview.md), [React](react.md), or [Vue](vue/overview.md). Alternatively, it can be used standalone without any frontend framework using a simple [script include](intro/cdn.md). If you’d like to learn more about Ionic before diving in, we <a href="https://youtu.be/p3AN3igqiRc" target="_blank">created a video</a> to walk you through the basics.
-->
