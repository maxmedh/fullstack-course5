(function () {
'use strict';


angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;



  showList.transfer = function (itemIndex) {
    var a = showList.items[itemIndex].name;
    var b = showList.items[itemIndex].quantity;
    ShoppingListCheckOffService.addItem2(a,b);
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  showList.items = ShoppingListCheckOffService.getItems();

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var newList = this;

  newList.items2 = ShoppingListCheckOffService.getItems2();



}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Cakes",
      quantity: "3"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];

  var items2 = [

  ];

  service.addItem2 = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items2.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
  service.getItems2 = function () {
    return items2;
  };

}



})();
