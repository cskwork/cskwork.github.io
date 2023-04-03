---
title: "JS Object vs Map 성능 차이"
description: "잦은 데이터 갱신과 적은 데이터 출력에는 Object > Map적은 데이터 갱신과 많은 데이터 출력에는 Object &lt; MapObject의 경우 데이터가 순차적으로 적재되지 않는다. 브라우저는 Object에서 set활동이 일어나면 아무곳에 공간을 만들어서 값을 넣"
date: 2022-02-25T00:00:53.316Z
tags: []
---
## 요약
잦은 데이터 갱신과 적은 데이터 출력에는 Object > Map
적은 데이터 갱신과 많은 데이터 출력에는 Object < Map

## 이유
1. Object의 경우 데이터가 순차적으로 적재되지 않는다. 
2. 브라우저는 Object에서 set활동이 일어나면 아무곳에 공간을 만들어서 값을 넣어버린다.
3. Map은 key-value 형식으로 구성되어 있으며 순차적으로 데이터를 적재한다. 여기서 발생되는 추가적인 활동(데이터 재배치, 정렬 등) 이 set 처리에 대해 일부 성능저하를 발생시킨다.

## 출처
https://medium.com/@wdjty326/javascript-es6-map-vs-object-performance-%EB%B9%84%EA%B5%90-7f98e30bf6c8
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map