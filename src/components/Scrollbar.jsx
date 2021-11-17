import { forwardRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const Scrollbar = forwardRef((props, ref) => {
  const { children, ...other } = props;

  return (
    <PerfectScrollbar ref={ref} options={{ suppressScrollX: true }} {...other}>
      {children}
    </PerfectScrollbar>
  );
});

export default Scrollbar;
