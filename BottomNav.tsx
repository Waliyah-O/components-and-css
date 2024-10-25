import React from "react";
import { Flex } from "@chakra-ui/react";
import { BottomNavHomeIcon } from "../../assets/Icons/HomeIcon";
import { TShirtIcon } from "../../assets/Icons/TshirtIcon";
import HangerIcon from "../../assets/Icons/HangerIcon";
import { OrderIcon } from "../../assets/Icons/BagIcon";
import { NavLink } from "react-router-dom";
import PuggButtons from "../../Components/PuggButtons";
import { IconBtn } from "./LayoutStyles";

interface BottomNavBarProps {
  onHomeClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = () => {
  return (
    <Flex
      justify="space-between"
      alignItems="center"
      w="100%"
      pos="fixed"
      bottom="0"
      left="0"
      bg="#F5F5F5"
      color="white"
      zIndex="1000"
    >
      <NavLink
        to="/"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "78px",
          alignItems: "center",
          justifyContent: "center",
          color: "#626161",
        }}
        className={({ isActive }) => (isActive ? "active-links" : "")}
      >
        <PuggButtons btnVariant="ghost" icon={<BottomNavHomeIcon />} />
        <IconBtn>HOME</IconBtn>
      </NavLink>
      <NavLink
        to="/look-book"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "78px",
          alignItems: "center",
          justifyContent: "center",
          color: "#626161",
        }}
        className={({ isActive }) => (isActive ? "active-links" : "")}
      >
        <PuggButtons btnVariant="ghost" icon={<TShirtIcon />} />
        <IconBtn>LOOK BOOK</IconBtn>
      </NavLink>
      <NavLink
        to="/outfits"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "78px",
          alignItems: "center",
          justifyContent: "center",
          color: "#626161",
        }}
        className={({ isActive }) => (isActive ? "active-links" : "")}
      >
        <PuggButtons btnVariant="ghost" icon={<HangerIcon />} />

        <IconBtn>OUTFITS</IconBtn>
      </NavLink>
      <NavLink
        to="/orders"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "78px",
          alignItems: "center",
          justifyContent: "center",
          color: "#626161",
          paddingRight: "10px",
        }}
        className={({ isActive }) => (isActive ? "active-links" : "")}
      >
        <PuggButtons btnVariant="ghost" icon={<OrderIcon />} />

        <IconBtn>ORDERS</IconBtn>
      </NavLink>
    </Flex>
  );
};

export default BottomNavBar;
