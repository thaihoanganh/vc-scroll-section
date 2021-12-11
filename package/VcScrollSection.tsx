import React, { Children, FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export interface VcScrollSectionProps {
  disabled?: boolean;
  sectionSelect?: number;
  sectionOnchange?: (key: number) => void;
}

interface IVcScrollSectionState {
  sectionIndex: number;
  sectionHeight: number[];
}

let previousTouchMove: any = null;
let isScrolling: boolean = false;

export const VcScrollSection: FC<VcScrollSectionProps> = ({
  children,
  disabled,
  sectionSelect = 0,
  sectionOnchange,
}) => {
  const [state, setState] = useState<IVcScrollSectionState>({
    sectionIndex: 0,
    sectionHeight: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setSectionHeight();
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, sectionIndex: sectionSelect }));
  }, [sectionSelect]);

  useEffect(() => {
    if (disabled) {
      containerRef.current!.style.transform = "translate3d(0, 0, 0)";
    }

    containerWrapperRef.current!.scrollTo(0, 0);
    setState((prevState) => ({ ...prevState, sectionIndex: 0 }));
  }, [disabled]);

  useEffect(() => {
    if (sectionOnchange) {
      sectionOnchange(state.sectionIndex);
    }

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

    for (let i = 0; i < sectionList.length; i++) {
      const sectionRef = sectionList.item(i) as HTMLDivElement;
      sectionHeight.push(sectionRef.scrollHeight);
    }

    setState((prevState) => ({
      ...prevState,
      sectionHeight,
    }));
  };

  const handleScrollUp = () => {
    if (state.sectionIndex > 0) {
      setState((prevState) => ({
        ...prevState,
        sectionIndex: prevState.sectionIndex - 1,
      }));
    }
  };

  const handleScrollDown = () => {
    if (state.sectionIndex < state.sectionHeight.length - 1) {
      setState((prevState) => ({
        ...prevState,
        sectionIndex: prevState.sectionIndex + 1,
      }));
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!disabled && !isScrolling) {
      if (event.deltaY > 0) {
        handleScrollDown();
      } else {
        handleScrollUp();
      }

      isScrolling = true;

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!disabled && !isScrolling) {
      if (previousTouchMove !== null) {
        if (e.touches[0].clientY > previousTouchMove) {
          handleScrollUp();
        } else {
          handleScrollDown();
        }

        isScrolling = true;
        previousTouchMove = null;

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      } else {
        previousTouchMove = e.touches[0].clientY;
      }
    }
  };

  return (
    <div
      style={{
        overflow: disabled ? "auto" : "hidden",
        width: "100%",
        height: "100%",
      }}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      ref={containerWrapperRef}
    >
      <div
        style={{
          transition: "1000ms",
        }}
        ref={containerRef}
      >
        {wrapperChildren}
      </div>
    </div>
  );
};

export default VcScrollSection;
