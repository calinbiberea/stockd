import { SnackbarKey, useSnackbar } from "notistack";
import React from "react";
import { Button } from "@material-ui/core";

interface CloseButtonProps {
  id: SnackbarKey;
}

const CloseSnackbarButton: React.FC<CloseButtonProps> = ({ id }: CloseButtonProps) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => closeSnackbar(id)}
      style={{
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    />
  );
};

export default CloseSnackbarButton;
