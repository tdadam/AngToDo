(function () {
    'use strict';

    angular.module('basicDirectives', [])

        .directive('tdNonefound', tdNonefound)
    .directive('tdHeaderrow', tdHeaderrow)
        .directive('tdItem', tdItem)
        .controller('tdItemController', tdItemController);

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
            scope:{},
            restrict: 'A',
            replace: true,
            bindToController:{
                todo: '='
            },
            controller: 'tdItemController as tc',
            templateUrl: './templates/tdItem.html'
        };
    }

    function tdItemController() {
        var tc = this;
        tc.deleteTask = deleteTask;
        tc.filterItem = filterItem;

        function deleteTask(task) {
            listService.deleteTask(task);
            tc.filterItem();
        }
        function filterItem() {
            tc.doList = [];
            var v = listService.doList;
            for (var i = 0; i < v.length; i++) {
                if (tc.currentSelect == 'all' && v[i].archive == false) {
                    tc.doList.push(v[i]);
                }
                else if (tc.currentSelect == 'archive' && v[i].archive == true) {
                    tc.doList.push(v[i]);
                }
                else if (tc.currentSelect == 'list' && v[i].archive == false && v[i].type == tc.currentList) {
                    tc.doList.push(v[i]);
                }
            }
        }
    }

}());
