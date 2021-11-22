import React, { ReactElement } from "react";
import classNames from "classnames";

interface Props {
  menuList: (JSX.Element | string)[];
  liClassName?: string;
}

export default function MapListOfElements({ menuList, liClassName }: Props) {
  return (
    <>
      {menuList.map((item, index) => {
        return (
          <li
            key={index}
            className={classNames("list-item", liClassName)}
            onAuxClick={e => {
              e.stopPropagation();
            }}>
            {item}
          </li>
        );
      })}
    </>
  );
}
