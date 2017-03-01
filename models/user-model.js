const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, default: 'Izzy' },
  lastName: { type: String, default: 'Ironside' },
  username: { type: String, require: true },
  encryptedpassword: { type: String, require: true }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
