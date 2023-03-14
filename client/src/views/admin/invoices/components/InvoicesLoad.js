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
    useColorMode,
    SimpleGrid,
    
  } from "@chakra-ui/react";

  import MultiSelect from "react-select";

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
    Wrap,
    Select,
    WrapItem,
    Box,
    Modal,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    Input,
    FormControl,
    FormLabel
  } from "@chakra-ui/react"

  import {  ChevronDownIcon } from '@chakra-ui/icons'
  
  // Custom components
  import Card from "components/card/Card";
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  import io from 'socket.io-client';
  const awaited = async (pag, refresh, setCurrent, current,selectedOption) => {
    setCurrent(pag);
    await refresh(pag,selectedOption)
  }



  
  
  function Pagination(totalPages,refresh, setCurrent, current, selectedOption) { 
    const renderPageButtons = () => {
      const buttons = [];
  
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
          size="sm"
            key={i}
            variant={i === current ? "solid" : "outline"}
            onClick={() => awaited(i, refresh, setCurrent, "", selectedOption)}
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
  

  export default function ColumnsTable(props) {
    const { columnsData, tableData, ref, refresh,pages, setOpenAdd, current, setCurrent } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const [memoryLimit, setMemoryLimit] = React.useState(localStorage.getItem('limit')?localStorage.getItem('limit'):10);
    const [selectedOption, setSelectedOption] = React.useState(memoryLimit);
    const handleOptionChange = async (event) => {
      console.log(event.target.value)
      localStorage.setItem('limit', event.target.value);
      setSelectedOption(event.target.value);
      await refresh(1,event.target.value)
      
    };
  
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
    const { colorMode, toggleColorMode } = useColorMode();

  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Wrap spacing={4} px='25px' gap='20px' mb='20px' >
      <WrapItem style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box minW="200px" >
        <Text minW='200px'
            
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            Lista wszystkich faktur
          </Text>
        </Box>
      </WrapItem>
      <WrapItem>
        <Box minW="70px">
          {data?"":<Spinner />}
          <Select minW='100px' value={selectedOption} width={"80px"} onChange={handleOptionChange}>
            <option>10</option>
            <option>30</option>
            <option>50</option>
            <option>100</option>
          </Select>
        </Box>
      </WrapItem>
      <WrapItem>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Akcje
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => {}}>Dodaj powiadomienie</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </WrapItem>
    </Wrap>
    
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
                <Tr onClick={() => {}}  _hover={{ bg: colorMode === "light" ? "gray.200" : "navy.400" }} cursor="pointer" {...row.getRowProps()} key={index}>
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
                            <Button  colorScheme="brand" >
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
        {Pagination(pages,refresh,setCurrent, current,selectedOption)}
      </Card>
    );
  }
  