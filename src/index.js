import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Bundler from './bundler';

ReactDOM.render(<Bundler/>, document.getElementById('root'));
registerServiceWorker();
