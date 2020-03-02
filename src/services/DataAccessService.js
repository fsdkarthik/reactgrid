
import axios from 'axios';
const getShipmentList = ()=>{
    return axios.get("http://localhost:3000/shipments/");
}

const getShipmentDetail = (id)=>{
    return  axios.get(`http://localhost:3000/shipments/${id}`);
}

const updateShipmentName = (id, name)=>{
    return axios.patch(`http://localhost:3000/shipments/${id}`, {
            name: name
        });
}

export default {
    getShipmentList,
    getShipmentDetail,
    updateShipmentName
}