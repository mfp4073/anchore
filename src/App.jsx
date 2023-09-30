//import { useContext }from 'react';
import './App.css';
import People from "./pages/People"
import { PeopleDataContextProvider } from "./contexts/PeopleDataContext"

  const App = () => {
    // const { peopleData } = useContext(PeopleDataContext)

    return (
      <PeopleDataContextProvider>
        <People />
      </PeopleDataContextProvider>
    )
  }

  export default App
