import React from "react";
import Progress from "./Progress";

const Suspense = (Component) => (props) =>
  (
    <React.Suspense fallback={<Progress />}>
      <Component {...props} />
    </React.Suspense>
  );

export default Suspense;
