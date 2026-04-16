const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: [true, "Token must be unique"],
    },
  },
  { timestamps: true },
);

const blacklistTokenModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);

module.exports = blacklistTokenModel;
