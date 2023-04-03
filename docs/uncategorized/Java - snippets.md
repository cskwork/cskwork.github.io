---
title: "Java - snippets"
description: "Int -> String  String -> Int "
date: 2022-05-20T08:09:06.696Z
tags: []
---
### Int -> String
```java
String myString = Integer.toString(myInt);
```

### String -> Int
```java
String myString = "1234";
int foo = Integer.parseInt(myString);
```

### Exit Loop
``` java
for (String item : itemList) {
	if(!item.containsKey(keyId)) continue;
	log.debug("RUN THIS ACTION");	
}
```

### Get Object Value
```java
Map<String, Object> mapInfo = new HashMap<String, Object>();
String mapId = mapInfo.get("id").toString());
```

### Put Key Value Map
```java
private static HashMap<String,Object> itemList = new HashMap<>();
itemList.put("KEY", "VALUE");
```

### Filter
```java
if(keyword != null&&!keyword.equals("")) {
	filteredArray = Arrays.stream(filteredArray)
       .filter(e->e.getName().contains(keyword)||e.getItemName().contains(keyword)).toArray(ListData[]::new);
}
```

### Sort By Frequency
```java
ArrayList<Object> objectList = new ArrayList<>(resultMap.values());
Collections.sort(objectList, new Comparator<Object>() {
	@Override
	public int compare(Object o1, Object o2) {
		return Integer.compare(Integer.valueOf(o1.getFreq()) , Integer.valueOf(o2.getFreq()))*-1;
	}
});	
```

### De-duplication
```java
DeduplicationUtil.deduplication(new ArrayList<Object>(tempList), Object::getObjectId).toArray(new Object[0]);

public class DeduplicationUtil {
	public static <T> List<T> deduplication(final List<T> list, Function<? super T, ?> key){
		return list.stream().filter(deduplication(key)).collect(Collectors.toList());
	}
	
	private static <T> Predicate<T> deduplication(Function<? super T, ?> key){
		final Set<Object> set = ConcurrentHashMap.newKeySet();
		return predicate -> set.add(key.apply(predicate));
	}
}
```

### Remove Object in arrayList
``` java
List<Object> totalObjectList = new ArrayList<Object>();
totalObjectList.removeIf(t -> t.getNm() == keyword);
```

### Date parsing
```java
String endDateStr = resultMap.get(0).get("BEGINDATE");
Date endDate=new SimpleDateFormat("yyyy.MM.dd HH:mm").parse(endDateStr);  
Calendar calendar = new GregorianCalendar();
calendar.setTime(endDate);
int endDateYear = calendar.get(Calendar.YEAR);
```

### CheatSheet
https://introcs.cs.princeton.edu/java/11cheatsheet/