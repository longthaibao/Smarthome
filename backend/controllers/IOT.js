const IOTService = require("../services/IOT");
const AppError = require("../helpers/appError");
const { spawn } = require('child_process');



module.exports = class IOT {

    static async apiLastAuthorizationIOT(req, res, next) { 
        try { 
          const lastAuthorization = await IOTService.lastAuthorizationIOT(req.body);
          
          res.status(200).json(lastAuthorization);
        } catch (error) {
          res.status(500).json({ error: error });
        }
    }

    static async controlDoor(req, res, next) { 
        try { 
          // CODE IOT
	  let MOCK_ADMIN_ID = "nam"

	  if (req.body.state != "open" && req.body.state != "close") {
	    res.status(400).json({ error: "'state' must be either 'open' or 'close'." });
	    return;
	  }

	  IOTService.changeDoorState(MOCK_ADMIN_ID, (req.body.state === "open") ? 1 : 0);

          res.status(200).json(true);
        } catch (error) {
	  console.log(error.stack);
          res.status(500).json({ error: error.toString() });
        }
    }

    static async apiFaceAuthorization(req, res, next) { 
    try { 
	// test Python
	console.log("Test pythons");
	let pythonProcess = spawn('python', ['config/test.py', 'arg134', 'arg2']);
	pythonProcess.stdout.on('data', (data) => {
	    console.log(`Kết quả từ Python: ${data}`);
	});
	pythonProcess.stderr.on('data', (data) => {
	    console.error(`Lỗi từ Python: ${data}`);
	});
	res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
