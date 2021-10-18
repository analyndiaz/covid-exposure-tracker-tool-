import React, { useEffect } from "react";
import "./Header.css";

type Props = {};

const Header: React.FC<React.PropsWithChildren<Props>> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="logo-container">
      <h1>Covid Tracker Exposure Tool</h1>
      {props.children}
    </div>
  );
};

export default Header;
