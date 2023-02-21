// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"

// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function WorkersList(props) {

  const [message, setMessage] = React.useState(false);
  const [messageType, setMessageType] = React.useState(false);
  

  const addUser = async () => {
    const inputs = document.querySelectorAll(".addUserInputs")
    var error_message = document.getElementById('error_message')

    var is_empty = false

    inputs.forEach(element => {
      if(!element.value){
        is_empty = true
        return 
      }
      
    });
    if(is_empty){
      setMessage('Uzupełnij wszystkie pola!')
      setMessageType('error')
        return
    }
    var inputValues = []
    inputs.forEach(e=>{
      inputValues[e.name] = e.value
    })
    console.log(inputValues)
    await fetch("/api/WorkersList/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        first_name: inputValues['first_name'],
        last_name: inputValues['last_name'],
        email: inputValues['email'],
        password: inputValues['password'],
        positions: inputValues['positions']
      })
  
    }).then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        setMessageType(data.type)
        if(data.type =="success") {
          GetWorkers()
          inputs.forEach(e=>{
            e.value = ""
         })
        }
        
    }); 
     
  }


  const deleteById = async (id) => {
    
    if(!window.confirm('Czy na pewno chcesz usunąć?')){
      return
    }
     console.log(id)
    
    await fetch("/api/WorkersList/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
          user_id:id
        })
  
    }).then((res) => res.json())
      .then((data) => {
      GetWorkers()

      onOpen()
      // console.log(data.message)
      document.getElementById('message-id').innerHTML = data.message

    }); 

    
}
const { isOpen, onOpen, onClose } = useDisclosure()
const {     
  isOpen: isOpenAdd,    
  onOpen: onOpenAdd,    
  onClose: onCloseAdd  } = useDisclosure()
    

  const [users, setData] = React.useState(null);
  const GetWorkers = async () => {
  
     await fetch("/api/WorkersList", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  

  }
  React.useEffect( async () => {
  GetWorkers()
  }, []);

  const { title, ranking, link, image, ...rest } = props;
  // Chakra Color Mode
  
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p='14px'>
        <div><Button onClick={onOpenAdd} variant="brand">Dodaj nowego pracownika</Button></div>
      <Table variant="simple">
  <TableCaption>Lista pracowników</TableCaption>
  <Thead>
    <Tr>
      <Th>Id</Th>
      <Th>Imie Nazwisko</Th>
      <Th>Email</Th>
      <Th>Stanowisko</Th>
      <Th>Akcje</Th>
    </Tr>
  </Thead>
  <Tbody>
  {users? users.map((user) => (
          <Tr>
              <Td>{user.user_id}</Td>
              <Td>{user.first_name + ' ' +user.last_name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.positions}</Td>
              <Td>
                <Flex gap={"20px"} >
              <Button 
              variant="brand"
              >
                Edytuj
                </Button>
              <Button 
              colorScheme="red"
              onClick={() => {deleteById(user.user_id)}}
              >
                Usuń
              </Button>
              </Flex>
              </Td>
          </Tr>
          )):""
        }
  </Tbody>
  
</Table>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuwanie użytkownika</ModalHeader>
          <ModalCloseButton />
          <ModalBody id="message-id">
          
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Zamknij
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodawanie nowego użytkownika</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex gap={"20px"} flexDirection="column">
          <Input className="addUserInputs" type="text" name="first_name" placeholder="Imie" size="md" borderRadius="14px" />
          <Input className="addUserInputs" type="text" name="last_name" placeholder="Nazwisko" size="md" borderRadius="14px" />
          <Input className="addUserInputs" type="email" name="email" placeholder="Email" size="md" borderRadius="14px" />
          <Input className="addUserInputs" type="password" name="password" placeholder="Hasło" size="md" borderRadius="14px" />
          <Input className="addUserInputs" type="text" name="positions" placeholder="Stanowisko" size="md" borderRadius="14px" />
          </Flex>
          </ModalBody>
          <ModalFooter>
          <Text 
            // color={"red.600"} 
            mr={"20px"}
            color={messageType=="success"?"green.600":messageType=="error"?"red.600":""}
            fontSize='sm'
            fontWeight='500'
            id="error_message"
            >
            {message?message:""}
          </Text >
          <Button colorScheme="brand" mr={3} onClick={addUser}>
              Dodaj
            </Button>
            <Button  variant="ghost" mr={3} onClick={onCloseAdd}>
              Zamknij
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>




  );
}
