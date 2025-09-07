import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <HStack
      spacing={4}
      p={4}
      borderRadius="md"
      backgroundColor="white"
      alignItems="center"
    >
      <Image
        src={imageSrc}
        alt={title}
        boxSize="100px"
        objectFit="cover"
        borderRadius="md"
      />
      <VStack align="start" spacing={1} flex={1}>
        <Heading as="h3" size="md" color="black">
          {title}
        </Heading>
        <Text fontSize="sm" color="black">
          {description}
        </Text>
      </VStack>
      <FontAwesomeIcon icon={faArrowRight} size="1x" color="black" />
    </HStack>
  );
};

export default Card;
