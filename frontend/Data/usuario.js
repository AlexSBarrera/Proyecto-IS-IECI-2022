import axios from "axios";

const getusers = async()=>{try {
    const response = await axios.get(`${process.env.SERVIDOR}/user/get`)
    return response
} catch (error) {
    console.log("failed",error)
    return null
}
}


module.exports ={
    getusers,

}