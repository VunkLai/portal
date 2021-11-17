import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

function Progress() {
  return (
    <Root>
      <CircularProgress color="success" />
    </Root>
  );
}

export default Progress;
