import React, { Component } from 'react';

import './BrandTable.css';
import { Table } from 'react-bootstrap';



class BrandTable extends Component {


    render() {
        return (
            <Table striped bordered condensed hover responsive >
                <tr>
                    <th>Name</th>
                </tr>
                <tr>
                    <td>BrandName here</td>
                </tr>
            </Table>
        )
    }
}

export default BrandTable;