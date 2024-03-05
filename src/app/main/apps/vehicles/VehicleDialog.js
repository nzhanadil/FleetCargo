import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeVehicle,
  updateVehicle,
  addVehicle,
  closeNewVehicleDialog,
  closeEditVehicleDialog
} from './store/vehiclesSlice';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

const defaultValues = {
  model: '',
  plate_number: '',
  engine_number: '',
  manufacture_year: '',
  fuel_type: '',
  image_url: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  model: yup.string().required('You must enter a model'),
  plate_number: yup.string().required('You must enter a plate number'),
  engine_number: yup.string().required('You must enter a engine number'),
  manufacture_year: yup.string().required('You must enter a year'),
  fuel_type: yup.string().required('You must select fuel type'),
  image_url: yup.string().required('You must enter a image URL'),
});

function VehicleDialog(props) {
  const dispatch = useDispatch();
  const vehicleDialog = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.vehicleDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (vehicleDialog.type === 'edit' && vehicleDialog.data) {
      reset({ ...vehicleDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (vehicleDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...vehicleDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [vehicleDialog.data, vehicleDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (vehicleDialog.props.open) {
      initDialog();
    }
  }, [vehicleDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return vehicleDialog.type === 'edit' ? dispatch(closeEditVehicleDialog()) : dispatch(closeNewVehicleDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (vehicleDialog.type === 'new') {
      let cc = dispatch(addVehicle(data));
      console.log(cc)
    } else {
      dispatch(updateVehicle({ ...vehicleDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeVehicle(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...vehicleDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit" className='m-auto'>
            {vehicleDialog.type === 'new' ? 'New Vehicle' : 'Edit Vehicle'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Model"
                  id="model"
                  error={!!errors.model}
                  helperText={errors?.model?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Plate number"
                  id="plate_number"
                  error={!!errors.plate_number}
                  helperText={errors?.plate_number?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="engine_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Engine number"
                  id="engine_number"
                  error={!!errors.engine_number}
                  helperText={errors?.engine_number?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="manufacture_year"
                  label="Year"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>
{/* 
          <div className="flex">
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Year"
                  id="manufacture_year"
                  error={!!errors.manufacture_year}
                  helperText={errors?.manufacture_year?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div> */}


          <div className="flex">
            <Controller
              control={control}
              name="fuel_type"
              render={({ field }) => (
                <Select 
                    {...field}
                    className="mb-24"
                    label="Fuel type"
                    id="fuel_type"
                    error={!!errors.fuel_type}
                    helperText={errors?.fuel_type?.message}
                    variant="outlined"
                    required
                    fullWidth
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Fuel type</em>;
                        }
            
                        return selected;
                      }}
                >   
                    <MenuItem disabled value="">Fuel type</MenuItem>
                    <MenuItem value="diesel">Diesel</MenuItem>
                    <MenuItem value="gasoline">Gasoline</MenuItem>
                    <MenuItem value="propane">Propane</MenuItem>
                    <MenuItem value="natural_gas">Natural gas</MenuItem>
                </Select>                
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Vehicle image"
                  id="image_url"
                  error={!!errors.image_url}
                  helperText={errors?.image_url?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder='Please enter image URL'
                />
              )}
            />
          </div>
        </DialogContent>

        {vehicleDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16 flex w-full">
              <Button className='w-1/2 mr-10' variant="contained" color="primary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Add
              </Button>
              <Button className='w-1/2' variant="outlined" color="primary" onClick={closeComposeDialog}>
                Cancel
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
        
      </form>
    </Dialog>
  );
}

export default VehicleDialog;
