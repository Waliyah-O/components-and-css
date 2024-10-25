import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import styled from "styled-components";

interface ButtonProps {
  btnVariant: string;
  icon?: ReactNode;
  action?: () => void;
  disabled?: boolean;
  text?: string | ReactNode;
  rightIcon?: ReactNode;
  submitType?: "button" | "submit" | "reset" | undefined;
  style?: CSSStyleDeclaration | Object;
  wid?: string;
  noFillSVG?: boolean;
  height?: string;
  width?: string;
  id?: string;
  radius?: string;
  fontSize?: string;
  hoverEffect?: {
    bg?: string;
    color?: string;
  };
}

const PuggButtons = ({
  btnVariant,
  icon,
  action,
  text,
  disabled,
  rightIcon,
  submitType,
  noFillSVG,
  height,
  style,
  wid,
  width,
  id,
  radius,
  fontSize,
  hoverEffect,
}: ButtonProps) => {
  return (
    <AppButtons
      btnVariant={btnVariant}
      noFillSVG={noFillSVG}
      style={style}
      wid={wid}
      width={width}
      disabled={disabled}
      height={height}
      id={id}
      radius={radius}
      fontSize={fontSize}
      hoverEffect={hoverEffect}
    >
      <Button
        colorScheme="grey"
        size="sm"
        disabled={disabled}
        type={submitType}
        onClick={action}
      >
        {icon}
        {text}
        {rightIcon}
      </Button>
    </AppButtons>
  );
};

export default PuggButtons;

const typeReducer = (type: string) => {
  switch (type) {
    case "secondary":
      return {
        color: "#000000",
        bg: "#fff",
        border: "none",
      };
    case "primary":
      return {
        color: "#fff",
        bg: "#000000",
        border: "none",
      };
    case "outline":
      return {
        color: "#000",
        bg: "#fff",
        border: "1px solid #E4E4E4",
      };
    case "ghost":
      return {
        color: "#000",
        bg: "transparent",
        border: "none",
      };
    case "ghost-white":
      return {
        color: "#fff",
        bg: "transparent",
        border: "none",
      };
    case "ghost-border-white":
      return {
        color: "#ffffff",
        bg: "transparent",
        border: "0.79px solid #ffffff",
      };
    case "blue":
      return {
        color: "#fff",
        bg: "#3A01DB",
        border: "none",
      };
    case "link":
      return {
        color: "#3A01DB",
        bg: "unset",
        border: "none",
        fontSize: "12px",
        letterSpacing: "0.2em",
        lineHeight: "14.88px",
      };
    case "blackLink":
      return {
        color: "#000",
        bg: "unset",
        border: "none",
      };

    case "light":
      return {
        color: "#0765ff",
        bg: "#ECF2FF",
        border: "none",
      };
    case "addToCart":
      return {
        color: "#ffffff",
        bg: "#3A01DB",
        border: "none",
      };
    case "darkGrey":
      return {
        color: "white",
        bg: "#a4a4a4",
        border: "none",
      };
    case "lightGrey":
      return {
        color: "#3f3f40",
        bg: "#F6F6F6",
        border: "none",
      };
    case "transparent":
      return {
        color: "#3f3f40",
        bg: "transparent",
        border: "none",
      };

    default:
      return {
        color: "#fff",
        bg: "#0765FF",
        border: "none",
      };
  }
};

const AppButtons = styled.div<ButtonProps>`
  button {
    background: ${(props) =>
      props.disabled ? "#F2F4F7" : typeReducer(props.btnVariant).bg};
    color: ${(props) =>
      props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).color};
    gap: 8px;
    display: flex;
    min-width: ${(props) => (props?.wid ? props.wid : "95px")};
    width: ${(props) => (props?.width ? props.width : "100%")};
    border-radius: ${(props) => (props?.radius ? props.radius : "0px")};
    height: ${(props) => (props?.height ? props.height : `${35}px`)};
    align-items: center;
    font-weight: 500;
    border: ${(props) => typeReducer(props.btnVariant).border};
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
    font-size: ${(props) =>
      props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).fontSize};
    line-height: ${(props) =>
      props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).lineHeight};
    letter-spacing: ${(props) =>
      props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).letterSpacing};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    :disabled {
      background: gray;
    }

    &:hover {
      background: ${(props) =>
        props.hoverEffect?.bg || typeReducer(props.btnVariant).bg};
      color: ${(props) =>
        props.hoverEffect?.color || typeReducer(props.btnVariant).color};
    }

    @media screen and (max-width: 50em) {
      height: 35px;
      font-size: 13px;
    }
  }
`;

// const AppButtons = styled.div<ButtonProps>`
//   button {
//     background: ${(props) =>
//       props.disabled ? "#F2F4F7" : typeReducer(props.btnVariant).bg};
//     color: ${(props) =>
//       props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).color};
//     gap: 8px;
//     display: flex;
//     min-width: ${(props) => (props?.wid ? props.wid : "95px")};
//     width: ${(props) => (props?.width ? props.width : "100%")};
//     border-radius: ${(props) => (props?.radius ? props.radius : "0px")};
//     height: ${(props) => (props?.height ? props.height : `${35}px`)};
//     align-items: center;
//     font-weight: 500;
//     border: ${(props) => typeReducer(props.btnVariant).border};
//     transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
//     font-size: ${(props) =>
//       props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).fontSize};
//     line-height: ${(props) =>
//       props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).lineHeight};
//     letter-spacing: ${(props) =>
//       props.disabled ? "#D0D5DD" : typeReducer(props.btnVariant).letterSpacing};
//     cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

//     :disabled {
//       background: gray;
//     }

//     @media screen and (max-width: 50em) {
//       height: 35px;
//       font-size: 13px;
//     }
//   }
// `;
