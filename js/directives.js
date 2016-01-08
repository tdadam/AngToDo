(function () {
    'use strict';

    angular.module('basicDirectives', [])

        .directive('tdNonefound', tdNonefound)
    .directive('tdHeaderrow', tdHeaderrow)
        .directive('tdItem', tdItem);

    function tdNonefound() {
        return {
          restrict: 'EA',
            replace: true,
            template: '<tr><td></td><td class="nameCol"><i>No items in this list</i></td><td></td><td></td></tr>'
        };
    }
    function tdHeaderrow() {
        return {
            restrict: 'A',
            template: '<th class="doneCheck">Complete?</th><th class="nameCol">Name</th><th class="dateCol">Due Date</th><th class="removeTask">Delete</th>'
        };
    }
    function tdItem(){
        return {
            restrict: 'A',
            replace: true,
            scope:{
                todo: '='
            },
            templateUrl: './templates/tdItem.html'
        };
    }
}());
