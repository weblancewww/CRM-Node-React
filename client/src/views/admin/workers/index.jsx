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
// Custom components
import banner from "assets/img/auth/banner.png";
import WorkersList from "views/admin/workers/components/WorkersList";
import ComplexTable from "views/admin/workers/components/complexData";


import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input
} from "@chakra-ui/react"

import Card from "components/card/Card";



import { useDisclosure } from "@chakra-ui/react"




// Assets

import React from "react";


export default function Workers() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

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
        accessor: "roles",
      },
      {
        Header: "Akcje",
        accessor: "actions",
      },
  ];


    const [users, setData] = React.useState(null);
    const GetWorkers = async (pg) => {
        console.log(pg)
        await fetch("/api/WorkersList", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          page: parseInt(pg)
        })
        
        })
        .then((res) => res.json())
        .then((data) => setData(data));
    

    }
    React.useEffect( async () => {
    await GetWorkers(1)
    }, []);


    const [user, setUser] = React.useState(null);

    const handleOpen = async (id) => {
      try {
        const response = await fetch("/api/user/info/single", {
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
      } catch (error) {
        console.error(error);
      }
    };

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
          tableData={users}
          onOpen={handleOpen}
          refresh={GetWorkers}
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edytuj profil pracownika</DrawerHeader>
          <DrawerBody>
            <Banner
              gridArea='1 / 1 / 2 / 2'
              banner={banner}
              data={user}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button colorScheme="brand">Zapisz</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>

    
    
    
  );
}
