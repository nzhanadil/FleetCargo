import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';
import ResetPasswordConfig from 'app/main/reset-password/ResetPasswordConfig';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  UserInterfaceConfig,
  DocumentationConfig,
  LogoutConfig,
  LoginConfig,
  ResetPasswordConfig,
  RegisterConfig,
  LogoutConfig,
  CallbackConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/apps/dashboard" />
  },
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
];

export default routes;
