import { FC } from "react";

import "./style.scss";

export interface SwitchProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Switch: FC<SwitchProps> = ({ ...otherProps }) => {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" {...otherProps} />
      <div className="switch__slider" />
    </label>
  );
};

export default Switch;
