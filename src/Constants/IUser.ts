interface IUser {
  message: string;
  token: string;
  userId: IUserId;
}

interface IUserId {
  id: string;
}


interface IUserRegister {
  email: string;
  password: string;
}

export default IUser;
export { IUserRegister };
