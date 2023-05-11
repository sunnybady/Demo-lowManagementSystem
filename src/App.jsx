import React from 'react';
import Index from "./layout/Index";
import Login from './views/login/Index'

import { HashRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    // 路由模式
    <HashRouter>
      {/* 路由出口 */}
      <Switch>
        <Route exact path='/login' component={Login}></Route>
        {/* exact : 精确匹配路由 */}
        {/* V6 <Route exact path='/' element={<Index />}></Route> */}
        {/* V5 <Route exact path='/' component={Index}></Route> */}
        <Route path='/' component={Index}></Route>

      </Switch>
    </HashRouter>
  );
};

export default App;