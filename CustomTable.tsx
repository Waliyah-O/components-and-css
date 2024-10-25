import React from "react";
import dayjs from "dayjs";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PuggButtons from "./PuggButtons";
import { NairaIcon } from "../assets/Icons/NairaIcon";
import styled from "styled-components";

const TableRow = styled(Tr)`
  &:hover {
    background-color: #e6e6e6;
  }
`;

interface Column {
  key: string;
  title: string;
}

interface DataRow {
  [key: string]: any;
  id?: string | number;
  buttonText?: string;
  btnText?: string;
  text?: string;
}

interface Props {
  columns: Column[];
  data: DataRow[];
  onRowClick: (id: string | number) => void;
  id?: string;
  tableCaption?: string;
  width?: string;
  columnSpacing?: string;
  noHeaderData?: boolean;
}

const PuggTable: React.FC<Props> = ({
  columns,
  data,
  onRowClick,
  id,
  tableCaption,
  width,
  columnSpacing = "26px",
  noHeaderData,
}) => {
  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("DD MMM YYYY");
  };

  const getColorAndBGColorBasedOnStatus = (status: string) => {
    const statusColors: {
      [key: string]: { textColor: string; bgColor?: string };
    } = {
      "In Progress": { textColor: "#FACA15", bgColor: "#FDF6B2" },
      InProgress: { textColor: "#FACA15", bgColor: "#FDF6B2" },
      Successful: { textColor: "#2b8e6a", bgColor: "#DEF7EC" },
      Enroute: { textColor: "#2b8e6a", bgColor: "#DEF7EC" },
      Paid: { textColor: "#2b8e6a", bgColor: "#DEF7EC" },
      Failed: { textColor: "#9d1313", bgColor: "#f5d2d2" },
      "Out Of Stock": { textColor: "#9d1313" },
      "In Stock": { textColor: "#000000" },
      Shirts: { textColor: "#000000", bgColor: "#4291e5" },
      Trousers: { textColor: "#000000", bgColor: "#06299e" },
      Caps: { textColor: "#000000", bgColor: "#440531" },
      Others: { textColor: "#000000", bgColor: "#9d1313" },
    };
    return statusColors[status] || { textColor: "", bgColor: "" };
  };

  const colorByUser = (status: string) => {
    const userColors: { [key: string]: { bgColor: string } } = {
      Vendor: { bgColor: "#0E9F6E" },
      Admin: { bgColor: "#F05252" },
    };
    return userColors[status] || { bgColor: "" };
  };

  const getButtonVariant = (
    buttonText?: string,
    btnText?: string,
    text?: string
  ) => {
    if (buttonText === "Close" || btnText === "Close" || text === "Close")
      return "primary";
    if (
      buttonText === "View Items" ||
      btnText === "View Items" ||
      text === "View Items"
    )
      return "lightGrey";
    return "default";
  };

  return (
    <TableContainer
      bg="#FCFCFC"
      p={0}
      fontFamily="Geist"
      w={{ base: "100%", lg: width }}
      cursor="pointer"
    >
      <Table variant="simple" p="14px">
        {tableCaption && <TableCaption>{tableCaption}</TableCaption>}
        {noHeaderData ? (
          ""
        ) : (
          <Thead>
            <Tr fontSize="13px">
              {columns.map((column) => (
                <Th key={column.key}>{column.title}</Th>
              ))}
            </Tr>
          </Thead>
        )}

        <Tbody>
          {data.map((row) => (
            <TableRow
              style={{
                fontSize: "14px",
                fontFamily: "Geist",
                fontWeight: 500,
                lineHeight: "26px",
              }}
              onClick={() => onRowClick(row.id ?? row[id!])}
              key={row.id}
            >
              {columns.map((column, index) => (
                <Td
                  key={column.key}
                  style={{
                    paddingRight: columnSpacing,
                    paddingLeft: columnSpacing,
                  }}
                >
                  {index === 0 && (row.avatar || row.logoUrl) ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <img
                        src={row.avatar || row.logoUrl}
                        alt="avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      />
                      <span>{row[column.key]}</span>
                    </div>
                  ) : column.key === "endDate" ? (
                    <span>{formatDate(row[column.key])}</span>
                  ) : column.key.toLowerCase() === "status" &&
                    row[column.key] ? (
                    <span
                      style={{
                        color: getColorAndBGColorBasedOnStatus(row[column.key])
                          .textColor,
                        backgroundColor: getColorAndBGColorBasedOnStatus(
                          row[column.key]
                        ).bgColor,
                        width: "fit-content",
                        padding: "8px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          height: "2px",
                          width: "2px",
                          border: `3px solid ${
                            getColorAndBGColorBasedOnStatus(row[column.key])
                              .textColor
                          }`,
                          borderRadius: "50%",
                          background: "#ffffff",
                        }}
                      ></div>
                      {row[column.key]}
                    </span>
                  ) : column.key.toLowerCase().includes("category") &&
                    row[column.key] ? (
                    <span
                      style={{
                        color: getColorAndBGColorBasedOnStatus(row[column.key])
                          .textColor,
                        width: "fit-content",
                        padding: "8px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          height: "4px",
                          width: "4px",
                          border: `5px solid ${
                            getColorAndBGColorBasedOnStatus(row[column.key])
                              .bgColor
                          }`,
                          borderRadius: "50%",
                          background: "#ffffff",
                        }}
                      ></div>
                      {row[column.key]}
                    </span>
                  ) : column.key === "progress" && row[column.key] ? (
                    <div>
                      {`${row[column.key]}%`}
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${row[column.key]}%`,
                            height: "8px",
                            background: "#4CAF50",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : column.key.toLowerCase() === "usertype" &&
                    row[column.key] ? (
                    <span
                      style={{
                        backgroundColor: colorByUser(row[column.key]).bgColor,
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {row[column.key]}
                    </span>
                  ) : column.key.includes("btnText") && row[column.key] ? (
                    <PuggButtons
                      btnVariant={getButtonVariant(row[column.key])}
                      text={row[column.key] || "Click"}
                      action={() => onRowClick(row.id ?? row[id!])}
                    />
                  ) : column.key.toLowerCase() === "prize" ||
                    column.key.toLowerCase() === "amount" ||
                    (column.key.toLowerCase() === "price" &&
                      row[column.key]) ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                      }}
                    >
                      <NairaIcon />
                      {row[column.key]}
                    </span>
                  ) : (
                    row[column.key]
                  )}
                </Td>
              ))}
            </TableRow>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PuggTable;
