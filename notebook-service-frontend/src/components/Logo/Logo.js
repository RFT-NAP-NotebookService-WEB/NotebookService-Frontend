import React from 'react';
import { Image } from 'react-bootstrap/lib';

import NotebookLogo from '../../assets/images/notebook-logo.png';
import './Logo.css';


const logo = (props) => (
    <Image src={NotebookLogo} rounded />
);

export default logo;