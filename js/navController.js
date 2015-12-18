(function(){
    'use strict';

    angular.module('navController', [])
        .controller('navController', navController);

    navController.$inject = ["$location", "listService"];

    function navController($location, listService)
    {
        var nav = this;
        nav.isActive = isActive;
        nav.addList = addList;
        nav.listNames = listService.listNames;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
        function addList(){
            listService.addList(nav.listName);
            nav.listName = '';
        }
    }

}());