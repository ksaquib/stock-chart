import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import LiveChart from "./components/LiveChart";
const routes = [
  { path: "/", name: "Dashboard", Component: Dashboard },
  { path: "/home", name: "Home", Component: Home },
  {
    path: "/live-charts",
    name: "Live Charts",
    Component: LiveChart,
  },
];
function App() {
  return (
    <Switch>
      {routes.map(({ path, name, Component }) => (
        <Route exact path={path} component={Component} key={name} />
      ))}
    </Switch>
  );
}

export default App;
