import React, { Component } from 'react';
import ReactTable from 'react-table';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import './UserTable.css';
import NavBar from '../NavBar/NavBar';
import { Route } from 'react-router';




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
        axios.get('http://localhost:8080/users', {
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
                accessor: 'id'
            }, {
                Header: 'User name',
                accessor: 'name'
            }, {
                Header: 'Role',
                accessor: 'role'
            }]

        return (
            <div>
                <Route exact path='/service/users'
                    render={() =>
                        <div>
                            <NavBar />
                            <SplitterLayout>
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
                            </SplitterLayout>
                        </div>
                    } />
            </div>
        )
    }
}

export default UserTable;