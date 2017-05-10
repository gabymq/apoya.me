'use strict';
module.exports = function(sequelize, DataTypes) {
  var image = sequelize.define('image', {
    id:{
    	allowNull: false,
    	defaultValue: DataTypes.UUIDV4,
    	primaryKey: true,
    	type: DataTypes.UUID,
    },
    file_name: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    project_id: DataTypes.UUID,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        image.belongsTo(models.project,{foreignKey: "project_id"});
      }
    }
  });
  return image;
};
