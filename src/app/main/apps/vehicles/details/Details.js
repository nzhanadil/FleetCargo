import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { getVehicleDetails } from '../store/vehicelDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { Card, Box, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import TextCard from './TextCard';
import { parseISO, format } from 'date-fns';
import MaintenanceTable from '../maintenance/MaintenanceTable';
import MaintenanceModal from './MaintenanceModal';

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px 10px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  image: {
    height: '200px',
    width: '60%',
    objectFit: 'fill',
    borderRadius: '12px'
  }
}));

function Details() {
  const { vehicleId } = useParams();

  let dispatch = useDispatch();
  const vehicle = useSelector(state => state.vehiclesApp.vehiclesDetail);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useDeepCompareEffect(() => {
    dispatch(getVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  const onModalOpenClick = () => setOpen(true);

  if (vehicle.isFetching) {
    return (
      <div className="w-96 h-96 text-center absolute align-text-center rounded-full bg-gray-300 bottom-1/2 left-1/2 animate-ping opacity-75"></div>
    );
  }
  if (vehicle.error) return <>{vehicle.error}</>;
  return (
    <motion.div
      className="flex flex-col gap-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
    >
      <>
        {vehicle.data && (
          <article>
            <h1>Vehicles Details</h1>
            <Card>
              <Box className={classes.box}>
                <CardContent className={classes.content}>
                  <TextCard
                    name={'Status:'}
                    isStatus={true}
                    value={vehicle.data.active ? 'Available' : 'Unavailable'}
                  />
                  <TextCard name={'Plate number'} isStatus={false} value={vehicle.data.model} />
                  <TextCard name={'Engine number'} isStatus={false} value={vehicle.data.engine_number} />
                  <TextCard
                    name={'Manufactured year'}
                    isStatus={false}
                    value={
                      vehicle.data.manufacture_year && format(parseISO(vehicle.data.manufacture_year), 'MM-dd-yyyy')
                    }
                  />
                  <TextCard name={'Fuel type'} isStatus={false} value={vehicle.data.fuel_type} />
                </CardContent>
                <CardMedia
                  className={classes.image}
                  component="img"
                  image={vehicle.data.image_url}
                  alt="Live from space album cover"
                />
              </Box>
            </Card>
          </article>
        )}
        <div className="h-2/5 bg-gray-100 flex flex-col p-10 gap-12 rounded-12">
          <h1>Maintenance</h1>
          {vehicle.data?.issues && <MaintenanceTable tableDatas={vehicle.data.issues} />}
        </div>
        <button
          className="w-1/5 h-32 mt-1 rounded-12 bg-teal-500 hover:bg-teal-300 text-white bold tracking-wider"
          onClick={onModalOpenClick}
        >
          Schedule a maintenance
        </button>
        <MaintenanceModal isOpen={open} setIsOpen={setOpen} />
      </>
    </motion.div>
  );
}

export default Details;
