"use strict";
const Models = sys.getModel();

/* Project Controller Class */
const controllerProject = (function(){
	function controllerProject(plain){
		// for plain behavior os sequelize response
		this.plain = (plain);
	}

	controllerProject.prototype.createAction = function(project){
		return new Promise((Resolve,Reject)=>{

			project.plain = this.plain;
			return Models.project.create(project)
			.then((data)=>{
				return Resolve({
					error: false,
					msg: data
				});
			})
			.catch((err)=>{
				return Reject({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerProject.prototype.findOneAction = function(id){
		return new Promise((Resolve,Reject)=>{
			return Models.project.findById(id)
			.then((data)=>{
				return Resolve({
					error: false,
					msg:data,
				});
			})
			.catch((err)=>{
				return Reject({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerProject.prototype.editAction = function(id, project){
		return new Promise((Resolve,Reject)=>{
			return Models.project.findById(id)
			.then((data)=>{
				return data;
			})
			.then((oldData)=>{

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

				oldData.plain = this.plain;
				return oldData.save()
			})
			.then((newData)=>{
				return Resolve({
					error: false,
					msg: newData,
				});
			})
			.catch((err)=>{
				return Reject({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerProject.prototype.deleteAction = function(id){
		return new Promise((Resolve,Reject)=>{
			return Models.project.findById(id)
			.then((data)=>{

				data.plain = this.plain;
				return data.destroy();
			})
			.then(()=>{
				return Resolve({
					error: false,
					msg: "object deleted",
				});
			})
			.catch((err)=>{
				return Reject({
					error: true,
					msg: err,
				});
			});
		});
	}


	return controllerProject;
})();


module.exports = controllerProject;
