import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./RightClickMenu.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { calculateCoordinate } from "../functions/caculateCoordinate";
import MapLI from "../MapLI/MapLI";

interface Props {
  rightClickTargets?: {
    className: string;
    menuList: (JSX.Element | string)[];
  }[];
  preventDefaultOnWindow?: boolean;
  menuClassName?: string;
  liClassName?: string;
}

type TCssCord = "initial" | number;
export interface ICoordinate {
  left: TCssCord;
  right: TCssCord;
  bottom: TCssCord;
  top: TCssCord;
}

/**
 * @component RightClickMenu
 * @author Xerxes (AmirHossein Salighedar) (https://github.com/amirho1)
 * @param param
 * @param param.rightClickTargets the className of target elements
 * @param param.onWindow sets prevent from default behavior of right click
 * @returns
 */

export default function RightClickMenu({
  rightClickTargets,
  preventDefaultOnWindow = true,
  menuClassName,
  liClassName,
}: Props) {
  // get wrapper ul element of right click menu
  const rightClickUl = useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [menuCoordinate, setMenuCoordinate] = useState<ICoordinate>({
    left: "initial",
    top: "initial",
    right: "initial",
    bottom: "initial",
  });
  console.log(rightClickUl.current?.clientWidth);
  // prevent from default behavior of right click
  useEffect(() => {
    if (preventDefaultOnWindow) {
      window.addEventListener("contextmenu", e => {
        e.preventDefault();
      });
    }
  }, [preventDefaultOnWindow]);

  // add event listener to all given targets
  useEffect(() => {
    if (rightClickTargets?.length)
      rightClickTargets.forEach(target => {
        const elements = document.querySelectorAll(`.${target.className}`);
        if (rightClickUl.current)
          ReactDOM.unmountComponentAtNode(rightClickUl.current);
        elements.forEach(element =>
          (element as HTMLElement).addEventListener("contextmenu", e => {
            // prevent from default behavior on right click
            e.preventDefault();

            // stop the propagation
            e.stopPropagation();

            // display menu
            setIsActive(true);

            // set the coordinate of menu based on the right click coordinate
            setMenuCoordinate(
              calculateCoordinate({
                clientX: e.clientX,
                clientY: e.clientY,
                bottomBorderStartDistance: Number(
                  rightClickUl.current?.clientWidth
                ),
                rightBorderStartDistance: Number(
                  rightClickUl.current?.clientWidth
                ),
              })
            );
            // add elements to the menu
            ReactDOM.render(
              <MapLI menuList={target.menuList} liClassName={liClassName} />,
              rightClickUl.current
            );
          })
        );
      });
    return () => {};
  }, [rightClickTargets]);

  // add event listener to windows for closing the open menu on left click on every where of page
  useEffect(() => {
    window.addEventListener("click", e => {
      e.stopPropagation();
      setIsActive(false);
    });
  }, []);

  // styles
  const styles: React.CSSProperties = useMemo(
    () => ({
      left: menuCoordinate.left,
      top: menuCoordinate.top,
      right: menuCoordinate.right,
      bottom: menuCoordinate.bottom,
    }),
    [menuCoordinate]
  );

  return (
    <ul
      ref={rightClickUl}
      style={styles}
      className={classNames(
        "right-click-menu",
        { display: isActive },
        menuClassName
      )}
      data-testid="RightClickMenu"></ul>
  );
}

RightClickMenu.propTypes = {
  rightClickTargets: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string.isRequired,
      menuList: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      ).isRequired,
    })
  ),
};
