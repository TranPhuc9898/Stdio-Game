import { REGEX_MAP } from "../components/2048/constants/regex";

export const isMobile = (value: string) => {
  return (
    REGEX_MAP.mobileDevice.test(value) ||
    REGEX_MAP.mobileDeviceExtend.test(value.substring(0, 4))
  );
};
