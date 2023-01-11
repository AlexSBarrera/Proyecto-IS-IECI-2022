import axios from "axios";

const gethorarios = async()=>{try {
    const response = await axios.get(`${process.env.SERVIDOR}/horario/getlib`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}
const gethorariosAll = async()=>{try {
    const response = await axios.get(`${process.env.SERVIDOR}/horario/get`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}
const postHorario = async(horario) =>{try {
    console.log(process.env.SERVIDOR,"/horario/create", horario)
    const response = await axios.post(`${process.env.SERVIDOR}/horario/create`, horario)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}
const updHorario = async(horario) =>{try {
    console.log(process.env.SERVIDOR,"/horario/create", horario)
    console.log("sucess")
    const response = await axios.put(`${process.env.SERVIDOR}/horario/update/${horario.id}`, horario)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}
const sendReserv = async(horario, user) =>{try {
    console.log(process.env.SERVIDOR,"/horario/getlib/",horario,"/",user)
    const response = await axios.put(`${process.env.SERVIDOR}/helper/reserve/${horario}/${user}`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}

}
const sendCancel = async(horario, user) =>{try {
    console.log(process.env.SERVIDOR,"/horario/getlib/",horario,"/",user)
    const response = await axios.put(`${process.env.SERVIDOR}/helper/Cancel/${horario}/${user}`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}
const delHorario = async(horario) =>{try {
    console.log(process.env.SERVIDOR,"/horario/delete",horario)
    const response = await axios.delete(`${process.env.SERVIDOR}/horario/delete/${horario}`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}

module.exports ={
    gethorarios,
    postHorario,
    sendReserv,
    sendCancel,
    updHorario,
    delHorario,
    gethorariosAll
}