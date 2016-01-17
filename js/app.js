(function(){
    'use strict';

    angular.module('basicApp', [
            "ui.router",
            "myFilters",
            "navController",
            "basicController",
            "listService",
            "basicDirectives",
            "ngAnimate"
        ])

        .config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {

                // define all app states (pages)
                $stateProvider
                    .state("home", {
                        url: "/home",
                        templateUrl: "templates/home.html",
                        controller: "basicController as bc"
                    })
                    //.state("help", {
                    //    url: "/help",
                    //    templateUrl: "templates/help.html"
                    //})
                    .state("about", {
                        url: "/about",
                        templateUrl: "templates/about.html"
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise("/home");
            }]);

}());