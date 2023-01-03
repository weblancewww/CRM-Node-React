import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

function requireAuth(nextState, replace, next) {
  const authenticated = false;
  if (!authenticated) {
    console.log('aldls')
    replace({
      pathname: "/auth/sign-in",
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}

ReactDOM.render(
  <ChakraProvider theme={theme}>
    
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} render={requireAuth}  />
            <Route path={`/admin`} component={AdminLayout} render={requireAuth} />
            <Route path={`/rtl`} component={RTLLayout} render={requireAuth}  />
            <Redirect from='/' to='/admin/panel'  />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    
  </ChakraProvider>,
  document.getElementById("root")
);
