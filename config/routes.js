"use strict";

/*
 * ---------------------------------------------------
 * Config Routes file
 * ---------------------------------------------------
 *	-	This file lets you re-map URI requests to specific router files.
 * 	-	As long this file returns a plan object this will work well.
 *
 *  ---------------------------------------------------
 *	Warning:
 * ---------------------------------------------------
 *	-	Dont Touch Reserved Routes Object Keys just values.
 *
 *
 * ---------------------------------------------------
 *	Notice:
 * ---------------------------------------------------
 *	-	Reserved route "default" will be exposed as "/".
 *
 *	- 	If loader can't find a route file in Routes Path it will be Skipped
 *		and you will be noticed in console  about that.
 */
module.exports = {
	/* ------- RESERVED ROUTES -------- */
	"default" : "/rendered/index",

	/* -------  ROUTES -------- */
	"api/v1/user": 	"/api/v1/user",
	"api/v1/project": "/api/v1/project",
	"api/v1/image": 	"/api/v1/image",
};
