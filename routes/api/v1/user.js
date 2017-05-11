"use strict";
const usrCtrlr = sys.require("/controllers/user");

/* User Router Class */
const userRouter = (function(){
	function userRouter(){
		// the router itself to export
		this.router = sys.express.Router();

		return this.constructor();
	}

	userRouter.prototype.constructor = function(){
		this.router.get('/:id?',this.getUser);
		this.router.get('/:id/projects',this.getUserProjects);
		this.router.post('/',this.postUser);
		this.router.put('/:id',this.putUser);
		this.router.delete('/:id',this.delUser);
	};

	userRouter.prototype.getUser = function(req,res,next){
		let ctrl = new usrCtrlr();
		let id = (req.params.id) ? req.params.id : null;

		return ctrl.findAction(id)
		.then((response)=>{
			let status = response.error ? 500 : 200;

			return res.status(status).json(response.msg);
		});
	};

	userRouter.prototype.getUserProjects = function(req,res,next){
		let ctrl = new usrCtrlr(true);
		let id = (req.params.id) ? req.params.id : null;

		return ctrl.findProjectsAction(id)
		.then((response)=>{
			let status = response.error ? 500 : 200;

			return res.status(status).json(response.msg);
		});
	};

	userRouter.prototype.postUser = function(req,res,next){
		let ctrl = new usrCtrlr();
		let user = req.body;

		return ctrl.createAction(user)
		.then((response)=>{
			let status = response.error ? 500 : 201;

			return res.status(status).json(response.msg);
		});
	};

	userRouter.prototype.putUser = function(req,res,next){
		let ctrl = new usrCtrlr();
		let id = req.params.id;
		let user = req.body;

		return ctrl.editAction(id,user)
		.then((response)=>{
			let status = response.error ? 500 : 200;

			return res.status(status).json(response.msg);
		});
	};

	userRouter.prototype.delUser = function(req,res,next){
		let ctrl = new usrCtrlr();
		let id = req.params.id;

		return ctrl.deleteAction(id)
		.then((response)=>{
			let status = response.error ? 500 : 200;

			return res.status(status).json(response.msg);
		});
	};

	return userRouter;
})();

module.exports = new userRouter().router;
