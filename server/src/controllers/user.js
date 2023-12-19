const User = require("../models/user");
const Payment = require("../models/payment");

const customError = require("../utils/customError");

exports.enroll = async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const { name, email, batch, age } = req.body;

    if (!name || !email || !batch || !age) {
      return customError(res, 400, "Name, email, batch and age are required");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();

      const paymentExist = await Payment.findOne({
        userID: isUserExist._id,
        month,
        year,
      });

      if (paymentExist) {
        return customError(
          res,
          400,
          "Payment already completed for this month",
          "error"
        );
      }

      await Payment.create({ userID: isUserExist._id, month, year });
      return res.json({
        status: "success",
        message: "Payment done successfully",
      });
    }

    const user = await User.create({ name, email, batch, age });

    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    await Payment.create({ userID: user._id, month, year });

    res.json({
      status: "success",
      message: "Payment done successfully",
    });
  } catch (error) {
    console.log(error);
    customError(res, 500, error.message, "error");
  }
};
