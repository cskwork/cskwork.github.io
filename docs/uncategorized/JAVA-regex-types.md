---
title: "JAVA-regex-types"
description: "https&#x3A;//www.vogella.com/tutorials/JavaRegularExpressions/article.html"
date: 2022-07-07T05:58:03.472Z
tags: []
---
### Common matching symbols
![](/images/3be32377-a4ab-42e5-8c53-f5506bc642a0-image.png)

### Meta characters
![](/images/bbe6f4b7-b6c3-4940-b8da-ac225e784259-image.png)

### Quantifier
![](/images/e91a5897-7fbb-4ac6-8cc3-d6df2860db42-image.png)


``` java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public static void test(){
     
    String regExp1 = "[a-zA-Z]"; //영문(대소문자) 포함 여부
    String regExp2 = "[ㄱ-힣]"; //한글 포함 여부
    String regExp3 = "[0-9]"; //숫자 포함 여부1
    String regExp4 = "[\\d]"; //숫자 포함 여부2
    String regExp5 = "[\\s]"; //공백 포함 여부(역슬래쉬는 원표시다)
    String regExp6 = "[\\w]"; //영문, 숫자, _(언더스코어) 포함 여부
 
    String regExp1_ = "[^a-zA-Z]"; //영문(대소문자) 미포함 여부
    String regExp2_ = "[^ㄱ-힣]"; //한글 미포함 여부
    String regExp3_ = "[^0-9]"; //숫자 미포함 여부1
    String regExp4_ = "[^\\d]"; //숫자 미포함 여부2
    String regExp5_ = "[^\\s]"; //공백 미포함 여부(역슬래쉬는 원표시다)
    String regExp6_ = "[^\\w]"; //영문, 숫자, _(언더스코어) 미포함 여부
 
    String regExp7 = "[a-zA-Z0-9ㄱ-힣]"; //특수문자 포함 여부
    String regExp7_ = "[^a-zA-Z0-9ㄱ-힣]"; //특수문자 미포함 여부
 
    String regExp8 = "(\\w)\\1\\1\\1"; //영문, 숫자, _ 가 4회 연속 반복되었는지 여부
 
    //패스워드 형식 : 영문+숫자+특수문자를 사용하여 8~20자리로 되어 있는지 여부
    String regExpPw = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9ㄱ-힣]).{8,20}$";
    private static String LETTERS_REGEX = "^[a-zA-Zㄱ-힣]{2,}$"; //   2 글자 이상 {2,}
    
    private static String LETTERNUMBCOMB_REGEX = "^(?=.*[0-9])(?=.*[ㄱ-힣a-zA-Z])([ㄱ-힣a-zA-Z0-9]{2,})$";
    
    static Pattern LETTERNUM = Pattern.compile(LETTERNUMBCOMB_REGEX);
	static Pattern LETTER = Pattern.compile(LETTERS_REGEX);
    
    // match at least 1 number and 1 character in a string
		    String regExpPw = "^(?=.*[0-9])(?=.*[ㄱ-힣a-zA-Z])([ㄱ-힣a-zA-Z0-9]+)$";
 
    //본격 테스트
    Matcher matchTest;
    String testWord = "abcABC123!@#";
 
    System.out.println("테스트 문자: "+ testWord);
    System.out.println();
 
    matchTest = Pattern.compile(regExp1).matcher(testWord);
    System.out.println("영문(대소문자) 포함: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp2).matcher(testWord);
    System.out.println("한글 포함: "+ matchTest.find()); //false
 
    matchTest = Pattern.compile(regExp3).matcher(testWord);
    System.out.println("숫자 포함1: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp4).matcher(testWord);
    System.out.println("숫자 포함2: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp5).matcher(testWord);
    System.out.println("공백 포함: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp6).matcher(testWord);
    System.out.println("영문,숫자,_ 포함: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp7).matcher(testWord);
    System.out.println("특수문자 포함: "+ matchTest.find()); //true
 
    matchTest = Pattern.compile(regExp8).matcher(testWord);
    System.out.println("4회 연속 반복: "+ matchTest.find()); //false
 
    matchTest = Pattern.compile(regExpPw).matcher(testWord);
    System.out.println("패스워드 형식: "+ matchTest.find()); //true
     
}
 
public static void main(String[] args){
    test();
    String extractWord="kewhfjwk@#$490!@#$";
    if ( LETTERNUM.matcher(extractWord).find() || LETTER.matcher(extractWord).find()) { 
					//ACTION
				}
                
}

테스트 문자: abcABC123!@#
 
영문(대소문자) 포함: true
한글 포함: false
숫자 포함1: true
숫자 포함2: true
공백 포함: false
영문,숫자,_ 포함: true
특수문자 포함: true
4회 연속 반복: false
패스워드 형식: true
```

### 출처
https://www.vogella.com/tutorials/JavaRegularExpressions/article.html

https://aaboo.home.blog/2021/05/04/java-%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D-%EA%B8%B0%EC%B4%88-%EB%8B%A4%EC%A7%80%EA%B8%B0/

https://stackoverflow.com/questions/7684815/regex-pattern-to-match-at-least-1-number-and-1-character-in-a-string