/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
   module.directive('jjWorkflow', ['$timeout', 'jsPlumb', function ($timeout, jsPlumb) {
      var def = {
         restrict: 'AE',
         templateUrl: 'views/templates/workflow.html',
         controller: 'WorkflowCtrl',
         controllerAs: 'workflow',
         link: function(scope, element, attrs){
            var count = 1;
            var node0, node1;
            jsPlumb.ready(function() {
               jsPlumb.Defaults.Container = $("#workflow");
               jsPlumb.draggable($(".workflow .node"), {
                  containment:"workflow"
               });
               node0 = jsPlumb.addEndpoint("node0");
               node1 = jsPlumb.addEndpoint("node1");
               jsPlumb.connect({ source:node0, target:node1 });
            });

            scope.connect = function(s, t){
               jsPlumb.connect({ source:s, target:t });
            };
            scope.addNew = function(){
               var node = jsPlumb.addEndpoint("node" + (count++));
               var nextNode = jsPlumb.addEndpoint("node" + (count++));
               jsPlumb.connect({ source:node, target:nextNode });
            };
         }
      };
      return def;
   }]);
})(window.DirectiveModule);
