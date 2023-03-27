// Chakra imports
import { Avatar,useDisclosure, Box, Flex, Button,Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerContentProps, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useColorModeValue, SimpleGrid} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";
import BannerEdit from "views/admin/profile/components/BannerEdit";


async function saveData(id,onClose){
  console.log(id)
  var user_name = document.getElementById("first-name").value;
  var user_lastname = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  console.log(user_name);


  await fetch("/api/data/update/user", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
        data: {
          first_name:user_name,
          last_name: user_lastname,
          email:email,
        },
        id: id.user_id 
      })
    }).then((res) => res.json())
      .then((data) => {
        onClose()
        console.log(data)
        console.log("UPDATED")
    }); 
}

export default function Banner(props) {
  const { banner,data, name, job, user} = props;
  // Chakra Color Mode

  const [imageUrl, setImageUrl] = React.useState("");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  console.log(data)


  React.useEffect(() => {
    if(data != null) {
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
    }
  }, []);

  console.log(imageUrl)


  


  const { isOpen, onOpen, onClose } = useDisclosure()
  


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
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px' mb='20px'>
        {name}
      </Text>
  
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Poziom dostępu'
          value={data.roles_name}
        />
        <Information
          boxShadow={cardShadow}
          title='Adres e-mail'
          value={data.email}
        />
        <Information
          boxShadow={cardShadow}
          title='Numer telefonu'
          value={data.phone}
        />
        <Information
          boxShadow={cardShadow}
          title='Prywatny numer telefonu'
          value={data.phone_private}
        />
        <Information
          boxShadow={cardShadow}
          title='Prywatny adres e-mail'
          value={data.email_private}
        />
        <Information
          boxShadow={cardShadow}
          title='Adres'
          value={data.buss}
        />
      </SimpleGrid>
      <Flex justifyContent={"right"} mt="20px">
        <Button width="130px" variant="brand" onClick={() => {onOpen()}}>Zmień dane</Button>
    </Flex>
    <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"xl"}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edytuj profil pracownika</DrawerHeader>
          <DrawerBody>
            <BannerEdit
              gridArea='1 / 1 / 2 / 2'
              banner={banner}
              data={data}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button colorScheme="brand" onClick={() => {saveData(data,onClose)}}>Zapisz</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
    
  );
}
