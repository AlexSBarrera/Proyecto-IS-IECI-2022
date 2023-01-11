import axios from "axios";

const getMaquina = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/maquina/get`);
    return response;
}
const createMaquina =  (maquina) => {
    const response = axios.post(`${process.env.SERVIDOR}/maquina/create`, maquina);
    return response;
}

const getSpecificMaquina = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/maquina/search/${id}`);
    return response;
}

const updateMaquina =  (id, maquina) => {
    const response = axios.put(`${process.env.SERVIDOR}/maquina/update/${id}`, maquina);
    return response;
}

const deleteMaquina =  (id) => {
    const response = axios.delete(`${process.env.SERVIDOR}/maquina/delete/${id}`);
    return response;
}

module.exports = {
    getMaquina,
    createMaquina,
    getSpecificMaquina,
    updateMaquina,
    deleteMaquina


}
