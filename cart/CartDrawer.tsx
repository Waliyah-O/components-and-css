import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PageTitle } from "../pages/PageStyles";
import img1 from "../../assets/images/cart1.png";
import img2 from "../../assets/images/cart2.png";
import PluggSelect from "../../Components/PluggSelect";
import { DeleteIcon } from "../../assets/Icons/DeleteIcon";
import { CartHeartIcon } from "../../assets/Icons/HeartIcon";
import PuggButtons from "../../Components/PuggButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const textStyle = {
  fontFamily: "Geist",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "17.36px",
};

type HookUsageProps = {
  itemId: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

function HookUsage({ itemId, quantity, onQuantityChange }: HookUsageProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity || 2,
      min: 1,
      max: 6,
      precision: 0,
      onChange: (valueAsString, valueAsNumber) =>
        onQuantityChange(valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack bg="#F7F7F7">
      <Button
        bg="transparent"
        h="32px"
        w="32px"
        {...dec}
        color="#909090"
        p="0px"
      >
        -
      </Button>
      <Input
        border="none"
        w="20px"
        {...input}
        style={textStyle}
        p="0px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      />
      <Button
        bg="transparent"
        h="32px"
        w="32px"
        {...inc}
        color="#909090"
        p="0px"
      >
        +
      </Button>
    </HStack>
  );
}

const sizeOptions = [
  { position: 1, value: "x-small", label: "XS" },
  { position: 2, value: "small", label: "S" },
  { position: 3, value: "medium", label: "M" },
  { position: 4, value: "large", label: "L" },
  { position: 5, value: "x-large", label: "XL" },
  { position: 6, value: "xx-large", label: "XXL" },
];

const colorOptions = [
  { position: 1, value: "black", label: "Black" },
  { position: 2, value: "orange", label: "Orange" },
  { position: 3, value: "pink", label: "Pink" },
  { position: 4, value: "blue", label: "Blue" },
  { position: 5, value: "purple", label: "Purple" },
  { position: 6, value: "off-white", label: "Off-White" },
];

const CartDrawer = ({ isOpen, onClose }: Props) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [cartProducts, setCartProducts] = useState([
    {
      image: img1,
      vendorName: "GarmSpot",
      itemName: "Shein Classic Dress",
      quantity: 2,
      size: sizeOptions,
      color: colorOptions,
      discount: 5,
      price: "N25,000",
      discountPrice: "N23,950",
      id: "cart-001",
    },
    {
      image: img2,
      vendorName: "The Yutes",
      itemName: "Shein Classic Dress",
      quantity: 2,
      size: sizeOptions,
      color: colorOptions,
      discount: 5,
      price: "N25,000",
      discountPrice: "N23,950",
      id: "cart-002",
    },
    {
      image: img2,
      vendorName: "The Yutes",
      itemName: "Shein Classic Dress",
      quantity: 2,
      size: sizeOptions,
      color: colorOptions,
      discount: 5,
      price: "N25,000",
      discountPrice: "N23,950",
      id: "cart-003",
    },
  ]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [heartIconColors, setHeartIconColors] = useState<
    Record<string, string>
  >({});
  const navigate = useNavigate();
  const pathname = useLocation();
  const totalItems = cartProducts.length + cartItems.length;

  const getRandomOption = (
    options: Array<{ position: number; value: string }>
  ) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  };

  const handleDeleteItem = (id: string) => {
    setCartProducts((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartProducts([]);
  };

  const handleHeartIconClick = (id: string) => {
    setHeartIconColors((prevColors) => ({
      ...prevColors,
      [id]: prevColors[id] === "#DE0000" ? "DE0000" : "#DE0000",
    }));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartProducts((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    console.log(quantity);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    console.log(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    setSelectedSize(getRandomOption(sizeOptions));
    setSelectedColor(getRandomOption(colorOptions));
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={{ base: "sm", md: "lg" }}>
      <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <DrawerContent h="100vh">
        <DrawerCloseButton />
        <DrawerHeader justifyContent="left">
          <PageTitle textAlign="left">MY CART ({totalItems})</PageTitle>
          <PageTitle
            textAlign="center"
            onClick={() => {
              clearCart();
              handleClearCart();
            }}
            cursor="pointer"
          >
            CLEAR CART
          </PageTitle>
        </DrawerHeader>
        <DrawerBody>
          <Box
            style={textStyle}
            display="flex"
            flexDirection="column"
            gap={6}
            h={{ base: "767px", lg: "75vh" }}
            overflow="auto"
          >
            {cartItems.map((item) => (
              <Flex
                w="100%"
                key={item.id}
                gap={2}
                borderBottom="1px solid #EDEDED"
                p="20px"
              >
                <Image src={item.image} w="65.6px" h="60px" />
                <Box w="100%">
                  <Box>
                    <Text color="#676767" pb="10px">
                      {item.vendorName}
                    </Text>
                    <Text color="#000000" pb="8px">
                      {item.title}
                    </Text>

                    <Flex w="100%" gap={2} mb="20px" flexWrap="wrap">
                      <HookUsage
                        onQuantityChange={(quantity) =>
                          handleQuantityChange(item.id, quantity)
                        }
                        itemId={item.id}
                        quantity={item.quantity}
                      />
                      <Flex
                        bg="#f7f7f7"
                        align="center"
                        justify="center"
                        w="109px"
                        pl="10px"
                        gap="10px"
                      >
                        <Text>Size:</Text>

                        <PluggSelect
                          name="size"
                          options={sizeOptions}
                          value={item.size}
                          onChange={handleSizeChange}
                        />
                      </Flex>
                      <Flex
                        bg="#f7f7f7"
                        align="center"
                        justify="center"
                        w="164px"
                        pl="10px"
                        gap="10px"
                      >
                        <Text>Color:</Text>
                        <PluggSelect
                          name="color"
                          options={colorOptions}
                          value={item.color}
                          onChange={handleColorChange}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                  <Text
                    bg="#ECFDF3"
                    color="#027A48"
                    w="fit-content"
                    h="25px"
                    mb="5px"
                    py="2px"
                    px="8px"
                  >
                    Discount {item.discount}%
                  </Text>
                  <Flex
                    direction={{ base: "column-reverse", lg: "row" }}
                    align={{ base: "start", lg: "end" }}
                    justify="space-between"
                    pr={{ base: "", lg: "30px" }}
                  >
                    <Flex gap="43px" py={{ base: "20px", lg: "0px" }}>
                      <Flex
                        gap="10px"
                        onClick={() => removeFromCart(item.id)}
                        cursor="pointer"
                      >
                        <DeleteIcon />
                        <Text color="#676767"> Delete</Text>
                      </Flex>
                      <Flex
                        gap="10px"
                        onClick={() => handleHeartIconClick(item.id)}
                        cursor="pointer"
                      >
                        <CartHeartIcon fillColor={heartIconColors[item.id]} />
                        <Text color="#676767"> Save</Text>
                      </Flex>
                    </Flex>

                    <Flex
                      direction={{ base: "row", lg: "column" }}
                      gap={2}
                      align="end"
                    >
                      <Text color="#676767" textDecoration="line-through">
                        {item.price}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", lg: "18px" }}
                        fontWeight={700}
                        lineHeight="22.32px"
                        textAlign="center"
                      >
                        {item.price}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            ))}

            {cartProducts.map((item, index) => (
              <Flex
                w="100%"
                key={index}
                gap={2}
                borderBottom="1px solid #EDEDED"
                p="20px"
              >
                <Image src={item.image} w="65.6px" h="60px" />
                <Box w="100%">
                  <Box>
                    <Text color="#676767" pb="10px">
                      {item.vendorName}
                    </Text>
                    <Text color="#000000" pb="8px">
                      {item.itemName}
                    </Text>

                    <Flex w="100%" gap={2} mb="20px" flexWrap="wrap">
                      <HookUsage
                        itemId={item.id}
                        quantity={item.quantity}
                        onQuantityChange={(quantity) =>
                          handleQuantityChange(item.id, quantity)
                        }
                      />
                      <Flex
                        bg="#f7f7f7"
                        align="center"
                        justify="center"
                        w="109px"
                        pl="10px"
                        gap="10px"
                      >
                        <Text>Size:</Text>
                        <PluggSelect
                          name="size"
                          options={item.size}
                          value={selectedSize[Number(item.id)]}
                          onChange={handleSizeChange}
                        />
                      </Flex>
                      <Flex
                        bg="#f7f7f7"
                        align="center"
                        justify="center"
                        w="164px"
                        pl="10px"
                        gap="10px"
                      >
                        <Text>Color:</Text>
                        <PluggSelect
                          name="color"
                          options={item.color}
                          value={selectedColor[Number(item.id)]}
                          onChange={handleColorChange}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                  <Text
                    bg="#ECFDF3"
                    color="#027A48"
                    w="fit-content"
                    h="25px"
                    mb="5px"
                    py="2px"
                    px="8px"
                  >
                    Discount {item.discount}%
                  </Text>
                  <Flex
                    direction={{ base: "column-reverse", lg: "row" }}
                    align={{ base: "start", lg: "end" }}
                    justify="space-between"
                    pr={{ base: "", lg: "30px" }}
                  >
                    <Flex gap="43px" py={{ base: "20px", lg: "0px" }}>
                      <Flex
                        gap="10px"
                        onClick={() => handleDeleteItem(item.id)}
                        cursor="pointer"
                      >
                        <DeleteIcon />
                        <Text color="#676767"> Delete</Text>
                      </Flex>
                      <Flex
                        gap="10px"
                        onClick={() => handleHeartIconClick(item.id)}
                        cursor="pointer"
                      >
                        <CartHeartIcon fillColor={heartIconColors[item.id]} />
                        <Text color="#676767"> Save</Text>
                      </Flex>
                    </Flex>

                    <Flex
                      direction={{ base: "row", lg: "column" }}
                      gap={2}
                      align="end"
                    >
                      <Text color="#676767" textDecoration="line-through">
                        {item.price}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", lg: "18px" }}
                        fontWeight={700}
                        lineHeight="22.32px"
                        textAlign="center"
                      >
                        {item.discountPrice}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Box>
          <Box py="30px" mt={{ base: "0px", lg: "20px" }}>
            <PuggButtons
              disabled={totalItems === 0}
              text="Proceed to Checkout"
              btnVariant="primary"
              height="58px"
              style={{ fontWeight: 500, fontSize: "16px" }}
              action={() => {
                navigate("/app/checkout");
              }}
            />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
