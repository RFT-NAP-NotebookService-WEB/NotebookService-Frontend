import React, { Component } from 'react';

import './UserTable.css';
import { Table } from 'react-bootstrap';



class UserTable extends Component {


    render() {
        return (
            <Table striped bordered condensed hover responsive >
                <tr>
                    <th>Username</th>
                    <th>
                        {/* <FormControl type="text" placeholder="Search"/> */}
                    User Id
                    </th>
                    <th>Role</th>

                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
                <tr>
                    <td>Adam</td>
                    <td>Johnson</td>
                    <td>67</td>
                </tr>
            </Table>
        )
    }
}

export default UserTable;