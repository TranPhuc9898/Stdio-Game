import {
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useState,
} from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export type TLoadingFuncProp = (enable: boolean) => void;

interface IProps {}

const Loading: ForwardRefRenderFunction<unknown, IProps> = ({}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    enable: (enabled: boolean = false) => {
      setVisible(enabled);
    },
  }));

  return (
    <Backdrop
      open={visible}
      onClick={() => {}}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default forwardRef(Loading);
