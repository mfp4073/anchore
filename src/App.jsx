import './App.css';
import People from "./pages/People"
import { PeopleDataContextProvider } from "./contexts/PeopleDataContext"
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from './contexts/ThemeContext'

const App = () => {

  return (
    <ThemeProvider>
      <SnackbarProvider>
        <PeopleDataContextProvider>
          <People />
        </PeopleDataContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
