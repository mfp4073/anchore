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
  Paper
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
  const [activeEditId, setActiveEditId] = useState("");
  const [activeEditPerson, setActiveEditPerson] = useState({});

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
      await deletePerson(id); // Assuming deletePerson doesn't return the updated list
      // After successfully deleting, you can update the data by making a GET request again
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
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Date of Birth</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Notes</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {peopleData?.map((person) => (
                  <TableRow key={person.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell component="th" scope="row">{person.first_name}</TableCell>
                    <TableCell align="right">{person.last_name}</TableCell>
                    <TableCell align="right">{person.date_of_birth}</TableCell>
                    <TableCell align="right">{person.phone_number}</TableCell>
                    <TableCell align="right">{person.address}</TableCell>
                    <TableCell align="right">{person.notes}</TableCell>
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
        <DialogTitle>
          Subscribe
        </DialogTitle>
        <DialogContent>
          <AddEditForm activeEditPerson={activeEditPerson} handleGetAllPeople={handleGetAllPeople} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      {/* <IconButton sx={{ mt: 4 }} variant="contained" color="primary" onClick={handleOpen}><AddIcon sx={{ mt: 4 }} variant="contained" color="primary" onClick={handleOpen} /></IconButton> */}
      <IconButton className="add-button" sx={{ mt: 4 }} variant="contained" onClick={handleOpen}><AddIcon className="add-button-icon" variant="contained" onClick={handleOpen} /></IconButton>
    </>
  )
}

export default People;