import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";




fetch("/api/auth/session", {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  }}).then((res) => res.json())
.then((data) => {
  var logged = false;
  if(data.session){
    logged = true
  }
  ReactDOM.render(
    <ChakraProvider theme={theme}>
        <ThemeEditorProvider>
        <HashRouter>
          {logged?
          <Switch>
              <Route path={`/admin`} component={AdminLayout}  />
              <Redirect from='/auth/sign-in' to='/admin/panel' push={true} />
              <Redirect from='/' to='/admin/panel'  />
              <Redirect from='*' to='/admin/panel'  />
          </Switch>:
          <Switch>
              <Route path={`/auth`} component={AuthLayout}  />
              <Redirect to='/auth/sign-in' push={true} />
              <Redirect from='/' to='/auth/sign-in'  />
              <Redirect from='*' to='/auth/sign-in'  />
            </Switch>}
            </HashRouter>
        </ThemeEditorProvider>
      
    </ChakraProvider>,
    document.getElementById("root")
  );
});


