
// Register `phoneList` component, along with its associated controller and template
angular.
	module('itemList').
	component('itemList', {
		templateUrl: 'item-list/item-list.template.html',
		controller: ['$http', 'orderByFilter', function ItemListController($http, orderBy) {
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

				var favItems = [];

				self.toggleFav = function(item) {
					var id = item.id;
					if (item.active) {
						self.items[id].active = false;
						// Remove fav
						for (var i = 0; i < favItems.length; i++) {
							if (favItems[i].id === id) {
								favItems.splice(i, 1);
								break;
							}
						}
					} else {
						self.items[id].active = true;
						// Add fav
						var newItem = {
							"id": item.id,
							"title": item.title,
							"img": item.img,
							"active": item.active
						}
						favItems.push(newItem)
					}
				}
			}

		}]
	});
