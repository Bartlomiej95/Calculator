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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);


const ADDITION_ID = 'js-addition'
const BACK_ID = 'js-back';
const CANCEL_ID = 'js-cancel';
const CLEAR_ID = 'js-clear';
const COMMA_ID = 'js-comma';
const DISPLAY_ID = 'js-display';
const DIVIDE_ID = 'js-divide';
const EQUAL_ID = 'js-equal';
const FRACTION_ID = 'js-fraction';
const INVERT_ID = 'js-invert';
const MEMORY_ADD_ID = 'js-M+';
const MEMORY_CLEAR_ID = 'js-MC';
const MEMORY_MINUS_ID = 'js-M-';
const MEMORY_READ_ID = 'js-MR';
const MEMORY_SET_ID = 'js-MS';
const MULTIPLY_ID = 'js-multiply';
const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const NUMBER_OF_NUMBERS_IN_KEYBOARD = 10;
const PERCENT_ID = 'js-percent';
const POWER_TO = 'js-power';
const SUBSTRACTION_ID = 'js-substraction';
const SQUARE_ID = 'js-square';



class Calculator {
    constructor() {
        this.memoryValue = 0;
        this.displayValue = '0';
        this.previousValue = null;
        this.selectedFunction = null;
        this.isFunctionDone = false;
        this.repeatedValue = 0;
        this.wasEqualClicked = false;
        this.wasSpecialFunctionClicked = false;
        this.historyValues = [];
        this.historyOneValue = null;

        this.bindToDisplay();
        this.bindToNumbers();
        this.bindToButtons();

        this.historyCalculator = document.querySelector('.calculator__history-list')
    }


    bindToDisplay() {
        const display = document.getElementById(DISPLAY_ID);

        if (!display) {
            throw ('Nie znaleziono elementu dla wyświetlacza');
        }

        display.textContent = this.displayValue;
        this.display = display;

    }

    bindToNumbers() {
        const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

        if (numbers.length !== 10) {
            console.log("W klawiaturze brakuje cyfr")
        }

        numbers.forEach(number => number.addEventListener('click', event => this.concatenateNumber(event)))
    }

    bindToButtons() {
        this.bindFunctionToButton(MEMORY_CLEAR_ID, () => this.memoryClear());
        this.bindFunctionToButton(MEMORY_READ_ID, () => this.memoryRead());
        this.bindFunctionToButton(MEMORY_ADD_ID, () => this.memoryAdd());
        this.bindFunctionToButton(MEMORY_MINUS_ID, () => this.memoryMinus());
        this.bindFunctionToButton(MEMORY_SET_ID, () => this.memorySet());
        this.bindFunctionToButton(CLEAR_ID, () => this.clear());
        this.bindFunctionToButton(ADDITION_ID, () => this.addition());
        this.bindFunctionToButton(CANCEL_ID, () => this.cancel());
        this.bindFunctionToButton(SUBSTRACTION_ID, () => this.substraction());
        this.bindFunctionToButton(EQUAL_ID, () => this.equal());
        this.bindFunctionToButton(MULTIPLY_ID, () => this.multiplication());
        this.bindFunctionToButton(DIVIDE_ID, () => this.divide());
        this.bindFunctionToButton(INVERT_ID, () => this.inversion());
        this.bindFunctionToButton(BACK_ID, () => this.back());
        this.bindFunctionToButton(PERCENT_ID, () => this.percent());
        this.bindFunctionToButton(SQUARE_ID, () => this.square());
        this.bindFunctionToButton(COMMA_ID, () => this.addComma());
        this.bindFunctionToButton(POWER_TO, () => this.power());
        this.bindFunctionToButton(FRACTION_ID, () => this.fraction());

    }

    bindFunctionToButton(id, callback) {
        const elementDOM = document.getElementById(id)

        if (!elementDOM) {
            console.warn(`Nie znaleziono elementu o id ${id}`)

            return;
        }
        elementDOM.addEventListener('click', () => callback());

    }

    concatenateNumber(event) {
        this.displayValue = this.displayValue === null || this.displayValue === '0' || this.wasSpecialFunctionClicked ?
            event.target.textContent :
            this.displayValue + event.target.textContent;

        if (this.wasEqualClicked) {
            this.previousValue = 0;
            this.repeatedValue = 0;
            this.wasEqualClicked = false;
        }

        this.wasSpecialFunctionClicked = false;
        this.isFunctionDone = false;
        this.display.textContent = this.displayValue;

    }

    memoryClear() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = 0;
    }

    memoryRead() {
        this.wasSpecialFunctionClicked = true;
        this.changeDisplayValue(this.memoryValue);
    }

    memoryAdd() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = this.memoryValue + Number(this.displayValue);
    }

    memoryMinus() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = this.memoryValue - Number(this.displayValue);
    }

    memorySet() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = Number(this.displayValue);
    }

    clear() {
        this.previousValue = null;
        this.selectedFunction = null;
        this.repeatedValue = 0;
        this.changeDisplayValue(null);
        this.clearHistory();
    }

    cancel() {
        this.previousValue = null;
        this.selectedFunction = 0;
        this.changeDisplayValue(null);
        this.clearHistory();
    }

    clearHistory() {
        this.historyValues = [];
        this.historyOneValue = null;
        this.historyCalculator.innerHTML = '';
    }

    addition(hasRepeatedValue) {

        this.callPreviousFunctionAndAssignNew(this.addition, hasRepeatedValue)

        if (this.isFunctionDone) {
            this.setValuesForIsFunctionDone();
            return;
        }
        let [historyPreviousValue, historyOneValue] = this.asssignValuesToHistoryCalculator(this.repeatedValue);
        const displayValue = Number(this.display.textContent);
        const previousValue = hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);
        const newValue = displayValue + previousValue;

        this.getRepeatedValue(hasRepeatedValue, newValue);

        this.setValuesAfterSettingNewValue(newValue);
        let historyResultValue = newValue.toString() === historyOneValue ? '' : newValue;

        this.history(historyPreviousValue, historyOneValue, historyResultValue, '+')

    }

    substraction(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.substraction, hasRepeatedValue)

        if (this.isFunctionDone) {
            this.setValuesForIsFunctionDone();
            return;
        }
        let [historyPreviousValue, historyOneValue] = this.asssignValuesToHistoryCalculator(this.repeatedValue);
        const displayValue = Number(this.display.textContent);
        const previousValue = hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);
        let newValue;

        if (previousValue !== null) {
            newValue = hasRepeatedValue ?
                displayValue - this.repeatedValue :
                previousValue ? previousValue - displayValue : displayValue;
            this.getRepeatedValue(hasRepeatedValue, newValue)

        }

        this.setValuesAfterSettingNewValue(newValue);
        let historyResultValue = newValue.toString() === historyOneValue ? '' : newValue;

        this.history(historyPreviousValue, historyOneValue, historyResultValue, '-')
    }

    multiplication(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.multiplication, hasRepeatedValue)

        if (this.isFunctionDone) {
            this.setValuesForIsFunctionDone();
            return;
        }
        let [historyPreviousValue, historyOneValue] = this.asssignValuesToHistoryCalculator(this.repeatedValue);
        const displayValue = Number(this.display.textContent);
        const previousValue = hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);
        const newValue = displayValue * previousValue;

        this.getRepeatedValue(hasRepeatedValue, newValue);

        this.setValuesAfterSettingNewValue(newValue);
        let historyResultValue = newValue.toString() === historyOneValue ? '' : newValue;

        this.history(historyPreviousValue, historyOneValue, historyResultValue, '*')
    }

    divide(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.divide, hasRepeatedValue)

        if (this.isFunctionDone) {
            this.setValuesForIsFunctionDone();
            return;
        }

        let [historyPreviousValue, historyOneValue] = this.asssignValuesToHistoryCalculator(this.repeatedValue);

        const displayValue = Number(this.display.textContent);
        const previousValue = hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);
        const newValue = hasRepeatedValue ?
            displayValue / this.repeatedValue :
            previousValue === 0 ?
            displayValue :
            previousValue / displayValue

        this.getRepeatedValue(hasRepeatedValue, newValue)
        this.setValuesAfterSettingNewValue(newValue);


        let historyResultValue = newValue.toString() === historyOneValue ? '' : newValue;

        this.history(historyPreviousValue, historyOneValue, historyResultValue, '/')

    }

    asssignValuesToHistoryCalculator(repeatedValue) {

        let historyPreviousValue = repeatedValue;
        let historyOneValue = this.display.textContent;
        return [historyPreviousValue, historyOneValue]

    }

    history(historyPreviousValue, historyOneValue, historyResultValue = '', sign) {

        if (historyResultValue !== '') {
            this.historyOneValue = `${historyPreviousValue} ${sign} ${historyOneValue} =`;
        } else {
            this.historyOneValue = `${historyOneValue}`
        }

        if (historyResultValue) {
            this.historyValues.push(this.historyOneValue);
            this.historyValues.push(historyResultValue.toString());
            this.historyCalculator.textContent = this.historyValues;
        }

        let historyValuesSplitElements = this.historyCalculator.textContent.split(',');

        let divHistoryElements = historyValuesSplitElements.map(elem => {
            const divElement = document.createElement('div');
            divElement.textContent = elem;
            this.historyCalculator.appendChild(divElement);
            return divElement;
        });
        //usunięcie pierwszego dziecka, które jest stringiem łączącym wszystkie działania
        this.historyCalculator.removeChild(this.historyCalculator.firstChild);
        console.log(typeof divHistoryElements)
    }


    equal() {
        this.isFunctionDone = false;
        if (!this.wasEqualClicked) {
            this.selectedFunction(false)
        } else {
            this.selectedFunction(true)
        }

        this.wasEqualClicked = true;
    }

    percent() {
        this.callSpecialFn(this.previousValue * this.displayValue / 100);

    }

    square() {
        const valueToSqrt = this.wasEqualClicked ? Number(this.display.textContent) : this.displayValue;

        this.callSpecialFn(Math.sqrt(valueToSqrt));

    }

    power() {
        this.callSpecialFn(this.displayValue * this.displayValue);
    }

    fraction() {
        this.callSpecialFn(1 / this.displayValue);
    }


    callSpecialFn(value) {
        this.wasSpecialFunctionClicked = true;
        this.wasEqualClicked = false;
        this.changeDisplayValue(value);
    }

    inversion() {
        this.changeDisplayValue(this.displayValue >= 0 ? -Math.abs(this.displayValue) : Math.abs(this.displayValue))
    }

    back() {
        this.changeDisplayValue(this.displayValue ? this.displayValue.slice(0, -1) : null);
    }

    addComma() {
        if (!this.display.textContent.includes('.')) {
            this.changeDisplayValue(`${this.displayValue ? this.displayValue : 0}.`)
        }
    }

    callPreviousFunctionAndAssignNew(currentFunction, hasRepeatedValue) {
        if (this.selectedFunction !== currentFunction && this.selectedFunction) {
            this.selectedFunction(hasRepeatedValue);
        }

        this.selectedFunction = currentFunction;
    }

    setValuesForIsFunctionDone() {

        this.repeatedValue = Number(this.previousValue);
        this.displayValue = '0';
        this.wasEqualClicked = false;

    }

    getRepeatedValue(hasRepeatedValue, newValue) {

        this.repeatedValue = hasRepeatedValue ?
            this.repeatedValue :
            this.wasEqualClicked ?
            newValue :
            Number(this.display.textContent);
    }

    setValuesAfterSettingNewValue(newValue) {
        this.isFunctionDone = true;
        this.wasEqualClicked = false;
        this.displayValue = null;
        this.display.textContent = this.previousValue !== null ? newValue : Number(this.display.textContent);
        this.previousValue = this.previousValue !== null ? newValue : Number(this.display.textContent);
    }


    changeDisplayValue(value) {
        //isNoValue potrzebne gdy funkcją back skasujemy ostatnia cyfre, to mmusimy obsłużyc tez pustego stringa
        const isNoValue = value === null || value === '';

        this.displayValue = value;
        this.display.textContent = isNoValue ? '0' : value.toString();

    }
}

new Calculator();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"calculator":"calculator","calculator__main-part-container":"calculator__main-part-container","calculator__history-container":"calculator__history-container","calculator__history-list":"calculator__history-list","calculator__display":"calculator__display","calculator__memory-container":"calculator__memory-container","calculator__memory-button":"calculator__memory-button","calculator__buttons-container":"calculator__buttons-container","calculator__button":"calculator__button","calculator__button--is-lighter":"calculator__button--is-lighter"};

/***/ })
/******/ ]);