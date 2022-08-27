const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: { type: String, required: true },
    age: { type: Number, min: 1 },
    profilePic: { type: String },
    verified:{type:String,default:'false'},
    role: { type: String, required: true, default: 'USER' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }],
  },
  {
    timestamps: true,
  }
)

const user = mongoose.model('Users', userSchema)
module.exports = user

// firstname,
// lastname,
// email,
// password,
// age,
// profilepic,
// role,
// verified,
// favorites:[ recipe refs ],
// timestamps
