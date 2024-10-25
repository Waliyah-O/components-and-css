import { Box, Select } from "@chakra-ui/react";
import React, { ChangeEvent, FocusEvent } from "react";

type Option = {
  position: number;
  value: string | number;
  label: string;
};

type Props = {
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  labelText?: string;
  rightLabel?: string;
  optionText?: string;
  rightErrorText?: string;
  className?: string;
  options?: Option[];
  errorText?: string;
  value?: string | number;
};

const textStyle = {
  fontFamily: "Geist",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "17.36px",
};

const PluggSelect = ({
  onBlur,
  name,
  onChange,
  labelText,
  rightLabel,
  optionText = "Select an option",
  rightErrorText,
  className,
  options = [],
  errorText,
  value,
}: Props) => {
  return (
    <Box w="100%">
      <Box>
        <label>
          <span>{labelText}</span>
          <span>{rightLabel}</span>
        </label>

        <Select
          variant="unstyled"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          style={textStyle}
        >
          <option disabled value="">
            {optionText}
          </option>
          {options.map((option) => (
            <option key={option.position} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        {!value && errorText && (
          <label>
            <span>{errorText}</span>
            <span>{rightErrorText}</span>
          </label>
        )}
      </Box>
    </Box>
  );
};

export default PluggSelect;
