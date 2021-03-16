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

const InviteMember = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handelClick = (event) => {
    console.log(`Invite ${email}`);
    inviteMember(email);
  };

  const inviteMember = async (memberEmail) => {
    try {
      const octokit = new Octokit({
        auth: `f84b8c93e3c592709b1b926ab8f2d842db491336`,
      });

      const response = await octokit.request(
        "POST /orgs/on-boarding-off-boarding/invitations",
        {
          org: "on-boarding-off-boarding",
          email: memberEmail,
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
        minH="100%"
      ></Box>


      <SimpleGrid columns={[1,1,3]} spacing="10px" mt="-30%">
        <Box  bg="white" p="5" width={["100%", "80%", "100%"]}  margin="auto"> </Box>
        <Box  bg="white" p="5" width={["100%", "80%", "100%"]} boxShadow="base" margin="auto"> 
        {showAlert ? (
          <NotificationAlert alertType="success" alertText="Invite Sent Successfully" /> 
        ) : (
          <h1></h1>
        )}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" onChange={handleChange} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <Button
          mt="3"
          onClick={handelClick}
          colorScheme="teal"
          variant="outline"
        >
          Invite Member
        </Button>
        </Box>
        <Box  bg="white" p="5" width={["100%", "80%", "100%"]} margin="auto"> </Box>
      </SimpleGrid>
    </div>
  );
};

export default InviteMember;
