import { Button } from "@chakra-ui/button";
import { Container, Flex } from "@chakra-ui/layout";
import {
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  Avatar,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/table";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import react from "react";
import AddNewMember from "../components/AddNewMember";

export default function Home({ data }) {
  const toast = useToast();
  const [users, setUsers] = useState([]);

  const fetchStuff = async () => {
    const usersL = [];
    const process = Object.keys(data).map(async (id) => {
      try {
        const { data: appdata } = await axios.get(
          `http://localhost:5000/users/apps?userId=${data[id].id}`
        );
        data[id] = { ...data[id], access: appdata.access };
        usersL.push(data[id]);
      } catch (error) {
        data[id] = { ...data[id], access: false };
        usersL.push(data[id]);
      }
    });

    Promise.all(process).then(() => setUsers(usersL));
  };
  useEffect(() => {
    fetchStuff();
  }, []);

  const changeAppAcess = async ({ access, userId, trelloMemberId }) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/users/apps`, {
        access,
        userId,
        trelloMemberId,
      });
    } catch (error) {}
  };

  return (
    <Container maxW="7xl">
      <Flex my={8} justify="flex-end">
        <AddNewMember />
      </Flex>

      <Box borderWidth={1} shadow="md" rounded="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Trello Id</Th>
              <Th>Active</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(data).map((key) => {
              return (
                <Tr key={key}>
                  <Td>
                    <Avatar
                      src={data[key].avatar}
                      alt={data[key].name + " avatar"}
                    />
                  </Td>
                  <Td>{data[key].name}</Td>
                  <Td>{data[key].email}</Td>
                  <Td>{data[key].trelloMemberId}</Td>
                  <Td>
                    <Switch
                      colorScheme="purple"
                      onChange={(e) =>
                        changeAppAcess({
                          access: e.target.checked,
                          userId: key,
                          trelloMemberId: data[key].trelloMemberId,
                        })
                      }
                      defaultChecked={data[key].access}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:5002/users_access");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
