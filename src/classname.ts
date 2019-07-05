export const classname = {
  container: 'RMM__container',
  closeButton: 'RMM__close-button',
  placeholder: 'RMM__placeholder',
  body: 'RMM__body',
  noPadding: '--no-padding',
  get(className: string, isActive: boolean) {
    return isActive ? `${className} ${className}--is-active` : className;
  },
};
