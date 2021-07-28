import { DEVICE_TYPE_PHONE, DEVICE_TYPE_DISPLAY } from "config";

const { clientHeight, clientWidth } = document.documentElement;

export const deviceType = () =>
  clientHeight > 900 || clientWidth > 900
    ? DEVICE_TYPE_DISPLAY
    : DEVICE_TYPE_PHONE;
