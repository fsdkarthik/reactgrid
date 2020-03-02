import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Shipment from './Shipment';
import MockAdapter from 'axios-mock-adapter';
describe('Shipment Component', () => {
    let mountedShipment;
    let mock;

    beforeEach(() => {
        mountedShipment = shallow(<Shipment />);
        mock = new MockAdapter(axios);
        mountedShipment.setState({ error: 1 })
    });

    it('checking shipment error template', () => {
        const mountedShipment = shallow(<Shipment />);
        expect(mountedShipment.state('error')).toEqual(1);
        let content = mountedShipment.find('div')
        expect(content.text()).toEqual('Loading...');
    });

        it("ensure http API call during mount and renders right view post response", () => {
           // console.log("====>", "test load");
            const spy = jest.spyOn(axios, 'get');
            const data = [];
            mock.onGet('http://localhost:3000/shipments/').replyOnce(200, data);
            mountedShipment.instance().componentDidMount();
            expect(spy).toHaveBeenCalled();
            setTimeout(()=>{
              expect( mountedShipment.instance().state.error ).toEqual(2);
              done();
            }, 100); 
      });

    it('should render Shipment layout', () => {
        mountedShipment.setState({ error: 2 })
        let reactTable = mountedShipment.find('ReactTable');
        expect(reactTable.length).toBe(1);
    });
})
