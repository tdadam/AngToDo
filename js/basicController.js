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
        //bc.doList = [{'title':'placeholder', 'type':1, 'done':false}];
        bc.minDate = new Date();
        console.log(bc.minDate);

        bc.listNames = [];
        bc.doList = [];

        // define functions
        function doSomething() {
            bc.doList.push({'title':bc.sometext, 'due':bc.dateDue, 'type':bc.listType, 'done':false});
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
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
    }
}());