import { Avatar, Box, Button, Popover } from "@mui/material";
import React from "react";
import { User } from "../../../modules/User/store/types";
import { useDispatch } from "react-redux";
import { refillWallet } from "../../../modules/User/store/actions";

type AccountAvatarProps = {
  user: User;
  onLogout: () => void;
};

export const AccountAvatar = ({ user, onLogout }: AccountAvatarProps) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const handleRefill = () => {
    dispatch(refillWallet(user.wallet.id) as any);
  };
  return (
    <Box>
      <Avatar
        src={user.avatar_url}
        sx={{ width: 40, height: 40, cursor: "pointer" }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            alignItems: "flex-end",
            flexDirection: "column",
            display: "flex",
            boxShadow: 3,
            gap: 1,
          }}
        >
          <div onClick={onLogout}>Account: {user.name}</div>
          <Button
            sx={{ cursor: "pointer", width: "100%" }}
            onClick={handleRefill}
          >
            Refill (10000$)
          </Button>
          <Button sx={{ cursor: "pointer", width: "100%" }} onClick={onLogout}>
            LogOut
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};
