interface Props {
  clientX: number;
  clientY: number;
  bottomBorderStartDistance: number;
  rightBorderStartDistance: number;
}

/**
 * @author Xerxes (AmirHossein Salighedar) (https://github.com/amirho1)
 * @function calculateCoordinate
 *
 * @param props
 * @param props.clientX the x coordinate of client mouse
 * @param props.clientY the y coordinate of client mouse
 * @param props.bottomBorderStartDistance the height of menu to show correctly menu on screen
 * @param props.rightBorderStartDistance the width of menu to show correctly menu on screen
 *
 * @returns {object}
 *
 */

export function calculateCoordinate({
  clientX,
  clientY,
  bottomBorderStartDistance,
  rightBorderStartDistance,
}: Props) {
  let coordinate: {
    left: "initial" | number;
    right: "initial" | number;
    bottom: "initial" | number;
    top: "initial" | number;
  } = { left: "initial", right: "initial", top: "initial", bottom: "initial" };
  const innerHeight = window.innerHeight;
  const innerWidth = window.innerWidth;

  const rightBorderBoundary = innerWidth - rightBorderStartDistance;
  const bottomBorderBoundary = innerHeight - bottomBorderStartDistance;

  if (clientX > rightBorderBoundary) {
    coordinate.right = innerWidth - clientX;
  } else {
    coordinate.left = clientX;
  }

  if (clientY > bottomBorderBoundary) {
    coordinate.bottom = innerHeight - clientY;
  } else {
    coordinate.top = clientY;
  }
  return coordinate;
}
