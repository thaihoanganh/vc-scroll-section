import React, { FC, ReactNode } from "react";
import "./style.scss";

export interface MainLayoutProps {
  sidebar?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="main-layout">
      <div className="main-layout__sidebar">{sidebar}</div>
      <div className="main-layout__content">{children}</div>
    </div>
  );
};

export default MainLayout;
