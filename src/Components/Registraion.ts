import { renderElement, checkPassword, validateEmail } from '../Utils/Utils';
import { EventDispatcher, EventDispatcherCall } from './EventDispatcher';
import DataAdapter from '../Utils/DataAdapter';
import { IUserRegister } from '../Constants/User';

export default class RegistrationController {
  private view: RegistrationView;
  private eventDispatcherCall: EventDispatcherCall;
  private logInShow: () => void;

  constructor(eventDispatcher: EventDispatcher, logInShow: () => void) {
    this.view = new RegistrationView();
    this.eventDispatcherCall = eventDispatcher.call;
    this.logInShow = logInShow;
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onSubmitRegister((email: string, password: string) => {
      if (!checkPassword(password)) {
        this.view.showError('the password must contain at least 8 characters, at least one uppercase letter, '
        + 'one uppercase letter, one digit, and one special character');
      } else if (!validateEmail(email)) {
        this.view.showError('email is not correct');
      } else {
        DataAdapter.registration({ email, password } as IUserRegister).then(() => {
          DataAdapter.logIn({ email, password } as IUserRegister).then((user) => {
            this.eventDispatcherCall.logger('Welcome');
            this.eventDispatcherCall.setUser(user);
            this.view.hide();
          });
        }).catch((error) => {
          this.view.showError(error.message);
          // this.eventDispatcherCall.logger({ text: error, isError: true });
        });
      }
    });
    this.view.onClickLogIn(() => {
      this.view.hide();
      this.logInShow();
    });
  }

  public show() {
    this.view.show();
  }
}

class RegistrationView {
  private registration: HTMLFormElement;
  private registrationEmail: HTMLInputElement;
  private registrationPassword: HTMLInputElement;
  private registrationPasswordError: HTMLSpanElement;
  private logInButton: HTMLButtonElement;

  public render(layout: Node) {
    this.registration = renderElement(layout, 'form', 'registration registration_hide');
    renderElement(this.registration, 'h2', 'registration__header', 'Registration');
    const labelRegistration = renderElement(this.registration, 'label', 'registration-email__description', 'Email');
    this.registrationEmail = renderElement(labelRegistration, 'input', 'registration-email__input');
    this.registrationEmail.type = 'email';
    this.registrationEmail.required = true;
    const labelPassword = renderElement(this.registration, 'label', 'registration-password__description', 'Password');
    this.registrationPassword = renderElement(labelPassword, 'input', 'registration-password__input');
    this.registrationPassword.type = 'password';
    this.registrationPassword.required = true;
    this.registrationPasswordError = renderElement(this.registration, 'span', 'registration__error');
    // eslint-disable-next-line no-useless-escape
    // this.registrationPassword.pattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/';
    const registrationButton = renderElement(this.registration, 'button', 'registration__button', 'Register');
    registrationButton.type = 'submit';
    this.logInButton = renderElement(this.registration, 'button',
      'registration__button registration__log-in-button', 'LogIn');
  }

  public onSubmitRegister(func: (email: string, password: string) => void) {
    this.registration.onsubmit = (event) => {
      event.preventDefault();
      func(this.registrationEmail.value, this.registrationPassword.value);
    };
  }

  onClickLogIn(func: () => void) {
    this.logInButton.onclick = func;
  }

  public show() {
    this.registration.classList.remove('registration_hide');
  }

  public hide() {
    this.registration.classList.add('registration_hide');
  }

  public showError(text: string) {
    this.registrationPasswordError.textContent = text;
    this.registrationPasswordError.classList.add('registration__error_show');
  }

  public hideError() {
    this.registrationPasswordError.classList.remove('registration__error_show');
  }
}
