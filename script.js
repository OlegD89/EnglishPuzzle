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
/* harmony import */ var _Components_Start_Start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Start/Start */ "./src/Components/Start/Start.ts");
/* harmony import */ var _Components_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Settings */ "./src/Components/Settings.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");
/* harmony import */ var _Components_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/EventDispatcher */ "./src/Components/EventDispatcher.ts");
/* harmony import */ var _Components_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/Logger */ "./src/Components/Logger.ts");
/* harmony import */ var _Components_Game_Game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/Game/Game */ "./src/Components/Game/Game.ts");







class App {
    constructor() {
        const eventDispatcher = new _Components_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__["EventDispatcher"]();
        this.dataAdapter = new _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_3__["default"](eventDispatcher);
        this.settings = new _Components_Settings__WEBPACK_IMPORTED_MODULE_2__["default"](eventDispatcher.subscribe);
        this.logger = new _Components_Logger__WEBPACK_IMPORTED_MODULE_5__["default"](eventDispatcher.subscribe);
        this.layout = new _Components_Layout__WEBPACK_IMPORTED_MODULE_0__["default"](eventDispatcher.subscribe);
        this.start = new _Components_Start_Start__WEBPACK_IMPORTED_MODULE_1__["default"](eventDispatcher);
        this.game = new _Components_Game_Game__WEBPACK_IMPORTED_MODULE_6__["default"](eventDispatcher);
    }
    Start() {
        const params = this.settings.getSettings();
        this.dataAdapter.setStartParameters(params);
        const page = document.createDocumentFragment();
        const layout = this.layout.render(page);
        this.logger.render(page);
        this.start.render(layout);
        this.game.render(layout);
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
            clickSound: new EventDispatcherBase(),
            clickTranslation: new EventDispatcherBase(),
            clickBackground: new EventDispatcherBase(),
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
    clickSound() {
        this.eventDispatchers.clickSound.call();
    }
    clickTranslation() {
        this.eventDispatchers.clickTranslation.call();
    }
    clickBackground() {
        this.eventDispatchers.clickBackground.call();
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
    clickSound(handler) {
        this.eventDispatchers.clickSound.subscribe(handler);
    }
    clickTranslation(handler) {
        this.eventDispatchers.clickTranslation.subscribe(handler);
    }
    clickBackground(handler) {
        this.eventDispatchers.clickBackground.subscribe(handler);
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

/***/ "./src/Components/Game/Controls.ts":
/*!*****************************************!*\
  !*** ./src/Components/Game/Controls.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ControlsController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _ControlsLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlsLevel */ "./src/Components/Game/ControlsLevel.ts");
/* harmony import */ var _ControlsHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ControlsHelper */ "./src/Components/Game/ControlsHelper.ts");



class ControlsController {
    constructor(eventDispatcher) {
        this.view = new ControlsView();
        this.level = new _ControlsLevel__WEBPACK_IMPORTED_MODULE_1__["default"](eventDispatcher);
        this.helper = new _ControlsHelper__WEBPACK_IMPORTED_MODULE_2__["default"](eventDispatcher);
    }
    render(layout) {
        this.view.render(layout);
        this.level.render(this.view.levelPanel);
        this.helper.render(this.view.helperPanel);
    }
}
class ControlsView {
    render(layout) {
        const controlsPanel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'controls-panel');
        this.levelPanel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(controlsPanel, 'div', 'level-panel');
        this.helperPanel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(controlsPanel, 'div', 'helper-panel');
    }
}


/***/ }),

/***/ "./src/Components/Game/ControlsHelper.ts":
/*!***********************************************!*\
  !*** ./src/Components/Game/ControlsHelper.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ControlsHelperController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");

class ControlsHelperController {
    constructor(eventDispatcher) {
        this.view = new ControlsHelperView();
        this.eventDispatcherCall = eventDispatcher.call;
    }
    render(layout) {
        this.view.render(layout);
        this.view.onClickSpeak(() => {
            this.eventDispatcherCall.clickSound();
        });
        this.view.onClickTranslation(() => {
            this.eventDispatcherCall.clickTranslation();
        });
        this.view.onClickBackground(() => {
            this.eventDispatcherCall.clickBackground();
        });
    }
}
class ControlsHelperView {
    render(layout) {
        this.speak = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'span', 'button-icon button-icon-speak');
        this.translation = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'span', 'button-icon button-icon-tranlate');
        this.background = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'span', 'button-icon button-icon-background');
        this.speak.title = 'Speaking the text';
        this.translation.title = 'Show translation';
        this.background.title = 'Show background image';
    }
    onClickSpeak(func) {
        this.speak.onclick = () => {
            this.speak.classList.add('button-icon_active');
            func();
        };
    }
    onClickTranslation(func) {
        this.translation.onclick = () => {
            this.translation.classList.add('button-icon_active');
            func();
        };
    }
    onClickBackground(func) {
        this.background.onclick = () => {
            this.background.classList.add('button-icon_active');
            func();
        };
    }
}


/***/ }),

/***/ "./src/Components/Game/ControlsLevel.ts":
/*!**********************************************!*\
  !*** ./src/Components/Game/ControlsLevel.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ControlsLevelController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");

class ControlsLevelController {
    constructor(eventDispatcher) {
        this.view = new ControlsLevelView();
    }
    render(layout) {
        this.view.renderLevel(layout, ['1', '2', '3'], '1');
        this.view.renderPage(layout, ['1', '2', '3'], '1');
        this.view.onChangeLevel((index) => {
            debugger;
        });
        this.view.onChangePage((index) => {
            debugger;
        });
    }
}
class ControlsLevelView {
    renderLevel(layout, values, valueChecked) {
        const selectLevelDesc = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'label', 'droplist-label', 'Level');
        this.selectLevel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(selectLevelDesc, 'select', 'droplist droplist-level');
        values.forEach((value) => {
            const element = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.selectLevel, 'option', undefined, value);
            if (value === valueChecked)
                element.selected = true;
        });
    }
    renderPage(layout, values, valueChecked) {
        const selectPageDesc = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'label', 'droplist-label', 'Page');
        this.selectPage = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(selectPageDesc, 'select', 'droplist droplist-page');
        values.forEach((value) => {
            const element = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.selectPage, 'option', undefined, value);
            if (value === valueChecked)
                element.selected = true;
        });
    }
    onChangeLevel(func) {
        this.selectLevel.onchange = () => {
            func(this.selectLevel.selectedIndex);
        };
    }
    onChangePage(func) {
        this.selectLevel.onchange = () => {
            func(this.selectLevel.selectedIndex);
        };
    }
}


/***/ }),

/***/ "./src/Components/Game/Game.ts":
/*!*************************************!*\
  !*** ./src/Components/Game/Game.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controls */ "./src/Components/Game/Controls.ts");
/* harmony import */ var _GamePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GamePanel */ "./src/Components/Game/GamePanel.ts");



class GameController {
    constructor(eventDispatcher) {
        this.view = new GameView();
        this.controls = new _Controls__WEBPACK_IMPORTED_MODULE_1__["default"](eventDispatcher);
        this.gamePanel = new _GamePanel__WEBPACK_IMPORTED_MODULE_2__["default"](eventDispatcher);
        eventDispatcher.subscribe.setUser((user) => {
            this.user = user;
            this.view.show();
        });
    }
    render(layout) {
        this.view.render(layout);
        this.controls.render(this.view.gameLayout);
        this.gamePanel.render(this.view.gameLayout);
    }
}
class GameView {
    render(layout) {
        this.gameLayout = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'game-layout');
    }
    show() {
        this.gameLayout.classList.remove('game_hide');
    }
    hide() {
        this.gameLayout.classList.add('game_hide');
    }
}


/***/ }),

/***/ "./src/Components/Game/GamePanel.ts":
/*!******************************************!*\
  !*** ./src/Components/Game/GamePanel.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GamePanelController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");
/* harmony import */ var _GameRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameRow */ "./src/Components/Game/GameRow.ts");
/* harmony import */ var _GameResource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameResource */ "./src/Components/Game/GameResource.ts");
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Constants/Constants */ "./src/Constants/Constants.ts");
/* harmony import */ var _Constants_Paintings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Constants/Paintings */ "./src/Constants/Paintings.ts");






class GamePanelController {
    constructor(eventDispatcher) {
        this.gameRows = [];
        this.view = new GamePanelView();
        this.resourse = new _GameResource__WEBPACK_IMPORTED_MODULE_3__["default"]();
        eventDispatcher.subscribe.setUser((user) => {
            this.user = user;
        });
        eventDispatcher.subscribe.clickSound(() => {
            this.gameRowActive.soundPlay();
        });
        eventDispatcher.subscribe.clickTranslation(() => {
            this.view.showTranslation(this.gameRowActive.getTextExampleTranslate());
        });
        eventDispatcher.subscribe.clickBackground(() => {
            this.gameRows.forEach((g) => g.renderBackgroundImageWords());
        });
    }
    render(layout) {
        this.view.render(layout);
        this.view.onClickSurrenderButton(() => this.surrender());
        this.view.onClickCheckButton(() => this.checkPossiotions());
        this.view.onClickContinueButton(() => this.success());
        this.view.onClickReverseColorTextButton(() => this.gameRows.forEach((g) => g.reverseColorText()));
        this.view.onPanelResize(() => this.resize());
        this.resourse.render(this.view.getResoursePanel());
        this.load();
    }
    load() {
        this.page = 0;
        _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__["default"].getWords(0, this.page).then((wordsResponse) => {
            this.calcRowHeigth();
            this.wordsResponse = wordsResponse.filter((o) => o.textExample.split(' ').length < 10);
            const isActiveRow = true;
            this.addGameRow(this.wordsResponse[0], isActiveRow);
        }).catch((error) => {
            debugger;
        });
    }
    addGameRow(wordResponse, isActiveRow) {
        const gameRow = new _GameRow__WEBPACK_IMPORTED_MODULE_2__["default"](wordResponse, this.resourse, isActiveRow);
        gameRow.render(this.view.getGamePanel(), this.gameRows.length + 1, this.rowHeight);
        if (isActiveRow)
            this.gameRowActive = gameRow;
        this.gameRows.push(gameRow);
    }
    checkPossiotions() {
        const isCorrect = this.gameRowActive.checkPosition();
        if (!isCorrect)
            return;
        this.view.showContinue();
    }
    surrender() {
        this.gameRowActive.surrender();
        this.view.showContinue();
    }
    success() {
        this.view.hideContinue();
        this.gameRowActive.deactivate();
        this.gameRowActive = undefined;
        if (this.gameRows.length !== _Constants_Constants__WEBPACK_IMPORTED_MODULE_4__["rowCount"]) {
            this.addGameRow(this.wordsResponse[this.gameRows.length], true);
        }
        else {
        }
    }
    resize() {
        this.calcRowHeigth();
        this.gameRows.forEach((g) => g.changeHeight(this.rowHeight));
    }
    calcRowHeigth() {
        const painting = _Constants_Paintings__WEBPACK_IMPORTED_MODULE_5__["default"][this.page];
        const resultPanelHeight = (painting.height / painting.width) * (this.view.getWidthtGamePanel() - _Constants_Constants__WEBPACK_IMPORTED_MODULE_4__["rowNumberWidth"]);
        this.rowHeight = resultPanelHeight / (_Constants_Constants__WEBPACK_IMPORTED_MODULE_4__["rowCount"] + 1);
    }
}
class GamePanelView {
    render(layout) {
        this.translation = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'span', 'game__result-translate');
        this.resultPanel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'game__result-panel');
        this.resoursePanel = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'game__panel');
        const resultButtons = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'game__result-buttons');
        this.surrenderButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resultButtons, 'button', 'game__result-button result-button__surrender', 'I don\'t know');
        this.сontinueButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resultButtons, 'button', 'game__result-button result-button__сontinue game__result-button_hide', 'Continue');
        this.checkButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resultButtons, 'button', 'game__result-button result-button__check', 'Check');
        this.reverseColorTextButton = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resultButtons, 'button', 'game__result-button result-button__helper', 'Reverse color text');
    }
    getGamePanel() {
        return this.resultPanel;
    }
    getResoursePanel() {
        return this.resoursePanel;
    }
    onClickSurrenderButton(func) {
        this.surrenderButton.onclick = func;
    }
    onClickCheckButton(func) {
        this.checkButton.onclick = func;
    }
    onClickContinueButton(func) {
        this.сontinueButton.onclick = func;
    }
    showTranslation(translation) {
        this.translation.textContent = translation;
    }
    showContinue() {
        this.surrenderButton.classList.add('game__result-button_hide');
        this.checkButton.classList.add('game__result-button_hide');
        this.сontinueButton.classList.remove('game__result-button_hide');
    }
    hideContinue() {
        this.surrenderButton.classList.remove('game__result-button_hide');
        this.checkButton.classList.remove('game__result-button_hide');
        this.сontinueButton.classList.add('game__result-button_hide');
    }
    onClickReverseColorTextButton(func) {
        this.reverseColorTextButton.onclick = func;
    }
    getWidthtGamePanel() {
        return this.resultPanel.offsetWidth;
    }
    onPanelResize(func) {
        let width = this.resultPanel.offsetWidth;
        window.addEventListener('resize', () => {
            if (width === this.resultPanel.offsetWidth)
                return;
            width = this.resultPanel.offsetWidth;
            func();
        });
    }
}


/***/ }),

/***/ "./src/Components/Game/GameResource.ts":
/*!*********************************************!*\
  !*** ./src/Components/Game/GameResource.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameResourseController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _GameStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameStorage */ "./src/Components/Game/GameStorage.ts");


class GameResourseController {
    constructor() {
        this.view = new GameResourseView();
    }
    render(resoursePanel) {
        this.view.render(resoursePanel);
    }
    renderWords(words) {
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["shuffle"])(words).forEach((word) => this.view.addWord(word));
    }
}
class GameResourseView {
    render(resoursePanel) {
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resoursePanel, 'div', 'game__row');
        this.resourseLayout = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resoursePanel, 'div', 'game__resourse-layuot');
        this.resourseLayout.onmousedown = (e) => {
            _GameStorage__WEBPACK_IMPORTED_MODULE_1__["default"].setWord(e.target);
        };
        this.resourseLayout.onmouseup = (e) => {
            const source = _GameStorage__WEBPACK_IMPORTED_MODULE_1__["default"].getWord();
            if (!source)
                return;
            const current = e.target;
            if (current === this.resourseLayout) {
                this.resourseLayout.append(source);
            }
            else {
                this.resourseLayout.insertBefore(source, current);
            }
        };
    }
    addWord(word) {
        const span = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.resourseLayout, 'span', 'game__word', word.text);
        span.style.width = `${word.width * 100}%`;
        word.element = span;
    }
}


/***/ }),

/***/ "./src/Components/Game/GameRow.ts":
/*!****************************************!*\
  !*** ./src/Components/Game/GameRow.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameRowController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Constants/Constants */ "./src/Constants/Constants.ts");
/* harmony import */ var _GameStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameStorage */ "./src/Components/Game/GameStorage.ts");



class GameRowController {
    constructor(wordResponse, resource, isActiveRow = false) {
        this.view = new GameRowView();
        this.resource = resource;
        this.wordResponse = wordResponse;
        this.isActiveRow = isActiveRow;
        const text = wordResponse.textExample.replace('<b>', '').replace('</b>', '');
        const textLength = text.replace(/ /g, '').length;
        this.words = text.split(' ')
            .map((word, index) => ({ text: word, index, width: word.length / textLength }));
    }
    render(resultPanel, row, rowHeight) {
        this.row = row;
        this.rowHeight = rowHeight;
        this.view.render(resultPanel, row, rowHeight);
        this.view.onResultResize(() => this.resultResize());
        if (this.isActiveRow) {
            this.view.addEvents();
            this.view.addSound(_Constants_Constants__WEBPACK_IMPORTED_MODULE_1__["fileResource"] + this.wordResponse.audioExample);
            this.resource.renderWords(this.words);
        }
        else {
        }
    }
    reverseColorText() {
        GameRowView.reverseColorText(this.getWordElements());
    }
    checkPosition() {
        return this.view.checkPosition(this.words.map((o) => o.text));
    }
    surrender() {
        this.view.setSuccessPosition(this.getWordElements());
    }
    getTextExampleTranslate() {
        return this.wordResponse.textExampleTranslate;
    }
    renderBackgroundImageWords() {
        this.words.reduce((accumulator, word) => {
            this.view.addBackgroundImageWord(word, accumulator, this.getPostitionY());
            return accumulator + word.width;
        }, 0);
    }
    soundPlay() {
        this.view.soundPlay();
    }
    deactivate() {
        this.isActiveRow = false;
        this.renderBackgroundImageWords();
        this.view.removeEvents();
    }
    changeHeight(rowHeight) {
        this.rowHeight = rowHeight;
        this.view.changeHeight(this.getWordElements(), rowHeight, this.getPostitionY());
    }
    getPostitionY() {
        return `-${this.row * this.rowHeight}px`;
    }
    getWordElements() {
        return this.words.map((word) => word.element);
    }
    resultResize() {
    }
}
class GameRowView {
    render(resultPanel, row, rowHeight) {
        this.resultPanel = resultPanel;
        this.resultRow = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(resultPanel, 'div', 'game__panel game__panel-row');
        this.resultRow.style.height = `${rowHeight}px`;
        Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.resultRow, 'div', 'game__row', row.toString());
        this.resultLayout = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.resultRow, 'div', 'game__result-layuot');
    }
    addEvents() {
        this.resultLayout.onmousedown = (e) => {
            _GameStorage__WEBPACK_IMPORTED_MODULE_2__["default"].setWord(e.target);
        };
        this.resultLayout.onmouseup = (e) => {
            const source = _GameStorage__WEBPACK_IMPORTED_MODULE_2__["default"].getWord();
            if (!source)
                return;
            const current = e.target;
            if (current === this.resultLayout) {
                this.resultLayout.append(source);
            }
            else {
                this.resultLayout.insertBefore(source, current);
            }
        };
    }
    removeEvents() {
        this.resultLayout.onmousedown = undefined;
        this.resultLayout.onmouseup = undefined;
    }
    static reverseColorText(wordElements) {
        if (wordElements[0].classList.contains('game__word_color-reverse')) {
            wordElements.forEach((o) => o.classList.remove('game__word_color-reverse'));
        }
        else {
            wordElements.forEach((o) => o.classList.add('game__word_color-reverse'));
        }
    }
    addBackgroundImageWord(word, startPosition, positionY) {
        word.element.classList.add('puzzle');
        word.element.style.backgroundPositionX = `-${startPosition * this.resultLayout.clientWidth}px`;
        word.element.style.backgroundSize = `${this.resultLayout.clientWidth}px auto`;
        word.element.style.backgroundPositionY = positionY;
    }
    resizeBackgroundImageWord(word, startPosition, positionY) {
        word.element.style.backgroundPositionX = `-${startPosition * this.resultLayout.clientWidth}px`;
        word.element.style.backgroundSize = `${this.resultLayout.clientWidth}px auto`;
        word.element.style.backgroundPositionY = positionY;
    }
    checkPosition(words) {
        let isCorrect = !!this.resultLayout.childNodes.length;
        this.resultLayout.childNodes.forEach((value, index) => {
            value.classList.remove('puzzle');
            value.style.backgroundImage = undefined;
            value.classList.remove('game__word_true', 'game__word_false');
            if (value.textContent === words[index]) {
                value.classList.add('game__word_true');
            }
            else {
                value.classList.add('game__word_false');
                isCorrect = false;
            }
        });
        return isCorrect;
    }
    setSuccessPosition(words) {
        words.forEach((word) => this.resultLayout.append(word));
    }
    addSound(soundUrl) {
        this.speaker = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(this.resultPanel, 'audio', 'game__speaker');
        this.speaker.src = soundUrl;
    }
    soundPlay() {
        this.speaker.play();
    }
    changeHeight(wordElements, rowHeight, positionY) {
        this.resultRow.style.height = `${rowHeight}px`;
        wordElements.forEach((wordElement) => {
            wordElement.style.backgroundPositionY = positionY;
        });
    }
    onResultResize(func) {
        let width = this.resultLayout.offsetWidth;
        window.addEventListener('resize', () => {
            if (width === this.resultLayout.offsetWidth)
                return;
            width = this.resultLayout.offsetWidth;
            func();
        });
    }
}


/***/ }),

/***/ "./src/Components/Game/GameStorage.ts":
/*!********************************************!*\
  !*** ./src/Components/Game/GameStorage.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GameStorage {
    static setWord(word) {
        this.currentWord = word;
    }
    static getWord() {
        const word = this.currentWord;
        this.currentWord = undefined;
        return word;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (GameStorage);


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

/***/ "./src/Components/Start/LogIn.ts":
/*!***************************************!*\
  !*** ./src/Components/Start/LogIn.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogInController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");
/* harmony import */ var _Registraion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Registraion */ "./src/Components/Start/Registraion.ts");



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
        this.logInEmail.value = 'test3@te.st';
        this.logInPassword.value = 'Test999&';
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

/***/ "./src/Components/Start/Registraion.ts":
/*!*********************************************!*\
  !*** ./src/Components/Start/Registraion.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegistrationController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _Utils_DataAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/DataAdapter */ "./src/Utils/DataAdapter.ts");


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

/***/ "./src/Components/Start/Start.ts":
/*!***************************************!*\
  !*** ./src/Components/Start/Start.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StartController; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./src/Utils/Utils.ts");
/* harmony import */ var _LogIn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LogIn */ "./src/Components/Start/LogIn.ts");


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
        this.startPage = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(layout, 'div', 'start-page start-page_hide');
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

/***/ "./src/Constants/Constants.ts":
/*!************************************!*\
  !*** ./src/Constants/Constants.ts ***!
  \************************************/
/*! exports provided: fileResource, rowCount, rowNumberWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileResource", function() { return fileResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rowCount", function() { return rowCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rowNumberWidth", function() { return rowNumberWidth; });
const fileResource = 'https://raw.githubusercontent.com/olegd89/rslang-data/master/';
const rowCount = 10;
const rowNumberWidth = 20;



/***/ }),

/***/ "./src/Constants/Paintings.ts":
/*!************************************!*\
  !*** ./src/Constants/Paintings.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const paintings = [
    {
        src: 'assets/paintings/NinthWave.jpg',
        description: 'Ivan Aivazovsky. The Ninth Wave. 1850',
        translate: 'Иван Айвазовский. Девятый вал. 1850',
        width: 2027,
        height: 1338,
    },
    {
        src: 'assets/paintings/SeaKoktebel.jpg',
        description: 'Ivan Aivazovsky. Sea. Koktebel. 1853',
        translate: 'Иван Айвазовский. Море. Коктебель. 1853',
        width: 1531,
        height: 1080,
    },
];
/* harmony default export */ __webpack_exports__["default"] = (paintings);


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
    static getUserWords(user) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            const rawResponse = yield fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId.id}/words`, {
                method: 'GET',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    Accept: 'application/json',
                },
            });
            debugger;
            if (rawResponse.ok) {
                const content = yield rawResponse.json();
                return content;
            }
            const errorText = yield rawResponse.text();
            throw Error(errorText);
        });
    }
    static getWords(group, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`);
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
/*! exports provided: renderElement, getDistinct, validateURL, randomInteger, checkPassword, validateEmail, shuffle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElement", function() { return renderElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistinct", function() { return getDistinct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateURL", function() { return validateURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInteger", function() { return randomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPassword", function() { return checkPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
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
const shuffle = function shuffle(arrayInput) {
    const array = [...arrayInput];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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