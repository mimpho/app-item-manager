'use strict';

angular.
	module('favs').
	service('favsService', function() {

		var self = this;
		var favItems = [];

		self.init = function(item, items) {
			var id = item.id;
			if (item.active) {
				items[id].active = false;
				// Remove fav
				for (var i = 0; i < favItems.length; i++) {
					if (favItems[i].id === id) {
						favItems.splice(i, 1);
						break;
					}
				}
			} else {
				items[id].active = true;
				// Add fav
				var newItem = {
					"id": item.id,
					"title": item.title,
					"img": item.img,
					"active": item.active
				}
				favItems.push(newItem)
			}
			return items;
		}
	});