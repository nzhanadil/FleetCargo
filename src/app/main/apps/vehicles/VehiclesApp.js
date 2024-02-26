import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
// import VehicleDialog from './VehicleDialog';
import VehiclesHeader from './VehiclesHeader';
import VehiclesList from './VehiclesList';
// import VehiclesSidebarContent from './VehiclesSidebarContent';
import reducer from './store';
import { getVehicles } from './store/vehiclesSlice';
import Details from './details/Details';
import VehicleModal from './VehicleModal';
// import { getUserData } from './store/userSlice';

function VehiclesApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  const [modal, setModal] = useState(false);
  const [modalAction, setModalAction] = useState(false);
  const toggleModal = (action) => {
    setModalAction(action)
    setModal(!modal)
  }

  useDeepCompareEffect(() => {
    dispatch(getVehicles(routeParams));
    // dispatch(getUserData());
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          wrapper: 'min-h-0'
        }}
        header={<VehiclesHeader pageLayout={pageLayout} toggleModal={toggleModal}/>}
        content={routeParams.vehicleId ? <Details /> : <VehiclesList />}
        // leftSidebarContent={<VehiclesSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {/* <VehicleDialog /> */}
      <VehicleModal modal={modal} toggleModal={toggleModal} modalAction={modalAction}/>
    </>
  );
}

export default withReducer('vehiclesApp', reducer)(VehiclesApp);
