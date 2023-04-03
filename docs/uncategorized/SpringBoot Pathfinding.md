---
title: "SpringBoot Pathfinding"
description: "Final"
date: 2021-12-02T06:07:43.631Z
tags: []
---
YAML 파일
```yml
upload:
  path:
    imagePath: /home/upload/imgPath/
    excelPath: /home//upload/excelPath/
```

자바 파일
```java
    @Value("${upload.path.excelPath}")
    private String excelPath;
    
    String path =excelPath+"/PRINT.xlsx";    
```

``` java
    	String path1 = ".";

    	File file1 = new File(path1);
    	String absolutePath = file1.getAbsolutePath();
    	
    	String canonPath = file1.getCanonicalPath();
    	InputStream ClassPathResource = new ClassPathResource("test").getInputStream();
    	log.debug("canonPath{} ", canonPath);
    	log.debug("ClassPathResource{} ", ClassPathResource);
    	//System.out.println(""absolutePath);
    	
    	  //String uploadPath = System.getProperty("user.dir")+"\\excelUploads";
    	  
    	ClassLoader classLoader = getClass().getClassLoader();
    	//File getClassLoader = new File(classLoader.getResource("PRINT.xlsx"));
    	//log.debug("getClassLoader{} ", classLoader.getAbsolutePath());
         
    	Path resourceDirectory = Paths.get("src","main","resources");
    	String resourceDirPath = resourceDirectory.toFile().getAbsolutePath();
    	log.debug("resourceDirectory{} ", resourceDirPath);
         //headers.setContentType(mType);
         //entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
         
    	// C:\Users\사용자\git\dani\src\main\webapp\static 
    	log.debug("absolutePath{} ", absolutePath);

    	String imagePath = request.getServletContext().getRealPath("excelUploads");
    	log.debug("imagePath{} ", imagePath);
   
    	//Set<String> imagePath2 = request.getServletContext().getResourcePaths("excelUploads");
    	//log.debug("imagePath2{} ", imagePath2);
    	
    	//String imagePath3 = request.getServletContext().getContext("/");
    	//log.debug("imagePath3{} ", imagePath3);
    	
    	// DEV ONLY
    	String path =excelPath+"/PRINT.xlsx";
    	log.debug("excelPath{} ", excelPath);
```