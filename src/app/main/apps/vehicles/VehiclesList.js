import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import { parseISO, format } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@mui/material/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from '@material-ui/core';

import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VehiclesTable from './VehiclesTable';
import { selectVehicles } from './store/vehiclesSlice';

function VehiclesList(props) {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const searchText = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.searchText);
  const [filteredData, setFilteredData] = useState(null);
  const columns = useMemo(
    () => [
     {
        Header: 'Active',
        accessor: 'active',
        className: 'font-medium',
        Cell: ({ row }) => {
          return row.values.active ? <Checkbox checked /> : <Checkbox />;
        }
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Plate Number',
        accessor: 'plate_number',
        sortable: true,
        Cell: ({ row }) => (
          <a href={`/apps/vehicles/details/${row.original.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
            {row.values.plate_number}
          </a>
        )
      },
      {
        Header: 'Engine number',
        accessor: 'engine_number',
        sortable: true
      },
      {
        Header: 'Year',
        accessor: 'manufacture_year',
        sortable: true,
        Cell: ({ row }) => <p>{format(parseISO(row.values.manufacture_year), 'yyyy')}</p>
      },
      {
        Header: 'Issues',
        accessor: 'vehicleStatus',
        sortable: true,
        Cell: ({ row }) => <p>{row.original.issues.length}</p>
      },
      {
        Header: 'Actions',
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                // handle Edit logic in this function
              }}
            >
              Edit
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                // handle delete logic in this function
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        )
      }
    ],
    // eslint-disable-next-line
    [dispatch, vehicles]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return vehicles;
      }
      return FuseUtils.filterArrayByString(vehicles, _searchText);
    }

    if (vehicles) {
      setFilteredData(getFilteredArray(vehicles, searchText));
    }
  }, [vehicles, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no vehicles!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <VehiclesTable
        columns={columns}
        data={vehicles}
        // onRowClick={(ev, row) => {
        //   if (row) {
        //     dispatch(openEditContactDialog(row.original));
        //   }
        // }}
      />
    </motion.div>
  );
}

export default VehiclesList;
