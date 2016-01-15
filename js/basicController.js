(function () {
    'use strict';

    angular.module('basicController', [])
        .controller('basicController', basicController);

    basicController.$inject = ['$filter', 'listService'];

    function basicController($filter, listService) {
        var bc = this;

        bc.listNames = listService.listNames;

        bc.createTask = createTask;
        bc.minDate = listService.minDate;
        bc.doList = $filter('listFilter')(listService.doList);

        bc.deleteAllInList = deleteAllInList;
        bc.clearArchive = clearArchive;
        bc.archiveChecked = archiveChecked;
        bc.listClick = listClick;
        bc.deleteList = deleteList;
        //bc.filterItem = filterItem;

        bc.currentSelect = 'all';
        bc.currentList = 0;

        // define functions
        function createTask() {
            var newName = $filter('capFilter')(bc.sometext);
            listService.createTask(newName, bc.dateDue, bc.listType);
            if (bc.currentSelect == 'list') {
                bc.listClick(bc.listType);
            }
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
            //bc.filterItem();
        }
        //$filter('capFilter')(whateverisfiltered)

        function deleteAllInList(num) {
            listService.deleteAllInList(num);
            //bc.filterItem();
        }

        function clearArchive() {
            listService.clearArchive();
            //bc.filterItem();
        }

        function archiveChecked() {
            listService.archiveChecked();
            //bc.filterItem();
        }

        function listClick(par) {
            if (par == 'all' || par == 'archive') {
                bc.currentSelect = par;
            }
            else {
                bc.currentSelect = 'list';
                bc.currentList = bc.listNames.indexOf(par);
            }
            listService.listClick(par);
        }

        function deleteList(index) {
            listService.deleteList(index);
            bc.currentSelect = 'all';
            //bc.filterItem();
        }

        //function filterItem() {
        //    bc.doList = [];
        //    var v = listService.doList;
        //    for (var i = 0; i < v.length; i++) {
        //        if (bc.currentSelect == 'all' && v[i].archive == false) {
        //            bc.doList.push(v[i]);
        //        }
        //        else if (bc.currentSelect == 'archive' && v[i].archive == true) {
        //            bc.doList.push(v[i]);
        //        }
        //        else if (bc.currentSelect == 'list' && v[i].archive == false && v[i].type == bc.currentList) {
        //            bc.doList.push(v[i]);
        //        }
        //    }
        //}
        //bc.filterItem();
    }
}());
