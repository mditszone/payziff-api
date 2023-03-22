import User from '../sequelize/models/m_user';

async function createUser(req, res) {
   console.log(req.body);
   try {
    const user = await User.create(req.body);
    console.log(user)
    return res.status(200).json(user);
   } catch(e) {
    return res.send(e);
   }
}

async function updateUser(req, res) {
   console.log(req.body);
    try {
     const User = await User.update(req.body.data, { where: { id: req.body.id } })
     return res.status(200).json(User);
    } catch(e) {
     return res.send(e);
    }
 
 }

async function getAllUsers(req, res) {
    try {
        let transactions = await User.findAll({
            attributes: ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt'],
            where: {
                roleId: 2
            }
        });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e.errors[0].message);
       }
}

async function getAllStaff(req, res) {
    try {
        let transactions = await User.findAll({
            attributes: ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt'],
            where: {
                roleId: 1
            }
        });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e.errors[0].message);
       }
}

async function getUserById(req, res) {
    let id = req.params.id;
    try {
        let transactions = await User.findOne({ where: { id: id} });
        console.log(transactions);
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e.errors[0].message);
       }
}

export async function findByPhoneNumber(phoneNumber) {
    
    if (!phoneNumber) return "required phone number";

    try {
        const user = await User.findOne({ where: { phoneNumber: phoneNumber} });
        return user
       } catch(e) {
        return e;
       }
}

export default {
    createUser,
    updateUser,
    getAllUsers,
    getAllStaff,
    getUserById,
}