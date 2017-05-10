'use strict';
var Models = require("../models");


var image = (function(){
	function image(){

	}

	image.prototype.create = function(image,callback){
		Models.image.create(image)
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

	image.prototype.findOne = function(id, callback){
		Models.image.findById(id)
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

	image.prototype.edit = function(id, image, callback){
		Models.image.findById(id)
		.then(function(data){
			return data;
		})
		.then(function(oldData){

			if( image.file_name ){
				oldData.file_name = image.file_name;
			}
			if( image.title ){
				oldData.title = image.title;
			}
			if( image.description ){
				oldData.description = image.description;
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

	image.prototype.delete = function(id,callback){
		Models.image.findById(id)
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


	return image;
})();


module.exports = image;
