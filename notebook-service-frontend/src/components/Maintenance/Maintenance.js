import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl, Button, Col } from 'react-bootstrap';
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
                startdate: '',
                enddate: '',
                status: '',
                fault: '',
                user: {
                    id: '',
                    username: '',
                    password: '',
                    userrole: ''
                },
                product: {
                    id: '',
                    description: '',
                    type: '',
                    brand: {
                        id: '',
                        name: ''
                    },
                    client: {
                        id: '',
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: ''
                    }
                },
                modification: [
                    {
                        id: '',
                        name: '',
                        price: ''
                    }
                ]
            }],
            clientList: [],
            selectedClient: "",

            brandList: [],
            selectedBrand: ""
        }
    }

    componentWillMount() {
        axios.get(path+'/users', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
        
        axios.get(path+'/products', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });

        axios.get(path+'/clients', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });

        
        axios.get(path + '/clients')
            .then(response => {
                return response.data
            }).then(data => {
                let clientsFromApi = data.map(Client => { return { value: Client.id, display: Client.firstName + ' ' + Client.lastName } });
                this.setState({ clientList: [{ value: '', display: '(Select the Client)' }].concat(clientsFromApi) });
            }).catch(error => {
                console.log(error);
            });

        axios.get(path + '/brands')
            .then(response => {
                return response.data
            }).then(data => {
                let brandsFromApi = data.map(Brand => { return { value: Brand.id, display: Brand.name } });
                this.setState({ brandList: [{ value: '', display: '(Select the Brand)' }].concat(brandsFromApi) });
            }).catch(error => {
                console.log(error);
            });
    }


    submitJobHandler = () => {
        var data = {
            startdate: this.startdate,
            clientId: this.product.client.id,
            brandId: this.product.brand.id
        };

        axios.post(path+'/maintenance', data)
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
            { Header: 'User Info',
                columns: [
                    {
                        Header: 'User Name',
                        accessor: 'user.username',
                    },
                    {
                        Header: 'User Role',
                        accessor: 'user.userrole'
                    }
                ]
            },
            {
                Header: 'Product Info',
                columns: [
                    {
                        Header: 'Description',
                        accessor: 'product.description'
                    },
                    {
                        Header: 'Type',
                        accessor: 'product.type'
                    },
                    {
                        Header: 'Brand',
                        accessor: 'product.brand.name'
                    }
                ]
            },
            {
                Header: 'Client Info',
                columns: [
                    {
                        Header: 'Firstname',
                        accessor: 'product.client.firstname'
                    },
                    {
                        Header: 'Lastname',
                        accessor: 'product.client.lastname'
                    },
                    {
                        Header: 'Email',
                        accessor: 'product.client.email'
                    },
                    {
                        Header: 'Phone',
                        accessor: 'product.client.phone'
                    }
                ]
            }
        ]

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
                        inputRef={input => this.startdate = input}
                        type="startdate"
                        placeholder="Starting Date" />{'  '}
                    <Button
                        onClick={() => { this.submitJobHandler() }}
                        type="submit">Add</Button>
                        <Col sm={10}>
                            <select
                                value={this.state.selectedBrand}
                                onChange={(selectBrand) => this.setState({ selectedBrand: selectBrand.target.value })}>
                                {this.state.brandList.map((Brand) =>
                                    <option key={Brand.value} value={Brand.value}>{Brand.display}</option>)}
                            </select>
                        </Col>
                        <Col sm={10}>
                            <select
                            value={this.state.selectedClient}
                            onChange={(selectClient) => this.setState({ selectedClient: selectClient.target.value })}>
                            {this.state.clientList.map((Client) =>
                                <option key={Client.value} value={Client.value}>{Client.display}</option>)}
                            </select>
                        </Col>
                </FormGroup>
            </div>
        )
    }
}

export default Maintenance;