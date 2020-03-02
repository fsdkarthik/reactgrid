import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import ShipmentDetail from './ShipmentDetail';
describe("test for shipment detail", () => {
    let mountedShipmentDetail;
    beforeEach(() => {
        jest.spyOn(axios, "get").mockImplementationOnce(()=>{
            return Promise.resolve(undefined);
        });
        mountedShipmentDetail = shallow(<ShipmentDetail match={{params :{id : 1}}}/>)
    });

    it('should render Shipment detail Component layout', () => {
        expect(mountedShipmentDetail.getElements()).toMatchSnapshot();
    });

    it('input text change event test', () => {
        
        const component =  mountedShipmentDetail;
        component.setState({ error: 2 })
        const mockEvent = {
            target: {
                value: 'prd1'
            }
        };
        expect(mountedShipmentDetail.find('#name').length).toEqual(1);
        mountedShipmentDetail.find('#name').simulate('change', mockEvent);
        expect(component.state("data").name).toEqual('prd1');
    });
});

