import { Request, Response } from 'express';
import CreateCustomer from '../../../usecases/createCustomer';
import CustomerOrder from '../../../usecases/customerOrder';
import PayForOrder from '../../../usecases/payForOrder';
import axios from 'axios';

class CustomerController {
  createCustomer: CreateCustomer;
  customerOrder: CustomerOrder;
  payForOrder: PayForOrder;

  constructor({
    createCustomer,
    customerOrder,
    payForOrder,
  }: {
    createCustomer: CreateCustomer;
    customerOrder: CustomerOrder;
    payForOrder: PayForOrder;
  }) {
    this.createCustomer = createCustomer;
    this.customerOrder = customerOrder;
    this.payForOrder = payForOrder;
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      console.log(req.body);
      const savedCustomer = await this.createCustomer.execute(payload);

      const customer = {
        _id: savedCustomer?._id,
        firstName: savedCustomer?.firstName,
        lastName: savedCustomer?.lastName,
        phoneNo: savedCustomer?.phoneNo,
        email: savedCustomer?.email,
      };
      res.status(201).json({
        success: true,
        msg: `Customer account successfully created`,
        data: customer,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }

  async order(req: Request, res: Response) {
    try {
      const payload = req.body;
      const customerOrder = await this.customerOrder.execute(payload);

      axios
        .post(`${process.env.ORDER_SERVICE_URL}`, {
          order: customerOrder,
        })
        .then(async (response) => {
          if (response.data.success) {
            return res.status(201).json({
              success: true,
              msg: `Order was successful`,
              order: response.data.order.payment,
            });
          }
        })
        .catch((error) => {
          console.log('Failed to send order');
          console.log('error: ', error?.message);
          return res.status(400).json({
            success: false,
            msg: `Order failed`,
          });
        });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }

  async pay(req: Request, res: Response) {
    try {
      const payload = req.body;
      const paymentSuccess = await this.payForOrder.execute(payload);

      if (paymentSuccess) {
        return res.status(200).json({
          success: true,
          msg: `Payment is successful`,
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: `Insufficient funds`,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }
}

export default CustomerController;
