const IOTService = require("../services/IOT");
const AppError = require("../helpers/appError");

module.exports = class IOT {

    static async apiLastAuthorizationIOT(req, res, next) { 
        try { 
          const lastAuthorization = await IOTService.lastAuthorizationIOT(req.body);
          
          res.status(200).json(lastAuthorization);
        } catch (error) {
          res.status(500).json({ error: error });
        }
    }

    static async apiOpenIOT(req, res, next) { 
        try { 
          // CODE IOT
          res.status(200).json(true);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
}