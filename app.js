"use strict"

const app = angular.module("RandomApp", []);
app.controller("RandomController", function($scope) {
  $scope.title = "Le jeu du random";
  $scope.rules = "Le but du jeu est de trouver un nombre aléatoire compris entre 0 et 1000 en 7 essais";
  $scope.actualLimit = 1;
  $scope.list = [];
  $scope.newInit = function(minNumber, maxNumber) {
    if(((typeof $scope.minNumber) === 'undefined') || ($scope.minNumber === null))
    {
      $scope.minNumber = 0;
      console.log("ok1");
    }
    if(((typeof $scope.maxNumber) === 'undefined') || ($scope.maxNumber === null))
    {
      $scope.maxNumber = 1000;
      console.log("ok2");
    }
    if(((typeof $scope.limit) === 'undefined') || ($scope.limit === null))
    {
      $scope.limit = 7;
      console.log("ok3");
    }
    if($scope.maxNumber>$scope.minNumber){
      $scope.rules = "Le but du jeu est de trouver un nombre aléatoire compris entre "+$scope.minNumber+" et "+$scope.maxNumber+" en "+$scope.limit+" essais";
      $scope.essai = $scope.limit;
      $scope.goodNumber = Math.floor(Math.random() * ($scope.maxNumber-$scope.minNumber) + $scope.minNumber);
      console.log($scope.goodNumber);
      document.getElementById("newNumberInput").setAttribute("max", $scope.maxNumber);
      document.getElementById("newNumberInput").setAttribute("min", $scope.minNumber);
      document.getElementById("selectNumber").classList.toggle( "disabled");
      document.getElementById("init").classList.toggle("disabled");
      document.getElementById("list").classList.toggle("disabled");
      document.querySelector("h3").classList.toggle("disabled");
      document.querySelector("br").remove();
      $scope.error = "";
    }else{
      $scope.error = "Le minimum doit être inférieur au maximum !";
    }
  }

  $scope.testNumber = function(number) {
    if((typeof $scope.goodNumber) === 'number')
    {
      if((typeof number) === 'number'){
        if($scope.actualLimit<$scope.limit){
          if (number < $scope.goodNumber) {
            $scope.list.push("C'est plus ! (Ton nombre : "+number+")");
            $scope.actualLimit++;
            $scope.essai--;
          } else if (number > $scope.goodNumber) {
            $scope.list.push("C'est moins ! (Ton nombre : "+number+")");
            $scope.actualLimit++;
            $scope.essai--;
          } else {
            $scope.list.push("Vous avez trouvé la bonne réponse : "+$scope.goodNumber);
            document.getElementById('reset').classList.toggle("disabled");
            document.getElementById("newNumberInput").setAttribute("disabled", true);
            $scope.essai--;
          }
        } else {
          $scope.list.push("Vous avez perdu, la bonne réponse était : "+$scope.goodNumber+" (Ton nombre : "+number+")");
          document.getElementById('reset').classList.toggle("disabled");
          document.getElementById("newNumberInput").setAttribute("disabled", true);
          $scope.essai--;
        }
      }
    } else {
      alert("Error !")
    }
    $scope.newNumber = null;
  }

  $scope.reset = function() {
    $scope.actualLimit = 1;
    document.getElementById('reset').classList.toggle("disabled");
    $scope.newNumber = null;
    $scope.list = [];
    $scope.essai = $scope.limit;
    $scope.goodNumber = Math.floor(Math.random() * ($scope.maxNumber-$scope.minNumber) + $scope.minNumber);
    console.log($scope.goodNumber);
    document.getElementById("newNumberInput").removeAttribute("disabled");
  }
})
