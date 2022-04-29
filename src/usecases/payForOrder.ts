import CustomerRepository from '../infra/repository/customer.repository';

class PayForOrder {
  customerRepository: CustomerRepository;
  customerModel: any;
  constructor({
    customerRepository,
    customerModel,
  }: {
    customerRepository: CustomerRepository;
    customerModel: any;
  }) {
    this.customerRepository = customerRepository;
    this.customerModel = customerModel;
  }

  async execute(payload: any) {
    try {
      console.log('check balance and pay');
      let paymentSuccess = false;
      const customerId = payload.customerId;
      const amount = payload.amount;

      const customer = await this.customerModel.findById(customerId);
      if (!customer) return console.log(`customer not found`);

      if (amount > customer.balance || amount <= 0) {
        console.log(`Insufficient funds`);
        paymentSuccess = false;
      } else {
        paymentSuccess = true;
        const newBalance = customer.balance - amount;
        customer.balance = newBalance;

        customer.save();
        console.log(`Payment successful`);
      }

      return paymentSuccess;
    } catch (error) {
      console.log(error)
    }
  }
}

export default PayForOrder;
