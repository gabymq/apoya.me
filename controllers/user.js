"use strict";
const Models = sys.getModel();

/* User Controller Class */
const controllerUser = (function(){
	function controllerUser(plain){
		// for plain behavior os sequelize response
		this.plain = (plain);
	}

	controllerUser.prototype.createAction = function(user){
		return new Promise((Res,Rej)=>{

			user.plain = true;
			return Models.user.create(user)
			.then((data)=>{
				return Res({
					error: this.plain,
					msg: data
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerUser.prototype.findAction = function(id){
		return new Promise((Res,Rej)=>{
			let oneOrAll;
			let where;

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

			where.plain = this.plain;

			return Models.user[oneOrAll](where)
			.then((data)=>{
				return Res({
					error: false,
					msg:data,
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerUser.prototype.findProjectsAction = function(id){
		return new Promise((Res,Rej)=>{
			let oneOrAll;
			let where = {
				plain:this.plain,
				where: {
					id: id
				},
				include: [{
					model: Models.project,
					where: {
						user_id: id
					},
				}]
			};

			where.plain = true;
			return Models.user.findAll(where)
			.then((data)=>{
				return Res({
					error: false,
					msg:data,
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerUser.prototype.editAction = function(id, user){
		return new Promise((Res,Rej)=>{
			return Models.user.findById(id)
			.then((data)=>{
				return data;
			})
			.then((oldData)=>{

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

				oldData.plain = true;
				return oldData.save()
			})
			.then((newData)=>{
				return Res({
					error: false,
					msg: newData,
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerUser.prototype.deleteAction = function(id){
		return new Promise((Res,Rej)=>{
			return Models.user.findById(id)
			.then((data)=>{

				data.plain = true;
				return data.destroy();
			})
			.then(()=>{
				return Res({
					error: false,
					msg: "object deleted",
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	}

	return controllerUser;
})();


module.exports = controllerUser;
