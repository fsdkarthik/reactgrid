import React, { Component } from 'react';
import axios from 'axios';
import './Shipment.css';
import { Link, Redirect } from 'react-router-dom';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import dataAdapter from '../services/DataAccessService';
class Shipment extends Component {
    //FUNCTION RETURN THE COLUMN DEFINITIONS
    getColumns() {
        return [{
            Header: 'Name',
            name: "Name",
            accessor: "name"
        },
        {
            Header: 'Mode',
            name: "Mode",
            accessor: "mode"
        },
        {
            Header: 'Type',
            name: "Type",
            accessor: "type"
        },
        {
            Header: 'Destination',
            name: "Destination",
            accessor: "destination"
        },
        {
            Header: 'Origin',
            name: "Origin",
            accessor: "origin"
        }
        ];
    }
    //CONSTRUCTOR METHOD FOR COMPONENT
    constructor(props) {
        console.log("Constructor loaded");
        super(props);
        this.state = { Shipments: [], error: 1, redirectToDetail: false, shipmentName: "" };
        this.filterGrid = this.filterGrid.bind(this);
    }
    componentDidMount() {
        dataAdapter.getShipmentList().then((res) => {
            console.log(res);
            this.setState({ error: 2 });
            console.log("status code------>", this.state.error);
            let arr = [...res.data];
            this.setState({
                Shipments: arr
            });
            this.setState({
                srcShipments: arr
            });
            
        }).catch((err) => {
            this.setState({ error: 3 });
        });
    }
    //RENDER FUNCTION TO EMBED THE HTML
    render() {

        //success state
        if (this.state.error == 2) {
            return this.renderContent();
        } else if (this.state.error == 3) {//http error state
            return this.renderError();
        }
        else { //default state
            return (<div>Loading...</div>);
        }


    }

    filterGrid(event){

        this.setState({
            shipmentName : event.target.value
        });
        let filteredData = [...this.state.srcShipments.filter((item)=>{
            return item.name.toLowerCase().includes(event.target.value.toLowerCase());
        })];
        this.setState({
            Shipments : filteredData
        });
    }

    //RENDER THE CONTENT FROM THE BELOW METHOD IF GETCH REUEST IS SUCCESSFUL
    renderContent() {
        return (
            <div className="shipment-grid-container">
                <h3>Please use the pagination below to move to next/prev page!</h3>
                <h3>Click on the row to view detail & edit the name</h3>
                <div className="form-group">
                    <input onChange={this.filterGrid} value={this.state.shipmentName} className="form-control" type="text" placeholder="Please enter the shipment name to filter..."></input>
                </div>
                <div className="shipment-grid">


                    <ReactTable getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                if (!rowInfo || !rowInfo.original) {
                                    return;
                                }
                                this.props.history.push(`/${rowInfo.original.id}`);
                                if (handleOriginal) {
                                    handleOriginal()
                                }
                            }
                        }
                    }}
                        data={this.state.Shipments} columns={this.getColumns()}></ReactTable>

                </div>
            </div>

        );
    }
    //RENDER THE BELOW TEMPLATE IF THE HTTP REUEST  TO THE SERVER FAILS
    renderError() {
        return (
            <div className="error-template">
                <p>Api request to the backend server has failed, Please check the url configured.</p>
            </div>
        );
    }
}

export default Shipment;