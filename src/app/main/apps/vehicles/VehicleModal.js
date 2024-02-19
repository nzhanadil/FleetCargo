import axios from "axios";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { InputLabel, Modal, Select, TextField } from '@material-ui/core';

import { VEHICLES_BASE_URL } from "../utils/constants";
import AlertMessage from "./AlertMessage";

const TOKEN='Zb84MzAROCrhmF6t'

const dataStructure = {
  "model": "",
  "plate_number": "",
  "engine_number": "",
  "manufacture_year": "",
  "fuel_type": "",
  "image_url": ""
}

export default function VehicleModal({data, modal, toggleModal, modalAction}) {
    const [message, setMessage] = useState('');
    const [vehicleData, setVehicleData] = useState(data ? data : dataStructure)

    const handleChange = (e) => {
        setVehicleData({...vehicleData, [`${e.target.id}`]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(VEHICLES_BASE_URL, vehicleData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN
            }  
        }).then(res => {
            setMessage('Vehicle added successfully!')
            setTimeout(()=> {
              setMessage('')
            }, 2000)
        }).catch(error => {
            setMessage('Something went wrong, please try again!')
            setTimeout(()=> {
              setMessage('')
            }, 2000)
        })
        toggleModal();
        setVehicleData(dataStructure)
    } 
  return (
    <div>
      {message && <AlertMessage message={message}/>}
      
      <Modal open={modal} onClose={toggleModal}>
        <form className='p-20 w-400 flex flex-col gap-10 bg-white rounded-xl absolute shadow-5 m-auto top-160 left-0 right-0 z-10' onSubmit={e => handleSubmit(e)}>
            <h1>{modalAction} Vehicle</h1>
            <TextField value={vehicleData.model} id="model" label="Model" variant="outlined" required placeholder='Model' onChange={e => handleChange(e)}/>
            <TextField value={vehicleData.plate_number} id="plate_number" label="Plate Number" variant="outlined" required placeholder='Plate number' onChange={e => handleChange(e)}/>
            <TextField value={vehicleData.engine_number} id="engine_number" label="Engine Number" variant="outlined" required placeholder='Engine Number' onChange={e => handleChange(e)}/>
            <TextField value={vehicleData.manufacture_year} type="number" id="manufacture_year" label="Manufacture Year" variant="outlined" required placeholder='Manufacture Year' onChange={e => handleChange(e)}/>

            <InputLabel id="fuel_type_input">Fuel type</InputLabel>
  
            <Select 
                variant='outlined'
                labelId="fuel_type_input" 
                id="fuel_type" 
                value={vehicleData.fuel_type}
                onChange={(e) => setVehicleData({...vehicleData, "fuel_type": e.target.value})}
                required
            >   
                <MenuItem value="diesel">Diesel</MenuItem>
                <MenuItem value="gasoline">Gasoline</MenuItem>
                <MenuItem value="propane">Propane</MenuItem>
                <MenuItem value="natural_gas">Natural gas</MenuItem>
            </Select>

            <TextField value={vehicleData.image_url} id="image_url" label="Vehicle Image" variant="outlined" required placeholder='Vehicle image URL' onChange={e => handleChange(e)}/>

            <div className='flex'>
                <Button variant="contained" color='primary' className='mr-10 w-1/2 inline' type='sumbit'>Submit</Button>
                <Button variant="outlined" color='primary' className='w-1/2 inline' onClick={toggleModal}>Cancel</Button>
            </div>
        </form>
            
      </Modal>
    </div>
  )
}