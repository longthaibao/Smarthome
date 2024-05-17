const IOTService = require("../services/IOT");
const AppError = require("../helpers/appError");
const { spawn } = require("child_process");

module.exports = class IOT {
  static async apiLastAuthorizationIOT(req, res, next) {
    try {
      const lastAuthorization = await IOTService.lastAuthorizationIOT(req.body);

      res.status(200).json(lastAuthorization);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async openDoor(req, res, next) {
      try { 
	// CODE IOT
	IOTService.changeDoorState("", 1);
	res.status(200).json(true);
      } catch (error) {
	console.log(error.stack);
	res.status(500).json({ error: error.toString() });
      }
  }

  static async closeDoor(req, res, next) {
      try { 
	// CODE IOT
	IOTService.changeDoorState("", 0);
	res.status(200).json(true);
      } catch (error) {
	console.log(error.stack);
	res.status(500).json({ error: error.toString() });
      }
  }
};
