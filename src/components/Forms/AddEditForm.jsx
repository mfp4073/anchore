import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPerson, editPerson } from "../../../server/api";

function AddEditForm({ activeEditPerson, handleGetAllPeople, handleClose = props }) {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  // const [editedPerson, setEditedPerson] = useState({});

  // useEffect(() => {
  //   if (activeEditPerson.id !== undefined) {
  //     console.log("EDIT PERSON")
  //     console.log("the id is", activeEditPerson.id)
  //     setEditedPerson(editedPerson); /// LOGIC TO SET ENDPOINT TO EDIT OR ADD PERSON
  //   } else {
  //     console.log("ADD PERSON")
  //   }
  // }, [activeEditPerson.id]);

  const handleSave = async (data, e) => {
    e.preventDefault();

    if (activeEditPerson.id !== undefined) {
      const values = getValues()
      console.log("EDIT form values", values)
      const updatedPerson = {
        ...activeEditPerson,
        ...values,
      };
      try {
        await editPerson(updatedPerson);
        handleGetAllPeople()
        handleClose();
      } catch (e) {
        console.log("error saving edited person", e)
        // error handling
      }

    } else {
      console.log("ADD PERSON")
      try {
        await addPerson(data);
        handleGetAllPeople()
        handleClose();
      } catch (e) {
        console.log("error saving new person", e)
        // error handling
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleError = (errors) => { }; // MAYBE HANDLE IN SUBMIT FUNCTION. MIGHT ABSTRACT EDIT/NEW AND THIS FUNCTION OUT. NOT SURE

  const formOptions = {
    first_name: { required: "First Name is required" },
    last_name: { required: "Last Name is required" },
    date_of_birth: { required: "Bday is required" },
    address: { required: "Address is required" },
    phone_number: { required: "Phone is required" },
    notes: { required: "Notes is required" }
  };

  return (
    <form onSubmit={handleSubmit(handleSave, handleError)}>
      <div>
        <label>First Name</label>
        <input name="name" type="text" {...register('first_name', formOptions.first_name)} />
        <small className="text-danger">
          {errors?.first_name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Last Name</label>
        <input name="name" type="text" {...register('last_name', formOptions.last_name)} />
        <small className="text-danger">
          {errors?.last_name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Address</label>
        <input name="name" type="text" {...register('address', formOptions.address)} />
        <small className="text-danger">
          {errors?.address && errors.name.message}
        </small>
      </div>
      <div>
        <label>DOB</label>
        <input name="name" type="text" {...register('date_of_birth', formOptions.date_of_birth)} />
        <small className="text-danger">
          {errors?.date_of_birth && errors.name.message}
        </small>
      </div>
      <div>
        <label>Phone Number</label>
        <input name="name" type="text" {...register('phone_number', formOptions.phone_number)} />
        <small className="text-danger">
          {errors?.phone_number && errors.name.message}
        </small>
      </div>
      <div>
        <label>Notes</label>
        <input name="name" type="text" {...register('notes', formOptions.notes)} />
        <small className="text-danger">
          {errors?.notes && errors.name.message}
        </small>
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button>Submit</button>
    </form>
  );
}

export default AddEditForm;
