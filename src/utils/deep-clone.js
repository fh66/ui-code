import { isDef } from './validate';
export function deepClone(obj) {
    if (!isDef(obj)) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(function (item) {
            return deepClone(item);
        });
    }

    if (typeof obj === 'object') {
        let to = {};
        Object.keys(obj).forEach(function (key) {
            to[key] = deepClone(obj[key]);
        });
        return to;
    }

    return obj;
}