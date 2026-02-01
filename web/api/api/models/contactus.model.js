var Sequelize = require('sequelize')

var contactus = sequelize.define(
  'contactus',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
    phone_number: Sequelize.TEXT,
    email: Sequelize.TEXT,
    message: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = contactus