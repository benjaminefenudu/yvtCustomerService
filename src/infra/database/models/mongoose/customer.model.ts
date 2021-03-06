import mongoose from 'mongoose';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password: string;
  balance: number;
}

export interface CustomerDocument extends CustomerDetails, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 999999999,
    },

  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model<CustomerDocument>(
  'Customer',
  customerSchema
);

export default CustomerModel;
