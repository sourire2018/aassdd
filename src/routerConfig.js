
import Home from './pages/Home';

import Nodes from './pages/Nodes';

import Transactions from './pages/Transactions';

import Contracts from './pages/Contracts';
import Chains from './pages/Chains';
import Blocks from './pages/Blocks';
import Dashboard from './pages/Dashboard';
import SourireT from './layouts/SourireT/src';
import jstalayout from './layouts/jstalayout/src';
const routerConfig = [
  {
    path: '/',
    layout: jstalayout,
    component: Nodes,
  },
  {
    path: '/transactions',
    layout: jstalayout,
    component: Transactions,
  },
  {
    path: '/contracts',
    layout: jstalayout,
    component: Contracts,
  },
  {
    path: '/channels',
    layout: jstalayout,
    component: Chains,
  },
  {
    path: '/blocks',
    layout: jstalayout,
    component: Blocks,
  },
 
];

export default routerConfig;
