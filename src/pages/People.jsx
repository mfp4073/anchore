import { useState, useCallback, useEffect, useContext } from 'react';
import { getAllPeople, deletePerson } from "../../server/api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PeopleDataContext } from '../contexts/PeopleDataContext';
import AddEditForm from '../components/Forms/AddEditForm.jsx';
import './people.css';

const People = () => {
  const { peopleData, setPeopleData } = useContext(PeopleDataContext);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeEditPerson, setActiveEditPerson] = useState({});
  const [openSnack, setOpenSnack] = useState(false);

  const handleOpen = (person) => {
    console.log("person in modal", person)
    setActiveEditPerson(person);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeletePerson = async (id) => {
    try {
      await deletePerson(id);
      handleGetAllPeople();
    } catch (e) {
      console.log("error deleting person", e);
      // error handling
    }
  };

  const handleGetAllPeople = useCallback(async () => {
    try {
      const people = await getAllPeople();
      setPeopleData(people);
      setLoading(false);
      console.log("peopleData", peopleData);
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="People Loaded"
        action={action}
      />
    } catch (e) {
      console.log("error getting people", e);
      // error handling
    }
  }, [setPeopleData]);

  useEffect(() => {

    handleGetAllPeople();
  }, [handleGetAllPeople]);

  return (
    <>
      <h2>Add a Favorite Person</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {peopleData?.map((person) => (
                  <TableRow key={person.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell component="th" scope="row">{person.first_name}</TableCell>
                    <TableCell>{person.last_name}</TableCell>
                    <TableCell>{person.date_of_birth}</TableCell>
                    <TableCell>{person.phone_number}</TableCell>
                    <TableCell>{person.address}</TableCell>
                    <TableCell>{person.notes}</TableCell>
                    <TableCell>
                    <Button
                      onClick={() => handleDeletePerson(person.id)}
                      className='btn'
                    >
                      Delete
                    </Button>
                    </TableCell>
                    <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpen(person)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          </Table>
          </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose} >
          <DialogContent>
          <AddEditForm activeEditPerson={activeEditPerson} handleGetAllPeople={handleGetAllPeople} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <IconButton className="add-button" sx={{ mt: 4 }} variant="contained" onClick={handleOpen}>
        <AddIcon className="add-button-icon" />
      </IconButton>
    </>
  )
}

export default People;