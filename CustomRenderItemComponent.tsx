import {
  Box,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { H4, SubText, ToolContainer } from "../pages/PageStyles";
import { HeartIcon } from "../../assets/Icons/HeartIcon";
import CartIcon from "../../assets/Icons/CartIcon";
import { truncateText } from "../utils/Constants";

export interface RenderProduct {
  id: string;
  image: string;
  title: string;
  price?: string;
  discount?: string;
  subText?: string;
  isTopSeller?: boolean;
}

interface RenderProductItemProps {
  product: RenderProduct;
  isOutfit?: boolean;
}

export const RenderProductItem = ({
  product,
  isOutfit,
}: RenderProductItemProps) => {
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
  const navigate = useNavigate();
  const toast = useToast();
  const { addToCart, cartItems, removeFromCart } = useCart();
  const [cartIconColors, setCartIconColors] = useState<Record<string, string>>(
    {}
  );
  const [heartIconColors, setHeartIconColors] = useState<
    Record<string, string>
  >({});

  const handleCartIconClick = (product: RenderProduct) => {
    const productInCart = cartItems.find((item) => item.id === product.id);

    if (productInCart) {
      removeFromCart(product.id);

      toast({
        title: "Product removed.",
        description: "Product has been removed from your cart.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      setCartIconColors((prevColors) => ({
        ...prevColors,
        [product.id]: "",
      }));
    } else {
      const discountValue = product.discount
        ? parseInt(product.discount.replace(/\D/g, ""))
        : 0;
      addToCart({
        id: product.id,
        image: product.image,
        title: product.title,
        vendorName: "The Plugg Vendor",
        price: product.price ?? "0",
        discountPrice: product.discount ?? "0",
        discount: discountValue,
        quantity: 1,
        color: "defaultColor",
        size: "defaultSize",
      });

      toast({
        title: "Product added.",
        description: "Product has been added to your cart.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setCartIconColors((prevColors) => ({
        ...prevColors,
        [product.id]: "#3A01DB",
      }));
    }
  };

  const handleHeartIconClick = (id: string) => {
    setHeartIconColors((prevColors) => ({
      ...prevColors,
      [id]: prevColors[id] === "#DE0000" ? "" : "#DE0000",
    }));
  };

  const isTopSeller = product.isTopSeller ?? Math.random() < 0.5;

  useEffect(() => {
    const colors = cartItems.reduce((acc, item) => {
      acc[item.id] = "#3A01DB"; // Already in the cart
      return acc;
    }, {} as Record<string, string>);

    setCartIconColors(colors);
  }, [cartItems]);
  return (
    <Box key={product.id} pos="relative" className="carousel-item">
      <Flex
        mb={6}
        bg="white"
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        h={{ base: "100%", md: "452px" }}
        w={{ base: "204px", md: "282.72px" }}
        gap="13.93px"
        cursor="pointer"
        _hover={{ ".top-seller-label": { display: "block" } }}
      >
        {isTopSeller && (
          <Box
            pos="absolute"
            top="10px"
            left={{ base: "24%", md: "15%" }}
            transform="translateX(-50%)"
            bg="black"
            h="27px"
            w="84px"
            color="white"
            alignItems="center"
            justifyContent="center"
            py="6px"
            px="13px"
            fontSize="12px"
          >
            Top Seller
          </Box>
        )}
        <Image
          src={product.image}
          alt={product.title}
          h={{ base: "272px", md: "353.4px" }}
          w={{ base: "204px", md: "282.72px" }}
          onClick={() => navigate(`/app/buy-product/${product.title}`)}
        />
        {display === "desktop" && (
          <Flex
            className="top-seller-label"
            display="none"
            w="78px"
            h="32px"
            bg="#00000040"
            align="center"
            justify="center"
            py="4px"
            px="6px"
            gap="8px"
            borderRadius="5px"
            pos="absolute"
            bottom={{ base: "130px", lg: isOutfit ? "50px" : "110px" }}
            left="50%"
            transform="translateX(-50%)"
            _hover={{ ".tooltip-container": { display: "block" } }}
          >
            {isOutfit && (
              <Flex
                direction="column"
                align="center"
                justify="center"
                mb="10px"
              >
                <Text color="#FFFFFF" fontSize="10.39px" fontWeight={600}>
                  {product.price}
                </Text>
                <Text color="#DADADA" fontSize="7.89px" fontWeight={500}>
                  {product.title}
                </Text>
              </Flex>
            )}
            <ToolContainer>
              <Box
                _hover={{ ".tooltip": { display: "block" } }}
                className="tooltip-container"
                pos="relative"
              >
                <Box display="none" className="tooltip">
                  Like
                </Box>
                <Box
                  className="text"
                  onClick={() => handleHeartIconClick(product.id)}
                >
                  <HeartIcon fillColor={heartIconColors[product.id]} />
                </Box>
              </Box>
              <Box
                _hover={{ ".tooltip": { display: "block" } }}
                className="tooltip-container"
              >
                <Box className="tooltip">Add to Cart</Box>
                <Box
                  className="text"
                  onClick={() => handleCartIconClick(product)}
                >
                  <CartIcon fillColor={cartIconColors[product.id]} />
                </Box>
              </Box>
            </ToolContainer>
          </Flex>
        )}
        {!isOutfit && (
          <Box
            width="100%"
            height="110px"
            display="flex"
            flexDirection="column"
            gap="5px"
            alignItems="start"
            justifyContent="space-between"
            // pl={{ base: "5px", md: "0px" }}
          >
            <Flex w="100%">
              <H4>{product.title}</H4>
              {display === "mobile" && (
                <Flex align="start" gap="4px" pr={{ base: "5px", lg: "0px" }}>
                  <Box
                    className="text"
                    onClick={() => handleHeartIconClick(product.id)}
                  >
                    <HeartIcon
                      color="black"
                      width="18px"
                      height="18px"
                      fillColor={heartIconColors[product.id]}
                    />
                  </Box>
                  <Box
                    className="text"
                    onClick={() => handleCartIconClick(product)}
                  >
                    <CartIcon
                      color="black"
                      fillColor={cartIconColors[product.id]}
                    />
                  </Box>
                </Flex>
              )}
            </Flex>

            <Box
              h="100%"
              // h="87px"
              display="flex"
              gap="10px"
              flexDirection="column"
              alignItems="start"
            >
              <SubText>{truncateText(product.subText ?? "")}</SubText>
              <Flex
                w="100%"
                align="center"
                gap="12px"
                fontFamily="Geist"
                fontWeight={600}
                fontSize="12.8px"
                lineHeight="15.87px"
                color="black"
                mt="5px"
              >
                <Box as="h4" textDecoration="line-through" color="#6D6D6D">
                  {product.price}
                </Box>
                <Box>{product.price}</Box>
                <Box as="h4" color="#FF0000">
                  {product.discount}
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
