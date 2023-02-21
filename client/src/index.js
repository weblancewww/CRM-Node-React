import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
    console.log(logged)
  }
  ReactDOM.render(
    <ChakraProvider theme={theme}>
        <ThemeEditorProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </ThemeEditorProvider>
      
    </ChakraProvider>,
    document.getElementById("root")
  );
  // ReactDOM.render(
  //   <ChakraProvider theme={theme}>
  //       <ThemeEditorProvider>
  //         <BrowserRouter>
  //         <Switch>
  //             <Route path={`/admin`} component={AdminLayout}  />
  //             {/* <Redirect from='/auth/sign-in' to='/admin/panel' push={true} /> */}
  //             <Redirect from='/' to='/admin/panel'  />
  //             <Redirect from='*' to='/admin/panel'  />
  //         </Switch>
  //         </BrowserRouter>
  //       </ThemeEditorProvider>
  //   </ChakraProvider>,
  //   document.getElementById("root")
  // );
});


