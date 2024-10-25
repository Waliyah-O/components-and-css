import React from "react";

interface ProgressBarProps {
  progress?: number;
  width?: string;
  height?: string;
  color?: string;
  text?: string;
}

const PluggProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width = "100%",
  height = "40px",
  color = "black",
  text = "progress",
}) => {
  const progressStyle = {
    width: `${progress}%`,
    height,
    backgroundColor: color,
    transition: "width 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        width,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      <div style={progressStyle}>{text}</div>
    </div>
  );
};

export default PluggProgressBar;
