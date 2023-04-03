---
title: "SpringBoot - ehCache"
description: "설정 ehCache.xml 캐시 정책  사용방법 1 애플리케이션 실행 요소에 넣기  2 ehcache.xml 파일 추가, yml에 경로 추가  3 사용할 메소드에 추가  "
date: 2022-03-24T06:06:32.749Z
tags: []
---
# 설정 ehCache.xml 캐시 정책
```xml
maxEntriesLocalHeap="1500000"  //저장될 객체의 최대수
eternal="false"  // 시간 설정 무시 옵션
timeToIdleSeconds="600"  //설정된 시간 동안 Idle 상태시 갱신(10분)
timeToLiveSeconds="3600" // 설정된 시간 동안 유지 후 갱신(1시간) 
diskPersistent="true"  //디스크 저장 사용 옵션
overflowToDisk="false"  //메모리 부족시 디스크 저장 옵션
memoryStoreEvictionPolicy="LRU" // 데이터 제거 알고리즘 옵션

statistics="true" //JMX통계정보 갱신 옵션

```
# 사용방법
## 1 애플리케이션 실행 요소에 넣기
```java
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MainApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}

}
```
## 2 ehcache.xml 파일 추가, yml에 경로 추가
```xml
ehcache.xml
<cache name="comboCache"
           maxEntriesLocalHeap="10000"
           maxEntriesLocalDisk="10000"
           eternal="false"
           diskSpoolBufferSizeMB="20"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="1800"
           memoryStoreEvictionPolicy="LFU"
           transactionalMode="off">
        <persistence strategy="localTempSwap" />
    </cache>

application.yml
  cache:
    ehcache:
      config: classpath:ehcache.xml
```

## 3 사용할 메소드에 추가
```java
@Cacheable(value="comboCache", key="'KeyIs'+#requestDTO.getUserId()+#requestDTO.getSearchTerm()")
	@Override
	public String getSearchInfo(RequestDTO requestDTO) {
		HashMap<String, Object> paramsMap = Maps.newHashMap();
		paramsMap.put("userId", requestDTO.getUserId());
		paramsMap.put("searchTerm", requestDTO.getSearchTerm());

		return getRestApi(getUrl(gatewayHost, getUri), paramsMap);
	}
```

## 4 조건에 따른 캐싱도 가능
```java
public static final String OPTIONS = "Real";

 @Cacheable(value = "product", condition="#requestDTO.getOption().equals('"+OPTIONS+"')")
    public List<Product> bestProductForGoldUser(User user){
 
        log.info("ProductService.bestProductForGoldUser");
 
        List<Product> bestProducts = new ArrayList<>();
        bestProducts.add(new Product(1,ProductType.OUTER,"CHANNEL OUTER",true));
        return bestProducts;
    }
```

### 출처
https://soccerda.tistory.com/entry/ehcache-%EA%B0%80%EC%9D%B4%EB%93%9C

https://www.baeldung.com/ehcache

http://dveamer.github.io/backend/SpringCacheable.html

https://coding-start.tistory.com/271