import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
  Text as ChakraText,
  EditablePreview,
  EditableInput,
  Checkbox,
} from "@chakra-ui/react";
import { PluggBreadcrumb } from "../../Components/PluggBreadcrumb";
import {
  Body,
  Editables,
  Header,
  Icon,
  Wrapper,
  Text,
} from "../../Vendor/pages/Settings";
import { ProfileIcon } from "../../assets/Icons/ProfileIcon";
import { WalletIcon } from "../../assets/Icons/BagIcon";
import { TShirtIcon } from "../../assets/Icons/TshirtIcon";
import { menSizes } from "../utils/data";

// Types
interface FormValues {
  fullName: string;
  email: string;
  accountNumber: string;
  bankName: string;
  favoriteColor: string[];
  favoriteItems: string[];
}

const COLORS = [
  "Black",
  "Yellow",
  "Green",
  "Orange",
  "Pink",
  "Blue",
  "Purple",
  "Brown",
  "Off-White",
].map((color) => ({ value: color.toLowerCase(), label: color }));

const DEFAULT_VALUES: FormValues = {
  fullName: "John Doe Oluwafemi",
  email: "GGworldwide@gmail.com",
  accountNumber: "0376583367",
  bankName: "Guaranty Trust Bank",
  favoriteColor: [],
  favoriteItems: [],
};

// Styled Components
const Parent = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 752px;
  height: 100%;
  top: 160px;
  left: 142px;
  background: #ffffff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media screen and (max-width: 812px) {
    width: 100%;
    height: 100%;
  }
`;

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const Section: React.FC<SectionProps> = ({ icon, title, children }) => (
  <Wrapper>
    <Flex align="center" gap="24px">
      <Header>
        <Icon>{icon}</Icon>
      </Header>
      <Text>{title}</Text>
    </Flex>
    <Flex direction="column" align="end" justify="end" w="100%" gap="24px">
      {children}
    </Flex>
  </Wrapper>
);
const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Flex direction="column">
      {isEditing ? (
        <Editables
          border="1px solid red"
          defaultValue={value}
          onChange={(newValue) => onChange(newValue)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        >
          <EditablePreview />
          <EditableInput />
        </Editables>
      ) : (
        <Editables
          defaultValue={value}
          onChange={(newValue) => onChange(newValue)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          _hover={{ bg: "gray.50" }}
          onClick={() => setIsEditing(true)}
          cursor="pointer"
        >
          <EditablePreview />
          <EditableInput />
        </Editables>
      )}
    </Flex>
  );
};

const CustomerSettings = () => {
  const display = useBreakpointValue({ base: "mobile", lg: "desktop" });
  const [formData, setFormData] = useState<FormValues>(DEFAULT_VALUES);
  const [selectedColors, setSelectedColors] = useState<string[]>(
    formData.favoriteColor || []
  );
  const [selectedItems, setSelectedItems] = useState<string[]>(
    formData.favoriteItems || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const templateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  const handleFieldChange = (
    field: keyof FormValues,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // eslint-disable-next-line
  const handleColorSelection = (color: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.favoriteColor.includes(color);
      const newColors = alreadySelected
        ? prev.favoriteColor.filter((c) => c !== color)
        : [...prev.favoriteColor, color];
      return { ...prev, favoriteColor: newColors };
    });
  };

  // eslint-disable-next-line
  const handleItemSelection = (item: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.favoriteItems.includes(item);
      const newItems = alreadySelected
        ? prev.favoriteItems.filter((i) => i !== item)
        : [...prev.favoriteItems, item];
      return { ...prev, favoriteItems: newItems };
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    handleFieldChange("favoriteColor", selectedColors);
  };

  const handleItemChange = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    handleFieldChange("favoriteItems", selectedItems);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Parent>
      <Flex
        w={{ base: "100%", lg: "752px" }}
        h="100%"
        direction="column"
        bg="white"
        mb="50px"
      >
        <Container
          style={{
            height: "80vh",
            overflow: "auto",
            background: "white",
          }}
        >
          {display === "desktop" && <PluggBreadcrumb />}

          {/* Personal Information */}

          <Section icon={<ProfileIcon />} title="PERSONAL INFORMATION">
            <EditableField
              label="Full Name"
              value={formData.fullName}
              onChange={(value) => handleFieldChange("fullName", value)}
            />
            <EditableField
              label="Email"
              value={formData.email}
              onChange={(value) => handleFieldChange("email", value)}
            />
          </Section>

          {/* Account Information */}

          <Section icon={<WalletIcon />} title="ACCOUNT INFORMATION">
            <EditableField
              label="Account Number"
              value={formData.accountNumber}
              onChange={(value) => handleFieldChange("accountNumber", value)}
            />
            <EditableField
              label="Bank Name"
              value={formData.bankName}
              onChange={(value) => handleFieldChange("bankName", value)}
            />
          </Section>

          {/* Style Preferences */}

          <Section icon={<TShirtIcon />} title="YOUR STYLE">
            <Body>
              <ChakraText w="100%" textAlign="left" color="gray.500">
                Favorite Colors
              </ChakraText>

              <Flex flexWrap="wrap" gap={4}>
                {COLORS.map((color) => (
                  <Flex
                    key={color.value}
                    border="0.6px solid #DDDDDD"
                    align="center"
                    justify="center"
                    h="33px"
                    py="6px"
                    px="9px"
                    gap="10px"
                  >
                    <Checkbox
                      key={color.value}
                      isChecked={selectedColors.includes(color.value)}
                      onChange={() => handleColorChange(color.value)}
                    >
                      {color.label}
                    </Checkbox>
                  </Flex>
                ))}

                {/* {COLORS.map((color) => (
                  <Flex
                    key={color.value}
                    border="0.6px solid #DDDDDD"
                    align="center"
                    justify="center"
                    h="33px"
                    py="6px"
                    px="9px"
                    gap="10px"
                  >
                    <Checkbox
                      isChecked={formData.favoriteColor.includes(color.value)}
                      onChange={() => handleColorSelection(color.value)}
                      colorScheme="blackAlpha"
                    >
                      {color.label}
                    </Checkbox>
                  </Flex>
                ))} */}
              </Flex>

              <ChakraText mt="24px" w="100%" textAlign="left" color="gray.500">
                Favorite Items
              </ChakraText>
              <Grid
                templateColumns={templateColumns}
                gap={3}
                width="fit-content"
                alignItems="center"
                justifyContent="center"
              >
                {/* Favorite Items */}
                {menSizes.map((size, index) => (
                  <GridItem
                    key={index}
                    bg="white"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={size.image}
                      alt={size.title}
                    />
                    <Checkbox
                      pos="absolute"
                      top="20px"
                      right="30px"
                      isChecked={selectedItems.includes(size.title)}
                      onChange={() => handleItemChange(size.title)}
                    ></Checkbox>
                    {/* Render other size info */}
                  </GridItem>
                ))}
                {/* {menSizes.map((size, index) => (
                  <GridItem
                    key={index}
                    bg="white"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                  >
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={size.image}
                      alt={size.title}
                    />
                    <Checkbox
                      pos="absolute"
                      top="20px"
                      right="30px"
                      isChecked={formData.favoriteItems.includes(size.title)}
                      onChange={() => handleItemSelection(size.title)}
                    ></Checkbox>
                  </GridItem>
                ))} */}
              </Grid>
            </Body>
          </Section>
        </Container>
        {/* Footer */}
        <Flex
          position="sticky"
          bottom={0}
          bg="white"
          p={4}
          borderTop="1px solid"
          borderColor="gray.200"
          justify="flex-end"
        >
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Saving"
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            borderRadius="none"
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Parent>
  );
};

export default CustomerSettings;

// Can you set default values to what the user inputs?

// const [selectedColors, setSelectedColors] = useState<string[]>(
//   formData.favoriteColor || []
// );
// const [selectedItems, setSelectedItems] = useState<string[]>(
//   formData.favoriteItems || []
// );

// {
//   /* Favorite Colors */
// }
// {
//   COLORS.map((color) => (
//     <PluggCheckBox
//       key={color.value}
//       isChecked={selectedColors.includes(color.value)}
//       onChange={() => handleColorChange(color.value)}
//     >
//       {color.label}
//     </PluggCheckBox>
//   ));
// }

// {
//   /* Favorite Items */
// }
// {
//   menSizes.map((size, index) => (
//     <GridItem key={index}>
//       <PluggCheckBox
//         isChecked={selectedItems.includes(size.title)}
//         onChange={() => handleItemChange(size.title)}
//       />
//       {/* Render other size info */}
//     </GridItem>
//   ));
// }

// const handleColorChange = (color: string) => {
//   setSelectedColors((prev) =>
//     prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
//   );
//   handleFieldChange("favoriteColor", selectedColors);
// };

// const handleItemChange = (item: string) => {
//   setSelectedItems((prev) =>
//     prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//   );
//   handleFieldChange("favoriteItems", selectedItems);
// };
