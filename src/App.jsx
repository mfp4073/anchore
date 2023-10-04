import './App.css';
import People from "./pages/People"
import { PeopleDataContextProvider } from "./contexts/PeopleDataContext"
import { SnackbarProvider } from 'notistack'

const App = () => {

  return (
    <SnackbarProvider>
      <PeopleDataContextProvider>
        <People />
      </PeopleDataContextProvider>
    </SnackbarProvider>
  )
}

export default App
