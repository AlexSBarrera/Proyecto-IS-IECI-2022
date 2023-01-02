import axios from "axios";

const gethorarios = async()=>{

    const response = await axios.get('http://localhost:5000/api/horario/get')
    return response
}

module.exports ={
    gethorarios
}