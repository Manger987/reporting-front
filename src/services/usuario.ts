import axios from 'axios';

const logginUser = async (usuario: object) => {
    return await axios.post(`http://localhost:8000/usuario/loggin`, usuario)
    .then(res => res.data)
    .catch(err => {
        console.log("ERROR1:", err.message);
        return err
    });
}

export { logginUser };