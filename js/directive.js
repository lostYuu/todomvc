(function (angular) {
	'use strict';
//与界面相关而与业务逻辑无关，有DOM操作，这些功能常定义为指令以供重复使用。

	var todoApp = angular.module('todoApp');

	//定义一个指令，实现在双击一个任务时自动获取焦点
	todoApp.directive('autoFocus', [function() {
		return {
			link: function(scope, element, attributes) {
				element.on('dblclick', function() {
					angular.element(this).find('input').eq(1)[0].focus();
				});
			}
		}
	}]);
})(angular);
