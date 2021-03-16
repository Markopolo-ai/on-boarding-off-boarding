import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Center,
  useToast,
  Switch,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, errors } = useForm();

  const [loading, setLoading] = useState(false);
  const [trelloAccess, setTrelloAccess] = useState(false);

  const initialRef = React.useRef();

  const submitHandler = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:5001/users", data)
      .then((result) => {
        setLoading(false);
        reset();
        onClose();
        axios.post("http://localhost:5000/users/apps", {
          userId: result.data.id,
          trelloMemberId: data.trelloMemberId,
          access: trelloAccess,
        });
        toast({
          status: "success",
          title: "Congratualtions, new member added! 🎉",
        });
      })
      .catch((error) => {
        setLoading(false);
        toast({ status: "error", title: "Something went wrong!! 😥" });
      });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="purple">
        Add New Member
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="name" ref={register} placeholder="Arif Hossain" />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  ref={register}
                  type="email"
                  placeholder="arif@sellify.xyz"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Avatar Url</FormLabel>
                <Input
                  name="avatar"
                  ref={register}
                  placeholder="https://images.unsplash.com/photo-1612831455740-a2f6212eeeb2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Member's Trello Id</FormLabel>
                <Input
                  name="trelloMemberId"
                  ref={register}
                  placeholder="devarif"
                />
              </FormControl>
              <HStack justify="space-between" mt={6}>
                <FormLabel>Trello Board Access</FormLabel>
                <Switch
                  size="lg"
                  colorScheme="purple"
                  defaultChecked={false}
                  onChange={(e) => setTrelloAccess(e.target.checked)}
                />
              </HStack>
              <Center mt={6}>
                <Button
                  type="submit"
                  colorScheme="purple"
                  letterSpacing={2}
                  fontWeight="bold"
                  isLoading={loading}
                >
                  🔥 SUBMIT 🔥
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
