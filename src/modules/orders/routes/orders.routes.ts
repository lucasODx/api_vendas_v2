import { Router } from 'express';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import OrdersController from '../typeorm/controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  ordersController.show);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().required(),
      products: Joi.required(),
    }
  }),
  ordersController.create);

export default ordersRouter;
