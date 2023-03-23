/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import PassChange from "views/admin/profile/components/PassChange";

// Assets
import banner from "assets/img/auth/bannerwb.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";
import Cookies from 'js-cookie';


const User_data = () => {

  const [result, setData] = React.useState(null);

  React.useEffect( async ()=>{

    await fetch("/api/user/info", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
  
    }).then((res) => res.json())
      .then((data) => {
      setData(data)
    }); 
  },[])
  return result;
}



export default function Overview() {

  var res_data = User_data()

  const [user, setUser] = React.useState(null);

  console.log(Cookies.get('user_id'))

  React.useEffect( async ()=>{

    await fetch("/api/user/info/single", {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: Cookies.get('user_id')
      })
      })
      .then((response) => response.json())
      .then((data) => setUser(data));
  },[])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
          {user?<Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          data={user}
          name={res_data?res_data.first_name + ' ' + res_data.last_name:'Imie Nazwisko'}
          job={res_data?res_data.positions :'Stanowisko'}
          // posts='17'
          // followers='9.7k'
          // following='274'
          
        />:""}
        <PassChange/>
      </Grid>
    </Box>
  );
}
