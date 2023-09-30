import { useState, useCallback, useEffect, useContext } from 'react';
import { getAllPeople, deletePerson } from "../../server/api";
import { Button, Dialog } from "@mui/material";
import { PeopleDataContext } from '../contexts/PeopleDataContext';
import AddEditForm from '../components/Forms/AddEditForm.jsx';

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
      <h1>ABE</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add New Person</Button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {peopleData?.map((person) => (
            <li key={person.id}>
              <span>{person.first_name}</span>
              <span>{person.last_name}</span>
              <Button
                onClick={() => handleDeletePerson(person.id)}
                className='btn'
              >
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleOpen(person)}>Edit</Button>
            </li>
          ))}
        </ul>
      )}
      <Dialog open={open} onClose={handleClose} >
        <AddEditForm activeEditPerson={activeEditPerson} handleGetAllPeople={handleGetAllPeople} handleClose={handleClose} />
      </Dialog>
    </>
  )
}

export default People;