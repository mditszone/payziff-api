import Merchant from '../sequelize/models/m_user';

async function createUser(req, res) {
   console.log(req.body);
   try {
    const merchant = await Merchant.create(req.body);
    return res.status(200).json(merchant);
   } catch(e) {
    return res.send(e);
   }
}

async function updateUser(req, res) {
   console.log(req.body);
    try {
     const merchant = await Merchant.update(req.body.data, { where: { id: req.body.id } })
     return res.status(200).json(merchant);
    } catch(e) {
     return res.send(e);
    }
 
 }

async function getAllMerchants(req, res) {
    try {
        let transactions = await Merchant.findAll({
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
        let transactions = await Merchant.findAll({
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

async function getMerchantById(req, res) {
    let id = req.params.id;
    try {
        let transactions = await Merchant.findOne({ where: { id: id} });
        console.log(transactions);
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e.errors[0].message);
       }
}

export default {
    createUser,
    updateUser,
    getAllMerchants,
    getAllStaff,
    getMerchantById
}