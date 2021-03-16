import React from "react";
import { Link } from "react-router-dom";

import Header from "./chakra/Header";
import { Box } from "@chakra-ui/react";
import { Heading, Grid, GridItem, Image, Center } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Header/>
      <Box
        bgImage="url('https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg?size=626&ext=jpg&ga=GA1.2.1207464890.1610236800')"
        bgPosition="center"
        bgRepeat="no-repeat"
        backgroundSize="100%"
        padding="23%"
        opacity="20%"
      ></Box>
      <Box opacity="100%" mt="-30%">
        <Heading as="h3" size="lg" m="2">
          Support Platform
        </Heading>

        <Center mt="5">
          <Image
            margine="auto"
            htmlWidth="10%"
            src="https://pngimg.com/uploads/github/github_PNG15.png"
          />
        </Center>
      </Box>
    </div>
  );
};

export default Home;
