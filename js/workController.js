(function () {
    'use strict';

    angular.module('workController', [])
        .controller('workController', workController);

    workController.$inject = [];

    function workController() {

        // list everything
        var wc = this;
        wc.doSomething = doSomething;
        wc.doList = [{'title':'work_placeholder', 'type':1, 'done':false}];
        wc.listType = 'work';

        // options in the dropdown for item type
        //wc.data = {
        //    availableOptions: [
        //        {id: '1', name: 'Work'},
        //        {id: '2', name: 'School'},
        //        {id: '3', name: 'Family'},
        //        {id: '4', name: 'Shopping'}
        //    ]
        //};

        // define functions
        function doSomething() {

            wc.doList.push({'title':wc.sometext, 'due':wc.dateDue, 'type':wc.listType, 'done':false});
            //alert(wc.sometext + " " + wc.listType);
            wc.dateDue = '';
            wc.sometext = '';
        }
    }
}());