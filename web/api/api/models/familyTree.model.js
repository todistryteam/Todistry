var Sequelize = require('sequelize')
var env = require('../../config/environment')
const sequelize = require('../../config/database');

var familyTree = sequelize.define(
  'family_tree',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
    },
    memberid: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "family_member",
        key: "id"
      }
  },
    treeName: Sequelize.TEXT,
    slug: Sequelize.TEXT,
    shareDescription: Sequelize.TEXT,
    familyCode: Sequelize.TEXT,
	  isPublished: Sequelize.ENUM('Published', 'UnPulished'),
    status: Sequelize.ENUM('Active', 'Inactive'),
    isDeleted: Sequelize.ENUM('No', 'Yes'),
    treeCode: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = familyTree