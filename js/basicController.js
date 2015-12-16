(function () {
    'use strict';

    angular.module('basicController', [])
        .controller('basicController', basicController);

    basicController.$inject = [];

    function basicController() {



        // list everything
        var bc = this;
        bc.doSomething = doSomething;
        bc.clearDone = clearDone;
        bc.deleteTask = deleteTask;
        bc.addList = addList;
        bc.tooLate = tooLate;
        bc.minDate = new Date();
        bc.testDate = new Date('2015-10-17');
        var earliest = bc.minDate.getTime();

        bc.listNames = [];
        bc.doList = [{'title':'testing', 'due':bc.testDate, 'type':bc.listType, 'done':false, 'past':false}];

        // define functions
        function doSomething() {
            bc.doList.push({'title':bc.sometext, 'due':bc.dateDue, 'type':bc.listType, 'done':false, 'past':false});
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
            bc.tooLate();
        }
        function clearDone(){
            bc.doList = bc.doList.filter(function(item){
                return !item.done
            })
        }
        function deleteTask(task){
            var index = bc.doList.indexOf(task);
            bc.doList.splice(index, 1);
        }
        function addList(){

        }
        function tooLate(){
            for (var i = 0; i < bc.doList.length; i++){
                var taskDue = bc.doList[i].due.getTime();
                (earliest > taskDue) ? bc.doList[i].past = true : bc.doList[i].past = false;
            }
        }
        bc.tooLate();
    }
}());