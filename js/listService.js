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
        ls.listNames = [];

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
            ls.listNames.push(listName);
        }
        function createTask(title, due, type){
            var index = ls.listNames.indexOf(type);
            ls.doList.push({'title':title, 'due':due, 'type':index, 'done':false, 'past':false, 'archive':false})
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
            var checker = ls.doList;
            for (var i = 0; i < checker.length; i++){
                if (checker[i].archive && !checker[i].done){
                    checker[i].archive = false;
                }
                else if (checker[i].archive && checker[i].done){
                    checker.splice(i, 1);
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
