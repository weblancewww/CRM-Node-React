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
import Banner from "views/admin/workers/components/Banner";
import BannerAdd from "views/admin/workers/components/BannerAdd";
// Custom components
import banner from "assets/img/auth/bannerwb.png";
import ComplexTable from "views/admin/workers/components/complexData";
import DeleteUser from "views/admin/workers/components/DeleteUser";


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
  console.log(id)
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

export default function Workers() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const addRef = React.useRef()
  const [current, setCurrent] = React.useState(10)
  const [message, setMessage] = React.useState(null)

  const columnsWorkers = [
    {
      Header: "user_id",
      accessor: "user_id",
    },
    {
      Header: "Imię",
      accessor: "first_name",
    },
    {
      Header: "Nazwisko",
      accessor: "last_name",
    },
    {
      Header: "Ostatnie logowanie",
      accessor: "date",
    },
    {
      Header: "Postęp tygodniowy",
      accessor: "progress",
    },
    {
        Header: "Rola",
        accessor: "role_name",
      },
      {
        Header: "Akcje",
        accessor: "actions",
      },
  ];


    const [users, setData] = React.useState(null);
    const [isOpen2, onOpen2] = React.useState(false)

  
  

    const GetWorkers = async (pg,limit) => {
        console.log(pg)
        await fetch("/api/WorkersList", {
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
        .then((data) => setData(data));
    

    }
    React.useEffect( async () => {
    await GetWorkers(1,current)
    }, []);

    
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);

    const handleOpen = async (id,setButtonText) => {
      
      try {
        
        await fetch("/api/user/info/single/id", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify({
            id: id
          })
          })
          .then((response) => response.json())
          .then((data) => setUser(data));
        onOpen();
        setButtonText(false)
      } catch (error) {
        console.error(error);
      }

      try {
        await fetch("/api/user/info/roles", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          })
          .then((response) => response.json())
          .then((data) => setRoles(data));
      } catch (error) {
        console.error(error);
      }
      setLoading(false)
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
        {users?
        <ComplexTable
          columnsData={columnsWorkers}
          tableData={users.data}
          pages={users.pages}
          onOpen={handleOpen}
          loading={loading}
          refresh={GetWorkers}
          setOpenAdd={setOpenAdd}
          current={current}
          setCurrent={setCurrent}
        />
        :""}
      </SimpleGrid>      
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xl"}
        
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader>Edytuj profil pracownika</DrawerHeader>
          <DrawerBody>
            <Banner
              gridArea='1 / 1 / 2 / 2'
              banner={banner}
              roles={roles}
              data={user}
            />
          </DrawerBody>
          <DrawerFooter>
          <DeleteUser
            isOpen={isOpen2}
            onOpen={onOpen2}
            user={user}
            onClose={onClose}
            refresh={GetWorkers}
            current={current}
          />
            <Button variant="outline" mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button colorScheme="brand" onClick={() => {saveData(user,setMessage,GetWorkers,current,onClose)}}>Zapisz</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={openAdd}
        placement="right"
        onClose={() => setOpenAdd(false)}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dodaj pracownika</DrawerHeader>
          <DrawerBody>
          <BannerAdd
              gridArea='1 / 1 / 2 / 2'
              banner={banner}
            />
          </DrawerBody>
          <DrawerFooter>
            
            <Button variant="outline" mr={3} onClick={() => setOpenAdd(false)}>
              Zamknij
            </Button>
            <Button colorScheme="brand" onClick={() => addData(setOpenAdd,GetWorkers,current)}>Zapisz</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>

    
    
    
  );
}
