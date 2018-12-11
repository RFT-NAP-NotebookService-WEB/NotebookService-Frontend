import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ErrorAlert extends Component {
    render() {
        return (
            <Alert bsStyle="danger">
                Wrong username/password
            </Alert>
        );
    }

}
export default ErrorAlert;