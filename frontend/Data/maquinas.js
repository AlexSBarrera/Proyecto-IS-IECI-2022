import axios from "axios";

const getMaquina = async () => {
    const response = await axios.get(`${process.env.servidor}/maquina/get`);
    return response;
}
const createMaquina =  (maquina) => {
    const response = axios.post(`${process.env.servidor}/maquina/create`, maquina);
    return response;
}

const getSpecificMaquina = async (id) => {
    const response = await axios.get(`${process.env.servidor}/maquina/search/${id}`);
    return response;
}

const updateMaquina =  (id, maquina) => {
    const response = axios.put(`${process.env.servidor}/maquina/update/${id}`, maquina);
    return response;
}

const deleteMaquina =  (id) => {
    const response = axios.delete(`${process.env.servidor}/maquina/delete/${id}`);
    return response;
}

module.exports = {
    getMaquina,
    createMaquina,
    getSpecificMaquina,
    updateMaquina,
    deleteMaquina


}
