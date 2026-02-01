var Sequelize = require('sequelize')
var env = require('../../config/environment')
const sequelize = require('../../config/database');

var user = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    middleName: Sequelize.TEXT,
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
	  mobile: Sequelize.TEXT,
	  mobileOtp: Sequelize.TEXT,
    otpExpiry: Sequelize.DATE,
	  gender: Sequelize.ENUM('M', 'F', 'O'),
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    birthDate: Sequelize.TEXT,
    facebookId: Sequelize.TEXT,
    googleId: Sequelize.TEXT,
    resetPasswordCode: Sequelize.TEXT,
    image: { 
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('image') != '') {
          const contentValue =
            env.user_image +
            this.getDataValue('image')
          return contentValue
        } else {
          return ''
        }
      }
    },
    treeId: Sequelize.INTEGER,
    countryCode: Sequelize.TEXT,
    latitude: Sequelize.TEXT,
    longitude: Sequelize.TEXT,
    location: Sequelize.TEXT,
    city: Sequelize.TEXT,
    state: Sequelize.TEXT,
    zipcode: Sequelize.TEXT,
    legalName: Sequelize.TEXT,
    legalEmail: Sequelize.TEXT,
    isOnline: Sequelize.ENUM('Online', 'Offline'),
    isEmailVerify: Sequelize.ENUM('Verified', 'UnVerified'),
    isMobileVerify: Sequelize.ENUM('Verified', 'UnVerified'),
    status: Sequelize.ENUM('Active', 'Inactive'),
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //acceptance_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = user