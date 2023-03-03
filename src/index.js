import param from './utils/param.js';
import Col from '../packages/col/index.js';
import Row from '../packages/row/index.js';
import Button from '../packages/button/index.js';
import Icon from '../packages/icon/index.js';
import Cell from '../packages/cell/index.js';
import CellGroup from '../packages/cell-group/index.js';
import Image from '../packages/image/index.js';
import Toast from '../packages/toast/index.js';
import CardContainer from '../packages/card-container/index.js';
import RootAnchor from '../packages/root-anchor/index.js';
import Input from '../packages/input/index.js';
import Loading from '../packages/loading/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import Popup from '../packages/popup/index.js';
import Overlay from '../packages/overlay/index.js';
import Search from '../packages/search/index.js';
import Rate from '../packages/rate/index.js';
import Stepper from '../packages/stepper/index.js';
import Select from '../packages/select/index.js';
const components = [
    Col,
    Row,
    Button,
    Icon,
    Cell,
    CellGroup,
    Image,
    Toast,
    CardContainer,
    RootAnchor,
    Input,
    Loading,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Popup,
    Overlay,
    Search,
    Rate,
    Stepper,
    Select
];
const install = function (Vue, opts = {}) {
    Vue.use(param);
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$toast = Toast;
};
export default {
    install,
    Col,
    Row,
    Button,
    Icon,
    Cell,
    CellGroup,
    Image,
    Toast,
    CardContainer,
    RootAnchor,
    Input,
    Loading,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Popup,
    Overlay,
    Search,
    Rate,
    Stepper,
    Select
};
