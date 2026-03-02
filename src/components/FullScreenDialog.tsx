import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import type { DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props extends React.PropsWithChildren {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  dialogProps?: Partial<DialogProps>;
}

export default function FullScreenDialog({
  children,
  title,
  isOpen,
  onClose,
  dialogProps,
}: Props) {
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      fullScreen
      sx={{ my: 3, mx: 20 }}
      open={isOpen}
      onClose={onClose}
      {...dialogProps}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6">
            {title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, flex: 1 }}>{children}</Box>
    </Dialog>
  );
}
