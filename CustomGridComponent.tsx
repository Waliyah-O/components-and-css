import React from "react";
import styled, { css } from "styled-components";

interface GridItemProps {
  span?: number;
}

interface GridLayoutProps {
  columns?: number;
  gap?: string;
  children: React.ReactNode;
  breakpoints?: {
    [key: string]: number;
  };
  width?: string;
  padding?: string;
  alignItems?: string;
  justifyItems?: string;
}

const getColumnSpan = (span: number, columns: number) => {
  return span
    ? `span ${span} / span ${span}`
    : `span ${columns} / span ${columns}`;
};

const StyledGridLayout = styled.div<GridLayoutProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 1}, 1fr);
  gap: ${({ gap }) => gap || "16px"};
  width: ${({ width }) => width || "100%"};
  padding: ${({ padding }) => padding || "16px"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  justify-items: ${({ justifyItems }) => justifyItems || "stretch"};

  ${({ breakpoints }) =>
    breakpoints &&
    Object.keys(breakpoints).map(
      (key) => css`
        @media screen and (max-width: ${key}) {
          grid-template-columns: repeat(${breakpoints[key]}, 1fr);
        }
      `
    )}
`;
const StyledGridItem = styled.div<GridItemProps>`
  ${({ span }) =>
    span &&
    css`
      grid-column: ${getColumnSpan(span, 12)};
    `}

  @media screen and (min-width: 1025px) {
    grid-column: span 2 / span 2;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    grid-column: span 1 / span 1;
  }

  @media screen and (max-width: 480px) {
    grid-column: 1 / -1;
  }
`;

const GridLayout: React.FC<GridLayoutProps> = ({
  columns = 4,
  width = "100%",
  gap = "20px",
  children,
  breakpoints = { "1024px": 2, "900px": 1, "480px": 1 },
  alignItems,
  justifyItems,
}) => {
  return (
    <StyledGridLayout
      columns={columns}
      width={width}
      gap={gap}
      breakpoints={breakpoints}
      alignItems={alignItems}
      justifyItems={justifyItems}
    >
      {React.Children.map(children, (child, index) => (
        <StyledGridItem key={index}>{child}</StyledGridItem>
      ))}
    </StyledGridLayout>
  );
};

export default GridLayout;
