---
title: "Spring REST(CRUD) - snippets"
description: "컨트롤러 - RestController.java인터페이스 - Service서비스 - ServiceImpl"
date: 2021-11-19T06:47:46.652Z
tags: ["Springboot"]
---
## TIPS
- url path (오타, 실제 경로) 확인 
- sql parameterType, resultType 다시 확인 
- testapi 따로 구현해서 테스트 환경 구성 

## POST
### Client Rest
#### JS Call
```js
addBBSKeyword: (keyword) => {
	var self = this;
	$.ajax({
		url: `/addObject.do`,
		data: JSON.stringify({
                userId : userId,
				keyword : keyword 
	            }),	  
		type: "POST",
		dataType: "json",
		contentType: "application/json; UTF-8",
		beforeSend: function() {
			$('.loading').show();
		}
	}).done(function(rs) {
		$('.loading').hide();
	}).fail(function(jqXHR, textStatus, errorThrown) {
		$('.loading').hide();
	}).always(function() {
	})
},
```
#### Controller
```java
public class RestController {
	private final RestService restService;

	@PostMapping(addCVAll)
	public ResponseEntity<String> addCVAll(HttpServletRequest request, HttpServletResponse response,
			@RequestBody HashMap<String, Object> params) {
		log.debug(" == addObject.do START ==");
		log.debug("params :: ==> {}", params.toString());

		return new ResponseEntity<>(restService.addObject(params), HttpStatus.OK);
	}
}
```
#### Service
``` java
@Service
public class RestServiceImpl extends BaseService implements RestService{
    @Value("${gateway.yml.category.addObject}")
    private String addObject;

	@Override
	public String addObject(HashMap<String, Object> params) {
		 return postUniRestJson(getUrl(gatewayHost,addObject), params);
	}
}
```

### Host API
#### Controller
``` java
@Slf4j
@Controller
@RequiredArgsConstructor
public class RestController {
    private final RestService restService;  
    // POST
    final static String addObject = "/addObject.do";
    
	@PostMapping(value = addObject)
	public @ResponseBody Map<String, Object> addObject( Locale locale, Model model,
		   @RequestBody Map<String, Object> param) {
		Map<String, Object> resultMap = null;
		// Map<String, Object> CommonConstants.DATA = new HashMap<>();
		try {
			// OUTPUT
			service.addObject(param);

		} catch (Exception e) {
			e.printStackTrace();
			resultMap = new HashMap<>();
			resultMap.put(CommonConstants.RETCODE, CommonConstants.FAIL);
			resultMap.put(CommonConstants.RETMSG, "서버오류(" + e.getMessage() + ")");
			resultMap.put(CommonConstants.DATA, new ArrayList<Map<String, String>>());
		}
		return resultMap;
	}
}
```
#### ServiceImpl
```java
@Slf4j
@Service
public class RestServiceImpl implements RestService {
	@Autowired
	RestDao dao;
	
	public int addCVAll(Map<String, Object> params) throws Exception {
		int status = 0;
		String userId = params.get("USER_ID");
		UserInfo userInfo = commonDao.getUserInfo(userId);
		
		if (userInfo == null) {
			throw new Exception("User does not exist.(" + userId + ")");
		}
		int status = dao.addObject(userId);
	}
}
```
#### Dao
```java
@Repository
public class RestDao {
  @Autowired
  private SqlSessionTemplate sqlSession;
  
  public int addObject(Map<String, Object> param) {
    return sqlSession.insert("NAMESPACE.addObject", param);
  }
}
```
#### SQL
```xml
<insert id="addObject" parameterType="java.util.Map">
INSERT INTO	data.TABLE
	(
		USER_ID,
		KEYWORD,
		REG_DATE
	)
VALUES 
	(
		#{userId},
		#{keyword},
		now()
	)
</insert>
```
## GET
### Client Rest
#### JS Call
```js
getObject: (keyword) => {
	console.log('getObject Start')
	$.ajax({
		url: `/getObject.do`,
		data: { 
			keyword : keyword
		 },	
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		beforeSend: function() {
			$(".loader").show();
		}
	}).done(function(rs) {
		//console.log('data : >>>>' , rs.data);
		if (rs.retCode === "FAIL") {
			return;    
		}
		Object.objectList = rs.data;
		// action
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// fail
	}).always(function() {
		$(".loader").hide();
	});
},
```
#### Controller
```java
public class RestController {
	private final RestService restService;
	// GET
	final static String searchTerms = "/mariner/getBBSAllKeyword.do"; // 게시판 목록 조회 
	
	@ResponseBody
	@GetMapping(getObject)
	public ResponseEntity<String> getObject(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String searchTerms) {
		// RequestParam || ModelAttribute DTO

		HashMap<String, Object> params = new HashMap<String, Object>();
		log.debug(" == getObject.do START ==");
		log.debug(" == searchTerms ==", searchTerms);
		params.put("searchTerms", searchTerms);	
		return new ResponseEntity<>( (String)restService.getObject(params), HttpStatus.OK);
	}
}
```
#### Service
``` java
@Service
public class RestServiceImpl extends BaseService implements RestService{
    @Value("${gateway.yml.category.getObject}")
    private String getObjectUri;

	@Override
	public String getObject(HashMap<String, Object> params) {
		 return getUniRestJson(getUrl(gatewayHost,getObjectUri), params);
	}
}
```

### Host API
#### Controller
``` java
@Slf4j
@Controller
@RequiredArgsConstructor
public class RestController {
    private final RestService restService;  
    // POST
    final static String getObject = "/getObject.do";
    
	@PostMapping(value = getObject)
	public @ResponseBody Map<String, Object> getObject( Locale locale, Model model,
		   @RequestParam(required = false) String keyword) {
		   
		Map<String, Object> resultMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		try {
			// OUTPUT
			dataMap.put("object", service.getObject(keyword));

		} catch (Exception e) {
			e.printStackTrace();
			resultMap = new HashMap<>();
			resultMap.put(CommonConstants.RETCODE, CommonConstants.FAIL);
			resultMap.put(CommonConstants.RETMSG, "서버오류(" + e.getMessage() + ")");
			resultMap.put(CommonConstants.DATA, new ArrayList<Map<String, String>>());
		}
		resultMap.put(CommonConstants.DATA, dataMap);
		resultMap.put(CommonConstants.RETCODE, CommonConstants.OK_STATUS);
		resultMap.put(CommonConstants.RETMSG, CommonConstants.SUCCESS);
		return resultMap;
	}
}
```
#### ServiceImpl
```java
@Slf4j
@Service
public class RestServiceImpl implements RestService {
	@Autowired
	RestDao dao;
	
	public List<Object> getObject(Map<String, Object> params) throws Exception {
		String userId = params.get("userId");
		UserInfo userInfo = commonDao.getUserInfo(userId);
		
		if (userInfo == null) {
			throw new Exception("User does not exist.(" + userId + ")");
		}
		return dao.getObject(params);
	}
}
```
#### Dao
```java
@Repository
public class RestDao {
  @Autowired
  private SqlSessionTemplate sqlSession;
  
  public List<Object> getObject(Map<String, Object> param) {
    return sqlSession.selectList("NAMESPACE.getObject", param);
  }
}
```
#### SQL
```xml
<select id="getObject" parameterType="String" resultType="hashmap">
SELECT 
	SEQ ,
	USER_ID,
	KEYWORD,
	REG_DATE
FROM
	data.TABLE
WHERE USER_ID = #{userId}
</select>
```
---
## Common Methods
```java
protected String postUniRestJson(String url, Map<String, Object> parameters) {
	HttpResponse<JsonNode> response = null;
	ObjectMapper objectMapper = new ObjectMapper();
	try {
		response = Unirest.post(url)
				.header("content-type", "application/json")
				.body(objectMapper.writeValueAsString(parameters))
				.asJson();
		return response.getBody().toString();

	} catch (UnirestException | JsonProcessingException e) {
		e.printStackTrace();
		throw new RuntimeException(e.getMessage());
	}
}

protected String getUniRestJson(String url, Map<String, Object> parameters) {
	HttpResponse<JsonNode> response = null;
	try {
		response = Unirest.get(url).queryString(parameters).asJson();
		return response.getBody().toString();

	} catch (UnirestException e) {
		e.printStackTrace();
		throw new RuntimeException(e.getMessage());
	}
}
```
---
## Host API Test (postman)
### GET
![](/images/1f308740-c1db-4882-91e3-332500090b30-image.png)

### POST
![](/images/a0f640b4-5baa-476e-9500-2bed29c3f41e-image.png)
