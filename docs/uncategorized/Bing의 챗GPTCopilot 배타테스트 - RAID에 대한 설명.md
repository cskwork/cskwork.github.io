---
title: "Bing의 챗GPT/Copilot 배타테스트 - RAID에 대한 설명"
description: "여러 개의 디스크를 하나의 저장소로 결합하는 기술입니다. 여러 가지 단계가 있으며, 각 단계마다 성능, 용량, 안정성 등이 다릅니다1. RAID 단계 중 가장 많이 사용되는 것은 RAID 0, RAID 1, RAID 5, RAID 6입니다.최소 두 개의 디스크를 사용하"
date: 2023-03-01T04:08:43.706Z
tags: []
---
![](/images/15008f3f-f289-4896-bf2b-518ce4a44fcf-image.png)


## RAID
여러 개의 디스크를 하나의 저장소로 결합하는 기술입니다. 
여러 가지 단계가 있으며, 각 단계마다 성능, 용량, 안정성 등이 다릅니다1. RAID 단계 중 가장 많이 사용되는 것은 RAID 0, RAID 1, RAID 5, RAID 6입니다.

### RAID 0
![](/images/65c009ab-4b22-4a57-afaa-451521715c25-image.png)

최소 두 개의 디스크를 사용하여 데이터를 나눠서 저장하는 방식입니다. 이렇게 하면 데이터 전송 속도가 빨라지고 용량도 모든 디스크의 합과 같아집니다. 하지만 한 개의 디스크가 고장나면 모든 데이터가 손실됩니다

### RAID 1
![](/images/a8488abb-689a-45fa-9792-3c35d11e0fa7-image.png)
최소 두 개의 디스크를 사용하여 데이터를 복사해서 저장하는 방식입니다. 이렇게 하면 한 개의 디스크가 고장나도 다른 디스크에서 데이터를 복구할 수 있습니다. 하지만 용량은 절반으로 줄어들고 성능 향상은 없습니다

### RAID 5
![](/images/dd6ca38d-6642-4c74-aa53-541cc7a15e1e-image.png)

최소 세 개의 디스크를 사용하여 데이터와 패리티라는 오류 정정 정보를 분산해서 저장하는 방식입니다. 이렇게 하면 한 개의 디스크가 고장나도 패리티를 이용하여 데이터를 복구할 수 있습니다. 성능과 용량도 적당히 향상됩니다

### RAID 6
![](/images/813efe7e-09b7-4a60-bc34-cc2bcdcb2bb7-image.png)

최소 네 개의 디스크를 사용하여 데이터와 두 개의 패리티를 분산해서 저장하는 방식입니다. 이렇게 하면 두 개의 디스크가 동시에 고장나도 패리티를 이용하여 데이터를 복구할 수 있습니다. 안정성이 가장 높지만 성능과 용량은 다른 단계보다 낮습니다.

![](/images/d2e28549-d4ec-40fd-adee-4605ec2e99dc-image.png)

![](/images/d447ddec-9e76-45ab-8858-22efd8c40501-image.png)

### Reference
[빙 검색](https://www.bing.com/search?q=RAID+%EB%8B%A8%EA%B3%84%EC%97%90+%EB%8C%80%ED%95%B4+%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C+%EC%84%A4%EB%AA%85%ED%95%B4%EC%A4%98&qs=n&form=QBRE&sp=-1&ghc=1&lq=0&pq=raid+%EB%8B%A8%EA%B3%84%EC%97%90+%EB%8C%80%ED%95%B4+%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C+%EC%84%A4%EB%AA%85%ED%95%B4%EC%A4%98&sc=10-21&sk=&cvid=102F072A3BCA44429ED1AB7517593FEC&ghsh=0&ghacc=0&ghpl=)

https://www.prepressure.com/library/technology/raid