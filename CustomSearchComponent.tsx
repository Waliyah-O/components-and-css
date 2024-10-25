import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductItem {
  id: string;
  title?: string;
  subText?: string;
  price?: string;
  discount?: string;
  description?: string;
  image?: string;
  isTopSeller?: boolean;
}

const SearchResultsDropdown: React.FC<{ items: ProductItem[] }> = ({
  items,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      position="absolute"
      top="100%"
      left="0"
      right="0"
      bg="white"
      boxShadow="md"
      zIndex={1000}
      maxHeight="300px"
      overflowY="auto"
    >
      {items.length > 0 ? (
        items.map((item) => (
          <Flex
            key={item.id}
            p={4}
            gap={4}
            align="center"
            justify="left"
            borderBottom="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "#F6F6F6" }}
            onClick={() => navigate(`/app/buy-product/${item.id}`)}
          >
            <Box>
              <Image
                borderRadius="4px"
                src={item.image}
                alt={item.title}
                h="45px"
                w="45px"
              />
            </Box>
            <Box fontSize="12px">
              <Box fontWeight="bold">{item.title}</Box>
              <Box>{item.subText}</Box>
              <Flex gap={4}>
                <Box color="gray" textDecoration="line-through">
                  {item.price}
                </Box>
                <Box>{item.price}</Box>
                <Box color="red">{item.discount}</Box>
              </Flex>
            </Box>
          </Flex>
        ))
      ) : (
        <Box p={2}>No results found</Box>
      )}
    </Box>
  );
};

export default SearchResultsDropdown;


//{searchQuery && <SearchResultsDropdown items={filteredTechies} />}
