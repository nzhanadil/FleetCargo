import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Tabs, Tab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';


const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
    color: theme.palette.primary.contrastText
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));
function Login() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card className={clsx(classes.leftSection, 'flex flex-col w-full max-w-sm items-center justify-center shadow-0')} square>
          <CardContent className="flex flex-col items-center justify-center w-full max-w-320">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
              <div className="flex items-center mb-4"> {/* Reduce margin bottom for better alignment */}
                <img className="logo-icon w-64" src="https://cargofleet.org/assets/img/logo.png" alt="logo" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}/> {/* Adjust logo size */}
                <div className="border-l-1 mr-4 w-1 h-24" /> {/* Adjust border height for better appearance */}
                <div>
                  <Typography className="text-20 font-semibold logo-text" color="inherit"> {/* Adjust text size */}
                    Fleet
                  </Typography>
                  <Typography className="text-16 tracking-widest -mt-8 font-500" color="textSecondary"> {/* Adjust text size */}
                    Cargo
                  </Typography>
              <div className="flex items-center mb-48">
                <img className="logo-icon w-70" src="assets/images/logos/cargoFleetLogo.png" alt="logo" />
                </div>
            </motion.div>
            {/* <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" className="w-full mb-100"> */}
            <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" className="w-full mb-32">
              <Tab
                icon={<img className="h-48" src="assets/images/logos/firebase.svg" alt="firebase" />}
                className="min-w-0"
                label="Firebase"
              />
            </Tabs>
            {selectedTab === 0 && <FirebaseLoginTab />}
          </CardContent>
          <div className="flex flex-col items-center justify-center pt-4 pb-8"> {/* Adjust padding top and bottom */}
            <div className='mb-4'> {/* Reduce margin bottom */}
              <span className="font-normal mr-2">Don't have an account?</span> {/* Adjust margin right */}
              <Link className="font-normal" to="/register">
                Register
              </Link>
            </div>
            <Link className="font-normal" to="/"> {/* Remove margin top */}
              Back to Dashboard
            </Link>
          </div>
        </Card>
        <div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
          <div className="max-w-320">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
              <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
                Welcome <br />
                to the <br /> FUSE React!
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                Powerful and professional admin template for Web Applications, CRM, CMS, Admin Panels and more.
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default Login;

