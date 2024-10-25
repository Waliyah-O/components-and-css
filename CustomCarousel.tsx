import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  Flex,
  HStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import PuggButtons from "./PuggButtons";
import { ArrowLeftIcon, ArrowRightIcon } from "../assets/Icons/ArrowIcons";
import { useNavigate } from "react-router-dom";
import { H4, SubText, ToolContainer } from "../Customer/pages/PageStyles";
import { HeartIcon } from "../assets/Icons/HeartIcon";
import CartIcon from "../assets/Icons/CartIcon";
import { useCart } from "../Customer/context/CartContext";

interface Product {
  id: string;
  image: string;
  title?: string;
  subText?: string;
  ratings?: number;
  count?: number;
  clicked?: boolean;
  price?: string;
  discount?: string;
  itemsSold?: string;
}

interface CarouselProps {
  items: Product[];
  title?: string;
  btnLink?: boolean;
  page?: string;
  vendor?: boolean;
  products?: boolean;
  stories?: boolean;
  style?: boolean;
}

const PluggCarousel: React.FC<CarouselProps> = ({
  items,
  title,
  btnLink,
  page,
  vendor,
  products,
  stories,
  style,
}) => {
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();
  const toast = useToast();

  const carouselRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToPage = (page: string) => {
    navigate(page);
  };

  const handleImageClick = (id: string) => {
    setSelectedStory((prevId) => (prevId === id ? null : id));
  };

  const [cartIconColors, setCartIconColors] = useState<Record<string, string>>(
    {}
  );
  const [heartIconColors, setHeartIconColors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current) {
        if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "ArrowLeft") {
          goToPrevious();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, []);

  const handleCartIconClick = (product: Product) => {
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
        title: product.title || "untitled Product",
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
      [id]: prevColors[id] === "#DE0000" ? "DE0000" : "#DE0000",
    }));
  };

  return (
    <div
      className="shopByStyle"
      ref={carouselRef}
      tabIndex={0}
      onFocus={() => console.log("Carousel focused")}
      onBlur={() => console.log("Carousel blurred")}
    >
      <HStack
        w="full"
        alignContent="center"
        justifyContent="space-between"
        pt="16px"
      >
        <Flex
          alignItems="center"
          justifyContent={{ base: "space-between", lg: "start" }}
          gap={{ base: "10px", sm: "30px" }}
          w="100%"
        >
          <h1>{title}</h1>
          {btnLink && (
            <PuggButtons
              btnVariant="link"
              text={"VIEW ALL"}
              action={() => {
                if (page) {
                  goToPage(page);
                }
              }}
            />
          )}
        </Flex>

        {display === "desktop" && (
          <Flex gap={"20px"}>
            <PuggButtons
              btnVariant="outline"
              icon={<ArrowLeftIcon />}
              wid="40px"
              height="40px"
              action={goToPrevious}
            />
            <PuggButtons
              btnVariant="outline"
              icon={<ArrowRightIcon />}
              wid="40px"
              height="40px"
              action={goToNext}
            />
          </Flex>
        )}
      </HStack>

      <HStack
        justifyContent="space-between"
        className="looks"
        display=" flex"
        w="100%"
      >
        {items.map((item, index) => {
          return (
            <Box
              key={item.id}
              minWidth="fit-content"
              transition="transform 0.5s ease"
              transform={`translateX(-${currentIndex * 100}%)`}
              flexShrink={0}
              pos="relative"
              className="carousel-item"
            >
              {products ? (
                <>
                  <Flex
                    mb={6}
                    bg="white"
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    h={{ base: "352px", md: "452px" }}
                    w={{ base: "185px", md: "282.72px" }}
                    gap="13.93px"
                    _hover={{ ".top-seller-label": { display: "block" } }}
                  >
                    <Box
                      pos="absolute"
                      top={{ base: "10px", md: "20px" }}
                      left={{ base: "23%", lg: "15%" }}
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
                    <Image
                      src={item.image}
                      alt={item.title}
                      h={{ base: "230px", md: "353.4px" }}
                      w={{ base: "188.6px", md: "282.72px" }}
                      onClick={() => navigate(`/app/buy-product/${item.id}`)}
                    />
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
                      bottom="110px"
                      left="50%"
                      transform="translateX(-50%)"
                      _hover={{ ".tooltip-container": { display: "block" } }}
                    >
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
                            onClick={() => handleHeartIconClick(item.id)}
                          >
                            <HeartIcon fillColor={heartIconColors[item.id]} />
                          </Box>
                        </Box>
                        <Box
                          _hover={{ ".tooltip": { display: "block" } }}
                          className="tooltip-container"
                        >
                          <Box className="tooltip">Add to Cart</Box>
                          <Box
                            className="text"
                            onClick={() => handleCartIconClick(item)}
                            // onClick={() => handleCartIconClick(item.id)}
                          >
                            <CartIcon fillColor={cartIconColors[item.id]} />
                          </Box>
                        </Box>
                      </ToolContainer>
                    </Flex>
                    <Box
                      width="100%"
                      height="110px"
                      display="flex"
                      flexDirection="column"
                      gap="5px"
                      alignItems="start"
                      justifyContent="space-between"
                    >
                      <H4>{item.title}</H4>
                      <Box
                        h="87px"
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        justifyContent="space-between"
                      >
                        <SubText>{item.subText}</SubText>
                        <Flex
                          w="100%"
                          align="center"
                          gap={{ base: "6px", md: "12px" }}
                          fontFamily="Geist"
                          fontWeight={600}
                          fontSize="13px"
                          lineHeight="15.87px"
                          color="black"
                          mt="5px"
                        >
                          <Box
                            as="h4"
                            textDecoration="line-through"
                            color="#6D6D6D"
                          >
                            {item.price}
                          </Box>
                          <Box as="h4">{item.price}</Box>
                          <Box as="h4" color="#FF0000">
                            {item.discount}
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </>
              ) : stories ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={item.image}
                    alt={item.id}
                    height="220px"
                    width="147px"
                    borderRadius="10px"
                    pos="relative"
                    border={
                      selectedStory === item.id ? "3px solid #ff6d6d" : ""
                    }
                    transition="border 0.3s ease"
                    onClick={() => handleImageClick(item.id)}
                  />
                  <h4
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      width: "126px",
                      height: "36px",
                      padding: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "7px",
                      background: "#FFFFFFBA",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (page) {
                        goToPage(`${page}/${item.title}`);
                      }
                    }}
                  >
                    {item.title}
                  </h4>
                </Box>
              ) : vendor ? (
                <Flex
                  w="235px"
                  direction="column"
                  align="center"
                  justify="center"
                  border="0.63px solid #D8CCCC"
                >
                  <Image
                    src={item.image}
                    alt={item.id}
                    height="101.51px"
                    width="220.06px"
                    pt="5px"
                    _hover={{ boxShadow: "0px 4px 24px 0px #0000000D" }}
                  />
                  <Flex
                    direction="column"
                    align="start"
                    width="209.06px"
                    h="100%"
                    gap="8.8px"
                    mt="5px"
                    pb="20px"
                    fontFamily="Geist"
                    fontSize="15.4px"
                    lineHeight="19.1px"
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    <h4 style={{ fontWeight: 500 }}>{item.itemsSold}</h4>
                    <Box width="209.06px" border=" 0.6px solid #D8CCCC"></Box>
                    <h2 style={{ fontWeight: 300 }}>VENDORS</h2>
                  </Flex>
                </Flex>
              ) : (
                <>
                  <Image
                    src={item.image}
                    alt={item.id}
                    height={style ? "268.82px" : "220px"}
                    width={style ? "240.15px" : "175px"}
                  />
                  {!style && <h4>{item.title}</h4>}
                </>
              )}
            </Box>
          );
        })}
      </HStack>
    </div>
  );
};

export default PluggCarousel;
