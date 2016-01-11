(function () {
    'use strict';

    angular.module('basicController', [])
        .controller('basicController', basicController);

    basicController.$inject = ['listService'];

    function basicController(listService) {
        var bc = this;

        bc.listNames = listService.listNames;

        bc.createTask = createTask;
        bc.minDate = listService.minDate;

        bc.deleteAllInList = deleteAllInList;
        bc.clearArchive = clearArchive;
        bc.archiveChecked = archiveChecked;
        bc.listClick = listClick;
        bc.deleteList = deleteList;
        bc.filterItem = filterItem;

        bc.currentSelect = 'all';
        bc.currentList = 0;

        // define functions
        function createTask() {
            listService.createTask(bc.sometext, bc.dateDue, bc.listType);
            if (bc.currentSelect == 'list') {
                bc.listClick(bc.listType);
            }
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
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
            bc.currentSelect = 'all';
            bc.filterItem();
        }

        function filterItem() {
            bc.doList = [];
            var v = listService.doList;
            for (var i = 0; i < v.length; i++) {
                if (bc.currentSelect == 'all' && v[i].archive == false) {
                    bc.doList.push(v[i]);
                }
                else if (bc.currentSelect == 'archive' && v[i].archive == true) {
                    bc.doList.push(v[i]);
                }
                else if (bc.currentSelect == 'list' && v[i].archive == false && v[i].type == bc.currentList) {
                    bc.doList.push(v[i]);
                }
            }
        }
        bc.filterItem();
    }
}());
