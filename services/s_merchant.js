import Merchant from '../sequelize/models/user';

async function addMerchant(req, res) {
    console.log(res.body);
   try {
    await Merchant.create(req.body);
    return res.send("merchant added");
   } catch(e) {
    return res.send(e.errors[0].message);
   }
}

async function getAllMerchants(req, res) {
    try {
        let transactions = await Merchant.findAll({attributes: ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt']});
        console.log(transactions);
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
    addMerchant,
    getAllMerchants,
    getMerchantById
}