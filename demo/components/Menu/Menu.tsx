import { Children, cloneElement, FC, isValidElement, useEffect, useRef } from "react";

import "./style.scss";

export interface MenuProps {
  menuSelected?: number;
}

const Menu: FC<MenuProps> = ({ children, menuSelected = 0 }) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const menuChildNodes = menuRef.current!.childNodes;
    const MenuItemActive = menuChildNodes.item(menuSelected) as HTMLLIElement;
    menuRef.current!.style.top = MenuItemActive.offsetTop + "px";
    menuRef.current!.style.setProperty("--menu-item-height", MenuItemActive.scrollHeight + "px");
  }, [menuSelected]);

  return (
    <div className="menu-wrapper">
      <ul className="menu" ref={menuRef}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, { isActive: menuSelected === index });
          }
        })}
      </ul>
    </div>
  );
};

export default Menu;
