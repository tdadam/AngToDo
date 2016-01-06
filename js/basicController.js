(function () {
    'use strict';

    angular.module('basicController', ['ngStorage'])
        .controller('basicController', basicController);

    basicController.$inject = ['listService'];

    function basicController(listService) {
        var bc = this;

        bc.doList = listService.doList;
        bc.displayFilter = bc.doList;

        bc.listNames = listService.listNames;

        bc.createTask = createTask;
        bc.minDate = listService.minDate;

        bc.deleteTask = deleteTask;
        bc.deleteAllInList = deleteAllInList;
        bc.clearArchive = clearArchive;
        bc.archiveChecked = archiveChecked;
        bc.listClick = listClick;
        bc.deleteList = deleteList;
        bc.filterItem = filterItem;

        bc.currentSelect = 'all';
        bc.currentList = 0;

        //bc.$storage = $localStorage;

        // define functions
        function createTask() {
            listService.createTask(bc.sometext, bc.dateDue, bc.listType);
            if (bc.currentSelect == 'list') {
                bc.listClick(bc.listType);
            }
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
        }

        function deleteTask(task) {
            listService.deleteTask(task);
            bc.filterItem();
        }

        function deleteAllInList(num) {
            listService.deleteAllInList(num);
            bc.filterItem();
        }

        function clearArchive() {
            listService.clearArchive();
            bc.filterItem();
        }

        function archiveChecked() {
            listService.archiveChecked();
            bc.filterItem();
        }

        (function () {
            listService.tooLate();
        })();

        function listClick(par) {
            if (par == 'all' || par == 'archive') {
                bc.currentSelect = par;
            }
            else {
                bc.currentSelect = 'list';
                bc.currentList = bc.listNames.indexOf(par);
            }
            bc.filterItem();
        }

        function deleteList(index) {
            listService.deleteList(index);
            bc.filterItem();
            bc.currentSelect = 'all';
        }

        function filterItem() {
            bc.displayFilter = [];
            for (var i = 0; i < bc.doList.length; i++) {
                if (bc.currentSelect == 'all' && bc.doList[i].archive == false) {
                    bc.displayFilter.push(bc.doList[i]);
                }
                else if (bc.currentSelect == 'archive' && bc.doList[i].archive == true) {
                    bc.displayFilter.push(bc.doList[i]);
                }
                else if (bc.currentSelect == 'list' && bc.doList[i].archive == false && bc.doList[i].type == bc.currentList) {
                    bc.displayFilter.push(bc.doList[i]);
                }
            }
        }
    }
}());
