import React, { useEffect, useRef } from "react";
import "./RightClickMenu.scss";
import PropTypes from "prop-types";

interface Props {
  rightClickTargets: { className: string; menuList: JSX.Element[] }[];
  onWindow?: boolean;
}

/**
 * @component RightClickMenu
 *
 * @param param
 * @param param.rightClickTargets
 * @param
 * @returns
 */

export default function RightClickMenu({
  rightClickTargets,
  onWindow = true,
}: Props) {
  // get wrapper ul element of right click menu
  const rightClickUl = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (onWindow) {
      // prevent from default click right menu
      window.addEventListener("contextmenu", e => {
        e.preventDefault();
      });
    } else {
    }
  }, [rightClickTargets]);

  return (
    <ul
      ref={rightClickUl}
      className="right-click-menu"
      data-testid="RightClickMenu"></ul>
  );
}

RightClickMenu.propTypes = {
  rightClickTargets: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string.isRequired,
    })
  ),
};
