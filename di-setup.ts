import {
  asValue,
  Lifetime,
  asClass,
  asFunction,
  InjectionMode,
  createContainer,
} from 'awilix';
import database from './src/infra/database/mongoose';
import Messenger from './src/utils/messenger.utils';
import CustomerModel from './src/infra/database/models/mongoose/customer.model';
import CustomerOrderModel from './src/infra/database/models/mongoose/customerOrder.model';
import CustomerRepository from './src/infra/repository/customer.repository';
import CreateCustomer from './src/usecases/createCustomer';
import CustomerOrder from './src/usecases/customerOrder';
import PayForOrder from './src/usecases/payForOrder';
import CustomerController from './src/interface/http/controllers/customer.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  database: asValue(database),
  messenger: asClass(Messenger),
  customerModel: asValue(CustomerModel),
  customerOrderModel: asValue(CustomerOrderModel),
  customerRepository: asClass(CustomerRepository),
  createCustomer: asClass(CreateCustomer),
  customerOrder: asClass(CustomerOrder),
  payForOrder: asClass(PayForOrder),
  customerController: asClass(CustomerController),
});

export default container;
