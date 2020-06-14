import { renderElement, checkPassword, validateEmail } from '../../Utils/Utils';
import { EventDispatcher, EventDispatcherCall } from '../EventDispatcher';
import DataAdapter from '../../Utils/DataAdapter';
import IUser, { IUserRegister } from '../../Constants/IUser';
import RegistrationController from './Registraion';
import { ISettingsParams } from '../Settings';

export default class LogInController {
  private view: LogInView;
  private eventDispatcherCall: EventDispatcherCall;
  private registraion: RegistrationController;
  private params: ISettingsParams;

  constructor(eventDispatcher: EventDispatcher, params: ISettingsParams) {
    this.params = params;
    this.view = new LogInView();
    this.registraion = new RegistrationController(eventDispatcher, () => this.view.show());
    this.eventDispatcherCall = eventDispatcher.call;
    eventDispatcher.subscribe.setUser((user) => {
      if (user.userId) {
        this.view.hide();
      } else {
        this.view.show();
      }
    });
  }

  public render(layout: Node) {
    this.view.render(layout);

    this.registraion.render(layout);
    this.view.onClickRegistration(() => {
      this.view.hide();
      this.registraion.show();
    });


    this.view.onSubmitRegister((email: string, password: string) => {
      if (!checkPassword(password)) {
        this.view.showError('the password must contain at least 8 characters, at least one uppercase letter, '
        + 'one uppercase letter, one digit, and one special character');
      } else if (!validateEmail(email)) {
        this.view.showError('email is not correct');
      } else {
        DataAdapter.logIn({ email, password } as IUserRegister).then((user) => {
          this.eventDispatcherCall.logger('Welcome');
          this.eventDispatcherCall.setUser(user);
          this.view.hide();
          this.view.hideError();
        }).catch((error) => {
          this.view.showError(error.message);
        });
      }
    });

    if (this.params.userId) {
      this.view.hide();
      setTimeout(() => {
        DataAdapter.getUser(this.params).then(() => {
          this.eventDispatcherCall.logger('Welcome');
          this.eventDispatcherCall.setUser({
            token: this.params.token,
            userId: this.params.userId,
          } as IUser);
        }).catch((error) => {
          this.view.showError(error.message);
          this.view.show();
        });
      });
    }
  }

  public show() {
    this.view.show();
  }
}

class LogInView {
  private logIn: HTMLFormElement;
  private logInEmail: HTMLInputElement;
  private logInPassword: HTMLInputElement;
  private logInPasswordError: HTMLSpanElement;
  private registerButton: HTMLButtonElement;

  public render(layout: Node) {
    this.logIn = renderElement(layout, 'form', 'log-in');
    renderElement(this.logIn, 'h2', 'log-in__header', 'LogIn');
    const labelRegistration = renderElement(this.logIn, 'label', 'log-in-email__description', 'Email');
    this.logInEmail = renderElement(labelRegistration, 'input', 'log-in-email__input');
    this.logInEmail.type = 'email';
    this.logInEmail.required = true;
    const labelPassword = renderElement(this.logIn, 'label', 'log-in-password__description', 'Password');
    this.logInPassword = renderElement(labelPassword, 'input', 'log-in-password__input');
    this.logInPassword.type = 'password';
    this.logInPassword.required = true;
    this.logInPasswordError = renderElement(this.logIn, 'span', 'log-in__error');
    // eslint-disable-next-line no-useless-escape
    // this.logInPassword.pattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/';
    const logInButton = renderElement(this.logIn, 'button', 'log-in__button', 'Enter');
    logInButton.type = 'submit';
    this.registerButton = renderElement(this.logIn, 'button',
      'log-in__button log-in__registration-button', 'Registration');

    // this.logInEmail.value = 'test3@te.st';
    // this.logInPassword.value = 'Test999&';
  }

  public onSubmitRegister(func: (email: string, password: string) => void) {
    this.logIn.onsubmit = (event) => {
      event.preventDefault();
      func(this.logInEmail.value, this.logInPassword.value);
    };
  }

  public onClickRegistration(func: () => void) {
    this.registerButton.onclick = () => { func(); };
  }

  public show() {
    this.logIn.classList.remove('log-in_hide');
  }

  public hide() {
    this.logIn.classList.add('log-in_hide');
  }

  public showError(text: string) {
    this.logInPasswordError.textContent = text;
    this.logInPasswordError.classList.add('log-in__error_show');
  }

  public hideError() {
    this.logInPasswordError.classList.remove('log-in__error_show');
  }
}
