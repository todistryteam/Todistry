var Sequelize = require('sequelize')

var subscribe = sequelize.define(
  'subscribe',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    email: Sequelize.TEXT,
    status: Sequelize.ENUM('Active', 'Inactive'),
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = subscribe