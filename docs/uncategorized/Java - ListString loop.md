---
title: "Java - List<String> loop"
description: "outputhttps&#x3A;//crunchify.com/how-to-iterate-through-java-list-4-way-to-iterate-through-loop/"
date: 2022-03-22T12:17:04.001Z
tags: []
---
## 리스트 루프 7가지 방식
- 개인적으로는 Iterable.forEach() util 가독성 선호. 
- 단 forEach 사용시 Local variable '변수명' defined in an enclosing scope must be final or effectively final 에러 발생할 수 있으니 그럴 때는 클래스 단에 변수를 만들거나 2번 사용. 
- 퍼포먼스 차이는 미세하여 nested loop, 알고리즘에 신경을 더 쓰는 게 효율적이다.

```java
import java.util.*;
 
/**
 * @author Crunchify.com
 * How to iterate through Java List? Seven (7) ways to Iterate Through Loop in Java.
 * 1. Simple For loop
 * 2. Enhanced For loop
 * 3. Iterator
 * 4. ListIterator
 * 5. While loop
 * 6. Iterable.forEach() util
 * 7. Stream.forEach() util
 */
 
public class CrunchifyIterateThroughList {
 
    public static void main(String[] argv) {
 
        // create list
        List<String> crunchifyList = new ArrayList<String>();
 
        // add 4 different values to list
        crunchifyList.add("Facebook");
        crunchifyList.add("Paypal");
        crunchifyList.add("Google");
        crunchifyList.add("Yahoo");
 
        // Other way to define list is - we will not use this list :)
        List<String> crunchifyListNew = Arrays.asList("Facebook", "Paypal", "Google", "Yahoo");
 
        // Simple For loop
        System.out.println("==============> 1. Simple For loop Example.");
        for (int i = 0; i < crunchifyList.size(); i++) {
            System.out.println(crunchifyList.get(i));
        }
 
        // New Enhanced For loop
        System.out.println("\n==============> 2. New Enhanced For loop Example..");
        for (String temp : crunchifyList) {
            System.out.println(temp);
        }
 
        // Iterator - Returns an iterator over the elements in this list in proper sequence.
        System.out.println("\n==============> 3. Iterator Example...");
        Iterator<String> crunchifyIterator = crunchifyList.iterator();
        while (crunchifyIterator.hasNext()) {
            System.out.println(crunchifyIterator.next());
        }
 
        // ListIterator - traverse a list of elements in either forward or backward order
        // An iterator for lists that allows the programmer to traverse the list in either direction, modify the list during iteration,
        // and obtain the iterator's current position in the list.
        System.out.println("\n==============> 4. ListIterator Example...");
        ListIterator<String> crunchifyListIterator = crunchifyList.listIterator();
        while (crunchifyListIterator.hasNext()) {
            System.out.println(crunchifyListIterator.next());
        }
 
        // while loop
        System.out.println("\n==============> 5. While Loop Example....");
        int i = 0;
        while (i < crunchifyList.size()) {
            System.out.println(crunchifyList.get(i));
            i++;
        }
 
        // Iterable.forEach() util: Returns a sequential Stream with this collection as its source
        System.out.println("\n==============> 6. Iterable.forEach() Example....");
        crunchifyList.forEach((temp) -> {
            System.out.println(temp);
        });
 
        // collection Stream.forEach() util: Returns a sequential Stream with this collection as its source
        System.out.println("\n==============> 7. Stream.forEach() Example....");
        crunchifyList.stream().forEach((crunchifyTemp) -> System.out.println(crunchifyTemp));
    }
}
```

output
```

==============> 1. Simple For loop Example.
Facebook
Paypal
Google
Yahoo
 
==============> 2. New Enhanced For loop Example..
Facebook
Paypal
Google
Yahoo
 
==============> 3. Iterator Example...
Facebook
Paypal
Google
Yahoo
 
==============> 4. ListIterator Example...
Facebook
Paypal
Google
Yahoo
 
==============> 5. While Loop Example....
Facebook
Paypal
Google
Yahoo
 
==============> 6. Iterable.forEach() Example....
Facebook
Paypal
Google
Yahoo
 
==============> 7. Stream.forEach() Example....
Facebook
Paypal
Google
Yahoo
 
Process finished with exit code 0
```

## 출처
https://crunchify.com/how-to-iterate-through-java-list-4-way-to-iterate-through-loop/

https://wakestand.tistory.com/432