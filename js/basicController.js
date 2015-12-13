(function () {
    'use strict';

    angular.module('basicController', [])
        .controller('basicController', basicController);

    basicController.$inject = [];

    function basicController() {

        // list everything
        var bc = this;
        bc.doSomething = doSomething;
        bc.doList = [{'title':'placeholder', 'type':1, 'done':false}];

        // options in the dropdown for item type
        //bc.data = {
        //    availableOptions: [
        //        {id: '1', name: 'Work'},
        //        {id: '2', name: 'School'},
        //        {id: '3', name: 'Family'},
        //        {id: '4', name: 'Shopping'}
        //    ]
        //};

        // define functions
        function doSomething() {
            bc.doList.push({'title':bc.sometext, 'due':bc.dateDue, 'type':bc.listType, 'done':false});
            //alert(bc.sometext + " " + bc.listType);
            bc.listType = '';
            bc.dateDue = '';
            bc.sometext = '';
        }
    }
}());