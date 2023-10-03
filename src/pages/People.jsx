import { useState, useCallback, useEffect, useContext } from 'react';
import { getAllPeople, deletePerson } from "../../server/api";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogTitle,
} from "@mui/material";
import {Add, Delete, Edit} from '@mui/icons-material';
import { useSnackbar } from "notistack";
import { PeopleDataContext } from '../contexts/PeopleDataContext';
import AddEditForm from '../components/forms/AddEditForm.jsx';
import './index.css';

const People = () => {
  const { peopleData, setPeopleData } = useContext(PeopleDataContext);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [activeEditPerson, setActiveEditPerson] = useState({});
  const [personToDelete, setPersonToDelete] = useState("")
  const { enqueueSnackbar } = useSnackbar();

  // MODAL HANDLERS

  const handleFormModal = (person) => {
    setActiveEditPerson(person);
    setOpen(true);
  }

  const handleDeleteModal = (id) => {
    setPersonToDelete(id);
    setOpenDelete(true);
  }

  const handleCloseDeleteModal = (id) => {
    setOpenDelete(false);
  }

  const handleCloseFormModal = () => {
    setOpen(false);
  }


  const handleDeletePerson = async (id) => {
    setOpenDelete(false);
    try {
      console.log("id", id);
      await deletePerson(id);
      enqueueSnackbar(`Person removed 🥺`, {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        variant: 'success',
        autoHideDuration: 500
      });
      handleGetAllPeople();
    } catch (e) {
      enqueueSnackbar(`Error deleting person ${e}`, {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        variant: 'error',
        maxSnack: 1,
      });
    }
  };

  const handleGetAllPeople = useCallback(async () => {
    try {
      const people = await getAllPeople();
      setPeopleData(people);
      setLoading(false);
      enqueueSnackbar(`Total favorite people: ${people.length}`, {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        maxSnack: 1,
        variant: 'info',
        autoHideDuration: 1000
      });
    } catch (e) {
      console.log("error getting people", e);
      enqueueSnackbar(`Error retreiving people ${e}`, {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        variant: 'error',
        maxSnack: 1,
      });
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
          <div className="container">
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
                        <Edit
                          sx={{ color: 'grey', cursor: 'pointer' }}
                          onClick={() => handleFormModal(person)} />
                      </TableCell>
                      <TableCell>
                        <Delete
                          sx={{ color: 'grey', cursor: 'pointer' }}
                          onClick={() => { handleDeleteModal(person.id)}}
                          className='btn'
                          />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            </Table>
            </TableContainer>
          </div>
      )}
      <IconButton formlabel="Add User" className="add-button" sx={{ mt: 4 }} variant="contained" onClick={handleFormModal}>
        <Add className="add-button-icon" />
      </IconButton>
      <Dialog open={openDelete} onClose={handleCloseDeleteModal}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "flex",
            alignItems: "flex-start"
          }
        }}
        PaperProps={{
          sx: {
            m: 20
          }
        }}>
        <DialogContent className="dialog-content">
          <DialogTitle className="dialog-title">Delete Person</DialogTitle>
          <Button onClick={() => handleCloseDeleteModal()}>Cancel</Button>
          <Button className="delete-button" onClick={() => handleDeletePerson(personToDelete)}>Ok</Button>
        </DialogContent>
      </Dialog>

      <Dialog PaperProps={{ sx: { top: 0, width: "100%", height: "100%" } }}
        open={open}
        onClose={handleCloseFormModal} >
        <DialogContent>
          <AddEditForm activeEditPerson={activeEditPerson} handleGetAllPeople={handleGetAllPeople} handleCloseFormModal={handleCloseFormModal} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default People;