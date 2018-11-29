import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './BrandTable.css';


class BrandTable extends Component {
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
        axios.get('http://localhost:8080/brand/get/all', {
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

        axios.post('http://localhost:8080/brand/add', data)
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

export default BrandTable;