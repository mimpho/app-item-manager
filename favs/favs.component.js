
// Register `phoneList` component, along with its associated controller and template
angular.
	module('favs').
	component('favs', {
		templateUrl: 'favs/favs.template.html',
		controller: ['favsService', function favsController(favsService) {
			var self = this;
			var page = 5;
			self.orderProp = 'title';
			self.toggleInput = false;
			self.toggleModal = false;
/*
			self.favs = function () {

				self.toggleFav = function(item) {
					self.items = favsService.init(item, self.items);
				}
			}
*/
		}]
	});
