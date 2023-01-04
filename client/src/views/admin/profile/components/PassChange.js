// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue, SimpleGrid} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";
import { Input, InputGroup, InputRightElement, Button, FormControl} from "@chakra-ui/react"

export default function PassChange() {

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  
  
  const [show1, setShow1] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const [show3, setShow3] = React.useState(false)
  const handleClick1 = () => setShow1(!show1)
  const handleClick2 = () => setShow2(!show2)
  const handleClick3 = () => setShow3(!show3)

const changePass = async () => {
    var old_pass = document.getElementById('old_pass')
    var new_pass = document.getElementById('new_pass')
    var repeat_new_pass = document.getElementById('repeat_new_pass')
    var error_message = document.getElementById('error_message')

    if(!old_pass.value || !new_pass.value || !repeat_new_pass.value){
        error_message.innerHTML = 'Usupełnij wszystkie pola'
        return
    }

    if(old_pass.value == new_pass.value) {
        error_message.innerHTML = 'Nowe hasło musi być różne od aktualnego'
        return
    }

    if(repeat_new_pass.value != new_pass.value) {
        error_message.innerHTML = 'Hasła nie są identyczne'
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
        // setData(data)
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
        Tutaj możesz zmienić hasło jeśli tego potrzebujesz bo swoje ustawiłeś zbyt proste tumanie.
      </Text>

      <FormControl>
        
    
      <InputGroup size="lg" mb="20px">
      <Input id="old_pass"
        pr="4.5rem"
        type={show1 ? "text" : "password"}
        placeholder="Podaj aktualne hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick1} borderRadius="10px">
          {show1 ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>

    <InputGroup size="lg" mb="20px">
      <Input id="new_pass"
        pr="4.5rem"
        type={show2 ? "text" : "password"}
        placeholder="Podaj nowe hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick2} borderRadius="10px">
          {show2 ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>

    <InputGroup size="lg" mb="20px">
      <Input id="repeat_new_pass"
        pr="4.5rem"
        type={show3 ? "text" : "password"}
        placeholder="Powtórz nowe hasło"
        borderRadius="16px"
      />
      <InputRightElement width="4.5rem" borderRadius="16px">
        <Button h="1.75rem" size="sm" onClick={handleClick3} borderRadius="10px">
          {show3 ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>


    <Flex justifyContent={"right"} gap="30px">
        <Text 
        // color={"red.600"} 
        color={"green.600"}
        fontSize='sm'
        fontWeight='500'
        id="error_message"
        >
        Kominikat błędu
        </Text>
        <Button onClick={changePass} width="30%" variant="brand">Save</Button>
    </Flex>
    
    </FormControl>
      
      
    </Card>
  );
}
