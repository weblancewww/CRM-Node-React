// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton

} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import { Badge } from "@chakra-ui/react"
export default function HeaderLinks(props) {
  const { secondary } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");

  const logout = () =>{
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }}).then((res) => res.json())
    .then((data) => {
      window.location.href = "/"
    })
  }


  const [imageUrl, setImageUrl] = React.useState("");
  const [username, setUsername] = React.useState("");

  
  React.useEffect(() => {
    fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }}).then((res) => res.json())
    .then((data) => {
        setUsername(data.user.user_name)
        fetch(`/data/images/${data.user.photo}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.blob())
          .then((blob) => {
            console.log(blob)
            setImageUrl(URL.createObjectURL(blob));
            console.log(imageUrl)
          })
          .catch((error) => {
            console.log(error);
          });
    });
  }, []);

  const [alerts, setAlerts] = React.useState(null);

  React.useEffect(() => {
    // Connect to the Socket.io server
    const socket = io();

    // Listen for initial data payload from server
    socket.on('alerts', (data) => {
      setAlerts(data);
      setCounts(data.length)
      console.log(data)
    });
    // Disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    }
  }, []);

  const sender = () => {
    const socket = io();

    // Listen for initial data payload from server

    // Disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    }
  }
  const [counts, setCounts] = React.useState(0)

  const components = [];
  if(alerts){
  for (let i = 0; i < alerts.length; i++) {
    var alert = alerts[i]
    components.push(
      <Alert status={alert.notify_type} mb="2" borderRadius="10px">
        <AlertIcon />
        <Box>
        <AlertTitle>{alert.notify_title}</AlertTitle>
        <AlertDescription>{alert.notify_text}</AlertDescription>
        </Box>
      </Alert>
    );
  }
}


  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      justifyContent='space-between'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      borderRadius='15px'
      boxShadow={shadow}>
      <SidebarResponsive routes={routes} />
      <Box>
      <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      justifyContent='end'
      flexDirection='row'
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      >
        <Box cursor="pointer" mr={3}
         ref={btnRef}
         onClick={onOpen}
         >
        <Flex justify="center" >
      <Icon
         
            mt='3px'
            as={MdNotificationsNone}
            color={navbarIcon}
            w='18px'
            h='18px'
          />
            <Box height="10px">{counts}</Box>
            </Flex>
          </Box>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader onClick={() => sender()}>Powiadomienia</DrawerHeader>

          <DrawerBody
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "gray.300",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray.500",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "gray.600",
              },
            },
          }}>
            
            {components}
            
          </DrawerBody>

          <DrawerFooter>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ThemeEditor navbarIcon={navbarIcon} /> 

      <Menu>
        <MenuButton p='0px'>
        <Avatar
        mx='auto'
        src={imageUrl}
        h='40px'
        w='40px'
      />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'>
          <Flex w='100%' mb='0px'>
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}>
              👋&nbsp; Witaj {username}
            </Text>
          </Flex>
          <Flex flexDirection='column' p='10px'>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius='8px'
              px='14px'>
              <NavLink to="/admin/profile"><Text fontSize='sm'>Ustawienia profilu</Text></NavLink>
            </MenuItem>
            {/*<MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius='8px'
              px='14px'>
              <Text fontSize='sm'>Newsletter Settings</Text>
</MenuItem>*/}
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color='red.400'
              borderRadius='8px'
              px='14px'
              onClick={logout}>
              <Text fontSize='sm'>Wyloguj się</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      </Flex>
      </Box>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
