let bodyNode: HTMLBodyElement | null;

function getBodyNode() {
  if (!bodyNode) {
    bodyNode = document.querySelector('body');
  }
  return bodyNode as HTMLBodyElement;
}

function computeCoordinateScaleValue(
  initialCoordinate: number,
  nodeSize: number,
  windowCoordinate: number
) {
  const intermediateCoordinate =
    windowCoordinate - initialCoordinate - nodeSize;
  const maxCoordinate = Math.max(initialCoordinate, intermediateCoordinate);
  const scaleValue = (maxCoordinate * 2 + nodeSize) / nodeSize;

  return Math.ceil(scaleValue * 10) / 10;
}

function getScaleValues(node: HTMLElement, top: number, left: number) {
  return {
    scaleX: computeCoordinateScaleValue(
      left,
      node.offsetWidth,
      window.innerWidth
    ),
    scaleY: computeCoordinateScaleValue(
      top,
      node.offsetHeight,
      window.innerHeight
    ),
  };
}

export const bodyScrolling = {
  lock() {
    getBodyNode().style.overflow = 'hidden';
  },
  unlock() {
    getBodyNode().style.removeProperty('overflow');
  },
};

export function getPlaceholderComputedStyle(
  trigger: HTMLElement,
  placeholder: HTMLElement
) {
  const top = trigger.offsetTop - window.scrollY;
  const left = trigger.offsetLeft - window.scrollX;
  const placeholderScale = getScaleValues(placeholder, top, left);

  // 👽1.5 to handle circle and rounded border
  return `
  top: ${top}px;
  left: ${left}px;
  transform: scale(${placeholderScale.scaleX * 1.5},${placeholderScale.scaleY *
    1.5});
`;
}

export function getBorderRadius(styles: CSSStyleDeclaration): string {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = styles;
  return `
    border-top-left-radius: ${borderTopLeftRadius};
    border-top-right-radius: ${borderTopRightRadius};
    border-bottom-left-radius: ${borderBottomLeftRadius};
    border-bottom-right-radius: ${borderBottomRightRadius};
  `;
}

export function getBackground(styles: CSSStyleDeclaration): string {
  // work for chrome only. firefox do not return shorthand prop
  if (styles.background && styles.background.length > 0) {
    return styles.background;
  }

  // inline style in ff return none.
  // I could put styles.backgroundColor here so I don't need to check for none
  // but I don't want to rely on call order
  if (
    styles.backgroundImage &&
    styles.backgroundImage.length > 0 &&
    styles.backgroundImage !== 'none'
  ) {
    return styles.backgroundImage;
  }

  if (styles.backgroundColor && styles.backgroundColor.length > 0) {
    return styles.backgroundColor;
  }

  return '';
}
