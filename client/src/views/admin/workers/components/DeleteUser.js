// Chakra imports
import { Modal,ModalOverlay,ModalContent, ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Avatar, Box, Flex, Text, useColorModeValue, SimpleGrid,InputGroup, InputRightElement, Button} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select
} from "@chakra-ui/react"
import { RiHomeSmile2Fill } from "react-icons/ri";
async function deleteU(onClose,onOpen,user,refresh,current){

  await fetch("/api/WorkersList/delete", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
        id: user.user_id
      })
    }).then((res) => res.json())
      .then((data) => {
        onClose()
        onOpen(false)
        refresh(1,current)
    }); 

}
export default function DeleteUser(props) {
    const {isOpen, onOpen, user, onClose, refresh,current} = props
    return (
      <>
        <Button colorScheme="red" mr="3" onClick={()=> onOpen(true)}>Usuń</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={()=>onOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Potwierdzenie usunięcia konta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Jest to proces nie odwracalny. Prosimy o rozwagę podejmując się usuwania konta.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={()=>deleteU(onClose,onOpen,user,refresh,current)}>
                Potwierdzam
              </Button>
              <Button onClick={()=>onOpen(false)}>Anuluj</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
