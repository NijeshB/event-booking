import { SEARCH_USER, USER_PROFILE } from '@customTypes/UserType';
import { createUserSchema, T_CREATE_USER } from '@validators/userValidator';

import { userModel } from '@model/UserModel';
import { ConflictError } from '@exceptions/customException';

export const UserService = {
  createUsers: async (userData: T_CREATE_USER): Promise<USER_PROFILE> => {
    const validatedData = await createUserSchema.parseAsync(userData);

    const { email, mobile } = validatedData;
    const search: SEARCH_USER = { email, mobile } as SEARCH_USER;

    const userExists = await userModel.searchSingleUser(search, true);

    if (userExists) {
      // Check if the user already exists based on email or mobile
      if (userExists.email === email) {
        throw new ConflictError('Given EmailId is already exists!');
      }
      if (userExists.mobile === mobile) {
        throw new ConflictError('Given Mobile number is already exists!');
      }
    }

    return await userModel.addUser(validatedData);
  },
};
