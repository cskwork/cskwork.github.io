---
title: "JS, Spring Excel 다운"
description: "javajs"
date: 2021-11-25T04:34:53.190Z
tags: []
---
### 호환성
edge, chrome, firefox

### java
```java
@PostMapping("/getCVExcel.do")
 	public void downloadObjectInfo(HttpServletResponse response,  CVDTO cvDto) throws IOException { 		
		Workbook workbook = new SXSSFWorkbook();
		Sheet sheet = workbook.createSheet("워크시트");
		sheet.setColumnWidth(0, 6000);
		sheet.setColumnWidth(1, 4000);

		int rowIndex = 0;
		Row header = sheet.createRow(0);

		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setBorderBottom(BorderStyle.THIN);

		Font font = ((SXSSFWorkbook) workbook).createFont();
		font.setFontName("Arial");
		font.setFontHeightInPoints((short) 16);
		font.setBold(true);
		headerStyle.setFont(font);

		Cell headerCell = header.createCell(0);
		headerCell.setCellValue("성함");
		headerCell.setCellStyle(headerStyle);

		headerCell = header.createCell(1);
		headerCell.setCellValue("나이");
		headerCell.setCellStyle(headerStyle);
		
		CellStyle style = workbook.createCellStyle();
		style.setWrapText(true);

		Row row = sheet.createRow(1);
		Cell cell = row.createCell(0);
		cell.setCellValue("홍길동");
		cell.setCellStyle(style);

		cell = row.createCell(1);
		cell.setCellValue(20);
		cell.setCellStyle(style);
		
		//File currDir = new File(".");
		//String path = currDir.getAbsolutePath();
		//String fileLocation = path.substring(0, path.length() - 1) + "test.xlsx";

		//FileOutputStream outputStream = new FileOutputStream(fileLocation);
		//workbook.write(outputStream);
		//workbook.close();
        // 컨텐츠 타입과 파일명 지정
		String fileName = "워크시트";
        response.setContentType("application/vnd.ms-excel");
        response.addHeader("Content-Disposition","attachment;filename=\"" + URLEncoder.encode(fileName, "UTF-8") + ".xlsx\"");
        log.debug( "출력 -------------" + fileName );
        response.setHeader("Expires:", "0"); // eliminates browser caching
        workbook.write(response.getOutputStream());
        response.getOutputStream().flush();
        
        workbook.close();		
 		}
```

### js
```js
	excelSave: function(){
		var excelUrl = "/getCVExcel.do";

			var request = new XMLHttpRequest();
            request.open('POST', excelUrl, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.responseType = 'blob';

            request.onload = function(e) {

                $("#div_load_image").hide();

                var filename = "워크시트";
                var disposition = request.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1])
                        filename = decodeURI( matches[1].replace(/['"]/g, '') );
                }
                console.log("FILENAME: " + filename);

                if (this.status === 200) {
                    var blob = this.response;
                    if(window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveBlob(blob, filename);
                    }
                    else{
                        var downloadLink = window.document.createElement('a');
                        var contentTypeHeader = request.getResponseHeader("Content-Type");
                        downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
                        downloadLink.download = filename;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }
                }
            };

            var hiddenBranchId = $( "#hiddenBranchId" ).val();
            var hiddenBranchNameKor = $( "#hiddenBranchNameKor" ).val();
            var hiddenStartDate = $( "#hiddenStartDate" ).val();
            var hiddenEndDate = $( "#hiddenEndDate" ).val();
            var params = 'hiddenBranchId=' + hiddenBranchId + '&hiddenBranchNameKor=' + hiddenBranchNameKor +
                '&hiddenStartDate=' + hiddenStartDate + '&hiddenEndDate=' + hiddenEndDate;
            request.send( params);
	},
```