(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItem: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  list.checkList = function () {
  	return typeof list.foundItem !== 'undefined' && list.foundItem.length === 0
    };
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  
  narrow.narrowIt = function (searchInput) {
    if(searchInput){
     var promise = MenuSearchService.getMatchedMenuItems(searchInput);
     promise.then(function (response) {
     narrow.found = response;
     console.log("Found data: ", narrow.found);
   })
   .catch(function (error) {
     console.log(error);
   })
}
   else {
   		narrow.found = [];
   	}

 };

 narrow.removeItem = function (index) {
   narrow.found.splice(index, 1);
 }

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchInput) {
	return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
		var foundItems = [];
		var menuLength = response.data.menu_items.length;
		for (var i = 0; i < menuLength; i++) {
			var item = response.data.menu_items[i];
			if (item.description.indexOf(searchInput) !== -1) {
				foundItems.push(item);
			}
		};
		return foundItems;
    });
  };
}

})();
