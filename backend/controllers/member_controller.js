const path = require("path")
const fs = require("fs");
const { Member } = require("../models");

exports.createNewMember = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const dateOfBirth = req.body.dateOfBirth;
  const membershipStartDate = req.body.membershipStartDate;
  const membershipEndDate = req.body.MembershipEndDate;
  const membershipStatus = req.body.membershipStatus;
  const notes = req.body.notes;

  const profilePicture = req.file ? req.file.path : null;

  const member = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    dateOfBirth: dateOfBirth,
    membershipStartDate: membershipStartDate,
    membershipEndDate: membershipEndDate,
    membershipStatus: membershipStatus,
    profilePicture: profilePicture,
    notes: notes,
  };

  try {
    Member.create(member).then(() => {
      res.status(200).json({ message: "Member created successfully." });
    });
  } catch (error) {
    res
      .status(500)
      .send("Member could not be created. Please try again.", error);
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();

    if (!members || members.length === 0) {
      return res.status(200).json({ message: "No members found", members: [] });
    }
    return res.status(200).json({ members: members });
  } catch (error) {
    return res.status(500).json({
      message: "Bad request. Members could not be fetched.",
      error: error.message,
    });
  }
};

exports.getMemberById = async (req, res) => {
  const memberId = req.params.id;

  try {
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(200).send("No member found with that ID.");
    }
    if (member.profilePicture) {
      member.profilePicture = `http://localhost:3001/${member.profilePicture}`;
      // member.profilePicture = profile_picture_url;
    }
    return res.status(200).json(member);
  } catch (error) {
    res.status(500).send("Internal server error", error);
  }
};

exports.updateMemberDetails = (req, res) => {};

exports.deleteMember = (req, res) => {
  const memberId = req.params.id;
  try {
  } catch (error) {}
};
