import { useEffect } from "react";
import { Switch, Route } from "react-router";
import Page1 from "./components/page1/page1";
import Page2 from "./components/page2/page2";

export default function PageRouter() {
   return (
      <Switch>
         <Route path='/page1' component={Page1} />
         <Route path='/page2' component={Page2} />
      </Switch>
   )
}
