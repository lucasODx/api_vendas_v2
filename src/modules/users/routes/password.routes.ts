import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "../typeorm/controllers/ForgotPasswordController";
import ResetPasswordController from "../typeorm/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetPasswordController.create
);


export default passwordRouter;
