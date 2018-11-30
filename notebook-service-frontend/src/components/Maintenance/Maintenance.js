import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './Maintenance.css';
import path from '../../assets/path/Path';


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                id: '',
                name: ''
            }],
        };
    }

    componentWillMount() {
        axios.get(path+'/brand/get/all', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
    }


    addBrandHandler = () => {
        var data = {
            name: this.newBrand.value,
        };

        axios.post(path+'/brand/add', data)
            .then((response) => {
                console.log(response);
                let tableData = [...this.state.tableData];
                tableData.push(data);
                this.setState({ tableData });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Brand name',
                accessor: 'name',
            }]

        return (
            <div>
                <ReactTable
                    data={tableData}
                    columns={columns}
                    minRows={5}
                    defaultPageSize={10}
                    defaultSorted={[
                        {
                            id: "name"
                        }
                    ]}
                    className="-striped -highlight" />

                <FormGroup>
                    <FormControl
                        inputRef={input => this.newBrand = input}
                        type="brandname"
                        placeholder="Brand" />{'  '}
                    <Button
                        onClick={() => { this.addBrandHandler() }}
                        type="submit">Add</Button>
                </FormGroup>
            </div>
        )
    }
}

export default Maintenance;