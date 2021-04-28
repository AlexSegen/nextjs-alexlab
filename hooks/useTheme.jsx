import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  return {
    ...ctx,
  };
};
