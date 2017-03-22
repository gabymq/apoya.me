'use strict';
var Models = require("../models");


var user = (function(){
	function user(){

	}

	user.prototype.create = function(user,callback){
		Models.user.create(user)
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

	user.prototype.find = function(id, callback){
		var oneOrAll;
		var where;

		if(id){
			oneOrAll = "findOne";
			where = {
				where: {
					id: id
				}
			};
		} else {
			oneOrAll = "findAndCountAll";
			where = {};
		}


		Models.user[oneOrAll](where)
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

	user.prototype.edit = function(id, user, callback){
		Models.user.findById(id)
		.then(function(data){
			return data;
		})
		.then(function(oldData){

			if(user.email){
				oldData.email = user.email;
			}
			if(user.password){
				oldData.password = user.password;
			}
			if(user.role){
				oldData.role = user.role;
			}
			if(user.rank){
				oldData.rank = user.rank;
			}
			if(user.info){
				oldData.info = user.info;
			}
			if(user.page){
				oldData.page = user.page;
			}
			if(user.image){
				oldData.image = user.image;
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

	user.prototype.delete = function(id,callback){
		Models.user.findById(id)
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

	return user;
})();


module.exports = user;
