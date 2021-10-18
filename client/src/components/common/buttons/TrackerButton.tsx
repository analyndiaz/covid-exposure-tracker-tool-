import React from "react";
import { ButtonBase, Paper } from "@material-ui/core";
import "./TrackerButton.css";

type Props = {
  title: string;
  count: number;
  onClickHandler: () => void;
};

const TrackerButton: React.FC<React.PropsWithChildren<Props>> = (
  props: React.PropsWithChildren<Props>
) => {
  return (
    <ButtonBase focusRipple onClick={props.onClickHandler}>
      <Paper className="btn-style" square={true} elevation={3}>
        <div>
          <h3>{props.title}</h3>
          <br />
          <p>{props.count}</p>
        </div>
        {props.children && <div>{props.children}</div>}
      </Paper>
    </ButtonBase>
  );
};

export default TrackerButton;
