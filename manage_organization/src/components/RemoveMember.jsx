import React from "react";
import Header from "./chakra/Header";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Grid,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  SimpleGrid
} from "@chakra-ui/react";
import { useState } from "react";
import { Octokit } from "@octokit/core";
import NotificationAlert from "./chakra/NotificationAlert"

import config from "../config.js"

const RemoveMember = () => {
  const [username, setUsername] = useState({
    username: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = () => {
    console.log(`Remove ${username}`);
    removeMember(username);
  };

  const removeMember = async (memberUsername) => {
    const octokit = new Octokit({
      auth: config.GITHUB_KEY,
    });

    try {
      const response = await octokit.request(
        `DELETE /orgs/on-boarding-off-boarding/members/${memberUsername}`,
        {
          org: "on-boarding-off-boarding",
          username: memberUsername,
        }
      );
      setShowAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <Box
        bgImage="url('https://media.istockphoto.com/vectors/office-workers-are-made-up-of-parts-of-the-whole-working-on-the-vector-id1166643289?k=6&m=1166643289&s=612x612&w=0&h=K4VAJ-hsg14l0UR_06PUZHyxVgixVBs8sBwhT_RgH3c=')"
        bgPosition="center"
        bgRepeat="no-repeat"
        backgroundSize="100%"
        padding="23%"
        opacity="5%"
      ></Box>

      

      <SimpleGrid columns={[1,1,3]} spacing="10px" mt="-30%">
        <Box bg="tomato" width={["90%", "60%", "100%"]}  margin="auto" ></Box>
        <Box bg="white" p="5" width={["100%", "60%", "100%"]} boxShadow="base" margin="auto" >
        {showAlert ? (
          <NotificationAlert alertType="warning" alertText="Remove Member Successfully"/>
        ) : (
          <h1></h1>
        )}
        <FormControl id="email">
          <FormLabel>Github Username</FormLabel>
          <Input type="email" onChange={handleChange} />
          <FormHelperText>Need Github Username </FormHelperText>
        </FormControl>
        <Button
          mt="3"
          colorScheme="teal"
          onClick={handleClick}
          variant="outline"
        >
          Remove Member
        </Button>
        </Box>
        <Box bg="tomato" width={["90%", "60%", "100%"]}  margin="auto" ></Box>
        
      </SimpleGrid>
    </div>
  );
};

export default RemoveMember;
