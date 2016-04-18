(function (angular) {
	'use strict';

	var todoApp = angular.module('todoApp');
	//注册一个服务,把数据保存到H5的localStorage中做数据持久化。
	todoApp.service('Storage', ['$window', function($window) {

		//生成新ID
		function getId() {
			//解决避免重复的办法：递归检测
			var newId = Math.random();
			for(var i = 0; i < myTodos.length; i++) {
				if(myTodos[i].id == newId) {
					getId();
					break;
				}
			}
			if(i == myTodos.length) {
				return newId;
			}
		}

		//获取localStorage存储对象
		var storage = $window.localStorage;

		//获取存在localStorage内的todos数据
		var myTodos = JSON.parse(storage.getItem('my_todos') || "[]");

		//获取todos数据方法
		this.get = function() {
			return myTodos;
		}

		//将数据保存到localStorage
		this.save = function() {
			storage.setItem("my_todos", JSON.stringify(myTodos));
		}

		//添加任务方法
		this.add = function(input) {
			var id = getId();
			myTodos.push({
				id: id,
				text: input,
				completed: false
			});
			this.save();
		}

		this.remove = function(current) {
			var index = myTodos.indexOf(current);
			myTodos.splice(index, 1);
			this.save();
		}

		this.hasCompleted = function() {
			return myTodos.some(todo => todo.completed);
		}

		this.clearCompleted = function() {
			var unCompletedItems = [];
			myTodos.forEach(todo => {
				if(!todo.completed) {
					unCompletedItems.push(todo);
				}
			});
			myTodos = unCompletedItems;
			this.save();
			return myTodos;
		}

		this.allCompleted = function(checked) {
			myTodos.forEach(todo => {todo.completed = checked});
		}

	}])
})(angular);
