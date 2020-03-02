import React, { Component } from 'react';
import axios from 'axios';
import dataAdapter from '../services/DataAccessService';
class ShipmentDetail extends Component {

    state = { error: 1, data: { name: '' } };
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        //read the selected shipment info from rest end point
        dataAdapter.getShipmentDetail(id).then((res) => {
            this.setState({ error: 2 });
            this.setState({ data: res.data });
        }).catch(() => {
            this.setState({ error: 3 });
        });
    }

    updateName(event) {
        this.state.data.name = event.target.value;
        this.setState({ data: this.state.data });
    }

    onSave($event) {
        $event.preventDefault();
        const { id } = this.props.match.params;
        dataAdapter.updateShipmentName(id, this.state.data.name).then(() => {
            alert("Name has been updated successfully");
        }).catch(() => {
            alert("Failed to update the name");
        });
    }

    render() {

        if (this.state.error === 2) {
            return (
                <div className="detail-main-header">
                    <div className="shipment-detail-header">
                        <h3>
                            Name : &nbsp;{this.state.data.name}
                        </h3>
                        <form>                   
                            <div className="form-group">
                            <label >Edit the Name</label>
                            <input id="name" className="form-control" type="text" onChange={this.updateName} value={this.state.data.name}></input>

                        </div>
                            <button className="btn btn-primary" onClick={this.onSave}>Save</button>
                        </form>

                    </div>

                    <h4 className="shipment-header-text">Cargo List</h4>

                    <div className="card-group">
                        {this.state.data.cargo && this.state.data.cargo.map((item, i) => {
                            return (<div className="card" key={i}>
                                <div className="frieght-card-header card-header bg-dark ">Type &nbsp; : &nbsp; {item.type}
                                    &nbsp;<span className="badge badge-info">{i + 1}</span>
                                </div>
                                <div className="card-body">
                                    <p>Description : &nbsp; {item.description} </p>
                                    <p>volume : &nbsp; {item.volume} </p>
                                </div>
                            </div>);
                        })}

                    </div>
                    <h4 className="shipment-header-text">Other info:</h4>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <td>Mode</td>
                                <td>Type</td>
                                <td>Destination</td>
                                <td>Origin</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.data.mode}</td>
                                <td>{this.state.data.type}</td>
                                <td>{this.state.data.destination}</td>
                                <td>{this.state.data.origin}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className="shipment-header-text">Services</h4>

                    <div className="card-group">

                        {this.state.data.cargo && this.state.data.services.map((item, i) => {
                            return (<div className="card bg-info" key={i}>

                                <div className="card-body">
                                    {item.type}
                                </div>
                            </div>);
                        })}

                    </div>

                </div >
            );
        } else if (this.state.error === 3) {
            return (
                <div className="error-message">
                    Either the rest url configured by is not correct or the record you are looking for is not found
                </div>
            );
        }
        return (<div>loading...</div>)

    }
}

export default ShipmentDetail;