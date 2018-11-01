// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Home from './pages/Home';

import Nodes from './pages/Nodes';

import Transactions from './pages/Transactions';

import SourireT from './layouts/SourireT/src';
const routerConfig = [
  {
    path: '/',
    layout: SourireT,
    component: Home,
  },
  {
    path: '/nodes',
    layout: SourireT,
    component: Nodes,
  },
  {
    path: '/transactions',
    layout: SourireT,
    component: Transactions,
  },
];

export default routerConfig;
