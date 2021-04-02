(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.message = "";
    $scope.textbox = "";


$scope.check = function () {
  var strCopy = $scope.textbox.split(",");
  if(strCopy == ""){
    $scope.message = "Please enter data first";
  }
  if(strCopy.length > 3){
     $scope.message = "Too much!";
   }
  if(strCopy != "" && strCopy.length <= 3){
     $scope.message = "Enjoy!";
   }
  };
}
})();
