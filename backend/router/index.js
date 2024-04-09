const express = require("express");
const router = express.Router();
const adminCtrl = require("../Controllers/admin");
const memberCtrl = require("../Controllers/member");
const IOTCtrl = require("../Controllers/IOT");

// admin routes
router.post("/admin/login", adminCtrl.apiCheckadmin);
router.post("/admin/register", adminCtrl.apiCreateadmin);
router.put("/admin/edit/:id", adminCtrl.apiEditadmin);

// member routes
router.post("/member/register", memberCtrl.apiCreatemember);
router.get("/member/list", memberCtrl.apiListImagemember);
router.get("/member/history", memberCtrl.apiHistorymember);
router.get("/member/static", memberCtrl.apiStaticmember);
router.delete("/member/delete/:id", memberCtrl.apiDeletemember);
router.put("/member/extend/:id", memberCtrl.apiExtendmember);

// IOT router
router.get("/IOT/lastAuthorization", IOTCtrl.apiLastAuthorizationIOT);
router.get("/IOT/open", IOTCtrl.apiOpenIOT);

module.exports = router;
