import { Dialog } from "@mui/material";
import Form from "./AddEditForm.jsx";

const ModalDialog = (props) => {
  console.log("props inside modal", activeEditPerson);

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Form activeEditPerson={activeEditPerson} handleGetAllPeople={props.handleGetAllPeople} handleClose={props.handleClose} />
    </Dialog>
  );
};

export default ModalDialog;

