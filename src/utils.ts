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

export const bodyScrolling = {
  lock() {
    getBodyNode().style.overflow = 'hidden';
  },
  unlock() {
    getBodyNode().style.removeProperty('overflow');
  },
};

// Fallback for ff
export function getBackgroundFromStyle(styles: CSSStyleDeclaration): string {
  if (styles.background && styles.background.length > 0) {
    return styles.background;
  }

  if (styles.backgroundImage && styles.backgroundImage.length > 0) {
    return styles.backgroundImage;
  }

  if (styles.backgroundColor && styles.backgroundColor.length > 0) {
    return styles.backgroundColor;
  }

  return '';
}

export function getNodePostion(node: HTMLElement) {
  return {
    top: node.offsetTop - window.scrollY,
    left: node.offsetLeft - window.scrollX,
  };
}

export function getScaleValues(
  node: HTMLElement,
  position: { top: number; left: number }
) {
  return {
    scaleX: computeCoordinateScaleValue(
      position.left,
      node.offsetWidth,
      document.documentElement.clientWidth
    ),
    scaleY: computeCoordinateScaleValue(
      position.top,
      node.offsetHeight,
      document.documentElement.clientHeight
    ),
  };
}
