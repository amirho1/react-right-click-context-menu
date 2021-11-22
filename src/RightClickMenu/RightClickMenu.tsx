import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./RightClickMenu.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { calculateCoordinate } from "../functions/calculateCoordinate";
import MapLI from "../MapLI/MapLI";

interface Props {
  liClassName?: string;
  rightClickTargets?: {
    className: string;
    menuList: (JSX.Element | string)[];
  }[];
  preventDefaultOnWindow?: boolean;
  menuClassName?: string;
}

type TCssCoordinate = "initial" | number;
export interface ICoordinate {
  left: TCssCoordinate;
  right: TCssCoordinate;
  bottom: TCssCoordinate;
  top: TCssCoordinate;
}

/**
 * @component RightClickMenu
 * @author Xerxes (AmirHossein Salighedar) (https://github.com/amirho1)
 * @param param
 * @param param.rightClickTargets the className of target elements
 * @param param.preventDefaultOnWindow sets prevent from default behavior of right click
 * @param param.menuClassName
 * @param param.liClassName
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
  // is menu active or not boolean
  const [isActive, setIsActive] = useState(false);
  // coordinate of menu based on click
  const [menuCoordinate, setMenuCoordinate] = useState<ICoordinate>({
    left: "initial",
    top: "initial",
    right: "initial",
    bottom: "initial",
  });

  // func to clear the menu
  const clearMenuChildren = useCallback(() => {
    if (rightClickUl.current)
      ReactDOM.unmountComponentAtNode(rightClickUl.current);
  }, [rightClickUl]);

  // prevent from default behavior of right click
  useEffect(() => {
    if (preventDefaultOnWindow) {
      window.addEventListener("contextmenu", e => {
        e.preventDefault();
      });
    }

    // remove event listener
    return () => {
      window.removeEventListener("contextmenu", e => {
        e.preventDefault();
      });
    };
  }, [preventDefaultOnWindow]);

  const contextEventHandler = useCallback(
    (
      e: MouseEvent,
      target: {
        className: string;
        menuList: (string | JSX.Element)[];
      }
    ) => {
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
          bottomBorderStartDistance: Number(rightClickUl.current?.clientWidth),
          rightBorderStartDistance: Number(rightClickUl.current?.clientWidth),
        })
      );
      // add elements to the menu
      ReactDOM.render(
        <MapLI menuList={target.menuList} liClassName={liClassName} />,
        rightClickUl.current
      );
    },
    [liClassName]
  );

  // add event listener to all given targets
  useEffect(() => {
    if (rightClickTargets?.length)
      rightClickTargets.forEach(target => {
        const elements = document.querySelectorAll(`.${target.className}`);

        // clear menu before adding something in it
        clearMenuChildren();

        elements.forEach(element =>
          (element as HTMLElement).addEventListener("contextmenu", e =>
            contextEventHandler(e, target)
          )
        );
      });

    // remove event listeners
    return () => {
      if (rightClickTargets?.length)
        rightClickTargets.forEach(target => {
          const elements = document.querySelectorAll(`.${target.className}`);

          // clear menu before adding something in it
          clearMenuChildren();

          elements.forEach(element =>
            (element as HTMLElement).removeEventListener("contextmenu", e =>
              contextEventHandler(e, target)
            )
          );
        });
    };
  }, [rightClickTargets]);

  // add event listener to windows for closing the open menu on  click on every where of page
  useEffect(() => {
    const eventHandler = (e: MouseEvent) => {
      e.stopPropagation();
      setIsActive(false);
    };
    window.addEventListener("click", eventHandler);

    window.addEventListener("contextmenu", eventHandler);

    //removing event listeners on unmounting
    return () => {
      window.removeEventListener("click", eventHandler);
      window.removeEventListener("contextmenu", eventHandler);
    };
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
  preventDefaultOnWindow: PropTypes.bool,
  menuClassName: PropTypes.string,
  liClassName: PropTypes.string,
};
