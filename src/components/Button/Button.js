import React from "react";
import "./Button.css";

const Button = ({ className, text, href, newTab }) => {
  return (
    <div className={className}>
      <a href={href} className="main-button" target={newTab && "_blank"}>
        {text}
      </a>
    </div>
  );
};

export default Button;
