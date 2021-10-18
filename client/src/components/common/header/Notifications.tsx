import React from "react";
import { Popper, Fade, Paper, Typography, PopperPlacementType } from "@material-ui/core";

type Props = {
  open: boolean;
  anchor: HTMLButtonElement | null;
  placement: PopperPlacementType;
  className: string;
};

const Notifications: React.FC<React.PropsWithChildren<Props>> = (props: React.PropsWithChildren<Props>) => {
  return (
    <Popper
      open={props.open}
      anchorEl={props.anchor}
      placement={props.placement}
      transition
      className={props.className}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>{props.children}</Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default Notifications;
