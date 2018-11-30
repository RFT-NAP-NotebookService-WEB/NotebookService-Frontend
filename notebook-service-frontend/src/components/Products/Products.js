import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SplitterLayout from 'react-splitter-layout';
import ReactTable from 'react-table';

import path from '../../assets/path/Path';
import 'react-table/react-table.css';
import './Products.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                id: '',
                name: ''
            }],
        };
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
                <Route exact path='/products'
                    render={() =>
                        <div>
                            <NavBar />
                            <SplitterLayout>
                                <div></div>
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

export default Products;
