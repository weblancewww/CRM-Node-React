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
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import InvoicesLoad from "views/admin/invoices/components/InvoicesLoad";
import React from "react";

const columnsInvoices = [
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



export default function Settings() {

  const [current, setCurrent] = React.useState(10)
  const [invoices, setInvoices] = React.useState({});

  const GetInvoices = async (pg,limit) => {
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
      .then((data) => {
        setInvoices(data)
        console.log(data,invoices)
      });


  }
  React.useEffect( async () => {
  await GetInvoices(1,current)
  }, []);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <InvoicesLoad
          columnsData={columnsInvoices}
          tableData={invoices.data}
          pages={invoices.pages}
          refresh={GetInvoices}
          current={current}
          setCurrent={setCurrent}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        
      </SimpleGrid>
    </Box>
  );
}
