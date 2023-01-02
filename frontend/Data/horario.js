import axios from "axios";

const gethorarios = async()=>{

    const response = await axios.get(`${process.env.SERVIDOR}/horario/getlib`)
    return response
}
const sendReserv = async(horario, user) =>{
    console.log(process.env.SERVIDOR,"/horario/getlib/",horario,"/",user)
    const response = await axios.put(`${process.env.SERVIDOR}/helper/reserve/${horario}/${user}`)
    return response

}
const sendCancel = async(horario, user) =>{
    console.log(process.env.SERVIDOR,"/horario/getlib/",horario,"/",user)
    const response = await axios.put(`${process.env.SERVIDOR}/helper/Cancel/${horario}/${user}`)
    return response

}

module.exports ={
    gethorarios,
    sendReserv,
    sendCancel
}