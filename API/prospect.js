var mongoose = require("mongoose");
var ProspectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  checkedIn: {
    type: Boolean,
    required: false,
    default: false
  },
  comment: {
    type: String,
    required: false
  }
})

var Prospect = mongoose.model("Prospect", ProspectSchema);

module.exports = Prospect;
