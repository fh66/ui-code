import utils from './utils.js';
const param = {
    utils: utils,
    header: {
        height: 60
    },
    footer: {
        height: 62
    },
    systemInfo: {
        statusHeight: 0, // 手机状态栏高度
        MBBCR_width: 0, // 胶囊宽度
        navigatorHeight: 60
    },
    webType: utils.webType,
}
const install = function (Vue, opts = { statusHeight: 0, MBBCR_width: 0, navigatorHeight: 50, taro: null }) {
    param.systemInfo.MBBCR_width = opts.MBBCR_width;
    param.systemInfo.statusHeight = opts.statusHeight;
    param.systemInfo.navigatorHeight = opts.navigatorHeight;
    param.header.height = Number(opts.navigatorHeight || '60') + Number(opts.statusHeight || '0');
    Vue.prototype.$GMMParam = param;
    // if (opts.taro) {
    //     param.utils.webType = opts.taro.getEnv();
    // }
}
export default { install }
export { param, utils };