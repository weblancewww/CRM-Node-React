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
import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
// Custom components
import ComplexTable from "views/admin/notify/components/complexData";


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"

import { useDisclosure } from "@chakra-ui/react"





// Assets

import React from "react";

async function saveData(id,setMessage,refresh,current,onClose){
  var user_name = document.getElementById("first-name").value;
  var user_lastname = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  var perms = document.getElementById("position").value;
  console.log(user_name);


  await fetch("/api/data/update/user", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
        data: {
          first_name:user_name,
          last_name: user_lastname,
          email:email,
          positions: perms,
        },
        id: id.user_id 
      })
    }).then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        refresh(1,current)
        onClose()
        console.log("UPDATED")
    }); 
}


async function addData(setOpenAdd,refresh,current){
  var user_name = document.getElementById("first-name-add").value;
  var user_lastname = document.getElementById("last-name-add").value;
  var email = document.getElementById("email-add").value;
  var perms = document.getElementById("position-add").value;
  var password = document.getElementById("password-add").value;

  console.log({
    first_name:user_name,
    last_name: user_lastname,
    email:email,
    positions: perms,
    password: password
  })
  await fetch("/api/WorkersList/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
        data: {
          first_name:user_name,
          last_name: user_lastname,
          email:email,
          positions: perms,
          password: password
        }
      })
    }).then((res) => res.json())
      .then((data) => {
        setOpenAdd(false)
        refresh(1,current)
        console.log("ADDED")
    }); 
}

export default function Notify() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const addRef = React.useRef()
  const [current, setCurrent] = React.useState(10)
  const [message, setMessage] = React.useState(null)

  const columnsWorkers = [
    {
      Header: "ID",
      accessor: "notify_id",
    },
    {
      Header: "Tytuł",
      accessor: "notify_title",
    },
    {
      Header: "Wiadomość",
      accessor: "notify_text",
    },
    {
      Header: "Data rozpoczęcia",
      accessor: "notify_date_from",
    },
    {
      Header: "Data zakończenia",
      accessor: "notify_date_to",
    },
    {
        Header: "Rola",
        accessor: "notify_role",
      },
      {
        Header: "Akcje",
        accessor: "actions",
      },
  ];


    const [users, setData] = React.useState(null);
    const [isOpen2, onOpen2] = React.useState(false)

  
  

    const GetNotify = async (pg,limit) => {
        console.log(pg)
        await fetch("/api/notifyList", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          page: parseInt(pg),
          limit: limit
        })
        
        })
        .then((res) => res.json())
        .then((data) => setNotify(data));
    

    }
    React.useEffect( async () => {
    await GetNotify(1,current)
    }, []);

    
    const [notify, setNotify] = React.useState(null);
    const [openAdd, setOpenAdd] = React.useState(false);

    const handleOpen = async (id) => {
      try {
        await fetch("/api/user/info/single", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify({
            id: id
          })
          })
          .then((response) => response.json())
          .then((data) => setNotify(data));
        onOpen();
      } catch (error) {
        console.error(error);
      }
    };

    const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "navy.800");


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      
      <Grid
        mb='20px'
        // templateColumns={{
        //   base: "1fr",
        //   lg: "repeat(2, 1fr)",
        //   "2xl": "1.34fr 1.62fr 1fr",
        // }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
    
      </Grid>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {notify?
        <ComplexTable
          columnsData={columnsWorkers}
          tableData={notify.data}
          pages={notify.pages}
          onOpen={handleOpen}
          refresh={GetNotify}
          setOpenAdd={setOpenAdd}
          current={current}
          setCurrent={setCurrent}
        />
        :""}
      </SimpleGrid>      
    </Box>

    
    
    
  );
}
