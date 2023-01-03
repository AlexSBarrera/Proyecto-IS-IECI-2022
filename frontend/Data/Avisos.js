import axios from "axios";

const getavisos = async()=>{
    const response = await axios.get(`${process.env.SERVIDOR}/Msmboard/getAviso`)
    return response
}

const sendEmail = async(email) =>{
    const response = await axios.post(`${process.env.SERVIDOR}/Msmboard/post`,email)
    return response
}

const postAviso = async(avisos) =>{
    const response = await axios.post(`${process.env.SERVIDOR}/Msmboard/postAviso`,avisos)
    return response
}

const deleteAviso = async(id) =>{
    const response = await axios.delete(`${process.env.SERVIDOR}/Msmboard/delete/${id}`)
    return response
}

const updateAviso = async(id, avisos) =>{
    const response = await axios.put(`${process.env.SERVIDOR}/Msmboard/update/${id}`,avisos)
    return response
}



module.exports ={
    getavisos,
    sendEmail,
    postAviso,
    deleteAviso,
    updateAviso
}
