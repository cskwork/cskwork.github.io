---
title: "AMCHART4 메뉴얼"
description: "core.js 가 1순위로 로딩되어야함. svg엔진, 주요 기능, 인터페이스 요소 등이 들어 있음. am4core 가 글로벌 객체 / 루트 부모임am4core.create(container, chart_type_class).container - chartdivchart"
date: 2022-02-04T10:01:21.738Z
tags: []
---
###  1 패키지 넣기
```html
<script src="http://cdn.amcharts.com/lib/4/core.js"></script>
<script src="http://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="http://cdn.amcharts.com/lib/4/maps.js"></script>
```
- core.js 가 1순위로 로딩되어야함. svg엔진, 주요 기능, 인터페이스 요소 등이 들어 있음. 
- am4core 가 글로벌 객체 / 루트 부모임

### 2 신규 차트 생성 (JS 생성 방식)
am4core.create(container, chart_type_class).
container - chartdiv
chart_type_class - am4charts.PieChart

### 2 신규 차트 생성 (JSON 방식)
am4core.createFromConfig(config, container, chart_type_class).

```html
<!-- Chart code -->
<style>
/* 차트 크기 조정*/
#chartdiv {
  width: 100%;
  height: 500px;
}

</style>
<script>
am4core.ready(function() {
  // Set Themes
  am4core.useTheme(am4themes_animated);

  // Create Chart Container
  var chart = am4core.create("chartdiv", am4charts.XYChart);

  // Generate random data
  var data = [];
  var value = 50;
  for(var i = 0; i < 300; i++){
    var date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(i);
    value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    data.push({date:date, value: value});
  }

  chart.data = data;

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}"

  series.tooltip.pointerOrientation = "vertical";

  // Add Cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series;
  chart.cursor.xAxis = dateAxis;

  // Add Scrollbar
  //chart.scrollbarY = new am4core.Scrollbar();
  chart.scrollbarX = new am4core.Scrollbar();

}); // end am4core.ready()
</script>

<!-- HTML -->
<div id="chartdiv"></div>
```
![](/images/03fcb9e8-394f-4e5b-9ab1-d4dd18448a17-image.png)

### 출처
https://www.amcharts.com/demos-v4/