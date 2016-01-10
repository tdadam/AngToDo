(function () {
    'use strict';

    angular.module('listService', ['ngStorage'])
        .service('listService', listService);

    listService.$inject = ['$localStorage'];

    function listService($localStorage) {
        var ls = this;

        ls.doList = $localStorage.doList ? $localStorage.doList : [];

        ls.addList = addList;
        ls.listNames = $localStorage.listNames ? $localStorage.listNames : [];

        ls.createTask = createTask;
        ls.minDate = new Date();
        var earliest = ls.minDate.getTime();

        ls.deleteTask = deleteTask;
        ls.archiveChecked = archiveChecked;
        ls.clearArchive = clearArchive;
        ls.deleteAllInList = deleteAllInList;
        ls.deleteList = deleteList;
        ls.storage = storage;

        storage();

        function storage() {
            for (var i = 0; i < ls.doList.length; i++){
                if (ls.doList[i].due != null){
                    var newDate = new Date(ls.doList[i].due);
                    var taskDue = newDate.getTime();
                    if (earliest > taskDue) {
                        ls.doList[i].past = true;
                    }
                }
            }
            $localStorage.doList = ls.doList;
            $localStorage.listNames = ls.listNames;
        }

        function addList(listName){
            for (var i = 0; i < ls.listNames.length; i++){
                if (ls.listNames[i] == listName){
                    return;
                }
            }
            ls.listNames.push(listName);
            storage();
        }
        function createTask(title, due, type){
            var index = ls.listNames.indexOf(type);
            ls.doList.push({'title':title, 'due':due, 'type':index, 'done':false, 'past':false, 'archive':false})
            storage();
        }
        function deleteTask(task){
            var index = ls.doList.indexOf(task);
            ls.doList.splice(index, 1);
            storage();
        }
        function archiveChecked(){
            for (var i = 0; i < ls.doList.length; i++){
                (ls.doList[i].done) ? ls.doList[i].archive = true : ls.doList[i].archive = false;
            }
            storage();
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
            storage();
        }

        function deleteAllInList(num){
            for (var i = 0; i < ls.doList.length; i++){
                if (ls.doList[i].type == num){
                    ls.doList.splice(i, 1);
                    i--
                }
            }
            storage();
        }
        function deleteList(num){
            ls.deleteAllInList(num);
            for (var i = 0; i < ls.doList.length; i++){
                if (ls.doList[i].type > num){
                    ls.doList[i].type -= 1;
                }
            }
            ls.listNames.splice(num, 1);
            storage();
        }
    }
}());
