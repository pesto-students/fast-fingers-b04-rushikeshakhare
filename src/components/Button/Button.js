import React from "react";
import "./button.scss";

export const Button = ({
  buttonText,
  buttonIcon,
  onButtonClick,
  iconMargin,
}) => {
  return (
    <button type="button" onClick={onButtonClick} className="button">
      {buttonIcon && (
        <div className="button-icon">
          <img
            src={buttonIcon.path}
            alt={buttonIcon.alt}
            style={{ marginRight: iconMargin || "" }}
          />
        </div>
      )}
      <div className="button-text">{buttonText}</div>
    </button>
  );
};
