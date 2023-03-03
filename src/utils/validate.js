export const isDef = (val) => val !== undefined && val !== null; // 判断是否是定义的
export const isNumeric = (val) => typeof val === 'number' || /^\d+(\.\d+)?$/.test(val); // 判断是否是数字
export const isObject = (val) => typeof val === 'object' && val !== null; // 判断是否是对象
export const isPromise = (val) => isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'; // 判断是否是promise
export const isFunction = (val) => typeof val === 'function'; // 判断是否是函数
export const isString = (val) => typeof val === 'string'; // 判断是否是字符串
export const isBoolean = (val) => typeof val === 'boolean'; // 判断是否是布尔值
export const isRegExp = (val) => Object.prototype.toString.call(val) === '[object RegExp]'; // 判断是否是正则
export const isDate = (val) => Object.prototype.toString.call(val) === '[object Date]'; // 判断是否是日期
export const isNull = (val) => val === null; // 判断是否是null
export const isUndefined = (val) => val === undefined; // 判断是否是undefined
export const isWindow = (val) => typeof window !== 'undefined' && Object.prototype.toString.call(val) === '[object Window]'; // 判断是否是window
export const isElement = (val) => typeof HTMLElement !== 'undefined' && val instanceof HTMLElement && val.nodeType === 1; // 判断是否是元素
export const isPlainObject = (val) => Object.prototype.toString.call(val) === '[object Object]'; // 判断是否是纯对象
export const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData; // 判断是否是FormData
export const isFile = (val) => Object.prototype.toString.call(val) === '[object File]'; // 判断是否是文件
export const isBlob = (val) => Object.prototype.toString.call(val) === '[object Blob]'; // 判断是否是Blob
export const isURLSearchParams = (val) => typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams; // 判断是否是URLSearchParams
