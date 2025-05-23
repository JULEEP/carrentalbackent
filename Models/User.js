import mongoose from 'mongoose';

const { Schema } = mongoose;


// User Schema without required and trim
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // Removed 'required' and 'trim'
  },
  email: {
    type: String,
    lowercase: true,
  },
  mobile: {
    type: String,
  },
  otp: {
    type: String,
  },
  myBookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking', // Reference to Booking model
  }],
   wallet: [
    {
      amount: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
      },
      message: {
        type: String,
        default: ''
      },
      date: {
        type: Date,
        default: Date.now
      },
    }
  ],
  totalWalletAmount: {
    type: Number,
    default: 0 // The total balance of the wallet
  },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referrer user
  points: { type: Number, default: 0 },  // Points earned by user
 code: {
    type: String, // ✅ Optional field
    default: null,
  },
  profileImage: {
    type: String,
    default: 'default-profile-image.jpg', // Optional default image
  },

 documents: {
  aadharCard: {
    url: { type: String },
    uploadedAt: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  drivingLicense: {
    url: { type: String },
    uploadedAt: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }
},
}, {
  timestamps: true  // CreatedAt and UpdatedAt fields automatically
});

// Create model based on schema
const User = mongoose.model('User', userSchema);

export default User;
