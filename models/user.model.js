const mongoose = require('mongoose')
const constants = require('../library/constants')

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
    verified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(constants.role), required: true, default: constants.role.USER },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }],
  },
  {
    timestamps: true,
  }
)

userSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    return next(new Error('This user already exists!'))
  }
  next()
})

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
