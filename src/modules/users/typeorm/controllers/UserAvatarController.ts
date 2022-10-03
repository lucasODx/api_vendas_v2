import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {

    const updateAvatar = new UpdateUserAvatarService();
    const user_Id = request.user.id;
    const user = updateAvatar.execute(
      {
        userId: user_Id,
        avatarFileName: request.file.filename
      }
    );

    return response.json(user);
  }
}
