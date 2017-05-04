'use strict';
var Models = require("../models");


var project = (function(){
	function project(){

	}

	project.prototype.create = function(project,callback){
		Models.project.create(project)
		.then(function(data){
			return callback({
				error: false,
				msg: data
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	project.prototype.findOne = function(id, callback){
		Models.project.findById(id)
		.then(function(data){
			return callback({
				error: false,
				msg:data,
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	project.prototype.edit = function(id, project, callback){
		Models.project.findById(id)
		.then(function(data){
			return data;
		})
		.then(function(oldData){

			if( project.name ){
				oldData.name = project.name;
			}
			if( project.category ){
				oldData.category = project.category;
			}
			if( project.approved ){
				oldData.approved = project.approved;
			}
			if( project.start_date ){
				oldData.start_date = project.start_date;
			}
			if( project.due_date ){
				oldData.due_date = project.due_date;
			}
			if( project.html ){
				oldData.html = project.html;
			}

			return oldData.save()
		})
		.then(function(newData){
			return callback({
				error: false,
				msg: newData,
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	project.prototype.delete = function(id,callback){
		Models.project.findById(id)
		.then(function(data){
			return data.destroy();
		})
		.then(function(){
			return callback({
				error: false,
				msg: "object deleted",
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	}


	return project;
})();


module.exports = project;
