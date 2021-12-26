import React, { Children, FC, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";

export interface VcScrollSectionProps {
  /**
   * Animation duration in milliseconds
   */
  animationTimer?: number;

  /**
   * Disabled scroll section
   */
  disabled?: boolean;

  /**
   * Multi scroll section
   */
  isMulti?: boolean;

  /**
   * External selected section
   */
  sectionSelect?: number;

  /**
   * Callback before scroll occured
   */
  sectionOnchange?: (key: number) => void;

  isNormal?: boolean;

  classTabItem?: string;

  targetOffsetTop?: number;

  classActiveMenuItem?: string;

  ref?: object;
}

interface IVcScrollSectionState {
  sectionIndex: number;
  sectionHeight: number[];
}

const DEFAULT_ANIMATION_TIMER = 1000;
const DEFAULT_SECTION_SELECT = 0;

let previousTouchMove: any = null;
let isScrolling: boolean = false;

export const VcScrollSection: FC<VcScrollSectionProps> = forwardRef(({
  animationTimer = DEFAULT_ANIMATION_TIMER,
  children,
  disabled,
  isMulti,
  sectionSelect = DEFAULT_SECTION_SELECT,
  sectionOnchange,
  isNormal = false,
  classTabItem = '',
  targetOffsetTop = 100,
  classActiveMenuItem = 'menu__item--active',
}, ref) => {

  const [state, setState] = useState<IVcScrollSectionState>({
    sectionIndex: 0,
    sectionHeight: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setSectionHeight();
  }, [children]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, sectionIndex: sectionSelect }));
  }, [sectionSelect]);

  useEffect(() => {
    if (disabled || isNormal) {
      containerRef.current!.style.transform = "translate3d(0, 0, 0)";
    }

    containerWrapperRef.current!.scrollTo(0, 0);
    setState((prevState) => ({ ...prevState, sectionIndex: 0 }));
  }, [disabled, isNormal]);

  useEffect(() => {
    if (!disabled) {
      let positionScroll: number = 1;
      for (let i = 0; i < state.sectionIndex; i++) {
        positionScroll += state.sectionHeight[i];
      }

      containerRef.current!.style.transform = `translate3d(0, -${positionScroll}px, 0)`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sectionIndex]);

  const wrapperChildren = useMemo(
    () => Children.map(children, (child) => <div>{child}</div>),
    [children]
  );

  const setSectionHeight = () => {
    const sectionList = containerRef.current!.childNodes;
    const sectionHeight: number[] = [];
    let { sectionIndex } = state;

    for (let i = 0; i < sectionList.length; i++) {
      const sectionRef = sectionList.item(i) as HTMLDivElement;
      sectionHeight.push(sectionRef.scrollHeight);
    }

    if (sectionIndex > sectionList.length) {
      sectionIndex = sectionList.length - 1;
    }

    setState((prevState) => ({
      ...prevState,
      sectionIndex,
      sectionHeight,
    }));
  };

  const handleScrollUp = () => {
    if (state.sectionIndex > 0) {
      let { sectionIndex } = state;
      sectionIndex -= 1;

      if (sectionOnchange) {
        sectionOnchange(sectionIndex);
      }

      setState((prevState) => ({
        ...prevState,
        sectionIndex,
      }));
    }
  };

  const handleScrollDown = () => {
    if (state.sectionIndex < state.sectionHeight.length - 1) {
      let { sectionIndex } = state;
      sectionIndex += 1;

      if (sectionOnchange) {
        sectionOnchange(sectionIndex);
      }

      setState((prevState) => ({
        ...prevState,
        sectionIndex,
      }));
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!disabled && !isScrolling && !isNormal) {
      if (event.deltaY > 0) {
        handleScrollDown();
      } else {
        handleScrollUp();
      }

      isScrolling = true;

      setTimeout(
        () => {
          isScrolling = false;
        },
        isMulti ? 50 : animationTimer
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!disabled && !isScrolling && !isNormal) {
      if (previousTouchMove !== null) {
        if (e.touches[0].clientY > previousTouchMove) {
          handleScrollUp();
        } else {
          handleScrollDown();
        }

        isScrolling = true;
        previousTouchMove = null;

        setTimeout(
          () => {
            isScrolling = false;
          },
          isMulti ? 50 : animationTimer
        );
      } else {
        previousTouchMove = e.touches[0].clientY;
      }
    }
  };

  const onScrollToSession = (index: number) => {
    console.log('vao dayy');
    
    const sectionList: any = containerRef.current!.childNodes;
    const myMovie: any = document.getElementById('container_session');

    if (index === 0) {
      return myMovie.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    myMovie.scrollTo({
      top: sectionList[index]?.offsetTop - targetOffsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleOnScrollSession = () => {
    const myMovie: any = document.getElementById('container_session');
    console.log('vao r', isNormal);


    const { scrollTop } = myMovie;

    const { scrollHeight, clientHeight } = document.body;
    const sectionList: any = containerRef.current!.childNodes;
    const listTab: any = document.getElementsByClassName(classTabItem);

    const numTab = listTab.length;
    for (let i = numTab - 1; i >= 0; i--) {
      const offsetTopSidebar = sectionList[i]?.offsetTop;
      const offsetHeightSidebar = sectionList[i].offsetHeight;
      const subTabElement = listTab[i];

      if (
        scrollTop + targetOffsetTop >= offsetTopSidebar &&
        scrollTop + targetOffsetTop <
        offsetTopSidebar + offsetHeightSidebar
      ) {
        if (!listTab[i].classList.contains(classActiveMenuItem)) {
          for (let j = 0; j < numTab; j++) {
            if (listTab[j].classList.contains(classActiveMenuItem)) {
              listTab[j].classList.remove(classActiveMenuItem);
            }
          }
          return subTabElement.classList.add(classActiveMenuItem);
        }
      }
    }
  }

  useImperativeHandle(ref, () => ({
    onScrollToSession,
  }))

  useEffect(() => {
    const myMovie: HTMLElement | null = document.getElementById('container_session');

    if (!disabled && isNormal) {
      myMovie?.addEventListener('scroll', handleOnScrollSession);
      return () => {
        document.removeEventListener('scroll', handleOnScrollSession);
      }
    }
    
  }, [isNormal, disabled]);

  useEffect(() => {
    const listTab: any = document.getElementsByClassName(classTabItem);

      for (let j = 1; j < listTab.length; j++) {
        if (listTab[j].classList.contains(classActiveMenuItem)) {
          listTab[j].classList.remove(classActiveMenuItem);
        }
      }
      
      if (isNormal) {
        if (!listTab[0].classList.contains(classActiveMenuItem)) {
          listTab[0].classList.add(classActiveMenuItem);
        }
      }
    
  }, [isNormal]);

  return (
    <div
      style={{
        overflow: (disabled || isNormal) ? "auto" : "hidden",
        width: "100%",
        height: "100%",
      }}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      ref={containerWrapperRef}
      id='container_session'
    >
      <div
        style={{
          transition: `${animationTimer}ms`,
        }}
        ref={containerRef}
      >
        {wrapperChildren}
      </div>
    </div>
  );
});

export default VcScrollSection;
