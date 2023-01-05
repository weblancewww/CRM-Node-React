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

import { Button, ButtonGroup } from "@chakra-ui/react"

// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function WorkersList(props) {

  



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
const { isOpenAdd, onOpenAdd, onCloseAdd } = useDisclosure()
    onOpenAdd()

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
          <ModalHeader>Błąd</ModalHeader>
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
          <ModalHeader>Błąd</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onCloseAdd}>
              Zamknij
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>




  );
}
