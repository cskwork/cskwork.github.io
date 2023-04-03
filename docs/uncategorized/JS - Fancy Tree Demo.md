---
title: "JS - Fancy Tree Demo"
description: ""
date: 2022-12-22T06:53:17.664Z
tags: []
---
```html
<!-- collapse all trees in the Fancytree tree when the 'collapse' button is clicked -->
<style>
  /* 배경색 변경 */
 .search-term {
    background-color:yellow;
  }
 /* change the background color of selected nodes to yellow */

</style>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.fancytree/2.38.2/skin-win8/ui.fancytree.min.css" integrity="sha512-MDYrzSajmNeJrqH4YNzdIEhhQgFKSa06KJYmcbfK3dEwvureKSjAYlcS1fgnuUb0YPwEFTg+NAFaK6sOE6hF6Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.fancytree/2.38.2/jquery.fancytree-all-deps.min.js" integrity="sha512-8Fstaj+d8Fha0qzgW/bGQpyG4NcVSYcmflfYOzhV1z/4/SYwf96rqrANH+lUmO7ZSq9WgRDYgASFiiq20bgK7g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
  function collapseAllTrees() {
    // traverse the tree and collapse all nodes
    $("#tree").fancytree("getRootNode").visit(function(node) {
        node.setExpanded(false);
        node.setSelected(false);
        node.removeClass("search-term");
	    //node.setTitle("<span style='color: black;'>" + node.title + "</span>");
    });
  }
  function searchTree() {
    // get the search term
    var searchTerm = $("#search-input").val();

     // filter the tree with the search term and highlight the search terms as blue
    $("#tree").fancytree("getTree").filterNodes(searchTerm, {
      autoExpand: true,
    });
     // search the tree for the search term and highlight the search terms
    $("#tree").fancytree("getTree").visit(function(node) {
       if (node.title.includes(searchTerm)) {
	        // 텍스색만 변경
	        //node.setTitle("<span style='color: blue;'>" + node.title + "</span>");
	        // 배경색 변경
	        node.addClass("search-term");
      }else{
	      	 //node.setTitle("<span style='color: black;'>" + node.title + "</span>");
	      	node.removeClass("search-term");
      }
    });





  }
</script>

<input type="text" id="search-input" placeholder="검색...">
<button id="search-button">검색</button>

<button id="collapse-button">초기화</button>

<div id="tree" style="height: 300px;"></div>

<script>
  $("#tree").fancytree({
  	activeVisible: true, // Make sure, active nodes are visible (expanded)
  	autoActivate: true, // Automatically activate a node when it is focused using keyboard
  	checkbox: true, // Show check boxes
  	icon: false, // Display node icons
  	selectMode: 3, // 1:single, 2:multi, 3:multi-hier
  	debugLevel: 4, // 0:quiet, 1:errors, 2:warnings, 3:infos, 4:debug
  	filter: {
		//highlight: true,   // Highlight matches by wrapping inside 
		mode: "hide"       // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
  	},
    source: [
      {
        title: "융합대학",
        key: "1",
        folder: true,
        children: [{
          title: "학과명1",
          key: "1.1"
        }, {
          title: "학과명2",
          key: "1.2"
        }]
      },
      {
        title: "간호대학",
        key: "2",
        folder: true,
        children: [{
          title: "학과명1",
          key: "2.1"
        }, {
          title: "학과명2",
          key: "2.2"
        }]
      },
      {
        title: "대학",
        key: "3",
        folder: true,
        children: [{
          title: "융합전공1",
          key: "3.1"
        }, {
          title: "융합전공2",
          key: "3.2"
        }]
      }
    ]
  });

  $("#collapse-button").on("click", function() {
	  $("#search-input").val("");
	     collapseAllTrees();
  });
  $("#search-button").on("click", function() {
	if($("#search-input").val()){
		searchTree();
	}else{
		collapseAllTrees();
	}
      
  });
  $("#search-input").on("keyup", function() {
  	if($("#search-input").val()){
  		searchTree();
  	}else{
  		collapseAllTrees();
  	}
  });

</script>
```