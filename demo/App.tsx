import { FC, useRef, useState } from "react";
import VcScrollSection from "../package/index";

import MainLayout from "./components/MainLayout";
import Menu, { MenuItem } from "./components/Menu";
import Switch from "./components/Switch";

const App: FC = () => {
  const refFunOnChangeSession: any = useRef(null);
  const [state, setState] = useState({
    disabled: false,
    isMulti: false,
    sectionIndex: 0,
    isNormal: false,
  });

  const toggleDisabledScrollSection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      disabled: e.target.checked,
    }));
  };
  const toggleMultiScrollSection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      isMulti: e.target.checked,
    }));
  };

  const handleScrollSection = (index: number) => {
    if (!state.disabled) {
      setState((prevState) => ({
        ...prevState,
        sectionIndex: index,
      }));
      if (state?.isNormal) {
        refFunOnChangeSession.current?.onScrollToSession(index);
      }
    }
  };

  const renderMenuList = () => {
    const html = [];
    
    for (let i = 0; i < 10; i++) {
      html.push(<MenuItem key={i} onClick={() => handleScrollSection(i)}>{`Section ${i + 1}`}</MenuItem>)
    };
    return html;
  }
  const Sidebar = (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>Vc-scroll-section</h1>
      </div>
      <div className="sidebar__menu">
        <Menu menuSelected={state.sectionIndex} isNormal={state?.isNormal}>
          {renderMenuList()}
        </Menu>
      </div>

      <div className="sidebar__control">
        <div className="control">
          <div className="control__label">Multil scroll section</div>
          <div className="control__action">
            <Switch defaultChecked={state.isMulti} onChange={toggleMultiScrollSection} />
          </div>
        </div>
        <div className="control">
          <div className="control__label">Disabled scroll section</div>
          <div className="control__action">
            <Switch defaultChecked={state.disabled} onChange={toggleDisabledScrollSection} />
          </div>
        </div>
        <div className="control">
          <div className="control__label">Normal scroll section</div>
          <div className="control__action">
            <Switch defaultChecked={state.isNormal} onChange={(e) => setState((prevState) => ({ ...prevState, isNormal: e.target.checked, sectionIndex: 0}))} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout sidebar={Sidebar}>
      <VcScrollSection
        disabled={state.disabled}
        isMulti={state.isMulti}
        isNormal={state?.isNormal}
        sectionSelect={state.sectionIndex}
        classTabItem="vc-menu__item"
        sectionOnchange={handleScrollSection}
        ref={refFunOnChangeSession}
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
