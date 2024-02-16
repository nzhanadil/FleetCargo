import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { getVehicleDetails } from '../store/vehicelDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { Card, Box, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextCard from './TextCard';
import { parseISO, format } from 'date-fns';
import MaintenanceTable from '../maintenance/MaintenanceTable';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '10px'
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  image_holder: {
    width: '50%'
  },
  image: {
    height: '250px',
    objectFit: 'fill',
    borderRadius: '12px'
  }
}));

function Details() {
  const { vehicleId } = useParams();
  let dispatch = useDispatch();
  const vehicle = useSelector(state => state.vehiclesApp.vehiclesDetail);
  const classes = useStyles();

  useDeepCompareEffect(() => {
    dispatch(getVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  if (vehicle.isFetching) return <>Loading</>;

  return (
    <motion.div
      className="flex flex-col gap-14"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
    >
      <h1>Vehicles Details</h1>
      {vehicle.data && (
        <Card className={classes.card}>
          <Box className={classes.box}>
            <CardContent className={classes.content}>
              <TextCard name={'Status:'} isStatus={true} value={vehicle.data.active ? 'Available' : 'Unavailable'} />
              <TextCard name={'Plate number'} isStatus={false} value={vehicle.data.model} />
              <TextCard name={'Engine number'} isStatus={false} value={vehicle.data.engine_number} />
              <TextCard
                name={'Manufactured year'}
                isStatus={false}
                value={vehicle.data.manufacture_year && format(parseISO(vehicle.data.manufacture_year), 'MM-dd-yyyy')}
              />
              <TextCard name={'Fuel type'} isStatus={false} value={vehicle.data.fuel_type} />
            </CardContent>
            <div className={classes.image_holder}>
              <CardMedia
                className={classes.image}
                component="img"
                image={vehicle.data.image_url}
                alt="Live from space album cover"
              />
            </div>
          </Box>
        </Card>
      )}
      {vehicle.data && (
        <Card className={`p-12 flex flex-col gap-10 min-h-fit border-black`}>
          <h1>Vehicles Details</h1>
          <MaintenanceTable tableDatas={vehicle.data.issues} />
          <button className="bg-gray-200 w-1/5 h-1/5 hover:bg-gray-300">Schedule a maintenance</button>
        </Card>
      )}
    </motion.div>
  );
}

export default Details;
