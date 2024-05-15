const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class adminService {
  static async adminlogin(data) {
    try {
      const checkadmin = await admin.find({ email: data.email });
      return checkadmin;
    } catch (error) {
      console.log(error);
    }
  }

  static async createadmin(data) {
    try {
      const salt = await bcrypt.genSalt(10);
      let hashpassword = await bcrypt.hash(data.password, salt);
      const newadmin = {
        fullname: data.fullname,
        email: data.email,
        password: hashpassword,
      };
      const response = await new admin(newadmin).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateadmin(Id, fullname, email, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      let hashpassword = await bcrypt.hash(password, salt);
      const updateResponse = await admin.findByIdAndUpdate(
        Id,
        { fullname: fullname, email: email, password: hashpassword },
        { new: true }
      );
      return updateResponse;
    } catch (error) {
      console.log(error);
    }
  }

  // Generate JWT
  static async generateToken(id) {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: "1h",
    });
  }

  static async getAdminDetails(adminId) {
    try {
      const adminDetails = await admin.findById(adminId);
      return adminDetails;
    } catch (error) {
      console.log(error);
    }
  }
};
