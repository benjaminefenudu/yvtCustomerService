import axios from 'axios';
import CustomerModel from '../infra/database/models/mongoose/customer.model';
import CustomerOrderModel from '../infra/database/models/mongoose/customerOrder.model';
import { CustomerOrderDocument } from '../infra/database/models/mongoose/customerOrder.model';
import CustomerRepository from '../infra/repository/customer.repository';

class CustomerOrder {
  customerModel: typeof CustomerModel;
  customerOrderModel: typeof CustomerOrderModel;
  customerRepository: CustomerRepository;

  constructor({
    customerModel,
    customerOrderModel,
    customerRepository,
  }: {
    customerModel: typeof CustomerModel;
    customerOrderModel: typeof CustomerOrderModel;
    customerRepository: CustomerRepository;
  }) {
    this.customerModel = customerModel;
    this.customerOrderModel = customerOrderModel;
    this.customerRepository = customerRepository;
  }

  async execute(payload: CustomerOrderDocument) {
    try {
      const order = await axios
        .get(`${process.env.PRODUCT_SERVICE_URL}/${payload.productId}`)
        .then(async (response) => {
          const product = response.data.product;
          const amount = product.price * payload.quantity;
          const orderDetails = {
            customerId: payload.customerId,
            productId: payload.productId,
            quantity: payload.quantity,
            amount: amount,
          };

          return orderDetails;
        })
        .catch((error) => {
          console.log('Failed to get product details');
          console.log('error: ', error?.message);
          return;
        });
      return order;
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerOrder;
