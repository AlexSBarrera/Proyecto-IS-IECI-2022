import axios from "axios";

const gettipoMaquina = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/tipomaquina/get`);
    return response;
}
const createtipoMaquina =  (maquina) => {
    const response = axios.post(`${process.env.SERVIDOR}/tipomaquina/create`, maquina);
    return response;
}

const getSpecifictipoMaquina = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/tipomaquina/search/${id}`);
    return response;
}

const updatetipoMaquina =  (id, maquina) => {
    const response = axios.put(`${process.env.SERVIDOR}/tipomaquina/update/${id}`, maquina);
    return response;
}

module.exports = {
    gettipoMaquina,
    createtipoMaquina,
    getSpecifictipoMaquina,
    updatetipoMaquina
    
}
