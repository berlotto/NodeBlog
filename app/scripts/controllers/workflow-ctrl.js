'use strict';

/* Controllers */
(function(module) {
   module.controller('WorkflowCtrl', ['$timeout', function($timeout) {
      console.log('Initializing WorkflowCtrl Controller');
      this.nodes = [{name: 'Node 1', type: 'Task'}, {name: 'Node 2', type: 'Task'}];
      this.title = 'Add New';

   }]);
})(window.CtrlModule);