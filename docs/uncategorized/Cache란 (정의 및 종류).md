---
title: "Cache란 (정의 및 종류)"
description: "접근하려는 리로스의 로컬 복사본. 원본 접근보다 빠르다.종류 disk cache, memory cacheDisk Cache:RAM 메모리- 정보 복사본이 디스크에 저장된다.1차 8ms 2차(캐시) 100nsMemory cache:CPU에 보관된다.1차 100ns 2차 "
date: 2021-04-16T00:35:54.631Z
tags: ["Cache"]
---
접근하려는 리로스의 로컬 복사본. 
원본 접근보다 빠르다.
종류 disk cache, memory cache

Disk Cache:
RAM 메모리- 정보 복사본이 디스크에 저장된다.
1차 8ms 2차(캐시) 100ns

Memory cache:
CPU에 보관된다.
1차 100ns 2차 0.5ns

Browser cache:
리소스를 하드 드라이브에 저장한다. 
리소스 접근성은 더 빠르다. 
1차 150ms 2차 8ms

참고 :
https://gist.github.com/AGiallelis/1a676f0dce4febd0c2c6d7e3b4bafc9f
