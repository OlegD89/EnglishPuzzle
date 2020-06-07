interface IUser {
  email: string;
  userId: string;
}


interface IUserRegister {
  email: string;
  password: string;
}

export default IUser;
export { IUserRegister };
