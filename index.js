/**
 * @format
 */

import { name as appName } from './app.json';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent(appName, () => () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
));
