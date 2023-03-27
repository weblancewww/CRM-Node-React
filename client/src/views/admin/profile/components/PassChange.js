// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue, SimpleGrid} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import { Input, InputGroup, InputRightElement, Button, FormControl, FormLabel} from "@chakra-ui/react"

export default function PassChange() {

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  const [show1, setShow1] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const [show3, setShow3] = React.useState(false)
  const handleClick1 = () => setShow1(!show1)
  const handleClick2 = () => setShow2(!show2)
  const handleClick3 = () => setShow3(!show3)


  const [message, setMessage] = React.useState(false);
  const [messageType, setMessageType] = React.useState(false);
const changePass = async () => {
    var old_pass = document.getElementById('old_pass')
    var new_pass = document.getElementById('new_pass')
    var repeat_new_pass = document.getElementById('repeat_new_pass')
    var error_message = document.getElementById('error_message')
    
    if(!old_pass.value || !new_pass.value || !repeat_new_pass.value){
        setMessage('Uzupełnij wszystkie pola')
        setMessageType('error')
        return
    }

    if(old_pass.value == new_pass.value) {
        setMessage('Nowe hasło musi być różne od aktualnego')
        setMessageType('error')
        return
    }

    if(repeat_new_pass.value != new_pass.value) {
        setMessage('Hasła nie są identyczne')
        setMessageType('error')
        return
    }


    await fetch("/api/auth/changePassword", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            old_pass:old_pass.value,
            new_pass: new_pass.value,
            repeat_new_pass:repeat_new_pass.value,
          })
    
      }).then((res) => res.json())
        .then((data) => {
          setMessage(data.message)
          setMessageType(data.type)
          if(data.type=="success"){
            old_pass.value = ""
            new_pass.value = ""
            repeat_new_pass.value = ""
            setTimeout(()=>{
              setMessage("")
            }, 4000)
          }
      }); 
    
}



  return (
    
    <Card mb={{ base: "0px", lg: "20px" }}>

        <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Zmiana hasła
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Tutaj możesz zmienić hasło jeśli tego potrzebujesz.
      </Text>

      <FormControl>
        
      <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Aktualne hasło<Text color={brandStars}>*</Text>
            </FormLabel>
      <InputGroup size="md" mb="20px">

      <Input id="old_pass"
        pr="4.5rem"
        type={show1 ? "text" : "password"}
        placeholder="Podaj aktualne hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick1} borderRadius="10px">
          {show1 ? "Ukryj" : "Pokaż"}
        </Button>
      </InputRightElement>
    </InputGroup>
    <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Nowe hasło<Text color={brandStars}>*</Text>
            </FormLabel>
    <InputGroup size="md" mb="20px">
      <Input id="new_pass"
        pr="4.5rem"
        type={show2 ? "text" : "password"}
        placeholder="Podaj nowe hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick2} borderRadius="10px">
          {show2 ? "Ukryj" : "Pokaż"}
        </Button>
      </InputRightElement>
    </InputGroup>
    <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Potwierdź nowe hasło<Text color={brandStars}>*</Text>
            </FormLabel>
    <InputGroup size="md" mb="20px">
      <Input id="repeat_new_pass"
        pr="4.5rem"
        type={show3 ? "text" : "password"}
        placeholder="Potwierdź nowe hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick3} borderRadius="10px">
          {show3 ?"Ukryj" : "Pokaż"}
        </Button>
      </InputRightElement>
    </InputGroup>


    <Flex justifyContent={"right"} gap="30px">
        <Text 
        // color={"red.600"} 
        color={messageType=="success"?"green.600":messageType=="error"?"red.600":""}
        fontSize='sm'
        fontWeight='500'
        id="error_message"
        >
        {message?message:""}
        </Text>
        <Button onClick={changePass} width="30%" variant="brand">Zmień hasło</Button>
    </Flex>
    
    </FormControl>
      
      
    </Card>
  );
}
