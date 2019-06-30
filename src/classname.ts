export const classname = {
  container: 'Fancy__container',
  closeButton: 'Fancy__close-button',
  placeholder: 'Fancy__placeholder',
  body: 'Fancy__body',
  get(className: string, isActive: boolean) {
    return isActive ? `${className} ${className}--is-active` : className;
  },
};
