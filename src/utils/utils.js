/*
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gm-ui-code\src\utils\utils.js
 */
import Taro from '@tarojs/taro';
const utils = {
    webType: Taro.getEnv(),
    taro: Taro,
    dom: {
        // 获取元素
        get(cid) {
            return new Promise((resolve, reason) => {
                if (cid) {
                    if (utils.taro){
                        const query = utils.taro.createSelectorQuery();
                        query.select(cid).boundingClientRect();
                        query.selectViewport().scrollOffset();
                        query.exec(function (res) {
                            resolve(res);
                        });
                    }
                } else {
                    reason('请传入标识');
                }
            });
        }
    }
};
export default utils;