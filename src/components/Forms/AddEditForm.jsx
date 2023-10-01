import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPerson, editPerson } from "../../../server/api";

function AddEditForm({ activeEditPerson, handleGetAllPeople, handleClose = props }) {
  const {
    reset,
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // useEffect(() => {
  //   if (activeEditPerson.id !== undefined) {
  //     console.log("EDIT PERSON")
  //     console.log("the id is", activeEditPerson.id)
  //     setEditedPerson(editedPerson); /// LOGIC TO SET ENDPOINT TO EDIT OR ADD PERSON
  //   } else {
  //     console.log("ADD PERSON")
  //   }
  // }, [activeEditPerson.id]);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.first_name = activeEditPerson.first_name || ""
    defaultValues.last_name = activeEditPerson.last_name || ""
    defaultValues.address = activeEditPerson.address || ""
    defaultValues.date_of_birth = activeEditPerson.date_of_birth || ""
    defaultValues.phone_number = activeEditPerson.phone_number || ""
    defaultValues.notes = activeEditPerson.notes || ""
    reset({ ...defaultValues});
  }, []);

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

  // const formOptions = {
  //   first_name: {
  //     required: true, "First Name is required"},
  //   last_name: { required: "Last Name is required" },
  //   date_of_birth: { required: "Bday is required" },
  //   address: { required: "Address is required" },
  //   phone_number: { required: "Phone is required" },
  //   notes: { required: "Notes is required" }
  // };

  return (
    <form onSubmit={handleSubmit(handleSave, handleError)}>
      <div>
        <input
          name="first_name"
          type="text"
          {...register('first_name', { required: true, maxLength: 20 })}
          placeholder="First Name"
        />
        <small className="text-danger">
          {errors?.first_name && errors.name.message}
        </small>
      </div>
      <div>
        <input
          name="last_name"
          type="text"
          {...register('last_name', { required: true, maxLength: 20 })}
          placeholder="Last Name"
        />
        <small className="text-danger">
          {errors?.last_name && errors.name.message}
        </small>
      </div>
      <div>
        <input
          name="address"
          type="text"
          {...register('address', { required: true, maxLength: 20 })}
          placeholder="Address" />
        <small className="text-danger">
          {errors?.address && errors.name.message}
        </small>
      </div>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Date of Birth" />
        <small className="text-danger">
          {errors?.date_of_birth && errors.name.message}
        </small>
      </div>
      <div>
        <input
          name="name"
          {...register('phone_number', { required: true, maxLength: 20 })}
          placeholder="Phone Number" />
        <small className="text-danger">
          {errors?.phone_number && errors.name.message}
        </small>
      </div>
      <div>
        <input
          name="name"
          {...register('notes', { required: false, maxLength: 20 })}
          placeholder="Notes" />
        <small className="text-danger">
          {errors.notes && <p>This field is required</p>}
        </small>
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button>Submit</button>
    </form>
  );
}

export default AddEditForm;
