---
title: "Data Structures - Java"
description: "hash내부적으로 배열을 사용해서 데이터를 저장. 때문에 빠른 검색 속도를 갖음. 특정한 값을 Search 하는데 데이터 고유의 인덱스로 접근하여 average case 에 대하여 Time Complexity 가 O(1)이 됨.(항상 O(1)이 아니고 average c"
date: 2021-10-04T00:18:13.457Z
tags: ["data structures"]
---
**예제 실행은 온라인 컴파일러 사용 **
https://www.tutorialspoint.com/online_java_formatter.htm
## List
### 특징
- 배열은 처음 크기를 설정하고 나서부터는 크기 설정이 불가능하지만 리스트는 삽입과 삭제로 원하는대로 크기를 변경 가능
- 배열은 직접 액세스(Direct access), 순차 액세스(Sequential Access) 모두 가능, List는 순차 액세스만 가능
### 예제
``` java
public static void main(String[] args) {
	ArrayList<String> list = new ArrayList<String>(); // List 선언(ArrayList)
	LinkedList<String> list2 = new LinkedList<String>(); // List 선언(LinkedList)
	
	list2.add("E");
	list.add("A");
	list.add("B");
	list.add("C"); // List 추가
	list.add(0, "D"); // 0번째에 D값을 추가(동일한 값이 있을 경우 밀어냄)
	System.out.println("List 값 확인 : " + list);
	System.out.println("List 인덱스 값 확인 : " + list.get(0));
	
	list.remove(2); // List 삭제(인덱스)
	list.remove("B"); // List 삭제(값으로)
	
	list.set(0, "Z"); // List 값 변경 (인덱스, "변경할 값")
	
	System.out.println("List 크기 확인 : " + list.size());
	
	System.out.println("List 안에 특정 값 들었는지 확인 : " + list.contains("B"));
	
	System.out.println("List 안에 아무것도 들지 않았는지 확인 : " + list.isEmpty());
	
	list.addAll(list2); // 리스트에 다른 리스트 더하기
	String[] arr = {"ARRAY"};
	list.addAll(Arrays.asList(arr)); // 배열을 리스트로 더하기
	System.out.println("List 안에 다른 리스트 더하기 : " + list);
}
```

## ArrayList vs LinkedList
- ArrayList는 대량의 데이터 검색에 유용
- LinkedList는 대량의 데이터 삽입, 삭제에 유리

![](/images/b68e45b3-84fc-4cc1-9b99-b6e084702370-image.png)

``` java
public static void main(String[] args) {
	ArrayList arrayList = new ArrayList();
	LinkedList linkedList = new LinkedList();
	
	// ADD
	// ArrayList add
	long startTime = System.nanoTime();
	for (int i = 0; i < 100000; i++) {
		arrayList.add(i);
	}
	long endTime = System.nanoTime();
	long duration = endTime - startTime;
	System.out.println("ArrayList add:  " + duration);
	
	// LinkedList add
	startTime = System.nanoTime();
	for (int i = 0; i < 100000; i++) {
		linkedList.add(i);
	}
	endTime = System.nanoTime();
	duration = endTime - startTime;
	System.out.println("LinkedList add: " + duration);
	
	// GET
	// ArrayList get
	startTime = System.nanoTime();
	for (int i = 0; i < 10000; i++) {
		arrayList.get(i);
	}
	endTime = System.nanoTime();
	duration = endTime - startTime;
	System.out.println("ArrayList get:  " + duration);
	// LinkedList get
	startTime = System.nanoTime();
	for (int i = 0; i < 10000; i++) {
		linkedList.get(i);
	}
	endTime = System.nanoTime();
	duration = endTime - startTime;
	System.out.println("LinkedList get: " + duration);
	
	//REMOVE
	// ArrayList remove
	startTime = System.nanoTime();
	for (int i = 9999; i >=0; i--) {
		arrayList.remove(i);
	}
	endTime = System.nanoTime();
	duration = endTime - startTime;
	System.out.println("ArrayList remove:  " + duration);
	// LinkedList remove
	startTime = System.nanoTime();
	for (int i = 9999; i >=0; i--) {
		linkedList.remove(i);
	}
	endTime = System.nanoTime();
	duration = endTime - startTime;
	System.out.println("LinkedList remove: " + duration);
}
```
#### 출력
![](/images/7812e9de-7e58-42c5-86e4-c0e9175fccf4-image.png)

## Hash Map
### 특징
hash
- 내부적으로 **배열**을 사용해서 데이터를 저장. 때문에 빠른 검색 속도를 갖음. 
- 특정한 값을 Search 하는데 **데이터 고유의 인덱스**로 접근하여 average case 에 대하여 Time Complexity 가 O(1)이 됨.(항상 O(1)이 아니고 average case 에 대해서 O(1)인 것은 collision 때문.) 
- 단 문제는 인덱스로 저장되는 key값이 불규칙해서 특별한 알고리즘을 이용하여 저장할 데이터와 연관된 고유한 숫자를 만들어 낸 뒤 이를 인덱스로 사용. 
- 특정 데이터가 저장되는 인덱스는 그 데이터만의 고유한 위치이기 때문에, 삽입 연산 시 다른 데이터의 사이에 끼어들거나, 삭제 시 다른 데이터로 채울 필요가 없어 산에서 추가적인 비용이 없도록 만들어진 구조.

### 예제
```java
public static void main(String[] args) {
	HashMap<String, Integer> map = new HashMap<String, Integer>(); // Map 선언

	map.put("Soraka", 450);
	map.put("Garen", 4800); // Map 안에 값 넣기
		// Map의 Key는 중복 불가, 동일한 Key에 다른 값을 넣을 경우 최근에 넣은 값 적용
	map.put("Garen", 1350);

	   	// Key를 사용하여 Map 안의 값 가져오기
	System.out.println("Map Value : " + map.get("Garen")); 

	System.out.println("Map size : " + map.size()); // 맵 크기 확인

	map.replace("Garen", 450); // Key 값의 내용을 변경
	System.out.println("Garen Value : " + map.get("Garen")); 

		// Key가 존재하는지 확인
	System.out.println("Key Exist : " + map.containsKey("Garen"));
	// Value가 존재하는지 확인
			System.out.println("Value Exist : " + map.containsValue(450));

	System.out.println("Map Empty : " + map.isEmpty()); // Map의 크기가 0인지 확인

	map.remove("Garen"); // key에 해당하는 값 삭제
	map.put(null, 150);
	map.put("Garen", 450);

	System.out.println("Key가 있으면 Value 없으면 default : " + map.getOrDefault("Ahri", 6300));

	// Key가 없거나 Value가 null일 때만 삽입
	map.putIfAbsent("Master Yi", 6300);
	map.putIfAbsent("Garen", 6300);
	System.out.println("Key가 없거나 Value가 null일 때만 삽입 : " + map.get("Master Yi"));
	System.out.println("Key가 없거나 Value가 null일 때만 삽입 : " + map.get("Garen"));
}
```
## Hash Table
### 특징
- hash 특징은 map과 동일함 단 아래의 차이점이 있음

#### Hashmap vs Hashtable 
- hashmap == non-sync == !thread-safe
- hashmap 은 널(null) 키값과 널 값(value) 허용.
- hashtable == sync == thread-safe
- hashtable 은 널 키와 값 삽입 불가. 
- thread-sync 가 필요 없으면 hashmap을 일반적으로 사용함. 

### 예제
선언, 삽입, 삭제, 선택, 수정, 출력
```java

import java.util.Hashtable;

public class HashTableExample {

	public static void main(String[] args) {
		Hashtable<Integer, String> ht = new Hashtable<Integer, String>();
        //Hashtable 안에 값 삽입
		ht.put(0, "철수");
		ht.put(1, "영희");
		ht.put(2, "영수"); // Hashtable에 값 삽입
        //Hashtable 안의 값 수정
		ht.replace(2, "수철"); // Hashtable 값 바꾸기
        //Hashtable 안의 내용 삭제
		ht.remove(2); // Hashtable 값 삭제

		for(int i = 0; i<ht.size(); i++) {
            //Hashtable 안의 값 선택
			System.out.println(ht.get(i)); // Hashtable 값 출력
		}
		//출력
        //Hashtable 사이즈 확인하기
		System.out.println("Hashtable 크기 : " + ht.size());
        //Hashtable 안에 특정 Key, Value 들었는지 확인하기
		System.out.println("Hashtable key 확인 : " + ht.containsKey(2));
		System.out.println("Hashtable value 확인 : " + ht.containsValue("수철"));
        //Hashtable의 크기 0인지 확인하기
		System.out.println("Hashtable 크기 0인지 확인 : " + ht.isEmpty());
        //Hashtable 안에 들어있는 전체 Key 확인하기
		System.out.println("Hashtable 전체 Key 확인 : " + ht.keySet());
		
	}

}
```
## HashMap vs Hashtable 차이 예제 
```java
// HashMap and HashTable
import java.util.*;
import java.lang.*;
import java.io.*;

// Name of the class has to be "Main"
// only if the class is public
public class Sample
{
	public static void main(String args[])
	{
		//----------hashtable -------------------------
		Hashtable<Integer,String> ht=new Hashtable<Integer,String>();
		ht.put(101," ajay");
		ht.put(101,"Vijay");
		ht.put(102,"Ravi");
		ht.put(103,"Rahul");
		System.out.println("-------------Hash table--------------");
		for (Map.Entry m:ht.entrySet()) {
			System.out.println(m.getKey()+" "+m.getValue());
		}

		//----------------hashmap--------------------------------
		HashMap<Integer,String> hm=new HashMap<Integer,String>();
		hm.put(100,"Amit");
		hm.put(104,"Amit");
		hm.put(101,"Vijay");
		hm.put(102,"Rahul");
		System.out.println("-----------Hash map-----------");
		for (Map.Entry m:hm.entrySet()) {
			System.out.println(m.getKey()+" "+m.getValue());
		}
	}
}
```
#### 출력 
![](/images/daadb428-eed1-4ec0-bce7-d6ac3666e78d-image.png)

## Set
### 특징
- Set == List 
	- EXCEPT Set은 중복 값을 삽입할 수 없다
	- EXCEPT Set은 특정한 순서를 가지고 있지 않다
- Set의 변형
	- LinkedSet
 		- 다른 Set들과 동일하게 중복은 허용하지 않으나 .add() 한 순서대로 값이 저장된다
    - TreeSet	
    	- 오름차순으로 값을 정렬해 가지고 있으며 다른 set보다 대량의 데이터를 검색할 시 훨씬 빠르다
    
    
### 예제
```java
import java.util.HashSet;
import java.util.Iterator;

public class SetTest {
	
	public static void main(String[] args) {
		HashSet<String> set = new HashSet<String>(); // set 선언
		//Set에 값 추가하기
		set.add("a");
		set.add("b");
		set.add("b"); // set에 중복값 저장 불가 
		set.add("c"); // set에 값 담기
		
		System.out.println("set 크기 확인 : " + set.size());
		
        //Set 내용 출력할 수 있게 Iterator 안에 담기
		Iterator<String> iter = set.iterator();
		while(iter.hasNext()) { // iterator에 다음 값이 있다면
			System.out.println("iterator : " + iter.next()); // iter에서 값 꺼내기
		}
	}

}
```


## Queue
### 특징
- 선형 자료구조의 일종으로 First In First Out (FIFO). 즉, 먼저 들어간 놈이 먼저 나옴.
- Java Collection 에서 Queue 는 인터페이스. 이를 구현하고 있는 Priority queue등을 사용할 수 있음.
### 예제
```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {

	public static void main(String[] args) {
		Queue<String> que = new LinkedList<String>();
		//큐 안에 값 넣기
		que.offer("김철수");
		que.offer("이영희");
		que.offer("김영수"); // Queue에 값 추가
		
		// Queue에 김영수(출력 값) 들어있는지 확인
		System.out.println("Queue 값 포함 여부 :" + que.contains("김영수"));
		// Queue에 다음에 나올 값 확인
		System.out.println("Queue 다음 출력값 확인 : " + que.peek());
		// Queue 크기 확인
		System.out.println("Queue 크기 확인 : " + que.size());
		
		for(int i = 0; i<que.size();) {
			// Queue 안의 값 출력
			System.out.println(que.poll());
		}
		
		// Queue 비우기
		que.clear();
		// Queue 비었는지 확인
		System.out.println("Queue 비었는지 여부 : " + que.isEmpty());
		
	}

}
```
## Stack
### 특징
- 선형 자료구조의 일종으로 Last In First Out (LIFO). 즉, 나중에 들어간 원소가 먼저 나옴.
### 예제
```java
import java.util.Stack;

public class StackExample {

	public static void main(String[] args) {
		Stack<String> stk = new Stack<String>();
        //스택 안에 값 넣기
		stk.add("김철수");
		stk.add("이영희");
		stk.add("박영수"); // Stack에 값 추가(나중에 넣은게 먼저 나옴)
		
		// Stack에 특정 값 들었나 확인
		System.out.println("Stack 안에 이영희 들었는지 확인 : " +  stk.contains("이영희"));
		// Stack에서 다음에 나올 값 확인
		System.out.println("Stack pop 시 값 : " + stk.peek());
		// Stack의 i번째 인덱스에 뭐가 들었나 확인
		System.out.println("0번째 인덱스 확인 : " + stk.elementAt(0));
		// Stack에서 특정 값이 어느 인덱스에 들었나 확인
		System.out.println("특정 값의 인덱스 확인 : " + stk.indexOf("이영희"));
		// Stack의 i번째 인덱스 삭제
		stk.remove(2);
		// Stack의 특정 인덱스 값 변경
		stk.set(1, "박영희");
		// Stack의 크기 설정 
		// (설정 이전에 크기보다 Stack의 크기가 작으면 나머지는 null 처리)
		stk.setSize(5);
		
		System.out.println("###For 문 시작###");
		for(int i = 0; i<stk.size();) {
			System.out.println(stk.pop()); // Stack의 값 빼내기
		}
		
		stk.clear(); // Stack 비우기
		System.out.println(stk.empty()); // Stack 비었나 확인
		
	}

}
```

## REF
https://wakestand.tistory.com/
https://wakestand.tistory.com/190
https://wakestand.tistory.com/106

https://velog.io/@csk917work/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%84%A4%EB%AA%85

https://www.geeksforgeeks.org/differences-between-hashmap-and-hashtable-in-java/