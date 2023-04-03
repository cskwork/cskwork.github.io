---
title: "Java-JVM-GC(Garbage Collection) 튜닝"
description: "GC-stop-the-worldGC 실행을 위해 JVM이 앱 실행을 멈추는 작업. GC 튜닝은 해당 시간을 줄이는 일Daemon thread로 백그라운드에서 계속 실행됨 GC의 전제조건(대부분의) 객체는 금방 접근 불가능하게된다.오래된 객체에서 젋은 객체로의 참조는 아"
date: 2022-09-13T08:03:55.704Z
tags: []
---
### GC-stop-the-world
- GC 실행을 위해 JVM이 앱 실행을 멈추는 작업. 
- GC 튜닝은 해당 시간을 줄이는 일
- Daemon thread로 백그라운드에서 계속 실행됨 

### GC의 전제조건
- (대부분의) 객체는 금방 접근 불가능하게된다.
- 오래된 객체에서 젋은 객체로의 참조는 아주 적게 존재한다.

![](/images/5379d665-1352-4551-b202-f5b311f996de-image.png)

### Young영역-일시적으로 존재 
- 객체가 사라지면 Minor GC 

### Old 영역-아직 접근 불가는 아님
- Young에서 살아남아 옮겨진 객체
- Young 보다 보통 더 크며 GC는 적게 발생 
- 객체가 사라지면 Major/Full GC 

### Perm(Permanent) 영역-Method Area
- Old에서 살아남은 객체 보관 단 여기서도 GC 발생 가능 
- 객체가 사라지면 Major/Full GC
- JDK 8 이상부터는 제거되고 대신 metaspace(native memory영역) 사용함. 

### Old-to-New=Card Table 
- OId에서 Young 객체 참조할 정보 보관 
- Young에서 GC 실행시 이 테이블에서 GC 대상인 식별 

### Young(Eden-Survivor) 
- 새로 생성된 객체는 Eden에 위치 
- Eden에서 GC 발생 후 살아남은 건 Survivor에 위치 
- Survivor에 가득차면 그 중에서 살아남은 객체는  다른 Survivor영역으로 이동
- Survivor 과정이 반복되다가 살아남은 객체는 old 영역으로 이동 

![](/images/bbfdefd2-b00d-4809-81a0-68136423c426-image.png)

### 메모리 할당 기술 ( bump-the-pointer, Thread-Local Allocation Buffers )
- hotspot VM에서 빠른 메모리 할당을 위해서 사용 

### bump-the-pointer
- Eden에 할당된 마지막 객체 추적해서 Eden에 적합한지 확인 후 적합하면 Eden에 넣고 새로 생성된 객체 상단에 위치. 

### thread-local allocation
- 멀티 스레드 환경에서 객체를 Eden에 저장하려고 lock-contention이 발생하는 상황에서 각각의 스레드가 작은 덩어리로 각각의 몫에 해당하는 Eden 영역만 가질 수 있게 한다. bump-the-pointer도 동시 사용 가능. 

### Old영역-SerialGC
- mark-sweep-compact 알고리즘 사용 

### mark-sweep-compact 
- Old에 살아있는 객체 식별 
- 힙 앞에 있는 survivor 남김(sweep) 
- 힙의 앞 부분부터 채워서 객체가 있는 부분과 없는 부분으로 나눔 (compaction) 
- 적은 메모리와 CPU 코어일 때 적합 

### Old영역-ParallelGC(throughput GC) 
- SerialGC와 같은 알고리즘 단 멀티 스레드. 

### Old영역-CMS GC(concurrent mark-sweep/low latency GC)  
- 1 initial mark(객체 식별 단계)에서 클래스 로더에 가장 가까운 객체 중 살아 있는 객체만 찾음. 
- 2 concurrent mark 단계에서 방금 살아있는다고 확인된 객체에서 참조하고 있는 객체들을 따라가서 확인한다. 
- 3 remark 단계에서 이전 단계에서 새로 추가되거나 참조가 끊긴 객체 식별. 
- 4 concurrent sweep 미사용 객체 정리. 다른 스레드 실행 중에도 진행함. 
- stop-the-world가 매우 짧음 단 메모리와 CPU를 많이 쓰고. compaction이 기본으로 제공되지 않음. 

![](/images/b8a9acff-4903-4c13-876b-5a9a389bb17e-image.png)

### Old영역-G1 GC 
- 바둑판의 각 영역에 객체를 할당하고 GC 실행 
- Old-Young 이동 단계를 없에고 CMS GC를 대체함. 
- 성능이 좋지만 안정화 단계 거쳤음 (JDK 7

![](/images/73d3eaac-2356-49c8-bc14-bffeb243f5ae-image.png)

![](/images/19cf2094-6a39-4130-a153-3b4dc513ccaf-image.png)

### GC 설정시 고려해야할 사항
- WAS에서 생성하는 객체의 크기와 생존 주기
- 서버에 사용되는 장비 
- WAS 인스턴스 개수 

---


GC 튜닝-필요-이유 
GC 튜닝-스트링 대체, 로그 최소화 
GC 튜닝-Old 영역과, New 영역의 GC 시간 소요 차이 
GC 튜닝-Old 영역 크기 조절로 실행시간+ vs OOM Error 방지 중 택 1 
GC 튜닝 기본 옵션- 시작 시 영역, 최대 크기, New/Old 영역 비율 
GC 튜닝 절차 - GC 상황 모니터링 

### 출처 
https://d2.naver.com/helloworld/1329

https://www.digitalocean.com/community/tutorials/garbage-collection-in-java

---

JVM-GC-type-000-특징-객체 일시적으로 존재-두 가지 종류-Eden-000-may use bump-the-pointer ||&& thread-local allocation 
JVM-GC-type-old-특징-young 생존자-major GC-uses card table 
JVM-GC-Steps-000-old-types-serial GC-000-front heap remain-parallel GC-CMS GC-참조 끊긴 객체 식별