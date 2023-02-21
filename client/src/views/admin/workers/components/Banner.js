// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue, SimpleGrid} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select
} from "@chakra-ui/react"
import PassChange from "views/admin/workers/components/PassChange";
export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following, data } = props;
  // Chakra Color Mode
  console.log(data)
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
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        admin
      </Text>
      <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} gap='20px'>
        <FormControl id="first-name" isRequired>
          <FormLabel>Imię pracownika</FormLabel>
          <Input placeholder="Imię pracownika" defaultValue={data.first_name} borderRadius="16px" />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Nazwisko pracownika</FormLabel>
          <Input placeholder="Nazwisko pracownika" defaultValue={data.last_name} borderRadius="16px" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Adres e-mail</FormLabel>
          <Input placeholder="Adres e-mail" defaultValue={data.email} borderRadius="16px" />
        </FormControl>
        <FormControl id="position" isRequired>
          <FormLabel>Prawa dostępowe</FormLabel>
          <Select placeholder="wybierz poziom dostępu" borderRadius="16px" defaultValue={data.positions}>
            <option value="10">Administrator</option>
            <option value="7">Pracownik</option>
          </Select>
        </FormControl>     
      </SimpleGrid>
      <PassChange
        id={data.user_id}
      />

    </Card>
  );
}
