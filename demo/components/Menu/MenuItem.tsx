import { FC } from "react";
import classNames from "classnames";

import "./style.scss";

export interface MenuItemProps
  extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  isActive?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ className, children, isActive, ...otherProps }) => {
  return (
    <li
      className={classNames("menu__item", isActive && "menu__item--active", className)}
      {...otherProps}
    >
      {children}
    </li>
  );
};

export default MenuItem;
