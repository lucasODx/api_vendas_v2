import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from '@config/upload';
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import { ProfileController } from "../typeorm/controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation:
        Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required()
          })
    }
  }),
  profileController.update);


export default profileRouter;
