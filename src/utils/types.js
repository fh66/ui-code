import Vue from 'vue';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
export function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isVNode(node) {
    return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
}


let isFunction = (functionToCheck) => {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

if (typeof /./ !== 'function' && typeof Int8Array !== 'object' && (Vue.prototype.$isServer || typeof document.childNodes !== 'function')) {
    isFunction = function(obj) {
        return typeof obj === 'function' || false;
    };
}

export {
    isFunction
};

export const isUndefined = (val)=> {
    return val === void 0;
};

export const isDefined = (val) => {
    return val !== undefined && val !== null;
};
