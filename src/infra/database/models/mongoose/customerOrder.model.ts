import mongoose from 'mongoose';

export interface CustomerOrderDetails {
  customerId: string;
  productId: string;
  quantity: number;
  amount: number;
}

export interface CustomerOrderDocument
  extends CustomerOrderDetails,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const customerOrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CustomerOrderModel = mongoose.model<CustomerOrderDocument>(
  'CustomerOrder',
  customerOrderSchema
);

export default CustomerOrderModel;
