import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { getVehicleDetails } from '../store/vehicelDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { Card, Box, Typography, CardContent, CardMedia } from '@material-ui/core';

function Details() {
  const { vehicleId } = useParams();
  let dispatch = useDispatch();
  const vehicle = useSelector(state => state.vehiclesApp.vehiclesDetail);

  useDeepCompareEffect(() => {
    dispatch(getVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);
  console.log(vehicle);
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <h2>Vehicles Details</h2>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardContent>
            <Typography>Details {vehicle.data.model}</Typography>

            <Typography>Details {vehicle.data.model}</Typography>
            <Typography>
              <strong>Details</strong> {vehicle.data.model}
            </Typography>
            <Typography>Details {vehicle.data.model}</Typography>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 151 }} image="" alt="Live from space album cover" />
      </Card>
    </motion.div>
  );
}

export default Details;
