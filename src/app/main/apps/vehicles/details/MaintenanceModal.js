import React, { useState } from 'react';
import { postIssue, getVehicleDetails } from '../store/vehicelDetailSlice';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Box, Card, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';

import { KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router';

export default function MaintenanceModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();

  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleClose = () => setIsOpen(false);
  const onDueDateChange = date => setDueDate(date);
  const onDescriptionChange = e => setDescription(e.target.value);
  const onPriorityChange = e => setPriority(e.target.value);
  const onSubmitHandler = () => {
    dispatch(postIssue({ vehicleId, dueDate, description, priority }));
    dispatch(getVehicleDetails(vehicleId));
    setIsOpen(false);
  };
  const body = (
    <Card className="absolute w-2/4 lg:w-2/6 p-12 inset-x-1/3 inset-y-1/4 h-1/2">
      <h2 className="text-center">Schedule</h2>
      <form className="flex flex-col gap-32" onSubmit={onSubmitHandler}>
        <KeyboardDatePicker
          disableToolbar
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-dialog"
          label="Due date"
          value={dueDate}
          onChange={onDueDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <TextField
          className="w-full"
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={3}
          placeholder="type here"
          variant="outlined"
          onChange={onDescriptionChange}
        />
        <FormControl className="w-full">
          <InputLabel id="controlled-open-select-label">Priority</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            value={priority}
            onChange={onPriorityChange}
          >
            <MenuItem value={'low'}>low</MenuItem>
            <MenuItem value={'medium'}>medium</MenuItem>
            <MenuItem value={'high'}>high</MenuItem>
          </Select>
        </FormControl>
        <Box className="w-full flex justify-around">
          <button
            className="w-2/5 h-32 rounded-12 bg-teal-400 hover:bg-teal-300 text-white bold tracking-wider"
            type="submit"
          >
            submit
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-2/5 h-32 rounded-12 bg-red hover:bg-red-400 text-white bold tracking-wider"
          >
            cancel
          </button>
        </Box>
      </form>
    </Card>
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
