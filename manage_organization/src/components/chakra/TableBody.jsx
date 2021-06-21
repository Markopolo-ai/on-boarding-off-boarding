import React from "react";
import React from "react";
import TableList from "./TableList"
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

const TableHead = () => {
  return (
    <div>
      <Table variant="simple">
        <TableCaption>Organization Members</TableCaption>
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th>Name</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </Td>
            <Td>Dedar Alam</Td>
            <Td>Owner</Td>
          </Tr>

          <TableList/>
        </Tbody>
      </Table>
    </div>
  );
};

export default TableHead;
