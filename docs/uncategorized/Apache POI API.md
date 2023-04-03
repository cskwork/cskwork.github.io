---
title: "Apache POI API"
description: "HORZALIGN"
date: 2021-11-26T07:10:57.806Z
tags: ["POI","excel"]
---
## CODE
### UPDATE
https://thinktibits.blogspot.com/2012/12/Update-Modify-Excel-File-Java-POI-Example.html
https://www.codejava.net/coding/java-example-to-update-existing-excel-files-using-apache-poi
```java

// Add New Row
 public static void main(String[] args) {
 		// GET
        String excelFilePath = "JavaBooks.xls";
         
        try {
            FileInputStream inputStream = new FileInputStream(new File(excelFilePath));
            Workbook workbook = WorkbookFactory.create(inputStream);
 			
            Sheet sheet = workbook.getSheetAt(0);
 
            Object[][] bookData = {
                    {"The Passionate Programmer", "Chad Fowler", 16},
                    {"Software Craftmanship", "Pete McBreen", 26},
                    {"The Art of Agile Development", "James Shore", 32},
                    {"Continuous Delivery", "Jez Humble", 41},
            };
 
            int rowCount = sheet.getLastRowNum();
 			
            // APPEND
            for (Object[] aBook : bookData) {
                Row row = sheet.createRow(++rowCount);
 
                int columnCount = 0;
                 
                Cell cell = row.createCell(columnCount);
                cell.setCellValue(rowCount);
                 
                for (Object field : aBook) {
                    cell = row.createCell(++columnCount);
                    if (field instanceof String) {
                        cell.setCellValue((String) field);
                    } else if (field instanceof Integer) {
                        cell.setCellValue((Integer) field);
                    }
                }
 
            }
 
            inputStream.close();
 
            FileOutputStream outputStream = new FileOutputStream("JavaBooks.xls");
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();
             
        } catch (IOException | EncryptedDocumentException
                | InvalidFormatException ex) {
            ex.printStackTrace();
        }
    }


// Update Existing
// Retrieve the row and check for null
HSSFRow sheetrow = sheet.getRow(row);
if(sheetrow == null){
    sheetrow = sheet.createRow(row);
}
//Update the value of cell
cell = sheetrow.getCell(col);
if(cell == null){
    cell = sheetrow.createCell(col);
}
cell.setCellValue("Pass");
```
![](/images/3133ab5a-e87b-49cd-bf5e-07393bf49555-image.png)
### INIT
``` java
// WORKBOOK
Workbook workbook = new SXSSFWorkbook(); 		
// SHEET
Sheet sheet = workbook.createSheet("이력서");
// ROW
Row headRow = sheet.createRow(0); // 0 = 0th index RowNum
// IndexCnt
int rowIndex = 0;
int cellIndex = 0;
```
### CELL STYLE
``` java
// Create Style for Workbook
CellStyle style1 = workbook.createCellStyle();
style1.setFillForegroundColor(IndexedColors.WHITE.getIndex());
style1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
style1.setAlignment(HorizontalAlignment.CENTER);
style1.setVerticalAlignment(VerticalAlignment.CENTER);
style1.setBorderLeft(BorderStyle.THIN);
style1.setBorderTop(BorderStyle.THIN);
style1.setBorderRight(BorderStyle.THIN);
style1.setBorderBottom(BorderStyle.THIN);
style1.setBottomBorderColor(IndexedColors.BLUE.getIndex());
```

### FONT STYLE
``` java
Font font = ((SXSSFWorkbook) workbook).createFont();
font.setFontName("맑은 고딕");
font.setFontHeightInPoints((short) 16);
font.setBold(true);
style1.setFont(font);
```

### APPLY STYLE TO ROW
``` java
Row headRow = sheet.createRow(0);
headRow.setRowStyle(style1);
```

### CREATE CELL in Row
``` java
// Create cell in Row
Cell headRowCell= headRow.createCell(0);
```

### MERGE CELLS AND ADD STYLE
``` java
// PARAM
// startRow, endRow, startColumn, endColumn

// Merges the cells
CellRangeAddress cellRangeAddress = new CellRangeAddress(row1.getRowNum(), row1.getRowNum() + 1, 0, 1 );
sheet1.addMergedRegion(cellRangeAddress);

// Creates the cell
Cell cell1 = row1.createCell(0);
cell1.setCellValue("성  명");
cell1.setCellStyle(style1);

// Sets the borders to the merged cell
RegionUtil.setBorderTop(BorderStyle.THIN, cellRangeAddress, sheet1);
RegionUtil.setBorderLeft(BorderStyle.THIN, cellRangeAddress, sheet1);
RegionUtil.setBorderRight(BorderStyle.THIN, cellRangeAddress, sheet1);
RegionUtil.setBorderBottom(BorderStyle.THIN, cellRangeAddress, sheet1);
```

## STYLE
### BORDERSTYLE
```java
/**
     * Thin border
     */
    THIN(0x1),

    /**
     * Medium border
     */
    MEDIUM(0x2),

    /**
     * dash border
     */
    DASHED(0x3),

    /**
     * dot border
     */
    DOTTED(0x4),

    /**
     * Thick border
     */
    THICK(0x5),

    /**
     * double-line border
     */
    DOUBLE(0x6),

    /**
     * hair-line border
     */
    HAIR(0x7),

    /**
     * Medium dashed border
     */
    MEDIUM_DASHED(0x8),

    /**
     * dash-dot border
     */
    DASH_DOT(0x9),

    /**
     * medium dash-dot border
     */
    MEDIUM_DASH_DOT(0xA),

    /**
     * dash-dot-dot border
     */
    DASH_DOT_DOT(0xB),

    /**
     * medium dash-dot-dot border
     */
    MEDIUM_DASH_DOT_DOT(0xC),

    /**
     * slanted dash-dot border
     */
    SLANTED_DASH_DOT(0xD);
```

### INDEXEDCOLOR
```java
    BLACK1(0),
    WHITE1(1),
    RED1(2),
    BRIGHT_GREEN1(3),
    BLUE1(4),
    YELLOW1(5),
    PINK1(6),
    TURQUOISE1(7),
    BLACK(8),
    WHITE(9),
    RED(10),
    BRIGHT_GREEN(11),
    BLUE(12),
    YELLOW(13),
    PINK(14),
    TURQUOISE(15),
    DARK_RED(16),
    GREEN(17),
    DARK_BLUE(18),
    DARK_YELLOW(19),
    VIOLET(20),
    TEAL(21),
    GREY_25_PERCENT(22),
    GREY_50_PERCENT(23),
    CORNFLOWER_BLUE(24),
    MAROON(25),
    LEMON_CHIFFON(26),
    LIGHT_TURQUOISE1(27),
    ORCHID(28),
    CORAL(29),
    ROYAL_BLUE(30),
    LIGHT_CORNFLOWER_BLUE(31),
    SKY_BLUE(40),
    LIGHT_TURQUOISE(41),
    LIGHT_GREEN(42),
    LIGHT_YELLOW(43),
    PALE_BLUE(44),
    ROSE(45),
    LAVENDER(46),
    TAN(47),
    LIGHT_BLUE(48),
    AQUA(49),
    LIME(50),
    GOLD(51),
    LIGHT_ORANGE(52),
    ORANGE(53),
    BLUE_GREY(54),
    GREY_40_PERCENT(55),
    DARK_TEAL(56),
    SEA_GREEN(57),
    DARK_GREEN(58),
    OLIVE_GREEN(59),
    BROWN(60),
    PLUM(61),
    INDIGO(62),
    GREY_80_PERCENT(63),
    AUTOMATIC(64);
```

### FILLPATTERNTYPE
``` java
   /**  No background */
     NO_FILL(0),

    /**  Solidly filled */
     SOLID_FOREGROUND(1),

    /**  Small fine dots */
     FINE_DOTS(2),

    /**  Wide dots */
     ALT_BARS(3),

    /**  Sparse dots */
     SPARSE_DOTS(4),

    /**  Thick horizontal bands */
     THICK_HORZ_BANDS(5),

    /**  Thick vertical bands */
     THICK_VERT_BANDS(6),

    /**  Thick backward facing diagonals */
     THICK_BACKWARD_DIAG(7),

    /**  Thick forward facing diagonals */
     THICK_FORWARD_DIAG(8),

    /**  Large spots */
     BIG_SPOTS(9),

    /**  Brick-like layout */
     BRICKS(10),

    /**  Thin horizontal bands */
     THIN_HORZ_BANDS(11),

    /**  Thin vertical bands */
     THIN_VERT_BANDS(12),

    /**  Thin backward diagonal */
     THIN_BACKWARD_DIAG(13),

    /**  Thin forward diagonal */
     THIN_FORWARD_DIAG(14),

    /**  Squares */
     SQUARES(15),

    /**  Diamonds */
     DIAMONDS(16),

    /**  Less Dots */
     LESS_DOTS(17),

    /**  Least Dots */
     LEAST_DOTS(18);
```

HORZALIGN
``` java
    /**
     * The horizontal alignment is general-aligned. Text data is left-aligned.
     * Numbers, dates, and times are rightaligned. Boolean types are centered.
     * Changing the alignment does not change the type of data.
     */
    GENERAL,

    /**
     * The horizontal alignment is left-aligned, even in Rightto-Left mode.
     * Aligns contents at the left edge of the cell. If an indent amount is specified, the contents of
     * the cell is indented from the left by the specified number of character spaces. The character spaces are
     * based on the default font and font size for the workbook.
     */
    LEFT,

    /**
     * The horizontal alignment is centered, meaning the text is centered across the cell.
     */
    CENTER,

    /**
     * The horizontal alignment is right-aligned, meaning that cell contents are aligned at the right edge of the cell,
     * even in Right-to-Left mode.
     */
    RIGHT,

    /**
     * Indicates that the value of the cell should be filled
     * across the entire width of the cell. If blank cells to the right also have the fill alignment,
     * they are also filled with the value, using a convention similar to centerContinuous.
     * <p>
     * Additional rules:
     * <ol>
     * <li>Only whole values can be appended, not partial values.</li>
     * <li>The column will not be widened to 'best fit' the filled value</li>
     * <li>If appending an additional occurrence of the value exceeds the boundary of the cell
     * left/right edge, don't append the additional occurrence of the value.</li>
     * <li>The display value of the cell is filled, not the underlying raw number.</li>
     * </ol>
     */
    FILL,

    /**
     * The horizontal alignment is justified (flush left and right).
     * For each line of text, aligns each line of the wrapped text in a cell to the right and left
     * (except the last line). If no single line of text wraps in the cell, then the text is not justified.
     */
    JUSTIFY,

    /**
     * The horizontal alignment is centered across multiple cells.
     * The information about how many cells to span is expressed in the Sheet Part,
     * in the row of the cell in question. For each cell that is spanned in the alignment,
     * a cell element needs to be written out, with the same style Id which references the centerContinuous alignment.
     */
    CENTER_SELECTION,

    /**
     * Indicates that each 'word' in each line of text inside the cell is evenly distributed
     * across the width of the cell, with flush right and left margins.
     * <p>
     * When there is also an indent value to apply, both the left and right side of the cell
     * are padded by the indent value.
     * </p>
     * <p> A 'word' is a set of characters with no space character in them. </p>
     * <p> Two lines inside a cell are separated by a carriage return. </p>
     */
    DISTRIBUTED;
```

### VERTICALALIGN
```java
   /**
     * The vertical alignment is aligned-to-top.
     */
    TOP,

    /**
     * The vertical alignment is centered across the height of the cell.
     */
    CENTER,

    /**
     * The vertical alignment is aligned-to-bottom. (typically the default value)
     */
    BOTTOM,

    /**
     * <p>
     * When text direction is horizontal: the vertical alignment of lines of text is distributed vertically,
     * where each line of text inside the cell is evenly distributed across the height of the cell,
     * with flush top and bottom margins.
     * </p>
     * <p>
     * When text direction is vertical: similar behavior as horizontal justification.
     * The alignment is justified (flush top and bottom in this case). For each line of text, each
     * line of the wrapped text in a cell is aligned to the top and bottom (except the last line).
     * If no single line of text wraps in the cell, then the text is not justified.
     *  </p>
     */
    JUSTIFY,

    /**
     * <p>
     * When text direction is horizontal: the vertical alignment of lines of text is distributed vertically,
     * where each line of text inside the cell is evenly distributed across the height of the cell,
     * with flush top
     * </p>
     * <p>
     * When text direction is vertical: behaves exactly as distributed horizontal alignment.
     * The first words in a line of text (appearing at the top of the cell) are flush
     * with the top edge of the cell, and the last words of a line of text are flush with the bottom edge of the cell,
     * and the line of text is distributed evenly from top to bottom.
     * </p>
     */
    DISTRIBUTED;
```