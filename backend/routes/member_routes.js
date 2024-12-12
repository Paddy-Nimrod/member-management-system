const express = require("express");

const memberControllers = require("../controllers/member_controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/api/members/all", auth, memberControllers.getAllMembers);
router.get("/api/members/:id", auth, memberControllers.getMemberById);
router.post("/api/members/create", auth, memberControllers.createNewMember);
router.post("/api/members/update", auth, memberControllers.updateMemberDetails);

module.exports = router;
