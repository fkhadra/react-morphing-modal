export const classname = {
  container: 'RFM__container',
  closeButton: 'RFM__close-button',
  placeholder: 'RFM__placeholder',
  body: 'RFM__body',
  get(className: string, isActive: boolean) {
    return isActive ? `${className} ${className}--is-active` : className;
  },
};
