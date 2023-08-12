import { createContext, useState } from "react";

export const DetailContext = createContext();

export const DetailContextProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    contactNumber: "",
    email: "",
    hobbies: "",
  });

  return (
    <DetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </DetailContext.Provider>
  );
};
