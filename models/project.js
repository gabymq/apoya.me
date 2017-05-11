'use strict';
module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define('project', {
    id: {
    	allowNull: false,
    	defaultValue: DataTypes.UUIDV4,
    	primaryKey: true,
    	type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    approved: {
    	defaultValue: false,
    	type: DataTypes.BOOLEAN
    },
    start_date: {
    	defaultValue: DataTypes.NOW,
    	type: DataTypes.DATE
    },
    due_date: {
    	defaultValue: new Date( new Date().getFullYear(), new Date().getMonth()+1, 1),
    	type: DataTypes.DATE
    },
    html: DataTypes.TEXT,
    user_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        project.belongsTo(models.user,{foreignKey: "user_id"});
      }
    }
  });
  return project;
};
