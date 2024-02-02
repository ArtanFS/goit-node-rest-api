import { model, Schema } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  {
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

export const User = model('User', userSchema);