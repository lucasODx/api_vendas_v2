import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from 'multer';
import uploadConfig from '@config/upload';
import { UserController } from "../typeorm/controllers/UserController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../typeorm/controllers/UserAvatarController";

const userRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig)

userRouter.get('/', isAuthenticated, userController.index);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  userController.create);


export default userRouter;
