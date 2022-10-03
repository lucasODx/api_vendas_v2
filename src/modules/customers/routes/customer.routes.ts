import { Router } from 'express';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import CustomerController from '../typeorm/controllers/CustomerController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(isAuthenticated);
customerRouter.get('/', customerController.index);

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  customerController.show);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customerController.create);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customerController.update);

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  customerController.delete);

export default customerRouter;
