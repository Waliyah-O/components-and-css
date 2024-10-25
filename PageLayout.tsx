import React, { useEffect, useRef } from "react";
import {
  Box,
  HStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PageSidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import BottomNavBar from "./BottomNavbar";
import { VertStack } from "./LayoutStyles";
import { CustomerProvider } from "../context/CustomerContext";
import { SearchProvider } from "../context/SearchContext";

const PageLayouts = () => {
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);

  const isDesktop = display === "desktop";
  const isStoriesRoute = location.pathname.includes("stories");
  const isProfileRoute = location.pathname.startsWith("/profile");

  const showSidebar = isDesktop && !isStoriesRoute;
  const showDesktopHeader = isDesktop && !isStoriesRoute;
  const showMobileHeader = !isDesktop && !isStoriesRoute && !isProfileRoute;
  const showBottomNav = !isDesktop && !isStoriesRoute;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CustomerProvider>
      <HStack
        bg={isDesktop ? "#F6F6F6" : "#ffffff"}
        w="full"
        h="100vh"
        alignItems="start"
        spacing="0"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        overflowY="scroll"
      >
        {showSidebar && (
          <Box w="max-content" height="100%">
            <PageSidebar
              collapsed={!isDesktop}
              toggleSidebar={() => {}}
              collapsedWidth="90px"
            />
          </Box>
        )}

        <SearchProvider>
          <Box
            flex={1}
            h="100%"
            overflowY="scroll"
            alignItems="start"
            position="sticky"
          >
            <VertStack>
              {showDesktopHeader && (
                <Box w="full" bg="white">
                  <Header />
                </Box>
              )}
              {showMobileHeader && (
                <Box
                  w="full"
                  zIndex={1000}
                  pos="sticky"
                  top={0}
                  bg="white"
                  pb="10px"
                >
                  <MobileHeader
                    toggleSidebar={() => {}}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    btnRef={btnRef}
                  />
                </Box>
              )}

              <Outlet />

              {showBottomNav && (
                <Box w="max-content" height="100%">
                  <BottomNavBar />
                </Box>
              )}
            </VertStack>
          </Box>
        </SearchProvider>
      </HStack>
    </CustomerProvider>
  );
};

export default PageLayouts;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   HStack,
//   useBreakpointValue,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { PageSidebar } from "./Sidebar";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "./Header";
// import MobileHeader from "./MobileHeader";
// import BottomNavBar from "./BottomNavbar";
// import { VertStack } from "./LayoutStyles";
// import { CustomerProvider } from "../context/CustomerContext";
// import { SearchProvider } from "../context/SearchContext";

// const PageLayouts = () => {
//   const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
//   const [collapsed, setCollapsed] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const location = useLocation();
//   const btnRef = useRef<HTMLButtonElement>(null);
//   const [scrollPositions, setScrollPositions] = React.useState<{
//     [key: string]: number;
//   }>({});

//   useEffect(() => {
//     const currentPath = location.pathname;

//     return () => {
//       setScrollPositions((prev) => ({
//         ...prev,
//         [currentPath]: window.scrollY,
//       }));
//     };
//   }, [location.pathname]);

//   useEffect(() => {
//     const currentPath = location.pathname;

//     if (scrollPositions[currentPath]) {
//       window.scrollTo(0, scrollPositions[currentPath]);
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [location.pathname, scrollPositions]);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     console.log("collapse");
//   };
//   useEffect(() => {
//     if (display === "mobile") {
//       setCollapsed(true);
//     }
//   }, [display]);

//   const excludedRoutes = ["/stories", "/profile"];

//   const onlyFistPages = [
//     "",
//     "as-seen-on",
//     "stories",
//     "buy-product",
//     "outfits",
//     "look-book",
//   ];

//   // eslint-disable-next-line
//   const onlyOnFirstPages = onlyFistPages.some(
//     (path) =>
//       location.pathname === `/${path}` || location.pathname === `/${path}/`
//   );

//   const excludeDesktopHeader = ["/stories"];

//   const isStoriesRoute = location.pathname.includes("stories");

//   const shouldHideMobileHeader = excludedRoutes.some((path) =>
//     location.pathname.startsWith(path)
//   );
//   const shouldHideHeader = excludeDesktopHeader.some((path) =>
//     location.pathname.includes(path)
//   );

//   const isDesktop = display === "desktop";
//   const showSidebar = isDesktop && !shouldHideHeader;
//   const showDesktopHeader = isDesktop && !shouldHideHeader;
//   const showMobileHeader = display === "mobile" && !shouldHideMobileHeader;
//   // const hideBottomNav = display !== "desktop";

//   return (
//     <CustomerProvider>
//       <HStack
//         bg={isDesktop ? "#F6F6F6" : "#ffffff"}
//         w="full"
//         h="100vh"
//         alignItems="start"
//         spacing="0"
//         css={{
//           "&::-webkit-scrollbar": {
//             display: "none",
//           },
//           "-ms-overflow-style": "none",
//           "scrollbar-width": "none",
//         }}
//         overflowY="scroll"
//       >
//         <Box w="max-content" height="100%">
//           {showSidebar && (
//             <PageSidebar
//               collapsed={collapsed}
//               toggleSidebar={toggleSidebar}
//               collapsedWidth="90px"
//             />
//           )}
//         </Box>

//         <SearchProvider>
//           <Box
//             flex={1}
//             h="100%"
//             overflowY="scroll"
//             alignItems="start"
//             position="sticky"
//           >
//             <VertStack>
//               {showDesktopHeader && (
//                 <Box w="full" bg="white">
//                   <Header />
//                 </Box>
//               )}
//               {showMobileHeader && (
//                 <Box
//                   w="full"
//                   zIndex={1000}
//                   pos="sticky"
//                   top={0}
//                   bg="white"
//                   pb="10px"
//                 >
//                   <MobileHeader
//                     toggleSidebar={toggleSidebar}
//                     onOpen={onOpen}
//                     isOpen={isOpen}
//                     onClose={onClose}
//                     btnRef={btnRef}
//                   />
//                 </Box>
//               )}

//               <Outlet />

//               {display === "mobile" && !isStoriesRoute && (
//                 <Box w="max-content" height="100%">
//                   <BottomNavBar />
//                 </Box>
//               )}
//             </VertStack>
//           </Box>
//         </SearchProvider>
//       </HStack>
//     </CustomerProvider>
//   );
// };

// export default PageLayouts;
