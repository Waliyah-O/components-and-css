import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "../assets/Icons/ChevronIcon";

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
};

export const PluggBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const lastTwoRoutes = pathnames.slice(-2);
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });

  const formatRouteName = (name: string): string => {
    return decodeURIComponent(name)
      .replace(/_/g, " ")
      .replace(/[-\s]/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <nav aria-label="PluggBreadcrumb">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon />}
        fontFamily="Geist"
        fontWeight={600}
        fontSize="13px"
        lineHeight="26px"
        letterSpacing="0.2em"
        color="#000000"
        textTransform="uppercase"
      >
        <BreadcrumbItem cursor="pointer">
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {lastTwoRoutes.map((name, index) => {
          const routeTo = `/${pathnames
            .slice(0, pathnames.indexOf(name) + 1)
            .join("/")}`;
          const isLast = index === lastTwoRoutes.length - 1;
          let formattedName = formatRouteName(name);

          // Truncate formattedName if on mobile
          if (display === "mobile") {
            formattedName = truncateString(formattedName, 10);
          }

          return (
            <BreadcrumbItem key={name} cursor="pointer">
              <BreadcrumbLink
                as={Link}
                to={routeTo}
                className={`ml-1 text-sm font-medium ${
                  isLast
                    ? "text-gray-500 cursor-default"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {formattedName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </nav>
  );
};

export const PluggBreadcrumb: React.FC = () => {
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentRouteName = (): string => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentRoute = pathSegments[pathSegments.length - 1] || "";
    const formattedRoute = formatRouteName(currentRoute);
    return display === "mobile"
      ? truncateString(formattedRoute, 20)
      : formattedRoute;
  };

  const formatRouteName = (name: string): string => {
    return decodeURIComponent(name)
      .replace(/_/g, " ")
      .replace(/[-\s]/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <>
      <Flex
        w="100%"
        align="center"
        gap="10px"
        fontFamily="Geist"
        fontWeight={600}
        fontSize="13px"
        lineHeight="26px"
        letterSpacing="0.2em"
        color="#000000"
        textTransform="uppercase"
        cursor="pointer"
        bg="white"
      >
        <Text onClick={() => navigate(-1)}>GO BACK</Text>
        <ChevronRightIcon />
        <span>{getCurrentRouteName()}</span>
      </Flex>
    </>
  );
};
