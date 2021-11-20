import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import "./RightClickMenu.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { calculateCoordinate } from "../functions/caculateCoordinate";

interface Props {
  rightClickTargets?: {
    className: string;
    menuList: (JSX.Element | string)[];
  }[];
  onWindow?: boolean;
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
 * @param param.rightClickTargets
 * @param param.onWindow
 * @returns
 */

export default function RightClickMenu({
  rightClickTargets,
  onWindow = true,
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

  // prevent from default behavior of right click
  useEffect(() => {
    if (onWindow) {
      window.addEventListener("contextmenu", e => {
        e.preventDefault();
      });
    }
  }, [onWindow]);

  // add event listener to all given targets
  useEffect(() => {
    if (rightClickTargets?.length)
      rightClickTargets.forEach(target => {
        const elements = document.querySelectorAll(`.${target.className}`);
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
                bottomBorderStartDistance: 200,
                rightBorderStartDistance: 200,
              })
            );
          })
        );
      });
    return () => {};
  }, [rightClickTargets]);

  // add event listener to windows for closing the open menu on left click on every where of page
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsActive(false);
    });
  }, []);

  // styles
  const styles: React.CSSProperties = {
    left: menuCoordinate.left,
    top: menuCoordinate.top,
    right: menuCoordinate.right,
    bottom: menuCoordinate.bottom,
  };

  return (
    <ul
      ref={rightClickUl}
      style={styles}
      className={classNames("right-click-menu", { display: isActive })}
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
