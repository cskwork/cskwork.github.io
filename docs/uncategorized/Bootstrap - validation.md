---
title: "Bootstrap - validation"
description: "https&#x3A;//eastflag.co.kr/frontend/html5_api/html5-bootstrap-validation/"
date: 2022-03-13T09:55:45.508Z
tags: []
---
## 이슈
1 동적으로 구현해야할 form의 경우 bootstrap validation이 안먹힐 수 있다. 그럼 다른 방안 필요

2 수동으로 구현

3 수동으로 동적 구현

## Bootstrap validation
```html
<html>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
<body>
<div class="container">
  <p class="h1">Register</p>
  <form id="needs-validation" novalidate>
    <div class="form-group">
      <label for="id">아이디</label>
      <input type="text" class="form-control" id="id"
             placeholder="아이디" required minlength="4">
      <div class="valid-feedback">
        Looks good!
      </div>
      <div class="invalid-feedback">
        아이디는 4자 이상 입력해야 합니다.
      </div>
    </div>
    
    <div class="form-group">
      <label for="name">성명</label>
      <input type="text" class="form-control" id="name"
             placeholder="성명" required pattern="^[가-힣]{2,5}$">
      <div class="valid-feedback">
        Great!
      </div>
      <div class="invalid-feedback">
        한글로 시작하는 2~5 이내로 입력하세요.
      </div>
    </div>
    
    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" class="form-control" id="email"
             placeholder="E-mail" required>
      <div class="valid-feedback">
        Looks good!
      </div>
      <div class="invalid-feedback">
        이메일 형식으로 입력해야 합니다.
      </div>
    </div>

    <div class="form-group mt-3">
      <button class="btn btn-primary" type="submit">Register!</button>
    </div>
  </form>
</div>  
</body>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  "use strict";
  window.addEventListener("load", function() {
    var form = document.getElementById("needs-validation");
    form.addEventListener("submit", function(event) {
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      }
      
      // 서버 연동 처리
    }, false);
  }, false);
}());
</script>
</html>
```

## 수동 validation
```html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>JSP Page</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js" integrity="sha512-poSrvjfoBHxVw5Q2awEsya5daC0p00C8SKN74aVJrs7XLeZAi+3+13ahRhHm8zdAFbI2+/SUIrKYLvGBJf9H3A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
  	$(document).ready(function() {
    var form = $("#form");
    var username = $("#idusername");
    var password = $("#idpassword");
    //On Submitting
    form.submit(function(event) {
        if (validateName() && validatePassword()) {
            return true;
        } else {
                                   event.preventDefault(); 
             alert('Please fill them correctly.');
            return false;
        }
    });

    function validateName() {

        if (username.val().length < 1) {
            return false;
        }

        else {
            return true;
        }
    }

    function validatePassword() {


        if (password.val().length < 5) {
            return false;
        }

        else {
            return true;
        }
    }
});
    </script>
</head>
<body>
    <h1>Hello World!</h1>
    <form id="form" method="post" action="final.jsp">
    Student name :<br><input type="text" value="" name="username"   id="idusername"><br><br>
    Password :<br><input type="text" value="" name="password" id="idpassword"><br><br>
    <input type="submit" value="Register" />
</form>
</body>
</html>
```

## 동적 구현
```html
<html lang="">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic Javascript and jQuery Validaton Demo</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>

	<div class="contaienr">
		<div class="row" style="margin-top: 30px;">
			<div class="col-md-5 col-sm-offset-3">
				<form action="" onsubmit="return checkData()" name="myform">
					<div class="form-group">
						<input type="text" id="" name="name" class="form-control" />
					</div>
					<div class="form-group">
						<input type="text" id="" name="name1" class="form-control" />
					</div>
					<div class="form-group">
						<input type="text" id="" name="name2" class="form-control" />
					</div>
					<div class="form-group">
						<input type="text" id="" name="name3" class="form-control" />
					</div>
					<div class="form-group">
						<input type="text" id="" name="name4" class="form-control" />
					</div>
					<div class="form-group">
						<button class="btn btn-primary btn-sm">Send Button</button>
					</div>
				</form>
			</div>
		</div>
	</div>



	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery.js"></script>
	<!-- Bootstrap JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

	<script>
		function checkData() {
			event.preventDefault();
			var fields = ["name", "name1", "name2", "name3", "name4"];

			var i, l = fields.length
			var fieldname;
			var not_empty_check = '';
			for (i = 0; i < l; i++) {
				fieldname = fields[i];
        //console.log(document.forms["myform"][fieldname].value);
				if (document.forms["myform"][fieldname].value != "") {
					not_empty_check = 1;
				}
			}
      console.log(not_empty_check);
			if(not_empty_check < 1) {
				alert("fields are missing");
			}
			return false;
	}
</script>
</body>
</html>
```
## 출처
https://eastflag.co.kr/frontend/html5_api/html5-bootstrap-validation/

https://codeinhouse.com/how-to-do-dynamic-form-validation-using-jquery-and-javascript/

http://jsfiddle.net/wfccR/