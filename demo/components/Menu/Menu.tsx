import { Children, cloneElement, FC, isValidElement, useEffect, useRef } from "react";

import "./style.scss";

export interface MenuProps {
  menuSelected?: number;
  isNormal?: boolean;
}

const Menu: FC<MenuProps> = ({ children, menuSelected = 0, isNormal = false }) => {
  const menuRef = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   const menuChildNodes = menuRef.current!.childNodes;
  //   const MenuItemActive = menuChildNodes.item(menuSelected) as HTMLLIElement;
  //   if (!isNormal) {
  //   menuRef.current!.style.top = MenuItemActive.offsetTop + "px";
  //   menuRef.current!.style.setProperty("--menu-item-height", MenuItemActive.scrollHeight + "px");
  //   } else {
  //     menuRef.current!.style.removeProperty("--menu-item-height");
  //   }
  // }, [menuSelected, isNormal]);

  return (
    <div className="menu-wrapper">
      <ul className="menu" ref={menuRef}>
        {Children.map(children, (child, index) => {          
          if (isValidElement(child)) {
            return cloneElement(child, { isActive: menuSelected === index && !isNormal });
          }
        })}
      </ul>
    </div>
  );
};

export default Menu;
