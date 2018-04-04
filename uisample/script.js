	// create the module and name it scotchApp

  function logout() {
    localStorage.removeItem("uname");
    localStorage.removeItem("org_uname");
    localStorage.removeItem("admin");
    //alert(localStorage.getItem("uname"));
     window.location.href = "login.html";
                   // Function returns the product of a and b
}
function func()
    {
     alert("mapping done");
     

    }


	var scotchApp = angular.module('myapp', ['ngRoute','ui.grid']);


	// configure our routes

	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/users', {
				templateUrl : 'pages/users.html',
				controller  : 'usersontroller'
			})

			// route for the contact page
			.when('/datasets', {
				templateUrl : 'pages/datasets.html',
				controller  : 'datasetscontroller'
			})

			.when('/models', {
				templateUrl : 'pages/models.html',
				controller  : 'modelscontroller'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view

   
    var x = localStorage.getItem("uname");
    if(x === null)
    {
      alert("you need to sign-in first!");
       window.location = "login.html";
    }
    else
    {
      $scope.message = 'welcome ' + x;
    }
		
	});

	scotchApp.controller('usersontroller', function($scope, $http, $window) {
   
    var x = localStorage.getItem("org_uname");
    var y = localStorage.getItem("uname");
    $http({
        method: "GET",
        url: "http://mlteam.ddns.net/user?organisationId="+x,
        dataType: 'json',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function successCallback(response) {
   //alert(JSON.stringify(response.data));
   $scope.myData = response.data;
  
  }, function errorCallback(response) {
    alert("Sorry couldn't connect!");
  
  });
  /*$scope.edit1 = function(index){
    alert(index);
    $rootScope.id1 = index;
     window.location.href = "http://localhost:8080/frontendui/update.html";

  };*/
  $scope.delete1 = function(index) {
    var con = confirm("are you sure you want to delete?");
    if(con == true)
    {
    $http({
        method: "DELETE",
        url: "http://mlteam.ddns.net/user/"+index,
        dataType: 'json',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function successCallback(response) {
   alert("deleted");
   $window.location.reload();
  
  }, function errorCallback(response) {
    alert("Sorry couldn't delete");
  
  });
    }

    };
	});




	scotchApp.controller('datasetscontroller', function($scope, $http, $window, $log, uiGridConstants) {

    //document.getElementById("body1").innerHTML = "<select> <option value='volvo'>Volvo</option>    <option value='saab'>Saab</option> <option value='mercedes'>Mercedes</option> <option value='audi'>Audi</option> </select>";
     
  $scope.gridOptions = {
  };
  $scope.myObj1 = {};
  $scope.name = "";
  $scope.colsname = "";
  $scope.format = "";
  $scope.col_names = "";

    var x = localStorage.getItem("org_uname");
    var y = localStorage.getItem("uname");
    $http({
        method: "GET",
        url: "http://mlteam.ddns.net/dataset?organisationId="+x,
        dataType: 'json',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function successCallback(response) {
   //alert(JSON.stringify(response.data));
   $scope.myData = response.data;
   
  
  }, function errorCallback(response) {
    alert("Sorry couldn't connect!!!!!!");
  
  });


    $scope.display_meta = function(index,filename){
      $scope.name = filename;
     $scope.myObj1 = {
    "column1_name": {
        "type":"numeric",
        "count":"12",
        "missing":"1",
        "errors":"0",
        "mean":"0",
        "median":"0",
           },
    "column2_name": {
        "type":"string",
        "count":"11",
        "missing":"0",
        "errors":"0"
           }
    };
    $scope.col_names = Object.keys(myObj1);
    //alert(JSON.stringify(myObj1));
    };

   		$scope.delete1 = function(index) {
        alert(index);
    var con = confirm("are you sure you want to delete?");
    if(con == true)
    {
    $http({
        method: "DELETE",
        url: "http://mlteam.ddns.net/dataset/"+index,
        dataType: 'json',
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function successCallback(response) {
   alert("deleted");
   $window.location.reload();
  
  }, function errorCallback(response) {
    alert("Sorry couldn't delete");
  
  });
    }
		    
    };
  
var result = 0;
  
    $scope.edit1 = function(index) {
      $scope.roData = [];
    
          $http
                    .get(
                        "http://mlteam.ddns.net/dataset?datasetId="+index)
                    .success(

                        function(data){
                          
                          $scope.roData = angular.fromJson(data[0].filedata);
                          $scope.gridOptions.columnDefs = new Array();
                         for(var key in $scope.roData[0])
                          {
                           
                          $scope.gridOptions.columnDefs.push({ field: key });
                          } 
                          $scope.gridOptions.data = $scope.roData;
                          $scope.gridApi.grid.refresh();
                          modal.style.display = "block";

                      });

      };
      var obj = "";
      

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
        $scope.filename = document.getElementById('file1').files[0].name;
      var name = document.getElementById('file1').files[0].name;
        obj = {
      "userId": localStorage.getItem("userId"),
    "filename": $scope.filename,
    "organisationId": localStorage.getItem("org_uname"),
    "filedata": $scope.content
    };
    alert($scope.content);
    var s = String($scope.content);
    var res = s.split('\r')[0];
    var res1 = res.split(",");
    $scope.colsname = res1;
    $scope.format = ['col1','col2','col3','col4'];
    $("#myModal").modal('show');


    /*var x = "COLUMN MAPPING <br> <form onsubmit='func()'>";

    //id.getElementById("cols").innerHTML = "<form> <input type='radio' name='dd' value='dd'>hi </form>";
    for (var i = 0; i < res1.length; i++) {
       x = x + res1[i] + "-";
       //x = x +"<input type='radio' name='"+i+"' id='"+i+"0' value='string' checked> String <input type='radio' name='"+i+"' id='"+i+"1' value='number'> Number<input type='radio' name='"+i+"' id='"+i+"2' value='date'> Date"; 
       x = x + "<select><option value='col1'>col1</option><option value='col2'>col2</option><option value='col3'>col3</option><option value='--'>--</option></select>";
       x = x + "<br>";
    }
    x = x + "<input class='btn-primary' type='submit'></form>";
    document.getElementById("cols").innerHTML = x;
   /* var res = $http.post('http://mlteam.ddns.net/dataset', obj);
    res.success(function(data, status, headers, config) {
      alert("entered successfully");
      $window.location.reload();
    });
    res.error(function(data, status, headers, config) {
      alert("entered not successfully");
    });*/
        
    };
    $scope.uploadfile = function()
    {
      var obj1 = {};
       for (var i = 0;i<$scope.colsname.length;i++) {
        var j = $scope.format[i];
       // alert();
       //obj1.push({ 'j' : document.form1[i].value });
         obj1[j] = document.form1[i].value;
       };
       alert(JSON.stringify(obj1));
       var res = $http.post('http://mlteam.ddns.net/dataset', obj);
    res.success(function(data, status, headers, config) {
      alert("entered successfully");
      $window.location.reload();
    });
    res.error(function(data, status, headers, config) {
      alert("entered not successfully");
    });

    };
	});



	//directive

	scotchApp.directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();
                
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});




	scotchApp.controller('modelscontroller', function($scope) {
		$scope.message = 'models';
    $scope.inputs = [];
     $scope.addfield=function(){
    $scope.inputs.push({})
  };
  $scope.submit=function(){
    var x = []
    for (var i = $scope.inputs.length - 1; i >= 0; i--) {
      x.push($scope.inputs[i].value);
    }
    alert(x);
  }
	});

if(localStorage.getItem("admin")===null)
{
  document.getElementById("users1").style.visibility="hidden";
}
