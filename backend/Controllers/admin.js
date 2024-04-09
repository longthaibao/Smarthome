const adminService = require("../services/admin");
const AppError = require("../helpers/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class admin {
  static async apiCheckadmin(req, res, next) {
    try {
      const admin = await adminService.adminlogin(req.body);
      const validPassword = await bcrypt.compare(
        req.body.password,
        admin[0].password
      );
      const token = await adminService.generateToken(admin[0]._id);

      if (validPassword) {
        res.status(200).json({
          token: token,
        });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiCreateadmin(req, res, next) {
    try {
      console.log(req.body);
      if (!req.body) return next(new AppError("No form data found", 404));
      const createdadmin = await adminService.createadmin(req.body);
      res.status(200).json(createdadmin);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiEditadmin(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));
      const updated = await adminService.updateadmin(
        req.params.id,
        req.body.fullname,
        req.body.email,
        req.body.password
      );

      if (updated.modifiedCount === 0) {
        throw new Error("Unable to update , error occord");
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
