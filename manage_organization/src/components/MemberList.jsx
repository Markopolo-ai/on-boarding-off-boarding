import Header from "./chakra/Header";
import TableList from "./chakra/TableList";
import React from "react";
import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Avatar,
} from "@chakra-ui/react";
import {config} from "../config.js"

const MemberList = () => {
  const [members, setMember] = useState([]);

  const getMemberList = async () => {
    const octokit = new Octokit({
      auth: config.GITHUB_KEY,
    });

    try {
      const response = await octokit.request(
        "GET /orgs/on-boarding-off-boarding/members",
        {
          org: "on-boarding-off-boarding",
        }
      );

      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberList();
  });

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

      <Box w="50%" m="auto" mt="-30%">
        <Table variant="simple">
          <TableCaption>Organization Members</TableCaption>
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Username</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member) => (
              <Tr>
                <TableList
                  username={member.login}
                  avatar={member.avatar_url}
                  role={member.type}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default MemberList;
