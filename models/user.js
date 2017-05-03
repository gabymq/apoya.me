'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    id: {
        	allowNull: false,
        	defaultValue: DataTypes.UUIDV4,
        	primaryKey: true,
        	type: DataTypes.UUID,
        },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    info: DataTypes.STRING,
    page: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      	user.hasMany(models.project,{foreignKey: "user_id"});
      }
    }
  });
  return user;
};
