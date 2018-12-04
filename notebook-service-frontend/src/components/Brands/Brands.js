import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './Brands.css';
import path from '../../assets/path/Path';

class Brands extends Component {

    addBrandHandler = () => {
        var data = {
            name: this.newBrand.value,
        };

        axios.post(path + '/brand', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (

            <FormGroup>
                <FormControl
                    inputRef={input => this.newBrand = input}
                    type="brandname" />
                <Button onClick={() => { this.addBrandHandler() }}>Add</Button>
            </FormGroup>

        )
    }
}

export default Brands;