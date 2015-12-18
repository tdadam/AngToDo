(function () {
    'use strict';

    angular.module('listService', [])
        .service('listService', listService);

    listService.$inject = [];

    function listService() {
        var ls = this;
        //ls.$storage = $localStorage;

        ls.doList = [];

        ls.addList = addList;
        ls.listCount = 1;
        ls.currentList = 0;
        ls.listNames = ["testing", "2"];

        ls.createTask = createTask;
        ls.minDate = new Date();
        var earliest = ls.minDate.getTime();

        ls.deleteTask = deleteTask;
        ls.archiveChecked = archiveChecked;
        ls.clearArchive = clearArchive;
        ls.tooLate = tooLate;

        function addList(listName){
            for (var i = 0; i < ls.listNames.length; i++){
                if (ls.listNames[i] == listName){
                    return;
                }
            }
            ls.listCount++;
            ls.currentList = ls.listCount-1;
            ls.listNames.push(listName);
        }
        function createTask(title, due, type){
            ls.doList.push({'title':title, 'due':due, 'type':type, 'done':false, 'past':false, 'archive':false})
        }
        function deleteTask(task){
            var index = ls.doList.indexOf(task);
            ls.doList.splice(index, 1);
        }
        function archiveChecked(){
            for (var i = 0; i < ls.doList.length; i++){
                (ls.doList[i].done) ? ls.doList[i].archive = true : ls.doList[i].archive = false;
            }
        }
        function clearArchive(){
            for (var i = 0; i < ls.doList.length; i++){
                if (ls.doList[i].archive) {
                    ls.doList.splice(i, 1);
                    i--;
                }
            }
        }
        function tooLate(){
            for (var i = 0; i < ls.doList.length; i++){
                var taskDue = ls.doList[i].due.getTime();
                (earliest > taskDue) ? ls.doList[i].past = true : ls.doList[i].past = false;
            }
        }
    }
}());