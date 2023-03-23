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

  const [imageUrl, setImageUrl] = React.useState("");
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(data.user_id,selectedFile)

    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("user_id", data.user_id);
    console.log(formData);
    fetch("/api/data/users/avatar_new", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((data) => {
        setImageUrl(URL.createObjectURL(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(data.photo)
  React.useEffect(() => {
    fetch(`/data/images/${data.photo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob)
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleClick = () => {
    fileInputRef.current.click();
  };
  
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
        src={imageUrl}
        onClick={handleClick}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
        <input type="file" name="avatar" ref={fileInputRef} onChange={handleFileChange} hidden/>
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
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
           
      </SimpleGrid>
    </Card>
  );
}
