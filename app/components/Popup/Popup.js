import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Popup(props) {
  const { handleDeleteTrue, popup, handleClose } = props;
  return (
    <Dialog
      open={popup}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Delete Content
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Are you sure that you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
        </Button>
        <Button onClick={handleDeleteTrue} color="primary">
                    Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Popup.propTypes = {
  handleDeleteTrue: PropTypes.func.isRequired,
  popup: PropTypes.any.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Popup;
