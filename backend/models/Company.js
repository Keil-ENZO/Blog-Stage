const moogoose = require("mongoose");

const CompanySchema = new moogoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  dateDuring: {
    type: String,
    required: true,
  },
});

module.exports = moogoose.model("Company", CompanySchema);
