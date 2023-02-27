import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Button,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React, { useMemo, forwardRef } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";

  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Stack,
    Spinner,
    Select
  } from "@chakra-ui/react"

  import {  ChevronDownIcon } from '@chakra-ui/icons'
  
  // Custom components
  import Card from "components/card/Card";
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  const awaited = async (pag, refresh, setCurrent, current) => {
    setCurrent(pag);
    await refresh(pag)
  }

  
  
  function Pagination(totalPages,refresh, setCurrent, current) { 
    const renderPageButtons = () => {
      const buttons = [];
  
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
          size="sm"
            key={i}
            variant={i === current ? "solid" : "outline"}
            onClick={() => awaited(i, refresh, setCurrent)}
          >
            {i}
          </Button>
        );
      }
      return buttons;
    };
  
    return (
      <Stack direction="row" spacing={2} padding={3}>
        {renderPageButtons()}
      </Stack>
    );
  }
  
  // Assets

  export default function ColumnsTable(props) {
    const { columnsData, tableData, ref,onOpen, refresh } = props;
    const [current, setCurrent] = React.useState(1)
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 5;

    const consolelog = () => {console.log("TEST2")}
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' gap='20px' mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            Lista pracowników
          </Text>
          {data?"":<Spinner />}
          <Select width={"80px"}>
        <option>10</option>
        <option>30</option>
        <option>50</option>
        <option>100</option>
      </Select>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Akcje
            </MenuButton>
            <MenuList>
              <MenuItem onClick={consolelog}>Dodaj nowego pracownika</MenuItem>
              <MenuItem>Pobierz wykaz godzin</MenuItem>
              <MenuItem>Pobierz wykaz płac</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr onClick={() => onOpen(row.cells[0].value)} {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "photo") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                      } else {
                        data = (
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                        )
                      }
                      if (cell.column.id === "actions") {
                        data = (
                            <Button  colorScheme="brand" onClick={() => onOpen(row.cells[0].value)}>
                            Opcje
                          </Button>
                        )
                      }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        width={cell.column.id === "actions"?{ sm: "50px", md: "50px", lg: "50px" }:{ sm: "150px", md: "200px", lg: "auto" }}
                        
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {Pagination(10,refresh,setCurrent, current)}
      </Card>
    );
  }
  