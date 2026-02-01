var Sequelize = require('sequelize')
var env = require('../../config/environment')
const sequelize = require('../../config/database');

var familyMember = sequelize.define(
  'family_member',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    treeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "family_tree",
          key: "id"
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
    },
    profileId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        }
    },
    middleName: Sequelize.TEXT,
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
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
    birthDate:Sequelize.TEXT,
    gender: Sequelize.ENUM('M', 'F', 'O'),
    birthDay: Sequelize.ENUM('A', 'D'),
    parentId: Sequelize.INTEGER,
    motherId: Sequelize.INTEGER,
    treeLevel: Sequelize.INTEGER,
    is_foster_parent: Sequelize.INTEGER,
    is_foster_child: Sequelize.INTEGER,
    is_adopted_parent: Sequelize.INTEGER,
    is_adopted_child: Sequelize.INTEGER,
    is_god_parent: Sequelize.INTEGER,
    is_god_child: Sequelize.INTEGER,
    is_secondary_parent: Sequelize.INTEGER,
    is_secondary_child: Sequelize.INTEGER,
    spouses: {
      type: Sequelize.STRING, // Data type for this column
      allowNull: true,        // Allow NULL values
    },
    childrens: {
      type: Sequelize.STRING, // Data type for this column
      allowNull: true,        // Allow NULL values
    },
    halfsibling: {
      type: Sequelize.STRING, // Data type for this column
      allowNull: true,        // Allow NULL values
    },  
    fathers: {
      type: Sequelize.STRING, // Data type for this column
      allowNull: true,        // Allow NULL values
    },
    mothers: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    memberType: Sequelize.ENUM('Parents','Siblings','Child','Spouse'),
    parentType:Sequelize.TEXT,
    spouseType:Sequelize.TEXT,
    childType:Sequelize.TEXT,
	 // siblingType: Sequelize.ENUM('sameParent','diffrentParent'),
    status: Sequelize.ENUM('Active', 'Inactive'),
    // kishan sir
    isDeleted: Sequelize.ENUM('Yes', 'No'),

    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // kishan sir
    undoAction: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    relationShipToAdmin: {
      type: Sequelize.STRING,
      allowNull: true
    },
    
    nameSuffix: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nickNameSuffix: {
      type: Sequelize.STRING,
      allowNull: true
    },
    siblingType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    siblingType2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true
    },
    blog: {
      type: Sequelize.STRING,
      allowNull: true
    },
    homePhone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    steetNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    aptNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    workPhone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthFirstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthLastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nickName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthCity: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthState: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthPlace: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: true
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true
    },
    interests: {
      type: Sequelize.STRING,
      allowNull: true
    },
    activities: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bioNotes: {
      type: Sequelize.TEXT, // Can also use Sequelize.STRING, but TEXT allows for longer input
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = familyMember