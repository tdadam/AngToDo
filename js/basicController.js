(function () {
    'use strict';

    angular.module('basicController', ['ngStorage'])
        .controller('basicController', basicController);

    basicController.$inject = ['listService'];

    function basicController(listService) {
        var bc = this;

        bc.doList = listService.doList;

        bc.listNames = listService.listNames;

        bc.createTask = createTask;
        bc.minDate = listService.minDate;

        bc.deleteTask = deleteTask;
        bc.archiveChecked = archiveChecked;
        bc.clearArchive = clearArchive;
        bc.tooLate = tooLate;
        bc.listClick = listClick;
        bc.deleteAllInList = deleteAllInList;
        bc.deleteList = deleteList;

        bc.currentSelect = 'all';
        bc.currentList = 0;

        //bc.$storage = $localStorage;

        // define functions
        function createTask() {
            listService.createTask(bc.sometext, bc.dateDue, bc.listType);
            if(bc.currentSelect == 'list'){
                bc.listClick(bc.listType);
            }
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
        }
        function deleteTask(task){
            listService.deleteTask(task);
        }
        function archiveChecked(){
            listService.archiveChecked();
        }
        function clearArchive(){
            listService.clearArchive();
        }
        function tooLate(){
            listService.tooLate();
        }
        bc.tooLate();

        function listClick(par){
            if (par == 'all' || par == 'archive'){
                bc.currentSelect = par;
            }
            else {
                bc.currentSelect = bc.listNames.indexOf(par);
            }
        }
        function deleteAllInList(num){
            listService.deleteAllInList(num);
        }
        function deleteList(index){
            listService.deleteList(index);
        }
    }
}());
