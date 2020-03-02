import dataAdapter from './DataAccessService';
import axios from 'axios';
import MockAdpater from 'axios-mock-adapter';
describe("Test DataAccess Service", () => {
    let mock;
    beforeAll(()=>{
        mock = new MockAdpater(axios);
    })
    it("test getShipmentList", (done) => {

        mock.onGet("http://localhost:3000/shipments/").replyOnce(200, "test");
        dataAdapter.getShipmentList().then((res)=>{
            expect("test").toBe(res.data);
            done();
        });

    });

    it("test getShipmentDetail", (done) => {
        const id = 1;
        mock.onGet(`http://localhost:3000/shipments/${id}`).replyOnce(200, id);
        dataAdapter.getShipmentDetail(id).then((res)=>{
            expect(id).toBe(res.data);
            done();
        });
    });

    it("test updateShipmentName", (done) => {
        const id = 1;
        mock.onPatch(`http://localhost:3000/shipments/${id}`).replyOnce(200, id);
        dataAdapter.updateShipmentName(id, "testName").then((res)=>{
            expect(id).toBe(res.data);
            done();
        });
    });

});