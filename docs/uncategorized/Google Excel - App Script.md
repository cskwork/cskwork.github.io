---
title: "Google Excel - App Script"
description: "change the value for each A column cell 1,2,3 if C column cell 1,2,3 changes"
date: 2022-12-27T23:20:41.584Z
tags: []
---
change the value for each A column cell 1,2,3 if C column cell 1,2,3 changes
```js
function onEdit(e) {
  let workingSheetName = '금일 작업 예정';
  // Get the range of the cell that was edited
  var range = e.range;
  
  // Get the sheet that the cell belongs to
  var sheet = range.getSheet();
  
  // Get the name of the sheet
  var sheetName = sheet.getSheetName();
  
  // If the name of the sheet is "Sheet1", continue
  if (sheetName == workingSheetName) {
    // Get the column number of the cell that was edited
    var column = range.getColumn();
    
    // If the column number is 3 (i.e. column C), change the value of the corresponding cell in column B
    if (column == 3) {
      var row = range.getRow();
      var bCell = sheet.getRange(row, 1);
      if(range.getValue()){
        bCell.setValue('O');
      }else{
        bCell.setValue('');
      }
    }
  }
}
```

google excel changes cell value if unmodified for certain time
```js
function checkTime() {
  let workingSheetName = '금일 작업 예정';
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Get the name of the sheet
  var sheetName = sheet.getSheetName();

  // If the name of the sheet is "Sheet1", continue
  if (sheetName == workingSheetName) {
    // Get the data range for cells A2 to A4
    var range = sheet.getRange("A2:A4");
  
    // Get the values in the range
    var values = range.getValues();
  
    // Loop through the values in the range
    for (var i = 0; i < values.length; i++) {
      // Get the value in the current cell
      var value = values[i][0];
    
      // Get the note for the current cell
      var note = range.getCell(i+1, 1).getNote();
      
      // If the note is not set, set it to the current date
      if (note == "") {
        range.getCell(i+1, 1).setNote(TODAY());
      }
      // If the note is set, check if one days have passed
      else {
        // Calculate the number of days between the last edit date and the current date
        var numDays = DAYS(note, TODAY());
      
        // If one days have passed, change the value of the cell
        if (numDays >= 1) {
          range.getCell(i+1, 1).setValue("X");
          range.getCell(i+1, 1).setNote("");
        }
      }
    }
  }
}

```