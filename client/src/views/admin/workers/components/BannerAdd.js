// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue, SimpleGrid,InputGroup, InputRightElement, Button} from "@chakra-ui/react";
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
// import PassChange from "views/admin/workers/components/PassChange";
export default function BannerAdd(props) {
  const { banner, avatar} = props;

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={""}
        // onClick={handleClick}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {/* {name} */}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
      </Text>
      <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} gap='20px'>
        <FormControl id="first-name-add" isRequired>
          <FormLabel>Imię pracownika</FormLabel>
          <Input placeholder="Imię pracownika" borderRadius="16px" />
        </FormControl>
        <FormControl id="last-name-add" isRequired>
          <FormLabel>Nazwisko pracownika</FormLabel>
          <Input placeholder="Nazwisko pracownika" borderRadius="16px" />
        </FormControl>
        <FormControl id="email-add" isRequired>
          <FormLabel>Adres e-mail</FormLabel>
          <Input placeholder="Adres e-mail" borderRadius="16px" />
        </FormControl>
        <FormControl id="position-add" isRequired>
          <FormLabel>Prawa dostępowe</FormLabel>
          <Select placeholder="wybierz poziom dostępu" borderRadius="16px" >
            <option value="10">Administrator</option>
            <option value="7">Pracownik</option>
          </Select>
        </FormControl>     
        <FormControl id="password-add" isRequired>
          <FormLabel>Hasło</FormLabel>
          <InputGroup size='md'>
            <Input
            borderRadius="16px"
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Wprowadź hasło'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Ukryj' : 'Pokaż'}
              </Button>
            </InputRightElement>
          </InputGroup>  
        </FormControl>     
        
      </SimpleGrid>
    </Card>
  );
}
