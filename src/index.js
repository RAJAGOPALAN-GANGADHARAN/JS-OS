import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Bundler from './bundler';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(<Bundler/>, document.getElementById('root'));
registerServiceWorker();
