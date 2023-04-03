---
title: "MyBatis - DTO Link Manual"
description: "ResultMap resultMap id = select resultMap컬렉션 Select LINK TODTOselectOneselectListselectMap"
date: 2021-11-22T06:57:50.587Z
tags: []
---
## ResultMap 

resultMap id = select resultMap
```xml
<mapper namespace="MapperName">
  
<resultMap id="resultMapId" type="package.DtoClass$DtoSubClass$DtoSubClass" >  
  <result property="column1UsageName"  column="column1" />
  <result property="column2UsageName"  column="column2" />
  <result property="column3UsageName"  column="column3" />
</resultMap>
```

### 컬렉션 
```xml
<collection property="nameList" column="{column1=column1, column2 = column2}" javaType="java.util.ArrayList" ofType="hashmap" 
            select="MapperName.MapperId"/>

</mapper>
```

### Select 
```xml
<select id="getListName" parameterType="String" resultMap="resultMapId">
  SELECT C1 AS C1, 
  FROM   TABLE 
  WHERE  C1 = #{C1} 
</select>
```


LINK TO
### DTO
**파라미어터와 리턴 타입 명시 필수**
selectOne
``` java
paramType : String
resultMap : java.util.HashMap

return sqlSession.selectOne("ObjectClass.getList", userId);
```
### selectList
```java
paramType : dto.classInput
resultMap : dto.classOutput

return sqlSession.selectList("ObjectClass.getList", inp);
```

### Spring Lombok
``` java
  // DataObject
  @Data
  public static class DataObject1 {
    private String column1; 
    private String column2;
    private List<DataObject2> objectsubList = new ArrayList<>(); // Multiple Data Object

    @Data
    public static class DataObject2 {
      private String column1; 
      private String column2; 
      private List<DataObject3> objectsubList2 = new ArrayList<DataObject3>(); // 교과목목록
    }
  }
```

### SpringBoot Lombok (Get As JSON)
```java

// Get Data from Parent List
@JsonProperty("jsonDataClassSuperKey")
private DataClassSuper dataClassSuper;

@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public static class DataClassSuper {
  @JsonProperty("jsonListKey")
  private List<objectClass> objectClassList;

// Get Basic Declare As List
@JsonProperty("jsonListKey")
private List<objectClass> objectClassList;

// Basic Declare
@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class objectClass {
    @JsonProperty("jsonKey1")
    private String column1;
    @JsonProperty("jsonKey2")
    private String column2;
}

```

### selectMap
``` java
paramType : string
resultMap : java.util.HashMap

return sqlSession.selectMap("ObjectClass.getUserInfo", userId);
```
``` xml
	<select id="getUserInfo" parameterType="String" resultMap="resultMapId">
		SELECT userid AS USER_ID, 
		FROM   PERSON 
		WHERE  userid = #{userId} 
	</select>
```



