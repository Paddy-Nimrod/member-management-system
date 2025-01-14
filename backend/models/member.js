'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      membershipStartDate: DataTypes.DATE,
      MembershipEndDate: DataTypes.DATE,
      membershipStatus: DataTypes.TEXT,
      profilePicture: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};