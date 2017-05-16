"use strict";

const fs        = sys.fs;
const path      = sys.path;
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
// const env       = process.env.NODE_ENV || 'development';
const config    = sys.getDbConfig();
const sequelize	= (config.use_env_variable) ? new Sequelize(process.env[config.use_env_variable]) : new Sequelize(config.database, config.username, config.password, config);
let db        	= {};

fs
.readdirSync(__dirname)
.filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(function(file) {
	let model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
