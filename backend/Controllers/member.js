const memberService = require("../services/member");
const AppError = require("../helpers/appError");

module.exports = class member {
  static async apiCreatemember(req, res, next) {
    try {
      if (!req.body) return next(new AppError("No form data found", 404));
      console.log(req.body);
      const createdmember = await memberService.creatmember({
        name: req.body.name,
        image: req.file["path"],
        sex: req.body.sex,
        relationship: req.body.relationship,
        age: req.body.age,
        dateStart: new Date(req.body.dateStart),
        dateEnd: new Date(req.body.dateEnd),
      });
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
