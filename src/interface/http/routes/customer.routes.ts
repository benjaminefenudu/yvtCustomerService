import { Request, Response, Router } from 'express';
import container from '../../../../di-setup';

const { customerController } = container.cradle;

const CustomerRouter = Router();

CustomerRouter.post('/', (req: Request, res: Response) =>
  customerController.create(req, res)
);

CustomerRouter.post('/order', (req: Request, res: Response) =>
  customerController.order(req, res)
);

CustomerRouter.post('/pay', (req: Request, res: Response) =>
  customerController.pay(req, res)
);

export default CustomerRouter;
