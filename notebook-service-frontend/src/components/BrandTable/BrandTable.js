import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl, Button, Form, Col, ControlLabel } from 'react-bootstrap';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import 'react-table/react-table.css';
import './BrandTable.css';
import path from '../../assets/path/Path';
import NavBar from '../NavBar/NavBar';
import { Route } from 'react-router';

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
        axios.get(path + '/brands', {
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

        axios.post(path + '/brand', data)
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
                <Route exact path='/service/brands'
                    render={() =>
                        <div>
                            <NavBar />
                            <SplitterLayout>
                                <div>
                                    <Form horizontal>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Brand
                                </Col>
                                            <Col sm={10}>
                                                <FormControl
                                                    inputRef={input => this.newBrand = input}
                                                    type="brandname"
                                                    placeholder="Brand" />
                                            </Col>
                                            <Col sm={10}>
                                                <Button onClick={() => { this.addBrandHandler() }}>Add</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div>
                                    <ReactTable
                                        data={tableData}
                                        columns={columns}
                                        minRows={15}
                                        defaultPageSize={10}
                                        defaultSorted={[
                                            {
                                                id: "name"
                                            }
                                        ]}
                                        className="-striped -highlight" />
                                </div>
                            </SplitterLayout>
                        </div>
                    } />
            </div>
        )
    }
}

export default BrandTable;