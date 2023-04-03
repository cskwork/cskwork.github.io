---
title: "JPA(CRUD) - snippets"
description: "Service  Entity  Repository  Repository-QueryDSL Interface  QueryDSL "
date: 2022-06-30T02:17:35.350Z
tags: []
---
### Service
```java
// INSERT
Object objectData = ObjectDTO.toEntity(objectDTO);
for(ObjectDetail one : objectData.getObject()){
	objectRepository.save(one);
}

// Custom Query
@Query(value = ""
	+"	SELECT count(A.newCnt)                                                                                     "
	+"	FROM (SELECT table.makeDate AS newCnt                                                                 "
	+"		  FROM data.Table table                                                                             "
	+"		  WHERE table.makeDate  >= DATE_ADD(NOW(), INTERVAL -1 HOUR)                                      "
	+"		  ) A                                                                                                  "
	+"		   " , nativeQuery = true)                                                                           
public Long countObject();
```
### Entity
```java
@Entity
@Getter
@Builder
@DynamicUpdate
@NoArgsConstructor // 빈 생성자 필요
@AllArgsConstructor
@Table(name = "TABLE_NAME")
public class Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    private int id;

    @Column(name = "REG_DT")
    private LocalDateTime regDate;

    @Column(name = "USER_ID")
    private String userId;

    //insert, update
    public void setUserId(String userId) {this.userId = userId;}
}
```

### Repository
```java
public interface ObjectRepository extends JpaRepository<Entity, Long>, ObjecRepositoryCustom {
	// SELECT
    public Page<Object> findByCategory(Pageable pageable, Category category);
}

```

### Repository-QueryDSL Interface
```java
public interface EntityRepositoryCustom {
    public void updateEntity(EntityDTO entityDTO);
    public int deleteById(Long id);
}
```

### QueryDSL
```java
public class ObjectRepositoryImpl extends QuerydslRepositorySupport implements ObjectRepositoryCustom {
    public ObjectRepositoryImpl() { super(Entity.class); }
	
    // UPDATE
    @Override
    @Transactional
    public void updateEntity(EntityDTO entityDTO) {
        update(entity)
			.where(
					entity.id.eq(entityDTO.getId())
			)
			.set(entity.title, entityDTO.getTitle())
			.execute();
    }
    
    // DELETE
    @Override
    public int deleteById(Long id) {
      Long return =  delete(category).where(category.id.eq(id)).execute();
      return return.intValue();
    }
}

```