import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Chip, Stack } from "@mui/material";

interface TagsSectionProps {
  tags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ tags }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <LocalOfferOutlinedIcon sx={{ color: "#94a3b8" }} />
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "9999px",
              fontSize: "0.875rem",
              color: "#67e8f9",
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default TagsSection;
