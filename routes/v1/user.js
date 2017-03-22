'use strict';
var express = require('express');
var router = express.Router();
var usrCtrlr = require("../../controllers/user");

router
.get("/:id?",function(req,res,next){
	var ctrl = new usrCtrlr();
	var id = (req.params.id) ? req.params.id : null;

	ctrl.find(id,function(response){
		var status = response.error ? 500 : 200;

		return res.status(status).json(response.msg);
	});
})
.post("/",function(req,res,next){
	var ctrl = new usrCtrlr();
	var user = req.body;

	ctrl.create(user,function(response){
		var status = response.error ? 500 : 201;

		return res.status(status).json(response.msg);
	});
})
.put("/:id",function(req, res, next){
	var ctrl = new usrCtrlr();
	var id = req.params.id;
	var user = req.body;

	ctrl.edit(id,user,function(response){
		var status = response.error ? 500 : 200;


		return res.status(status).json(response.msg);
	});
})
.delete("/:id",function (req,res,next) {
	var ctrl = new usrCtrlr();
	var id = req.params.id;

	ctrl.delete(id,function(response){
		var status = response.error ? 500 : 200;

		return res.status(status).json(response.msg);
	});

});

module.exports = router;
