import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Form, FormGroup, Jumbotron, ControlLabel, Button } from 'react-bootstrap';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import 'react-table/react-table.css';
import './Maintenance.css';
import path from '../../assets/path/Path';


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                product: {
                    id: "",
                    description: "",
                    type: "",
                    brand: {
                        id: "",
                        name: ""
                    }
                }
            }],
            product: {
                id: "",
                description: "",
                type: "",
                brand: {
                    id: "",
                    name: ""
                },
                client: {
                    id: '',
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: ""
                }
            },
            modification: [{
                id: '',
                name: '',
                price: ''
            }],

            selectedTableRow: ""
        }
    }

    componentDidMount() {

        axios.get(path + '/products', {
            responseType: 'json'
        }).then(response => {
            this.setState({ 
                tableData: response.data,
                product: response.data
            });
            console.log(this.state.tableData)
            console.log(this.state.product)
        }).catch(error => {
            console.log(error)
        });

        axios.get(path + '/modifications', {
            responseType: 'json'
        }).then(response => {
            this.setState({ 
                modification: response.data
            });
            console.log(this.state.modification)
        });
    }


    submitJobHandler = () => {
        var data = {
            startDate: Date,
            endDate: Date,
            status: "RECORDED",
            fault: "ventillator",
            productId: this.state.product.id,
            userId: this.state.user.id,
            modificationsId: [this.state.modification]
        };

        axios.post(path + '/maintenance', data)
            .then(response => {
                console.log(data);
                let tableData = [...this.state.tableData];
                tableData.push(data);
                this.setState({ tableData });
                console.log(tableData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Product Info',
                columns: [
                    {
                        Header: 'Brand',
                        accessor: 'brand.name'
                    }, {
                        Header: 'Type',
                        accessor: 'type'
                    }, {
                        Header: 'Description',
                        accessor: 'description'
                    }
                ]
            }
        ]

        return (
            <div>
                <SplitterLayout vertical>

                    <div>
                        <SplitterLayout horizontal>
                            <div>
                                <Jumbotron className="ClientJumbotronPadding">

                                    <h1 className="ClientHeader">Clients: </h1>
                                    <Form horizontal>
                                        <FormGroup>
                                            <ControlLabel>Name</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.original.client.firstName}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>"Kliens emailje ide"</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Phone</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>"Kliens telefonszáma ide"</ControlLabel>
                                        </FormGroup>
                                    </Form>

                                    <Button
                                        onClick={() => { this.submitJobHandler() }}
                                        type="submit">Add
                                    </Button>
                                </Jumbotron>
                            </div>
                            <div>
                                <Jumbotron className="MaintenanceJumbotronPadding">

                                    <h1 className="MaintenanceHeader">Maintenance: </h1>
                                    <p className="MaintenanceParagraph">
                                        <Form horizontal>
                                            <FormGroup>
                                                <ControlLabel>Startdate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"startdate ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>endDate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"endDate ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Fault</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"fault ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Modification</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"modification ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>price</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"price ide"</ControlLabel>
                                            </FormGroup>
                                        </Form>
                                    </p>

                                </Jumbotron>
                            </div>

                        </SplitterLayout>
                    </div>


                    <div>
                        <ReactTable
                            data={tableData}
                            columns={columns}
                            minRows={5}
                            defaultPageSize={10}
                            getTrProps={(state,rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                  return {
                                    onClick: (e) => {
                                      this.setState({
                                        selectedTableRow: rowInfo
                                      })
                                      console.log(this.state.selectedTableRow)
                                    },
                                    style: {
                                      background: rowInfo === this.state.selectedTableRow ? '#00afec' : 'white',
                                      color: rowInfo === this.state.selectedTableRow ? 'white' : 'black'
                                    }
                                  }
                                }else{
                                  return {}
                                }
                              }
                            }

                            defaultSorted={[
                                {
                                    id: "name"
                                }
                            ]}
                            className="-striped -highlight" />
                    </div>

                </SplitterLayout>
            </div >
        )
    }
}

export default Maintenance;