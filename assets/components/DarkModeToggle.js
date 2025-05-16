import React from "react";
import { IconButton, Box } from "@mui/material";
import { WbSunnyRounded, NightsStayRounded } from "@mui/icons-material";

export default function DarkModeToggle({ mode, onToggle }) {
  const isDark = mode === "dark";

  return (
    <IconButton
      onClick={onToggle}
      sx={{
        width: 48,
        height: 48,
        backgroundColor: isDark ? "#444" : "#70c7e9",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        perspective: 600,
        transition: "background-color 0.4s",
        "&:hover": {
          backgroundColor: isDark ? "#555" : "#5ab1d3",
        },
      }}
      aria-label="toggle dark mode"
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: isDark ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s ease-in-out",
          position: "relative",
        }}
      >
        {/* Ícone lua */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <NightsStayRounded />
        </Box>

        {/* Ícone sol */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <WbSunnyRounded />
        </Box>
      </Box>
    </IconButton>
  );
}
