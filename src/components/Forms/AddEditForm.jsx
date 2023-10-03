import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPerson, editPerson } from "../../../server/api";
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from "notistack";
import './index.css';

function AddEditForm({ activeEditPerson, handleGetAllPeople, handleCloseFormModal = props }) {
  const {
    reset,
    trigger,
    getFieldState,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({ mode: "onBlur" });

  const { enqueueSnackbar } = useSnackbar();
  const [isFieldActive, setFieldIsActive] = useState(false);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.first_name = activeEditPerson.first_name || ""
    // handleTextChange("first_name")
    defaultValues.last_name = activeEditPerson.last_name || ""
    defaultValues.address = activeEditPerson.address || ""
    defaultValues.date_of_birth = activeEditPerson.date_of_birth || ""
    defaultValues.phone_number = activeEditPerson.phone_number || ""
    defaultValues.notes = activeEditPerson.notes || ""
    reset({ ...defaultValues });
    trigger()
  }, [trigger]);

  const handleSave = async (data, e) => {
    e.preventDefault();

    if (activeEditPerson.id !== undefined) {
      const values = getValues()
      const updatedPerson = {
        ...activeEditPerson,
        ...values,
      };
      try {
        await editPerson(updatedPerson);
        enqueueSnackbar(`Favorite person was edited successfully! 👍`, {
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
          maxSnack: 1,
          variant: 'success',
          autoHideDuration: 2000
        });
        handleGetAllPeople()
        handleCloseFormModal();
      } catch (e) {
        console.log("error saving edited person", e)
        // error handling
      }
    } else {
      try {
        await addPerson(data);
        enqueueSnackbar(`A new favorite person was added! 😀`, {
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
          maxSnack: 1,
          variant: 'success',
          autoHideDuration: 2000
        });
        handleGetAllPeople()
        handleCloseFormModal();
      } catch (e) {
        console.log("error saving new person", e)
        // error handling
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleCloseFormModal();
  };

  const [value, setValue] = useState('');

  function handleTextChange(text) {
    setValue(text);

    if (text !== '') {
      setFieldIsActive(true);
    } else {
      setFieldIsActive(false);
    }
  }

  const handleError = (errors) => { }; // MAYBE HANDLE IN SUBMIT FUNCTION. MIGHT ABSTRACT EDIT/NEW AND THIS FUNCTION OUT. NOT SURE

  let form_incomplete = (!isDirty || !isValid) ? true : false;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleSave, handleError)} noValidate>
        <h2>
          {(form_incomplete) ? "Complete the fields below" : "Entries look good!"}
        </h2>
        <p className="text-optional-note">* Optional</p>
        <div id="float-label">
          <input
            name="first_name"
            type="text"
            defaultValue={activeEditPerson.first_name || ""}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('first_name', { required: true })}
          />
          {!form_incomplete && <CheckIcon sx={{ color: 'green' }} />}
          {errors.first_name && <p className="text-danger">first name is required</p>}
          <label className={(isFieldActive || activeEditPerson.last_name) ? "field-active" : ""} htmlFor="first_name">
            First Name
          </label>
        </div>
        <div id="float-label">
          <input
            name="last_name"
            type="text"
            defaultValue={activeEditPerson.last_name || ""}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('last_name', { required: true })}
          />
          {!form_incomplete && <CheckIcon sx={{ color: 'green' }} />}
          {errors.last_name && <p className="text-danger">last name is required</p>}
          <label className={(isFieldActive || activeEditPerson.last_name) ? "field-active" : ""} htmlFor="last_name">
            Last Name
          </label>
        </div>
        <div id="float-label">
          <input
            name="address"
            type="text"
            defaultValue={activeEditPerson.address || ""}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('address', { required: true })}
          />
          {!form_incomplete && <CheckIcon sx={{ color: 'green' }} />}
          {errors.address && <p className="text-danger">address is required</p>}
          <label className={(isFieldActive || activeEditPerson.address) ? "field-active" : ""} htmlFor="address">
            Address
          </label>
        </div>
        <div id="float-label">
          <input
            name="date_of_birth"
            type="text"
            defaultValue={activeEditPerson.date_of_birth || ""}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('date_of_birth', {
              required: true, pattern: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
            })}
          />
          {!form_incomplete && <CheckIcon sx={{ color: 'green' }} />}
          {errors.date_of_birth && <p className="text-danger">a valid date of birth is required</p>}
          <label className={(isFieldActive || activeEditPerson.date_of_birth) ? "field-active" : ""} htmlFor="date_of_birth">
            Date of Birth - mm/dd/yy
          </label>
        </div>
        <div id="float-label">
          <input
            name="phone_number"
            type="text"
            defaultValue={activeEditPerson.phone_number || ""}
            className={(!errors.phone_number && getFieldState("phone_number").isTouched) ? 'form-control isvalid' : ''}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('phone_number', { required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ })}
          />
          {!form_incomplete && <CheckIcon sx={{ color: 'green' }} />}
          {errors.phone_number && <p className="text-danger">a valid phone number is required</p>}
          <label className={(isFieldActive || activeEditPerson.phone_number) ? "field-active" : ""} htmlFor="phone_number">
            Phone number
          </label>
        </div>
        <div id="float-label">
          <textarea
            name="notes"
            type="text"
            defaultValue={activeEditPerson.notes || ""}
            onInput={(e) => handleTextChange(e.target.value)}
            {...register('notes', { required: false })}
          />
          <label className={(isFieldActive || activeEditPerson.notes) ? "field-active" : ""} htmlFor="notes">
            * Notes
          </label>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button className="submit-button" disabled={form_incomplete}>
          {(activeEditPerson.id) ? "Update" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default AddEditForm;
