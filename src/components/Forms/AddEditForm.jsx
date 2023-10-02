import { React, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addPerson, editPerson } from "../../../server/api";

function AddEditForm({ activeEditPerson, handleGetAllPeople, handleClose = props }) {
  const {
    reset,
    control,
    getFieldState,
    register,
    getValues,
    handleSubmit,
    formState: { errors, invalid, isDirty, isValid }
  } = useForm({ mode: "onBlur"});

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

  const handleValidate = (phoneNumber) => {
    if (PHONE_REGEX.test(phoneNumber)) {
      errors["phoneNumber"] = null;
    } else {
      errors["phoneNumber"] = "Invalid phone number. Please try again."
    }
    return PHONE_REGEX.test(phoneNumber);
  }

  const handleError = (errors) => { }; // MAYBE HANDLE IN SUBMIT FUNCTION. MIGHT ABSTRACT EDIT/NEW AND THIS FUNCTION OUT. NOT SURE

  const formOptions = {
    first_name: { required: "First Name ⚠⚠is required" },
    last_name: { required: "Last Name is required" },
    date_of_birth: { required: "Bday is required" },
    address: { required: "Address is required" },
    phone_number: { required: "Phone is required" },
    notes: { required: "Notes is required" }
  };

  let form_incomplete = (!isDirty || !isValid) ? true : false;
  const fieldState = getFieldState("phone_number")

  return (

    <form onSubmit={handleSubmit(handleSave, handleError)} noValidate>
      <h2>
        {(form_incomplete) ? "Complete the fields below" : "Entries look good!"}
      </h2>
      <div>
        <input
          name="first_name"
          className={`abe-input${form_incomplete ? '-checked' : ''}`}
          type="text"
          {...register('first_name', { required: true })}
          placeholder="First Name"
        />
        {/* <p>{getFieldState("first_name").isDirty && "dirty"}</p>{" "}
        <p>{getFieldState("first_name").isTouched && "touched"}</p> */}
        {errors.first_name && <p className="text-danger">first name is required</p>}
      </div>
      <div>
        <input
          name="last_name"
          type="text"
          {...register('last_name', { required: true })}
          placeholder="Last Name"
        />
        {errors.last_name && <p className="text-danger">last name is required</p>}
      </div>
      <div>
        <input
          name="address"
          type="text"
          {...register('address', { required: true })}
          placeholder="Address" />
        {errors.address && <p className="text-danger">address is required</p>}
      </div>
      <div>
        <input
          name="name"
          type="text"
          {...register('date_of_birth', {
            required: true, pattern: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/ })}
          placeholder="Date of Birth - mm/dd/yy" />
        {errors.date_of_birth && <p className="text-danger">a valid date of birth is required</p>}
      </div>
      <div>
        <input
          className={(!errors.phone_number && getFieldState("phone_number").isTouched) ? 'form-control isvalid' : ''}
          name="name"
          {...register('phone_number', { required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ })}
          placeholder="Phone Number" />
        <p>{getFieldState("phone_number").isDirty && "dirty"}</p>{" "}
        <p>{getFieldState("phone_number").isTouched && "touched"}</p>
        <p>{getFieldState("phone_number").isValid && "valid"}</p>

        {(!errors.phone_number && getFieldState("phone_number").isTouched) && <p className="text-danger">checkmark</p>}
        {errors.phone_number && <p className="text-danger">a valid phone number is required</p>}
      </div>
      <div>
        <input
          name="name"
          {...register('notes', { required: false })}
          placeholder="Notes" />
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button className="submit-button" disabled={form_incomplete}>Submit</button>
    </form>
  );
}

export default AddEditForm;
