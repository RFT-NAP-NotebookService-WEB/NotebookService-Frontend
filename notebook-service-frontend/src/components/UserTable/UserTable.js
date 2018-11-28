import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import './UserTable.css';




class UserTable extends Component {

    constructor() {
        super();
        this.state = {
            tableData: [{
                id: '',
                name: '',
                userrole: ''
            }],
        };
    }

    componentDidMount() {
        axios.get('localhost:8080/user/get/all', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data });
        });
    }


    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'User Id',
                accessor: 'id',
                maxWidth: 200
            }, {
                Header: 'User name',
                accessor: 'name',
                maxWidth: 200
            }, {
                Header: 'Role',
                accessor: 'role',
                maxWidth: 200
            }]

        return (
            <ReactTable
                data={tableData}
                columns={columns}
                defaultPageSize={5}
            />
        )
    }
}

export default UserTable;