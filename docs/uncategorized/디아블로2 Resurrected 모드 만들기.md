---
title: "디아블로2 Resurrected 모드 만들기"
description: "디아블로2 D2R 모딩하는 방법 1 모딩 툴 우선 다운로드  2 CascView로 Unpacking 1 CascView 열기 2 Open Storage 3 \Games\Diablo II Resurrected\Data 열기 4 data\data\global, hd, lo"
date: 2021-10-02T09:54:45.357Z
tags: ["modding"]
---
## 디아블로2 D2R 모딩하는 방법
### 1 모딩 툴 우선 다운로드
```bash
git clone https://github.com/HighTechLowIQ/ModdingDiablo2Resurrected
```
### 2 CascView로 Unpacking
1 CascView 열기
2 Open Storage
3 \Games\Diablo II Resurrected\Data 열기
4 data\data\global, hd, local을 \Games\Diablo II Resurrected\Data 위치로 Extract
![](/images/59c5635e-e0a3-4abf-bd11-155ee8a001da-image.png)

### 3 테스트 실행
정상적으로 작동하는지 테스트하려면 바로가기를 만들어서 파라미터 추가 -direct -txt
![](/images/b6b26ce3-8ff6-458b-b5d2-4f21899897e2-image.png)

### 4 수정 시작!
D2Excel.exe를 실행해서 File > Load txt 파일 선택 후 수정 (백업하기!)

### 템 드랍율 수정

예) 
1 \global\excel\uniqueitems.txt 수정
2 \global\excel\treasureclassex.txt 수정 (드랍율 수정)

Load txt
uniqueitems.txt
![](/images/27393c5a-199c-4b74-8f69-2ad8d0355220-image.png)
Save txt

Load txt
treasureclassex.txt
![](/images/5db8dd2e-d2d5-4d4e-b1ca-70ecfe1a210b-image.png)
Save txt


### 템 이름 수정
\Games\Diablo II Resurrected\Data\local\lng\strings
\strings\items-names.json
신규 그래픽 디아
![](/images/1d603a15-29f7-4d7a-bcd0-ba935b067738-image.png)
\strings-legacy\items-names.json
옛날 그래픽 디아

### 결과
![](/images/08ece276-8fdc-4eca-9d4a-e2eddfd20818-image.png)

### REF
https://www.youtube.com/watch?v=RMquP82QHGw

https://github.com/HighTechLowIQ/ModdingDiablo2Resurrected

https://d2mods.info/forum/kb/viewarticle?a=368