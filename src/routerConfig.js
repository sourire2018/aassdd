// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Home from './pages/Home';

import Nodes from './pages/Nodes';

import Transactions from './pages/Transactions';

import Contracts from './pages/Contracts';
import Chains from './pages/Chains';
import Blocks from './pages/Blocks';
import Dashboard from './pages/Dashboard';
import SourireT from './layouts/SourireT/src';
const routerConfig = [
  {
    path: '/',
    layout: SourireT,
    component: Dashboard,
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
  {
    path: '/contracts',
    layout: SourireT,
    component: Contracts,
  },
  {
    path: '/channels',
    layout: SourireT,
    component: Chains,
  },
  {
    path: '/blocks',
    layout: SourireT,
    component: Blocks,
  },
 
];

export default routerConfig;
