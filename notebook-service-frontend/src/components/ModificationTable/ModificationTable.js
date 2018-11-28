import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './ModificationTable.css';


class ModificationTable extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [{
                id: '',
                name: '',
                price: ''
            }],
        };
    }

    addModificationHandler = (props) => {
        axios.post('http://localhost:8080/modification/add', {
            name: this.modificationInput.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/modification/get/all', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data });
        });
    }

    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                maxWidth: 200
            }, {
                Header: 'Price',
                accessor: 'price',
                maxWidth: 200
            }]

        return (
            <div>
                <ReactTable
                    data={tableData}
                    columns={columns}
                    defaultPageSize={5} />
                <FormGroup>
                    <FormControl
                        inputRef={input => this.modificationInput = input}
                        type="modification"
                        placeholder="Modification" />
                    <Button
                        onClick={() => { this.addModificationHandler() }}
                        type="submit">Add</Button>
                </FormGroup>
            </div>
        )
    }
}

export default ModificationTable; 