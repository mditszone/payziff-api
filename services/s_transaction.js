import Trasactions from '../sequelize/models/m_transactions';
import sequelize from '../sequelize/sequelize';
import { Sequelize } from 'sequelize';


async function addTransaction(req, res) {
   try {
    await Trasactions.create(req.body);
    return res.send("transaction added");
   } catch(e) {
    return res.send(e.errors[0].message);
   }
}

async function getAllTransactions(req, res) {
    try {
        let transactions = await Trasactions.findAll({attributes: ['orderId', 'orderAmount', 'OrderStatus', 'createdAt', 'updatedAt']});
        return res.status(200).json({"status": 200, "data": transactions});
       } catch(e) {
        return res.send(e.errors[0].message);
       }
}


async function getTodayTransactions(req, res) {
    const Op = Sequelize.Op;
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    console.log(TODAY_START, new Date().toLocaleTimeString());

    try {
        let transactions = await Trasactions.findAll({
            attributes: ['orderStatus', 
                [sequelize.fn('COUNT', sequelize.col('orderStatus')), 'statusCount'],
                [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount']
            ],
            where: {
              createdAt: {        
                [Op.gt]: TODAY_START,
                [Op.lt]: NOW
              }
            },
            group: ['orderStatus'],
            order: ['createdAt'],
          });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e);
       }
}

async function getTransactionsByDate(req, res) {
    const Op = Sequelize.Op;
    const TODAY_START = new Date(req.params.date)
    const NOW = new Date();

    try {
        let transactions = await Trasactions.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount'],
                [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount']
            ],
            where: {
              createdAt: {        
                [Op.gt]: TODAY_START,
                [Op.lt]: NOW
              }
            },
            group: ['orderStatus'],
            order: ['createdAt'],
          });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e);
       }
}

async function getTransactionsByMonth(req, res) {
  const Op = Sequelize.Op;
  const CUR_YEAR = new Date().getFullYear();
  console.log("full year", CUR_YEAR);
  try {
      let transactions = await Trasactions.findAll({
          attributes: [
              [sequelize.fn('DAY', Sequelize.col('createdAt')), 'day'], 
              [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount']
          ],
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), req.params.month),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), CUR_YEAR),
            ]
          },
          group: ['createdAt'],
        });
      return res.status(200).json({status: 200, data: transactions});
     } catch(e) {
      return res.send(e);
     }
}

async function getTransactionsByDateRange(req, res) {
    const Op = Sequelize.Op;
    console.log("range", req.query.begin, req.query.end);
    try {
        let transactions = await Trasactions.findAll({
            attributes: ['orderStatus', 
                [sequelize.fn('COUNT', sequelize.col('orderStatus')), 'statusCount'],
                [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount']
            ],
            where: {
              createdAt: {        
                [Op.gte]: req.query.begin,
                [Op.lte]: req.query.end
              }
            },
            group: ['orderStatus'],
            order: ['createdAt'],
          });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e);
       }
}



async function getTransactionsByWholeMonth(req, res) {
  const Op = Sequelize.Op;
  const CUR_YEAR = new Date().getFullYear();

  try {
      let transactions = await Trasactions.findAll({
          attributes: ['orderStatus', 
            [sequelize.fn('COUNT', sequelize.col('orderStatus')), 'statusCount'],
            [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount'],
            [sequelize.fn('DAY', Sequelize.col('createdAt')), 'day']
          ],
          where: {
              [Op.and]: [
                  Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), req.params.month),
                  Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), CUR_YEAR),
              ],
          },
          group: ['createdAt', 'orderStatus'],
          order: ['createdAt'],
        });
      return res.status(200).json({status: 200, data: transactions});
     } catch(e) {
      return res.send(e);
     }
}

async function getTransactionsByYear(req, res) {
    const Op = Sequelize.Op;
    const CUR_YEAR = new Date().getFullYear();

    try {
        let transactions = await Trasactions.findAll({
            attributes: ['orderStatus', 
              [sequelize.fn('COUNT', sequelize.col('orderStatus')), 'statusCount'],
              [sequelize.fn('SUM', sequelize.col('orderAmount')), 'orderAmount'],
              [ sequelize.fn('MONTH', Sequelize.col('createdAt')), 'Month']
            ],
            where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), req.params.year),
            group: ['orderStatus'],
            order: ['createdAt'],
          });
        return res.status(200).json({status: 200, data: transactions});
       } catch(e) {
        return res.send(e);
       }
}


export default {
    addTransaction,
    getAllTransactions,
    getTodayTransactions,
    getTransactionsByDate,
    getTransactionsByMonth,
    getTransactionsByWholeMonth,
    getTransactionsByYear,
    getTransactionsByDateRange
}