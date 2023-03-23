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
import InvoicesList from "views/admin/invoices/components/invoices_list";


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
import {
  columnsDataCheck,
} from "views/admin/invoices/config/columns";
import tableDataCheck from "views/admin/invoices/config/data.json";

import { useDisclosure } from "@chakra-ui/react"





// Assets

import React from "react";

export default function Invoices() {


    const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "navy.800");


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
          <InvoicesList columnsData={columnsDataCheck} tableData={tableDataCheck}/>
      </SimpleGrid>      
    </Box>

    
    
    
  );
}
