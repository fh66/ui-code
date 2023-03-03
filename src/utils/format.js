import { isDef,isNumeric } from './validate';

export function addUnit(value) {
    if (isDef(value)) {
        return isNumeric(value) ? `${value}px` : String(value);
    }
    return undefined;
}
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, _char, regExp) {
    var index = value.indexOf(_char);
    var prefix = '';

    if (index === -1) {
        return value;
    }

    if (_char === '-' && index !== 0) {
        return value.slice(0, index);
    }

    if (_char === '.' && value.match(/^(\.|-\.)/)) {
        prefix = index ? '-0' : '0';
    }

    return prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(value, allowDot, allowMinus) {
    if (allowDot === void 0) {
        allowDot = true;
    }

    if (allowMinus === void 0) {
        allowMinus = true;
    }

    if (allowDot) {
        value = trimExtraChar(value, '.', /\./g);
    } else {
        value = value.split('.')[0];
    }

    if (allowMinus) {
        value = trimExtraChar(value, '-', /-/g);
    } else {
        value = value.replace(/-/, '');
    }

    var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, '');
} // add num and avoid float number

export function addNumber(num1, num2) {
    var cardinal = Math.pow(10, 10);
    return Math.round((num1 + num2) * cardinal) / cardinal;
}
var rootFontSize;

function getRootFontSize() {
    if (!rootFontSize) {
        const doc = document.documentElement;
        const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
        rootFontSize = parseFloat(fontSize);
    }

    return rootFontSize;
}
function convertRem(value) {
    value = value.replace(/rem/g, '');
    return +value * getRootFontSize();
}

function convertVw(value) {
    value = value.replace(/vw/g, '');
    return +value * window.innerWidth / 100;
}

function convertVh(value) {
    value = value.replace(/vh/g, '');
    return +value * window.innerHeight / 100;
}

export function unitToPx(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (value.indexOf('rem') !== -1) {
        return convertRem(value);
    }
    if (value.indexOf('vw') !== -1) {
        return convertVw(value);
    }
    if (value.indexOf('vh') !== -1) {
        return convertVh(value);
    }
    return parseFloat(value);
}