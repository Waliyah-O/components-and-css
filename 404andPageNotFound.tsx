import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Frown, Search } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#f8f8f8"
      textAlign="center"
      padding="4"
    >
      <Frown className="mx-auto text-gray-400 mb-6" size={64} />
      <Heading fontSize="4xl" color="#333" marginBottom="2">
        Oops! Page Not Found
      </Heading>
      <Text fontSize="lg" color="#666" marginBottom="6">
        The page you're looking for doesn't exist. It might have been removed or
        is temporarily unavailable.
      </Text>
      <Link to="/">
        <Button colorScheme="blue" size="lg" marginBottom="4">
          Go Back to Homepage
        </Button>
      </Link>
      <Text fontSize="md" color="#888">
        Or explore the latest trends from our collection:
      </Text>
      <Box display="flex" justifyContent="center" gap="3" marginTop="4">
        <Link to="/shop-by-products">
          <Button variant="outline" colorScheme="blue">
            New Arrivals
          </Button>
        </Link>
        <Link to="/shop-by-products">
          <Button variant="outline" colorScheme="blue">
            Best Sellers
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export const ItemNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      padding="8"
      bg="#fff"
    >
      <Search size={64} />

      <Text fontSize="2xl" fontWeight="bold" color="#333" marginBottom="2">
        Sorry, we couldn't find that item
      </Text>
      <Text fontSize="md" color="#666" marginBottom="6">
        But don't worry, we have plenty of other great styles for you to
        explore!
      </Text>
      <VStack spacing="4">
        <Link to="/shop-by-products">
          <Button bg="black" color="white" size="lg">
            Check New Arrivals
          </Button>
        </Link>
        <Link to="/shop-by-products">
          <Button variant="outline" colorScheme="black" size="lg">
            Shop the Sale
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export const NotFoundComponent = ({ type = "404" }) => {
  const is404 = type === "404";
  const title = is404 ? "404 - Page Not Found" : "Item Not Found";
  const message = is404
    ? "Oops! It seems this page has gone out of style."
    : "Sorry, the item you're looking for is not in our collection.";

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>{title}</h1>
            <p>{message}</p>
            {is404 ? <Frown size={64} /> : <Search size={64} />}
          </div>
          <div>
            <Button variant="outline">Go to Homepage</Button>
            {!is404 && <Button variant="outline">Browse Collection</Button>}
          </div>
        </div>
        <div>
          <p>
            Need help?
            <Link to="#">Contact our style experts</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
