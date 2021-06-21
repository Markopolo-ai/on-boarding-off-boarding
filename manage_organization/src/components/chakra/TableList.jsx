import React from "react";
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

const TableList = (props) => {
  return (
    <>
      <Td>
        <Avatar name={props.username} src={props.avatar} />
      </Td>
      <Td>{props.username}</Td>
      <Td>{props.role}</Td>
    </>
  );
};

export default TableList;
