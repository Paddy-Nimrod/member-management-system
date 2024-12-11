const express = require("express");

const memberControllers = require("../controllers/member_controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", memberControllers.test);
router.get("/api/members/all",  memberControllers.getAllMembers);
router.get("/api/members/:id",  memberControllers.getMemberById);
router.post("/api/members/create",  memberControllers.createNewMember);
router.post("/api/members/update",  memberControllers.updateMemberDetails);

module.exports = router;
