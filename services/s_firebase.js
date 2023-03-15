import { firebaseConfig } from "../secrets";

const getfirebaseConfig = (req, res) => {
    res.status(200).json(firebaseConfig);
}

export default {
    getfirebaseConfig
}