import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPerson, editPerson } from "../../../server/api";


function AddEditForm({activeEditPerson, handleGetAllPeople, handleClose = props}) {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const [formEdit, setFormEdit] = useState(false);
  const [editedPerson, setEditedPerson] = useState({});

  useEffect(() => {
    if (activeEditPerson.id !== undefined) {
      console.log("EDIT PERSON")
      console.log("the id is", activeEditPerson.id)
      setEditedPerson(editedPerson); /// LOGIC TO SET ENDPOINT TO EDIT OR ADD PERSON
    } else {
      console.log("ADD PERSON")
    }
  }, [activeEditPerson.id]);

  const handelNewUser = async (data) => {
    console.log("new user", data)
    try {
      await addPerson(data);
      handleGetAllPeople()
      handleClose();
    } catch (e) {
      console.log("error saving new person", e)
      // error handling
    }
  }

  const handleUpdateUser = async (data) => {
    console.log("editing user", data)
    try {
      await editPerson(data);
      handleGetAllPeople()
      handleClose();
    } catch (e) {
      console.log("error saving edited person", e)
      // error handling
    }
  }

  const handleSave = async (data, e) => {
    e.preventDefault();

    if (activeEditPerson.id !== undefined) {
      console.log("EDIT PERSON")
      const values = getValues()
      console.log("form values", values)
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
      // handelNewUser(data)
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
  // const handleSave = (data, e) => {
  //   e.preventDefault();

  //   if (activeEditPerson.id !== undefined) {
  //     console.log("EDIT PERSON")
  //     const values = getValues()
  //     console.log("form values", values)
  //     const updatedPerson = {
  //       ...activeEditPerson,
  //       ...values,
  //     };

  //     handleUpdateUser(updatedPerson);
  //   } else {
  //     console.log("ADD PERSON")
  //     handelNewUser(data)
  //   }


  // };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log("closed");
    handleClose();
  };

  const handleError = (errors) => { };

  const formOptions = {
    first_name: { required: "First Name is required" },
    last_name: { required: "Last Name is required" },
    date_of_birth: { required: "Bday is required" },
    address: { required: "Address is required" },
    phone_number: { required: "Phone is required" },
    notes: { required: "Notes is required" },
    // password: {
    //   required: "Password is required",
    //   minLength: {
    //     value: 8,
    //     message: "Password must have at least 8 characters"
    //   }
    // }
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
      {/* <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register('email', registerOptions.email)}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div> */}
      <button onClick={handleCancel}>Cancel</button>
      <button>Submit</button>
    </form>
  );
}

export default AddEditForm;

// import React, { useState, useEffect } from "react";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { addPerson, editPerson } from "../../../server/api"

// function AddEditForm(props) {
//   const [person, setValues] = useState({
//     id: 0,
//     first_name: "",
//     last_name: "",
//     date_of_birth: "",
//     email: "",
//     phone_number: "",
//     address: "",
//     notes: ""
//   });

//   const onChange = (e) => {
//     setValues({
//       ...person,
//       [e.target.name]: e.target.value
//     });
//   };

//   const submitFormAdd = (e) => {
//     console.log(item);
//     e.preventDefault();
//     addPerson(person)
//     // fetch('http://localhost:3000/crud', {
//     //   method: 'post',
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   },
//     //   body: JSON.stringify({
//     //     first: form.first,
//     //     last: form.last,
//     //     email: form.email,
//     //     phone: form.phone,
//     //     location: form.location,
//     //     hobby: form.hobby
//     //   })
//     // })
//     //   .then(response => response.json())
//     //   .then(item => {
//     //     if(Array.isArray(item)) {
//     //       props.addItemToState(item[0])
//     //       props.toggle()
//     //     } else {
//     //       console.log('failure')
//     //     }
//     //   })
//     //   .catch(err => console.log(err))
//     props.addItemToState(person);
//     props.toggle();
//   };

//   const submitFormEdit = (e) => {
//     e.preventDefault();
//     editPerson(person)
//     // fetch("http://localhost:5000/people/id", {
//     //   method: "put",
//     //   headers: {
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: JSON.stringify({
//     //     id: form.id,
//     //     first: form.first,
//     //     last: form.last,
//     //     email: form.email,
//     //     phone: form.phone,
//     //     location: form.location,
//     //     hobby: form.hobby
//     //   })
//     // })
//     //   .then((response) => response.json())
//     //   .then((item) => {
//     //     if (Array.isArray(item)) {
//     //       // console.log(item[0])
//     //       props.updateState(item[0]);
//     //       props.toggle();
//     //     } else {
//     //       console.log("failure");
//     //     }
//     //   })
//     //   .catch((err) => console.log(err));
//     props.updateState(person);
//     props.toggle();
//   };

//   useEffect(() => {
//     if (props.edit_person) {
//       const { first_name, last_name, date_of_birth, email, phone_number, address, notes } = props.edit_person;

//     }
//   }, [props.edit_person]);

//   return (
//     <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
//       <FormGroup>
//         <Label for="first">First Name</Label>
//         <Input
//           type="text"
//           name="first"
//           id="first"
//           onChange={onChange}
//           value={form.first === null ? "" : form.first}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="last">Last Name</Label>
//         <Input
//           type="text"
//           name="last"
//           id="last"
//           onChange={onChange}
//           value={form.last === null ? "" : form.last}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="email">Email</Label>
//         <Input
//           type="email"
//           name="email"
//           id="email"
//           onChange={onChange}
//           value={form.email === null ? "" : form.email}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="phone">Phone</Label>
//         <Input
//           type="text"
//           name="phone"
//           id="phone"
//           onChange={onChange}
//           value={form.phone === null ? "" : form.phone}
//           placeholder="ex. 555-555-5555"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="location">Location</Label>
//         <Input
//           type="text"
//           name="location"
//           id="location"
//           onChange={onChange}
//           value={form.location === null ? "" : form.location}
//           placeholder="City, State"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="hobby">Hobby</Label>
//         <Input
//           type="text"
//           name="hobby"
//           id="hobby"
//           onChange={onChange}
//           value={form.hobby}
//         />
//       </FormGroup>
//       <Button>Submit</Button>
//     </Form>
//   );
// }

// export default AddEditForm;
