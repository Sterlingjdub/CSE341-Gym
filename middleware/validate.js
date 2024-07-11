const validator = require("../validation/validation");

const saveMember = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|string",
    phone: "required|string",
    dateOfBirth: "required|string",
    membershipType: "required|string",
    startDate: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
      return;
    }
    next();
  });
};

const saveClass = (req, res, next) => {
  const validationRule = {
    className: "required|string",
    instructor: "required|string",
    schedule: "required|string",
    duration: "required|string",
    capacity: "required|numeric",
    location: "required|string"

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
      return;
    }
    next();
  });
};

module.exports = {
  saveMember,
  saveClass,
};