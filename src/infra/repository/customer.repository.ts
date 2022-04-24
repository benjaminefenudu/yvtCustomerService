import CustomerModel, {
  CustomerDocument,
} from '../database/models/mongoose/customer.model';
import CustomerOrderModel, {
  CustomerOrderDocument,
} from '../database/models/mongoose/customerOrder.model';
import bcrypt from 'bcrypt';

class CustomerRepository {
  customerModel: typeof CustomerModel;
  customerOrderModel: typeof CustomerOrderModel;

  constructor({
    customerModel,
    customerOrderModel,
  }: {
    customerModel: typeof CustomerModel;
    customerOrderModel: typeof CustomerOrderModel;
  }) {
    this.customerModel = customerModel;
    this.customerOrderModel = customerOrderModel;
  }

  async create(payload: CustomerDocument) {
    try {
      let { firstName, lastName, phoneNo, email, password } = payload;
      const hashPassword = await bcrypt.hash(password, 12);
      password = hashPassword;

      const customer = await this.customerModel.create({
        firstName,
        lastName,
        phoneNo,
        email,
        password,
      });
      const savedCustomer = await customer.save();

      return savedCustomer;
    } catch (error) {
      throw error;
    }
  }

  async order(payload: CustomerOrderDocument) {
    try {
      const order = await this.customerOrderModel.create({
        ...payload,
      });
      const savedOrder = await order.save();

      return savedOrder
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerRepository