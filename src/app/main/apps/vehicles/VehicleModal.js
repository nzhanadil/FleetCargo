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

export default function VehicleModal({add, edit, data}) {

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');

    const toggleModal = () => setModal(!modal)

    const [vehicleData, setVehicleData] = useState(data ? data : dataStructure)

    const handleChange = (e) => {
        setVehicleData({...vehicleData, [`${e.target.id}`]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(vehicleData)
        axios.post(VEHICLES_BASE_URL, vehicleData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Zb84MzAROCrhmF6t'
            }  
        }).then(res => {
            setMessage('ok')
            setTimeout(()=> {
              setMessage('')
            }, 2000)
        }).catch(error => {
          console.log(error)
            setMessage('err')
            setTimeout(()=> {
              setMessage('')
            }, 2000)
        })
        toggleModal();
        setVehicleData(dataStructure)
    } 
  return (
    <div>
      <AlertMessage add message={message}/>
      <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={toggleModal}>{add ? 'Add New' : 'Edit'}</Button>
      <Modal open={modal} onClose={toggleModal}>
        <form className='p-20 w-400 flex flex-col gap-10 bg-white rounded-xl absolute shadow-5 m-auto top-1/4 left-0 right-0 z-10' onSubmit={e => handleSubmit(e)}>
            <h1>{add ? 'Add' : 'Edit'} Vehicle</h1>
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