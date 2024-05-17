const memberService = require("../services/member");
const AppError = require("../helpers/appError");
const uploadCloud = require("../config/cloudinary.config");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

module.exports = class member {
  static async apiCreatemember(req, res, next) {
    console.log(req.body)

    if (!req.body) return next(new AppError("No form data found", 404));

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    try {
      const myCloud = await new Promise((resolve, reject) => {
	cloudinary.uploader.upload(
	  req.body.images,
	  {
	    folder: "Face",
	    // width: 150,
	    // crop: "scale",
	  },
	  (error, result) => {
	    if (error) res.status(500).json({ error: error });
	    else resolve(result);
	  }
	);
      });

      console.log("myCloud[url] = " + myCloud["url"]);

      const createdmember = await memberService.creatmember({
	  name: req.body.name,  
	  image: myCloud["url"],
	  sex: req.body.sex,
	  relationship: req.body.relationship,
	  age : req.body.age,
	  dateStart: new Date(req.body.dateStart),
	  dateEnd: new Date(req.body.dateEnd),     
	});


      const faceRegResp = await fetch(process.env.FACEAUTH_URL + "/register", {
	method: "POST",
	headers: {
	  "Content-Type": "application/json"
	},
	body: JSON.stringify({
	  "master_id": "nam",
	  "member_id": createdmember._id,
	  "image_urls": [ myCloud["url"] ]
	})
      });
      
      if (faceRegResp.status != 200) {
	await memberService.deletemember(createdmember._id);
	const faceRegErr = await faceRegResp.json();
	res.status(500).json(faceRegErr);
	return;
      }

	res.status(200).json(createdmember);
      } catch (error) {
	res.status(500).json({ error: error });
      }
  }

  static async apiListImagemember(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));

      const allmember = await memberService.listAllmember(req.body);

      res.status(200).json(
        allmember.map((item) => ({
          _id: item._id,
          image: item.image,
        }))
      );
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiHistorymember(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));

      const allmember = await memberService.listAllmember(req.body);

      res.status(200).json(
        allmember.map((item) => ({
          _id: item._id,
          name: item.name,
          image: item.image,
          time: item.active[0] ? item.active[0] : null,
        }))
      );
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiStaticmember(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));

      const allmember = await memberService.listAllmember(req.body);

      res.status(200).json(
        allmember
          .map((item) => ({
            _id: item._id,
            name: item.name,
            image: item.image,
            count: item.active.length,
          }))
          .sort((a, b) => b.count - a.count)
      );
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeletemember(req, res, next) {
    try {
      const deleteResponse = await memberService.deletemember(req.params.id);
      res.status(200).json(deleteResponse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiExtendmember(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));
      const updated = await memberService.updatemember(
        req.params.id,
        req.body.dateEnd
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
