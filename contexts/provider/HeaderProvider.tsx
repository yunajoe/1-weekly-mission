import { useState } from "react";
import HeaderContext from "../HeaderContext";

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  return (
    <HeaderContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
