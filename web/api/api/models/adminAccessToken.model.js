var Sequelize = require('sequelize')

var adminAccessToken = sequelize.define(
  'admin_access_token',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "admin_user",
        key: "id"
      }
    },
    accesstoken: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = adminAccessToken