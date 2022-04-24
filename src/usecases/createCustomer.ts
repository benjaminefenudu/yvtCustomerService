import CustomerModel from '../infra/database/models/mongoose/customer.model';
import { CustomerDocument } from '../infra/database/models/mongoose/customer.model';
import CustomerRepository from '../infra/repository/customer.repository';

class CreateCustomer {
  customerModel: typeof CustomerModel;
  customerRepository: CustomerRepository;

  constructor({
    customerModel,
    customerRepository,
  }: {
    customerModel: typeof CustomerModel;
    customerRepository: CustomerRepository;
  }) {
    this.customerModel = customerModel;
    this.customerRepository = customerRepository;
  }

  async execute(payload: CustomerDocument) {
    try {
      const { email } = payload;

      const alreadyExist = await this.customerModel.findOne({ email: email });
      if (alreadyExist)
        throw new Error('A Customer with this Email already exist');

      const customer = await this.customerRepository.create(payload);
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

export default CreateCustomer;
