import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { HomeIcon } from "../../assets/Icons/HomeIcon";
import { TShirtIcon } from "../../assets/Icons/TshirtIcon";
import HangerIcon from "../../assets/Icons/HangerIcon";
import OrdersIcon from "../../assets/Icons/OrdersIcon";
import Logo from "../../assets/Icons/Logo";
import { ArrowLeftMenu, StrokeBack } from "../../assets/Icons/ArrowIcons";

interface MenuItemProps {
  id: string;
  name: string;
}

interface MenuStackItem {
  name: string;
  items: MenuItemProps[];
}

const initialMenuItems: MenuItemProps[] = [
  { id: "op-1", name: "Shoes" },
  { id: "op-2", name: "Shirts" },
  { id: "op-3", name: "Trousers, jeans etc" },
  { id: "op-4", name: "Hoodies & Sweatshirts" },
  { id: "op-5", name: "Jackets & Coats" },
  { id: "op-6", name: "Suits and Tailoring" },
  { id: "op-7", name: "Tracksuits" },
  { id: "op-8", name: "Wigs" },
];

interface UnifiedSidebarProps {
  collapsed?: boolean;
  toggleSidebar: () => void;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  collapsed = false,
  toggleSidebar,
  isOpen,
  onClose,
  btnRef,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"men" | "women">("men");
  const [currentMenu, setCurrentMenu] =
    useState<MenuItemProps[]>(initialMenuItems);
  const [menuStack, setMenuStack] = useState<MenuStackItem[]>([]);

  const handleBack = () => {
    if (menuStack.length > 0) {
      const previousMenu = menuStack[menuStack.length - 1];
      setCurrentMenu(previousMenu.items);
      setMenuStack(menuStack.slice(0, -1));
    }
  };

  const handleItemClick = (id: string, name: string) => {
    let subItems: MenuItemProps[] = [];
    switch (id) {
      case "op-1":
      case "op-2":
        subItems = [
          { id: `${id}-1`, name: "Item 1" },
          { id: `${id}-2`, name: "Item 2" },
          { id: `${id}-3`, name: "Item 3" },
          { id: `${id}-4`, name: "Item 4" },
        ];
        break;
      default:
        subItems = [
          { id: `${id}-1`, name: "Subitem 1" },
          { id: `${id}-2`, name: "Subitem 2" },
          { id: `${id}-3`, name: "Subitem 3" },
        ];
    }
    if (subItems.length > 0) {
      setMenuStack([...menuStack, { name, items: currentMenu }]);
      setCurrentMenu(subItems);
    } else {
      navigate(`/app/categories/${name}`);
      if (isMobile) onClose();
    }
  };

  const renderMenu = () => (
    <>
      {menuStack.length > 0 && (
        <Flex
          w="full"
          alignItems="center"
          px={6}
          py={2}
          cursor="pointer"
          onClick={handleBack}
          gap="20px"
        >
          <ArrowLeftMenu />
          <Text
            fontFamily="Geist"
            fontSize="13px"
            fontWeight={600}
            letterSpacing="0.2em"
            lineHeight="22px"
            ml={2}
          >
            Go Back
          </Text>
        </Flex>
      )}
      {currentMenu.map(({ id, name }) => (
        <React.Fragment key={id}>
          <Flex
            w="full"
            alignItems="center"
            justifyContent="space-between"
            px={6}
            py={1}
            cursor="pointer"
            onClick={() => handleItemClick(id, name)}
          >
            <Text fontWeight={500} fontSize="13px">
              {name}
            </Text>
            <StrokeBack />
          </Flex>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );

  const sidebarContent = (
    <VStack
      justifyContent="flex-start"
      alignItems="flex-start"
      h="100vh"
      pt={4}
      pl={4}
      spacing={4}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      <Box bg="white" w="full">
        <Box
          className="sidebarLogo"
          my="20px"
          onClick={() => {
            if (isMobile) onClose();
            navigate("/app");
          }}
        >
          <Logo />
        </Box>
        <Menu>
          {[
            { icon: <HomeIcon />, path: "/", text: "HOME" },
            { icon: <TShirtIcon />, path: "/look-book", text: "LOOK BOOK" },
            { icon: <HangerIcon />, path: "/outfits", text: "OUTFITS" },
            { icon: <OrdersIcon />, path: "/orders", text: "ORDERS" },
          ].map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              component={<Link to={item.path} />}
              active={pathname === item.path}
              style={{ marginBottom: "24px" }}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <VStack w="full" bg="white" pb={6} spacing={4}>
        <Flex
          w="100%"
          alignItems="space-between"
          justifyContent="center"
          mb="1.5em"
          py={6}
        >
          {["MEN", "WOMEN"].map((gender) => (
            <Box
              key={gender}
              className={filter === gender.toLowerCase() ? "active-link" : ""}
              onClick={() => setFilter(gender.toLowerCase() as "men" | "women")}
              cursor="pointer"
              px={4}
              py={2}
            >
              {gender}
            </Box>
          ))}
        </Flex>
        <Box
          w="100%"
          borderBottom="1.5px solid #E2E2E2"
          mt="-64px"
          mb="13px"
        ></Box>
        {renderMenu()}
      </VStack>
      <Box bg="white" w="full" p={6}>
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          {["Legal", "Privacy Policies", "Cookies"].map((text) => (
            <Text key={text} fontSize="13px">
              {text}
            </Text>
          ))}
        </Flex>
      </Box>
    </VStack>
  );

  return isMobile ? (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px"></DrawerHeader>
        <DrawerBody p={0}>{sidebarContent}</DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
    <Sidebar
      collapsed={collapsed}
      style={{ height: "100vh", width: collapsed ? "80px" : "280px" }}
    >
      {sidebarContent}
    </Sidebar>
  );
};

export default UnifiedSidebar;

// example usage
// import UnifiedSidebar from './UnifiedSidebar';

// // In your main layout component
// const Layout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const btnRef = React.useRef<HTMLButtonElement>(null);

//   return (
//     <div>
//       <button ref={btnRef} onClick={() => setSidebarOpen(true)}>
//         Open Sidebar
//       </button>
//       <UnifiedSidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         isOpen={isSidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         btnRef={btnRef}
//       />
//       {/* Rest of your layout */}
//     </div>
//   );
// };
