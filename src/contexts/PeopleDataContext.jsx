import { createContext, useState } from "react";

const PeopleDataContext = createContext({ peopleData: undefined, setPeopleData: () => { } });

const PeopleDataContextProvider = ({ children }) => {
  const [peopleData, setPeopleData] = useState([]);

  return (
    <PeopleDataContext.Provider value={{ peopleData, setPeopleData }}>
      {children}
    </PeopleDataContext.Provider>
  );
};

export { PeopleDataContext, PeopleDataContextProvider };
