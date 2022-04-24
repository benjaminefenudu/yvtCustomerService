import { Request, Response } from 'express';
import CreateCustomer from '../../../usecases/createCustomer';
import CustomerOrder from '../../../usecases/customerOrder';
import axios from 'axios';

class CustomerController {
  createCustomer: CreateCustomer;
  customerOrder: CustomerOrder;

  constructor({
    createCustomer,
    customerOrder,
  }: {
    createCustomer: CreateCustomer;
    customerOrder: CustomerOrder;
  }) {
    this.createCustomer = createCustomer;
    this.customerOrder = customerOrder;
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
              msg: `Order successfully created`,
              order: customerOrder,
            });
          }
        })
        .catch((error) => {
          console.log('Failed to send order');
          console.log('error: ', error?.message);
          return res.status(400).json({
            success: false,
            msg: `Order successfully created`,
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
}

export default CustomerController;
