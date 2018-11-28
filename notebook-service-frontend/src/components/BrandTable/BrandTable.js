import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import 'react-table/react-table.css';
import './BrandTable.css';
import { FormGroup, FormControl, Button } from 'react-bootstrap';


class BrandTable extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
        };
    }

    componentWillMount() {
        axios.get('http://localhost:8080/brand/get/all', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
    }

    addBrandHandler = (props) => {

        var data={
            name: this.refs.newBrand.value,
          };

        axios.post('http://localhost:8080/brand/add', data)
            .then((response) => {
                console.log(response);
                let tableData =  [...this.state.tableData];
                tableData.push(data);
                this.setState({tableData});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    

    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Brand Id',
                accessor: 'id',
                maxWidth: 200
            }, {
                Header: 'Brand name',
                accessor: 'name',
                maxWidth: 200
            }]

        return (
            <div>
                <ReactTable
                    data={tableData}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight" />

                <FormGroup>
                    <FormControl
                        ref="newBrand"
                        type="brandname"
                        placeholder="Brand" />
                    <Button
                        onClick={() => { this.addBrandHandler() }}
                        type="submit">Add</Button>
                </FormGroup>
            </div>
        )
    }
}

export default BrandTable;