import http from 'https';
import fetch from 'node-fetch';
// import { Payouts } from '@cashfreepayments/cashfree-sdk';
import { clientId, clientSecretKey } from '../secrets';

http.globalAgent.options.rejectUnauthorized = false;


const getAuthorizedToken = async () => {
  try {
      const obj = await fetch("https://payout-gamma.cashfree.com/payout/v1/authorize", {
        method: "POST",
        headers: {
          'X-Client-Id': clientId,
          'X-Client-Secret': clientSecretKey
        }
      });
    return await obj.json();
  } catch(e) {
    return e;
  }

}

const getBalance = async (req, res) => {
  
  try {
    const obj = await getAuthorizedToken();
    const token = obj.data.token;
    const data = await fetch("https://payout-gamma.cashfree.com/payout/v1/getBalance", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    const balance = await data.json();
    return res.status(200).json({status: 200, data: balance});
  } catch(e) {
    return res.send(e);
  }

}


const requestTransfer = async (req, res) => {
  
  try {
    const obj = await getAuthorizedToken();
    const token = obj.data.token;
    const data = await fetch("https://payout-gamma.cashfree.com/payout/v1.2/requestTransfer", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            beneId: req.body.beneId,
            amount: req.body.amount,
            transferId: req.body.transferId
          })
    });
    const balance = await data.json();
    return res.status(200).json({status: 200, data: balance});
  } catch(e) {
    return res.send(e);
  }

}

// const clientId = "CF5728CF7N8F5ROKEU1D902SDG";
// const clientSecretKey = "3a356fdf2f1ef70b721e27d9454e69f3a28f8395";


// const payouts = new Payouts({
//   env: 'TEST',
//   clientId: clientId,
//   clientSecret: clientSecretKey,
// });



// fetch("https://payout-gamma.cashfree.com/payout/v1/authorize", {
//   method: "POST",
//   headers: {
//     'X-Client-Id': clientId,
//     'X-Client-Secret': clientSecretKey
//   }
// }).then((token) => token.json())
// .then((obj) => {
//   let token = obj.data.token;
//   fetch("https://payout-gamma.cashfree.com/payout/v1/getBalance", {
//     method: "GET",
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   }).then((obj) => obj.json()).then((data) => console.log(data));
// });


export default {
  getBalance,
  requestTransfer
}