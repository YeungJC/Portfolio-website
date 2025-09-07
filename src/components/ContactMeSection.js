import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "General",
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const result = await submit("contact", values);

      if (result?.type === "success") {
        onOpen("success", `Thanks, ${values.firstName}!`, result.message);
        resetForm();
      } else if (result?.type === "error") {
        onOpen("error", "Something went wrong", result.message);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      type: Yup.string().oneOf(["General", "ProjectProposal", "other"]),
      comment: Yup.string()
        .required("Required")
        .min(25, "Must be at least 25 characters"),
    }),
  });

  // Watch for response changes
  useEffect(() => {
    if (response?.type === "success") {
      onOpen("success", `Thanks, ${formik.values.firstName}!`, response.message);
      formik.resetForm();
    } else if (response?.type === "error") {
      onOpen("error", "Something went wrong", response.message);
    }
  }, [response, onOpen, formik]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section" color="white">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%" bg="white" boxShadow="lg">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              >
                <FormLabel htmlFor="firstName" color="black">
                  Name
                </FormLabel>
                <Input
                  id="firstName"
                  {...formik.getFieldProps("firstName")}
                  bg="gray.50"
                  color="black"
                  _focus={{ borderColor: "purple.500", boxShadow: "outline" }}
                  _hover={{ borderColor: "purple.300" }}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email" color="black">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  bg="gray.50"
                  color="black"
                  _focus={{ borderColor: "purple.500", boxShadow: "outline" }}
                  _hover={{ borderColor: "purple.300" }}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type" color="black">
                  Type of enquiry
                </FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg="gray.50"
                  color="black"
                  _focus={{ borderColor: "purple.500", boxShadow: "outline" }}
                  _hover={{ borderColor: "purple.300" }}
                >
                  <option value="General">General</option>
                  <option value="ProjectProposal">
                    Project Proposal
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl
                isInvalid={formik.touched.comment && formik.errors.comment}
              >
                <FormLabel htmlFor="comment" color="black">
                  Your message
                </FormLabel>
                <Textarea
                  id="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                  bg="gray.50"
                  color="black"
                  _focus={{ borderColor: "purple.500", boxShadow: "outline" }}
                  _hover={{ borderColor: "purple.300" }}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
                _hover={{ transform: "scale(1.02)" }}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
