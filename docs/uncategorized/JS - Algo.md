---
title: "JS - Algo"
description: "1 분별력 있는 자료 구조 사용 2 함수, 자료구조 이해도 향상3 단순 로직 강화. 0 & 1 , 0 | 1의 힘은 생각보다 강력하다 솔루션 1 방법 1솔루션 1 방법 2"
date: 2022-05-17T23:55:37.083Z
tags: []
---
### 프로세스
1 명확한 문제 정의 및 표현 %
2 현황 파악 % (주어진 데이터, 제약사항 등) 
3 문제 분해
4 원하는 결과(데이터) 시각화 %
5 (옵션) 연관 문제 검색
6 분해된 문제 해결해서 통합 (단순방식)
7 리펙터, 개선 (예외사항 확인, 널 체크)

1-7 각 단계에서 앞으로 나가기 어려우면 이전 단계가 100% 완료되었는지 확인 

---

1 분별력 있는 자료 구조 사용. (자료구조를 어떤 것을 어떻게 쓸지 우선 생각)
2 초심 단계에서는 어떤 재료와 도구를 쓸 수 있을지 생각하기. 즉 전문가는 어떤 재료와 도구, 방법을 쓸지 상상
3 재료를 어떻게 쓰는지는 직접 해보지만 감이 안올 경우 전문가 참조
4 단순 로직 강화. 0 & 1 , 0 | 1의 힘은 생각보다 강력하다 
5 무식한 방법으로 구현한 후 개선

---
1 Problem Restatement (current purpose/issue, expected result, simple example, conditions, utilized data structure)
- 목적 : 불량 게시글을 작성한 사용자를 신고 처리하고 정지시키는 메일을 발송하는 알고리즘 개발 
- 예) id_list array -> report mapped 신고자 신고수신, k 정지 기준, result 는 사용자가 신고한 사용자가 정지 받은 경우 받는다 
- 조건 : 중복 신고는 1로 함 , k는 자연수 

2 Explicit Small Steps (simplified)
- Inputs : id_list,  reports, k (정지 기준) 
- Req Tools : counter map, reportSet, reportedBy, mailCount 
- Req Methods : iterate id_list, separate reportedBy, reportCount, set MailCnt, map report to MailCnt 
- Outputs : sorted 사용자가 신고한 사용자 정지한 경우 

3 Refactor, improve, check others solution. Keep current methods for other problems
```js
let id_list =["muzi", "frodo", "apeach", "neo"];
let report =["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]	;
let k = 2;

console.log(solution(id_list, report, k));


// 각 데이터 구조에 필요한 자료 분별해서 저장
function solution(id_list, report, k) {
  // reportedCount : report를 set을 이용하여 중복제거, 각 id 당 신고당한 횟수
  // reportedBy : 각 id를 신고한 사람 
  // mailCount : k번 이상 신고당한 id를 신고한 id가 받을 메일 수
  // answer : mailCount에 저장된 값을 id_list와 같은 id 순서로 저장.
  const reportSet = new Set(report);
  const reportedCount = {}; //{"id": Number(count)}
  const reportedBy = {}; //{"id":[]}
  const mailCount = {}; //{"id":Number(count)}

  // Init key, value map for counts
  id_list.forEach((element) => {
    reportedCount[element] = 0;
    mailCount[element] = 0;
    reportedBy[element] = [];
  });
  console.info('reportedCount',reportedCount); 

  // Set reportedCount, reportedBy
  reportSet.forEach((element) => {
    const [id, reported] = element.split(" ");
    reportedCount[reported] += 1;
    reportedBy[reported].push(id);
  });
  console.info('reportedBy', reportedBy); 
  
  // Set mailCount with reportedBy
  for (let reportedId in reportedCount) {
    if (reportedCount[reportedId] >= k) {
      reportedBy[reportedId].forEach((reporter) => {
        mailCount[reporter] += 1;
      });
    }
  }
   console.info('mailCount', mailCount); 
  
  return id_list.map((id) => mailCount[id]);
}
```
솔루션 1 방법 2
```js
let id_list =["muzi", "frodo", "apeach", "neo"];
let report =["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]	;
let k = 2;
console.log(solution(id_list, report, k));

function solution(id_list, report, k) {
    let reports = [...new Set(report)].map(a=>{return a.split(' ')});
    let counts = new Map();
  console.info(reports);  
    for (const bad of reports){
        counts.set(bad[1],counts.get(bad[1])+1||1)
    }
    console.log([...counts.entries()]); 
    let good = new Map();
    for(const report of reports){
        if(counts.get(report[1])>=k){
            good.set(report[0],good.get(report[0])+1||1)
        }
    }
    let answer = id_list.map(a=>good.get(a)||0)
    return answer;
}
```

### 기타 팁 
1 난해한 문제 솔루션의 경우 
2 각 코드 라인을 빈 공간으로 분리
3 한 줄 씩 읽어가면서 해석
4 난해한 책을 읽을 때와 유사하게 반복해서 코드를 천천히 읽으면서 하나씩 파악. 모르는 단어/문법은 구글링 통해 발견하면서 진행
5 변수명을 역할에 맞고 직관적인 몀칭으로 이름 다시 짓기



















```