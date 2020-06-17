import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import normalize from './styles/normalize.css';
import styles from './styles/styles.scss';

render(<App />, document.getElementById('app'));
