import { model, Schema } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import gravatar from 'gravatar';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      select: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: String,
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { type: String, default: '' },
  },
  {
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) this.avatarURL = gravatar.url(this.email, { s: '250', d: 'identicon' }, true);

  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

export const User = model('User', userSchema);
