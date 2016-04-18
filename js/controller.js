(function (angular) {
	'use strict';

	var todoApp = angular.module('todoApp');
	//注册一个控制器
	todoApp.controller('MainController', [
		'$scope',
		'$location',
		'Storage',
		function($scope, $location, Storage) {
		$scope.input = '';
		// 初始化当前正在编辑的元素的ID
		$scope.currentEditingId = 0;

		//获取todos数据
		$scope.todos = Storage.get();

		//=====================暴露行为========================
		//编辑事件
		$scope.edit = function(current) {
			$scope.currentEditingId = current.id;
		}

		//保存事件
		$scope.save = function() {
			Storage.save();
			$scope.currentEditingId = 0;
		}

		//添加任务事件
		$scope.add = function(){
			if(!$scope.input) {
				return;
			}
			Storage.add($scope.input);
			$scope.input = '';
		}

		//删除任务
		$scope.remove = Storage.remove;

		//判断todos中有没有已经完成的条目
		/*$scope.hasCompleted = function() {
			var hasCompleted = false;
			$scope.todos.forEach(todo => {
				if(todo.completed) {
					hasCompleted = true;
				}
			});
			return hasCompleted;
		}*/
		$scope.hasCompleted = Storage.hasCompleted;

		//清空所有已经完成的项目
		$scope.clearCompleted = function() {
			//一旦在服务里面给myTodos重新赋值，就会与控制器中的$scope.todos失去来联系，只能返回myTodus再重新赋值给$scope.todos使他们再次指向同一块内存区域。
			$scope.todos = Storage.clearCompleted();
		}


		//全选操作
		$scope.checkAll = false;
		$scope.allCompleted = function() {
			Storage.allCompleted($scope.checkAll);
		}

		//筛选数据
		$scope.filterData = {};
		$scope.changeFilter = function(newFilter) {
			$scope.filterData = newFilter;
		}


		//通过锚点来确定是哪个状态

		//$watch可以监视属性、方法的返回值，但是要在$scope上！
		$scope.location = $location;
		$scope.$watch('location.url()', function(now, old) {
			switch(now) {
				case "/completed":
					$scope.filterData.completed = true;
					break;
				case "/active":
					$scope.filterData.completed = false;
					break;
				default :
					$scope.filterData = {};
			}
		});


/*		//监视完成的状态，如果发生改变则立马同步存储到localStorage中保存（为何不能实现？）
		$scope.todos.forEach(todo => {
			$scope.$watch('todo.completed', function(now, old) {
				console.log(now);
				Storage.save();
			});
		});*/

			//换种方法：每次切换完成状态都保存一次：
			$scope.toggleCompleted = function () {
				Storage.save();
			}


	}]);
})(angular);
