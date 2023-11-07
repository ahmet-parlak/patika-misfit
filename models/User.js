const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' },
  trainings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Training',
    },
  ],
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
