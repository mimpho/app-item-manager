
// Register `phoneList` component, along with its associated controller and template
angular.
	module('itemList').
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/modalFavs', {
			templateUrl: 'favs/favs.template.html',
			controller: 'favs/favsCtrl'
		});
	}]).
	component('itemList', {
		templateUrl: 'item-list/item-list.template.html',
		controller: ['$http', 'orderByFilter', 'favsService', function ItemListController($http, orderBy, favsService) {
			var self = this;
			var page = 5;
			self.orderProp = 'title';
			self.toggleInput = false;
			self.toggleModal = false;
/*
	TODO No utilizar $http, sino REST como en https://docs.angularjs.org/tutorial/step_13
 */
			$http.get('items.json').then(function(response) {
				// On JSON items loaded
				// Sort items by title
				self.jsonItems = orderBy(response.data, "title");
				// Id assignemt to items
				self.jsonItems.map(function(el,i) {
					el.id = i;
				});
				self.pagination();
				self.favs();
			});

			self.pagination = function () {

 				self.items = self.jsonItems.slice(0,page);

				if (page >= self.jsonItems.length) {
					// Hide paginator
					self.lastPage = true;
				} else {
					// Paging
 					page += 5;
 				}
			}

			self.favs = function () {

				self.toggleFav = function(item) {
					self.items = favsService.init(item, self.items);
				}
			}

		}]
	});
