/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _Components_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/Layout */ "./src/Components/Layout.ts");
/* harmony import */ var _Components_Start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Start */ "./src/Components/Start.ts");
/* harmony import */ var _Components_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Settings */ "./src/Components/Settings.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");
/* harmony import */ var _Components_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/EventDispatcher */ "./src/Components/EventDispatcher.ts");
/* harmony import */ var _Components_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/Logger */ "./src/Components/Logger.ts");






class App {
    constructor() {
        const eventDispatcher = new _Components_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__["EventDispatcher"]();
        this.dataAdapter = new _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_3__["default"](eventDispatcher);
        this.settings = new _Components_Settings__WEBPACK_IMPORTED_MODULE_2__["default"](eventDispatcher.subscribe);
        this.logger = new _Components_Logger__WEBPACK_IMPORTED_MODULE_5__["default"](eventDispatcher.subscribe);
        this.layout = new _Components_Layout__WEBPACK_IMPORTED_MODULE_0__["default"](eventDispatcher.subscribe);
        this.start = new _Components_Start__WEBPACK_IMPORTED_MODULE_1__["default"](eventDispatcher);
    }
    Start() {
        const params = this.settings.getSettings();
        this.dataAdapter.setStartParameters(params);
        const page = document.createDocumentFragment();
        const layout = this.layout.render(page);
        this.logger.render(page);
        const start = this.start.render(layout);
        document.querySelector('body').appendChild(page);
    }
}


/***/ }),

/***/ "./src/Components/EventDispatcher.ts":
/*!*******************************************!*\
  !*** ./src/Components/EventDispatcher.ts ***!
  \*******************************************/
/*! exports provided: EventDispatcher, EventDispatcherCall, EventDispatcherSubscribe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcherCall", function() { return EventDispatcherCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcherSubscribe", function() { return EventDispatcherSubscribe; });
class EventDispatcher {
    constructor() {
        this.eventDispatchers = {
            start: new EventDispatcherBase(),
            setUser: new EventDispatcherBase(),
            logger: new EventDispatcherBase(),
        };
        this.call = new EventDispatcherCall(this.eventDispatchers);
        this.subscribe = new EventDispatcherSubscribe(this.eventDispatchers);
    }
}
class EventDispatcherCall {
    constructor(eventDispatchers) {
        this.eventDispatchers = eventDispatchers;
    }
    start() {
        this.eventDispatchers.start.call();
    }
    setUser(user) {
        this.eventDispatchers.setUser.call(user);
    }
    logger(text, isError = false) {
        this.eventDispatchers.logger.call({ text, isError });
    }
}
class EventDispatcherSubscribe {
    constructor(eventDispatchers) {
        this.eventDispatchers = eventDispatchers;
    }
    start(handler) {
        this.eventDispatchers.start.subscribe(handler);
    }
    setUser(handler) {
        this.eventDispatchers.setUser.subscribe(handler);
    }
    logger(handler) {
        this.eventDispatchers.logger.subscribe(handler);
    }
}
class EventDispatcherBase {
    constructor() {
        this.handlers = [];
    }
    call(event) {
        for (const h of this.handlers) {
            h(event);
        }
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
}



/***/ }),

/***/ "./src/Components/Layout.ts":
/*!**********************************!*\
  !*** ./src/Components/Layout.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");

class LayoutController {
    constructor(eventDispatcherSubscribe) {
        this.view = new LayoutView();
    }
    render(layout) {
        this.view.render(layout);
        return this.view.getLayout();
    }
}
class LayoutView {
    render(layout) {
        this.layout = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'layout');
        this.loading = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.layout, 'div', 'loading loading_hide');
    }
    getLayout() {
        return this.layout;
    }
    changeImage(currentUrl) {
        this.layout.style.backgroundImage = `url(${currentUrl})`;
    }
    showLoading() {
        this.loading.classList.remove('loading_hide');
    }
    hideLoading() {
        this.loading.classList.add('loading_hide');
    }
}


/***/ }),

/***/ "./src/Components/LogIn.ts":
/*!*********************************!*\
  !*** ./src/Components/LogIn.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogInController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");
/* harmony import */ var _Registraion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Registraion */ "./src/Components/Registraion.ts");



class LogInController {
    constructor(eventDispatcher) {
        this.view = new LogInView();
        this.registraion = new _Registraion__WEBPACK_IMPORTED_MODULE_2__["default"](eventDispatcher, () => this.view.show());
        this.eventDispatcherCall = eventDispatcher.call;
    }
    render(layout) {
        this.view.render(layout);
        this.registraion.render(layout);
        this.view.onClickRegistration(() => {
            this.view.hide();
            this.registraion.show();
        });
        this.view.onSubmitRegister((email, password) => {
            if (!Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["checkPassword"])(password)) {
                this.view.showError('the password must contain at least 8 characters, at least one uppercase letter, '
                    + 'one uppercase letter, one digit, and one special character');
            }
            else if (!Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["validateEmail"])(email)) {
                this.view.showError('email is not correct');
            }
            else {
                _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__["default"].logIn({ email, password }).then((user) => {
                    this.eventDispatcherCall.logger('Welcome');
                    this.eventDispatcherCall.setUser(user);
                    this.view.hide();
                }).catch((error) => {
                    this.view.showError(error.message);
                });
            }
        });
    }
    show() {
        this.view.show();
    }
}
class LogInView {
    render(layout) {
        this.logIn = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'form', 'log-in log-in_hide');
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'h2', 'log-in__header', 'LogIn');
        const labelRegistration = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'label', 'log-in-email__description', 'Email');
        this.logInEmail = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(labelRegistration, 'input', 'log-in-email__input');
        this.logInEmail.type = 'email';
        this.logInEmail.required = true;
        const labelPassword = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'label', 'log-in-password__description', 'Password');
        this.logInPassword = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(labelPassword, 'input', 'log-in-password__input');
        this.logInPassword.type = 'password';
        this.logInPassword.required = true;
        this.logInPasswordError = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'span', 'log-in__error');
        const logInButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'button', 'log-in__button', 'Enter');
        logInButton.type = 'submit';
        this.registerButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.logIn, 'button', 'log-in__button log-in__registration-button', 'Registration');
    }
    onSubmitRegister(func) {
        this.logIn.onsubmit = (event) => {
            event.preventDefault();
            func(this.logInEmail.value, this.logInPassword.value);
        };
    }
    onClickRegistration(func) {
        this.registerButton.onclick = () => { func(); };
    }
    show() {
        this.logIn.classList.remove('log-in_hide');
    }
    hide() {
        this.logIn.classList.add('log-in_hide');
    }
    showError(text) {
        this.logInPasswordError.textContent = text;
        this.logInPasswordError.classList.add('log-in__error_show');
    }
    hideError() {
        this.logInPasswordError.classList.remove('log-in__error_show');
    }
}


/***/ }),

/***/ "./src/Components/Logger.ts":
/*!**********************************!*\
  !*** ./src/Components/Logger.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoggerController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");

class LoggerController {
    constructor(eventDispatcherSubscribe) {
        this.view = new LoggerView();
        eventDispatcherSubscribe.logger((event) => {
            if (event.isError) {
                this.view.error(event.text);
            }
            else {
                this.view.success(event.text);
            }
        });
    }
    render(layout) {
        this.view.render(layout);
    }
}
class LoggerView {
    render(layout) {
        this.logger = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'b', 'logger-panel logger-panel_success logger-panel_hide');
    }
    success(text) {
        this.logger.classList.remove('logger-panel_hide');
        this.logger.classList.remove('logger-panel_error');
        this.logger.classList.add('logger-panel_success');
        this.logger.textContent = text;
        setTimeout(() => {
            this.logger.classList.add('logger-panel_hide');
            this.logger.classList.remove('logger-panel_success');
        }, 3000);
    }
    error(text) {
        this.logger.classList.remove('logger-panel_hide');
        this.logger.classList.remove('logger-panel_success');
        this.logger.classList.add('logger-panel_error');
        this.logger.textContent = text;
        setTimeout(() => {
            this.logger.classList.add('logger-panel_hide');
            this.logger.classList.remove('logger-panel_error');
        }, 3000);
    }
}


/***/ }),

/***/ "./src/Components/Registraion.ts":
/*!***************************************!*\
  !*** ./src/Components/Registraion.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegistrationController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");


class RegistrationController {
    constructor(eventDispatcher, logInShow) {
        this.view = new RegistrationView();
        this.eventDispatcherCall = eventDispatcher.call;
        this.logInShow = logInShow;
    }
    render(layout) {
        this.view.render(layout);
        this.view.onSubmitRegister((email, password) => {
            if (!Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["checkPassword"])(password)) {
                this.view.showError('the password must contain at least 8 characters, at least one uppercase letter, '
                    + 'one uppercase letter, one digit, and one special character');
            }
            else if (!Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["validateEmail"])(email)) {
                this.view.showError('email is not correct');
            }
            else {
                _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__["default"].registration({ email, password }).then(() => {
                    _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__["default"].logIn({ email, password }).then((user) => {
                        this.eventDispatcherCall.logger('Welcome');
                        this.eventDispatcherCall.setUser(user);
                        this.view.hide();
                    });
                }).catch((error) => {
                    this.view.showError(error.message);
                });
            }
        });
        this.view.onClickLogIn(() => {
            this.view.hide();
            this.logInShow();
        });
    }
    show() {
        this.view.show();
    }
}
class RegistrationView {
    render(layout) {
        this.registration = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'form', 'registration registration_hide');
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'h2', 'registration__header', 'Registration');
        const labelRegistration = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'label', 'registration-email__description', 'Email');
        this.registrationEmail = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(labelRegistration, 'input', 'registration-email__input');
        this.registrationEmail.type = 'email';
        this.registrationEmail.required = true;
        const labelPassword = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'label', 'registration-password__description', 'Password');
        this.registrationPassword = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(labelPassword, 'input', 'registration-password__input');
        this.registrationPassword.type = 'password';
        this.registrationPassword.required = true;
        this.registrationPasswordError = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'span', 'registration__error');
        const registrationButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'button', 'registration__button', 'Register');
        registrationButton.type = 'submit';
        this.logInButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.registration, 'button', 'registration__button registration__log-in-button', 'LogIn');
    }
    onSubmitRegister(func) {
        this.registration.onsubmit = (event) => {
            event.preventDefault();
            func(this.registrationEmail.value, this.registrationPassword.value);
        };
    }
    onClickLogIn(func) {
        this.logInButton.onclick = func;
    }
    show() {
        this.registration.classList.remove('registration_hide');
    }
    hide() {
        this.registration.classList.add('registration_hide');
    }
    showError(text) {
        this.registrationPasswordError.textContent = text;
        this.registrationPasswordError.classList.add('registration__error_show');
    }
    hideError() {
        this.registrationPasswordError.classList.remove('registration__error_show');
    }
}


/***/ }),

/***/ "./src/Components/Settings.ts":
/*!************************************!*\
  !*** ./src/Components/Settings.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Settings; });
class Settings {
    constructor(eventDispatcherSubscribe) {
        this.settings = Settings.loadSettings() || Settings.defaultSettings();
    }
    getSettings() {
        return this.settings;
    }
    static saveSettings(settings) {
        localStorage.setItem('weather-dos', JSON.stringify(settings));
    }
    static loadSettings() {
        const settings = localStorage.getItem('weather-dos');
        if (settings) {
            return JSON.parse(settings);
        }
        return null;
    }
    static defaultSettings() {
        return {};
    }
}


/***/ }),

/***/ "./src/Components/Start.ts":
/*!*********************************!*\
  !*** ./src/Components/Start.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StartController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _LogIn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LogIn */ "./src/Components/LogIn.ts");


class StartController {
    constructor(eventDispatcher) {
        this.view = new StartView();
        this.logIn = new _LogIn__WEBPACK_IMPORTED_MODULE_1__["default"](eventDispatcher);
    }
    render(layout) {
        this.view.render(layout);
        this.logIn.render(layout);
        this.view.onClickStart(() => {
            this.view.hide();
            this.logIn.show();
        });
    }
}
class StartView {
    render(layout) {
        this.startPage = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'start-page');
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.startPage, 'h1', 'header', 'English puzzle');
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.startPage, 'p', 'start-page__description', 'Click on words, collect phrases');
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.startPage, 'p', 'start-page__description', 'Words can be drag and drop. Select tooltips in the menu');
        this.button = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.startPage, 'button', 'start-page__button', 'Start');
    }
    onClickStart(func) {
        this.button.onclick = () => { func(); };
    }
    show() {
        this.startPage.classList.remove('start-page_hide');
    }
    hide() {
        this.startPage.classList.add('start-page_hide');
    }
}


/***/ }),

/***/ "./src/Utils/DataAdapter.ts":
/*!**********************************!*\
  !*** ./src/Utils/DataAdapter.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataAdapter; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DataAdapter {
    constructor(eventDispatcher) {
        this.eventDispatcherCall = eventDispatcher.call;
    }
    setStartParameters(params) {
        this.params = params;
    }
    static registration(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch('https://afternoon-falls-25894.herokuapp.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (rawResponse.ok) {
                const content = yield rawResponse.json();
                return content;
            }
            const errorText = yield rawResponse.text();
            throw Error(errorText);
        });
    }
    static logIn(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (rawResponse.ok) {
                const content = yield rawResponse.json();
                return content;
            }
            const errorText = yield rawResponse.text();
            throw Error(errorText);
        });
    }
}


/***/ }),

/***/ "./src/Utils/Utils.ts":
/*!****************************!*\
  !*** ./src/Utils/Utils.ts ***!
  \****************************/
/*! exports provided: renderElement, getDistinct, validateURL, randomInteger, checkPassword, validateEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElement", function() { return renderElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistinct", function() { return getDistinct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateURL", function() { return validateURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInteger", function() { return randomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPassword", function() { return checkPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
const renderElement = function renderElement(layout, type, classes, text = undefined) {
    const element = document.createElement(type);
    if (classes)
        element.className = classes;
    if (text)
        element.textContent = text;
    if (layout)
        layout.appendChild(element);
    return element;
};
const onlyUnique = function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
};
const getDistinct = function getDistinct(array) {
    return array.filter(onlyUnique);
};
const validateURL = function validateURL(url) {
    const res = url
        .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
};
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const checkPassword = function CheckPassword(password) {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return !!password.match(decimal);
};
const randomInteger = function randomInteger(max) {
    const random = Math.random() * (max + 1);
    return Math.floor(random);
};



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.ts");

(new _App__WEBPACK_IMPORTED_MODULE_0__["default"]()).Start();


/***/ })

/******/ });
//# sourceMappingURL=script.js.map