(function () {
    'use strict';

    angular.module('myFilters', [])
        .filter('capFilter', capFilter)
        .filter('listFilter', listFilter);

    listFilter.$inject = ['listService'];

    function capFilter() {
        return function (input) {
            var stringArr = input.split(" ");
            var result = "";
            var cap = stringArr.length;
            for (var x = 0; x < cap; x++) {
                stringArr[x].toLowerCase();
                if (x === cap - 1) {
                    result += stringArr[x].substring(0, 1).toUpperCase() + stringArr[x].substring(1);
                } else {
                    result += stringArr[x].substring(0, 1).toUpperCase() + stringArr[x].substring(1) + " ";
                }
            }
            return result;
        }
    }

    function listFilter(listService) {
        return function () {
            var v = listService.doList;
            var newList = [];
            for (var i = 0; i < v.length; i++) {
                if (listService.currentSelect == 'all' && v[i].archive == false) {
                    newList.push(v[i]);
                }
                else if (listService.currentSelect == 'archive' && v[i].archive == true) {
                    newList.push(v[i]);
                }
                else if (listService.currentSelect == 'list' && v[i].archive == false && v[i].type == listService.currentList) {
                    newList.push(v[i]);
                }
            }
            return newList;
        }
    }
})();