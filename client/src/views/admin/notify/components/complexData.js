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

  import SelectMulti from "react-select";

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
  
  // Assets

  export default function ColumnsTable(props) {
    const { columnsData, tableData, ref, refresh,pages, setOpenAdd, current, setCurrent } = props;
    console.log(tableData)
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

    const options = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ];

    const customStyles = {
      control: (provided) => ({
        ...provided,
        backgroundColor: colorMode === "light" ? "gray.100" : "gray.700",
        borderRadius: "16px",
      border: `1px solid gray.100`,
  
        boxShadow: "none",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? colorMode === "light"
            ? "blue.100"
            : "blue.700"
          : "transparent",
        color: state.isSelected ? "white" : "inherit",
        ":hover": {
          backgroundColor: state.isSelected
            ? colorMode === "light"
              ? "blue.100"
              : "blue.700"
            : colorMode === "light"
            ? "gray.200"
            : "gray.600",
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: colorMode === "light" ? "blue.100" : "blue.700",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: "white",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: "white",
        ":hover": {
          backgroundColor: "transparent",
          color: "inherit",
        },
      }),
    };

    const handleChange = (selectedOptions) => {
      console.log(selectedOptions); // Log the selected options to the console
    };

    const [isOpen, setOpen] = React.useState(false);
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
            Lista powiadomień
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
              <MenuItem onClick={() => setOpen(true)}>Dodaj powiadomienie</MenuItem>
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
                <Tr  _hover={{ bg: colorMode === "light" ? "gray.200" : "navy.400" }} cursor="pointer" {...row.getRowProps()} key={index}>
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


      <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj powiadomienie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl id="first-name" isRequired mb={3}>
                <FormLabel>Tytuł</FormLabel>
                <Input placeholder="Imię pracownika" defaultValue={data.first_name} borderRadius="16px" />
              </FormControl>
              <FormControl id="first-name" isRequired mb={3}>
                <FormLabel>Wiadomość</FormLabel>
                <Input placeholder="Imię pracownika" defaultValue={data.first_name} borderRadius="16px" />
              </FormControl>
              <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} gap="5">
                <FormControl id="first-name" isRequired mb={3}>
                  <FormLabel>Rozpoczęcie</FormLabel>
                  <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  borderRadius="16px"
                  />
                </FormControl>
                <FormControl id="first-name" isRequired mb={3}>
                  <FormLabel>Zakończenie</FormLabel>
                  <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  borderRadius="16px"
                  />
                </FormControl>
             
              </SimpleGrid>
              <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} gap="5">
                <FormControl id="first-name" isRequired mb={3}>
                  <FormLabel>Rozpoczęcie</FormLabel>
                  <SelectMulti
                  bg={colorMode === "light" ? "green" : "blue"}
      options={options}
      isMulti
      onChange={handleChange}
      styles={customStyles}
    />
                </FormControl>
                <FormControl id="first-name" isRequired mb={3}>
                  <FormLabel>Zakończenie</FormLabel>
                  <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  borderRadius="16px"
                  />
                </FormControl>
             
              </SimpleGrid>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={() => setOpen(false)}>
              Anuluj
            </Button>
            <Button variant="ghost">Dodaj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Card>
    );
  }
  