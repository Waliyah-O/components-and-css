import React, { ReactElement } from "react";
import { Checkbox } from "@chakra-ui/react";
import styled from "styled-components";

const PluggCheckBox = ({
  label,
  size,
  rounded = false,
  action,
  icon,
  ...props
}: {
  label?: string;
  size?: string;
  rounded?: boolean;
  action: () => void;
  icon?: ReactElement;
  isChecked?: boolean;
}) => {
  return (
    <CheckBoxContainer onClick={action} rounded={rounded}>
      <Checkbox {...props} size={size} icon={icon}>
        {label}
      </Checkbox>
    </CheckBoxContainer>
  );
};

export default PluggCheckBox;

const CheckBoxContainer = styled.div<{ rounded: boolean }>`
  .chakra-checkbox {
    border-color: black;
  }

  .chakra-checkbox__control {
    border: 1.5px solid #8a8a8a;
    border-radius: ${(props) => (props.rounded ? "50%" : "0")};
  }

  .chakra-checkbox__control[data-checked],
  .chakra-checkbox__control[data-checked][data-hover] {
    background: white;
    border-color: black;

    svg {
      stroke: black !important;
      width: 10px;
      border-color: black;
    }
  }
`;
