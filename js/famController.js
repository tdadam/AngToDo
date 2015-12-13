(function () {
    'use strict';

    angular.module('famController', [])
        .controller('famController', famController);

    famController.$inject = [];

    function famController() {

        // list everything
        var fc = this;
        fc.doSomething = doSomething;
        fc.doList = [{'title':'fam_placeholder', 'type':1, 'done':false}];
        fc.listType = 'family';

        // options in the dropdown for item type
        //fc.data = {
        //    availableOptions: [
        //        {id: '1', name: 'Work'},
        //        {id: '2', name: 'School'},
        //        {id: '3', name: 'Family'},
        //        {id: '4', name: 'Shopping'}
        //    ]
        //};

        // define functions
        function doSomething() {
            fc.doList.push({'title':fc.sometext, 'due':fc.dateDue, 'type':fc.listType, 'done':false});
            //alert(fc.sometext + " " + fc.listType);
            fc.dateDue = '';
            fc.sometext = '';
        }
    }
}());