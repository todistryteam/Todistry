var Sequelize = require('sequelize')
var env = require('../../config/environment')
const sequelize = require('../../config/database');

var admin = sequelize.define(
  'admin_user',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    mobile: Sequelize.TEXT,
    password: Sequelize.TEXT,
    gender: Sequelize.ENUM('Male', 'Female'),
    image: { 
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('image') != '') {
          const contentValue =
            env.admin_user_image +
            this.getDataValue('image')
          return contentValue
        } else {
          return ''
        }
      }
    },
    status: Sequelize.ENUM('Active', 'Inactive'),
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = admin