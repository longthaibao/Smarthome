# API
// admin routes
router.post("/admin/login", adminCtrl.apiCheckadmin);
router.post("/admin/register", adminCtrl.apiCreateadmin);
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
router.get("/IOT/open", IOTCtrl.apiOpenIOT);


## How to run face-auth
- Go to face-auth: cd face-auth
- Create python virtual environment: python3 -m venv .env
- Activate the virtual environment: source .env/bin/activate (MacOS or Linux)
- Install dependencies: pip install -r requirements.txt
- Run the app: uvicorn app:app
