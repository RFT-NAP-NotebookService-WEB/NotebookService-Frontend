import React, { Component } from 'react';
import ReactTable from 'react-table';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import './UserTable.css';
import NavBar from '../NavBar/NavBar';
import path from '../../assets/path/Path';

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
        axios.get(path + '/users', {
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
                <NavBar />
                <SplitterLayout>
                    <div>
                        <ReactTable
                            data={tableData}
                            columns={columns}
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
        )
    }
}

export default UserTable;