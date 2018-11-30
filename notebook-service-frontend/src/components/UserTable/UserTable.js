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
                username: '',
                userRole: ''
            }],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data });
            console.log(response);
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
                accessor: 'username'
            }, {
                Header: 'Role',
                accessor: 'userRole'
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
                            <p>{console.log(tableData)}</p>
                        </div>
                    } />
            </div>
        )
    }
}

export default UserTable;