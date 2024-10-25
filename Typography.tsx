import React from "react";
import { Text, Heading } from "@chakra-ui/react";
import { CSSProperties } from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "small";
  color?: string;
  size?: string;
  fontWeight?: string | number;
  fontFamily?: string;
  align?: CSSProperties["textAlign"];
  lineHeight?: string;
  letterSpacing?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  color = "black",
  size,
  fontWeight,
  fontFamily,
  align = "left",
  lineHeight,
  letterSpacing,
  children,
}) => {
  const getTypographyComponent = () => {
    switch (variant) {
      case "h1":
        return (
          <Heading
            as="h1"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
          >
            {children}
          </Heading>
        );
      case "h2":
        return (
          <Heading
            as="h2"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Heading>
        );
      case "h3":
        return (
          <Heading
            as="h3"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Heading>
        );
      case "h4":
        return (
          <Heading
            as="h4"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Heading>
        );
      case "h5":
        return (
          <Heading
            as="h5"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Heading>
        );
      case "span":
        return (
          <Text
            as="span"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Text>
        );
      case "small":
        return (
          <Text
            as="small"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Text>
        );
      case "p":
      default:
        return (
          <Text
            as="p"
            color={color}
            fontSize={size}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={align}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {children}
          </Text>
        );
    }
  };

  return getTypographyComponent();
};

export default Typography;

{
  /* <Typography
  variant="h4"
  color="#676767"
  size="12px"
  fontWeight={500}
  align="center"
  lineHeight="26px"
  letterSpacing="0.2em"
  fontFamily="Geist"
>
  This is a Heading 4
</Typography>; */
}
