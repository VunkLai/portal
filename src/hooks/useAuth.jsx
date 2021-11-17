import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useSettings = () => useContext(AuthContext);

export default useSettings;
