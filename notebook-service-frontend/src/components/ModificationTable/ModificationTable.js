import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FormGroup, FormControl,Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './ModificationTable.css';


class ModificationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                id: '',
                name: '',
                price: ''
            }],
        };
    }

    componentWillMount() {
        axios.get('http://localhost:8080/modification/get/all', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
    }

    addModificationHandler = () => {

        var data={
            name: this.newModification.value,
            price: this.newModificationPrice.value
          };

        axios.post('http://localhost:8080/modification/add', data)
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
                    defaultPageSize={10} />
                <FormGroup bsSize="large">
                    <FormControl
                        inputRef={input => this.newModification = input}
                        type="modification"
                        placeholder="Modification" />
                        <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl
                        inputRef={input => this.newModificationPrice = input}
                        type="modification"
                        placeholder="Price" />
                        </InputGroup>
                    <Button
                        onClick={() => { this.addModificationHandler() }}
                        type="submit">Add</Button>
                </FormGroup>
            </div>
        )
    }
}

export default ModificationTable; 