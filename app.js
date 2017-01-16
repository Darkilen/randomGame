"use strict"
const app = angular.module("RandomApp", []);
app.controller("RandomController", function($scope) {
  $scope.title = "Le jeu du random";
  $scope.actualLimit = 0;
  $scope.newInit = function(minNumber, maxNumber) {
    if((typeof $scope.minNumber) === 'undefined')
    {
      $scope.minNumber = 0;
    }
    if((typeof $scope.maxNumber) === 'undefined')
    {
      $scope.maxNumber = 1000;
    }
    if((typeof $scope.limit) === 'undefined')
    {
      $scope.limit = 7;
    }
    console.log($scope.minNumber, $scope.maxNumber, $scope.limit);
    $scope.goodNumber = Math.floor(Math.random() * $scope.maxNumber + $scope.minNumber);
    console.log($scope.goodNumber);
    document.getElementById('selectNumber').className = "activated form-horizontal";
    document.getElementById('init').className = "disabled"
  }
  $scope.testNumber = function(number) {
    console.log($scope.limit);
    if((typeof $scope.goodNumber) === 'number')
    {
      if($scope.actualLimit<$scope.limit){
        if (number < $scope.goodNumber) {
          console.log("C'est plus !");
          $scope.actualLimit++;

        } else if (number > $scope.goodNumber) {
          console.log("C'est moins !");
          $scope.actualLimit++;
        } else {
          console.log("Vous avez trouvé la bonne réponse :", $scope.goodNumber);
          document.getElementById('reset').className = "activated btn btn-default";
        }
      }
      else {
        console.log("Vous avez perdu, la réponse était :", $scope.goodNumber);
        document.getElementById('reset').className = "activated btn btn-default";
      }
    }
    else {
      alert("Error !")
    }
    $scope.newNumber = null;
  }
  $scope.reset = function() {
    $scope.actualLimit = 0;
    document.getElementById('reset').className = "disabled";
    $scope.newNumber = null;
  }
})
