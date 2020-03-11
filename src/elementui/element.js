import Vue from 'vue'
import { 
    Input, 
    Button, 
    Form, 
    FormItem, 
    Row,
    Col,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Tooltip,
    Pagination,
    DatePicker,
    MessageBox
} from 'element-ui'

Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(DatePicker)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm