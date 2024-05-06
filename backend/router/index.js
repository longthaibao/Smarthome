const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const memberCtrl = require("../controllers/member");
const IOTCtrl = require("../controllers/IOT");

// admin routes
router.post("/admin/login", adminCtrl.apiCheckadmin);
router.post("/admin/register", adminCtrl.apiCreateadmin);
router.post("/admin/edit/:id", adminCtrl.apiUpdateRegToken);
router.put("/admin/edit/:id",adminCtrl.apiEditadmin);

// member routes
router.post("/member/register", memberCtrl.apiCreatemember);
router.get("/member/list", memberCtrl.apiListImagemember);
router.get("/member/history", memberCtrl.apiHistorymember);
router.get("/member/static", memberCtrl.apiStaticmember);
router.delete("/member/delete/:id", memberCtrl.apiDeletemember);
router.put("/member/extend/:id", memberCtrl.apiExtendmember);

// IOT router
router.get("/IOT/lastAuthorization", IOTCtrl.apiLastAuthorizationIOT);
router.post("/IOT/doorCtrl", IOTCtrl.controlDoor);


module.exports = router;
