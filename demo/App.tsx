import { FC, useState } from "react";
import VcScrollSection from "../package/index";

import MainLayout from "./components/MainLayout";
import Menu, { MenuItem } from "./components/Menu";
import Switch from "./components/Switch";

const App: FC = () => {
  const [state, setState] = useState({
    sectionIndex: 0,
    disabled: false,
  });

  const handleDisabledScrollSection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      disabled: e.target.checked,
    }));
  };

  const handleScrollSection = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      sectionIndex: index,
    }));
  };

  const Sidebar = (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>Vc-scroll-section</h1>
      </div>
      <div className="sidebar__menu">
        <Menu menuSelected={state.sectionIndex}>
          <MenuItem onClick={() => handleScrollSection(0)}>Section 1</MenuItem>
          <MenuItem onClick={() => handleScrollSection(1)}>Section 2</MenuItem>
          <MenuItem onClick={() => handleScrollSection(2)}>Section 3</MenuItem>
          <MenuItem onClick={() => handleScrollSection(3)}>Section 4</MenuItem>
          <MenuItem onClick={() => handleScrollSection(4)}>Section 5</MenuItem>
          <MenuItem onClick={() => handleScrollSection(5)}>Section 6</MenuItem>
          <MenuItem onClick={() => handleScrollSection(6)}>Section 7</MenuItem>
          <MenuItem onClick={() => handleScrollSection(7)}>Section 8</MenuItem>
          <MenuItem onClick={() => handleScrollSection(8)}>Section 9</MenuItem>
          <MenuItem onClick={() => handleScrollSection(9)}>Section 10</MenuItem>
        </Menu>
      </div>

      <div className="sidebar__control">
        <div className="control">
          <div className="control__label">Disabled scroll section</div>
          <div className="control__action">
            <Switch onChange={handleDisabledScrollSection} />
          </div>
        </div>
      </div>
    </div>
  );2

  return (
    <MainLayout sidebar={Sidebar}>
      <VcScrollSection
        disabled={state.disabled}
        sectionSelect={state.sectionIndex}
        sectionOnchange={handleScrollSection}
      >
        <section>
          <h2>Section 1</h2>
          <p>Scroll down</p>
        </section>
        <section>
          <h2>Section 2</h2>
        </section>
        <section>
          <h2>Section 3</h2>
        </section>
        <section>
          <h2>Section 4</h2>
        </section>
        <section>
          <h2>Section 5</h2>
        </section>
        <section>
          <h2>Section 6</h2>
        </section>
        <section>
          <h2>Section 7</h2>
        </section>
        <section>
          <h2>Section 8</h2>
        </section>
        <section>
          <h2>Section 9</h2>
        </section>
        <section>
          <h2>Section 10</h2>
          <p>Scroll up</p>
        </section>
      </VcScrollSection>
    </MainLayout>
  );
};

export default App;
