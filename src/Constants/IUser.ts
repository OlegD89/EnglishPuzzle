interface IUser {
  message: string;
  token: string;
  userId: string;
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
