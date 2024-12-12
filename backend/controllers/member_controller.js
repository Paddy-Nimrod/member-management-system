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
  const profilePicture = req.body.profilePicture;
  const notes = req.body.notes;

  try {
    Member.create({
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
    }).then(() => {
      res.status(200).send("Member created successfully.");
    });
  } catch (error) {
    res.status(500).send("Member could not be created. Please try again.");
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    if (!members) {
      return res.status(200).send("No members found.");
    }
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).send("Bad request. Members could not be fetched.");
  }
};

exports.getMemberById = async (req, res) => {
  const memberId = req.params.id;
  try {
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(200).send("No member found with that ID.");
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
