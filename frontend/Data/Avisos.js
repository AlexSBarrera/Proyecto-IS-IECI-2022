import axios from "axios";

const getAvisos = async()=> {try{
    const response = await axios.get(`${process.env.SERVIDOR}/MsmBoard/getAviso`)
    return response
} catch (error) {
    console.log(error)
    return error
}}

const sendEmail = async(email) =>{try{
    const response = await axios.post(`${process.env.SERVIDOR}/MsmBoard/post`,email)
    return response
} catch (error) {
    console.log(error)
    return error
}}

const postAviso = async(avisos) =>{try{
    const response = await axios.post(`${process.env.SERVIDOR}/MsmBoard/postAviso`,avisos)
    return response
} catch (error) {
    console.log(error)
    return error
}}

const deleteAviso = async(id) =>{try{
    const response = await axios.delete(`${process.env.SERVIDOR}/MsmBoard/delete/${id}`)
    return response
} catch (error) {
    console.log(error)
    return error
}}

const updateAviso = async(id, avisos) =>{try {
    const response = await axios.put(`${process.env.SERVIDOR}/MsmBoard/update/${id}`,avisos)
    return response
}   catch (error) {
    console.log(error)
    return error
}}

module.exports ={
    getAvisos,
    sendEmail,
    postAviso,
    deleteAviso,
    updateAviso
}
