import { Router } from 'express';
import fetch from 'node-fetch';
import { PaymentGateway } from '@cashfreepayments/cashfree-sdk';

// Instantiate Cashfree Payment Gateway

const pg = new PaymentGateway({

  env: 'TEST',

  apiVersion: '2022-09-01',

  appId: '5728c717e4db998e52b408768275',

  secretKey: 'b48db4700ecb520a5699432f33bd60b198d9a04c',

});


var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generateToken', function(req, res, next) {
  fetch("https://sandbox.cashfree.com/pg/orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'x-client-id': "5728c717e4db998e52b408768275",
      'x-client-secret': "b48db4700ecb520a5699432f33bd60b198d9a04c",
      'x-api-version': '2022-09-01',
      'x-request-id': "developer_name"
    },
    body: JSON.stringify({
      "order_amount": 1.00,
      "order_id": "123jlkjl4568215",
      "order_currency": "INR",
      "customer_details": {
      "customer_id": "321654987",
      "customer_name": "venkat",
      "customer_email": "test@gmail.com",
      "customer_phone": "7013298534"
      },
      "order_meta": {
      "notify_url": "https://test.cashfree.com"
      },
      "order_note": "some order note here",
      })
  }).then(async (res) => {
    return await res.json();
  }).then((json) =>{
    console.log(json);
    res.json({orderId: json["order_id"], orderToken: json["payment_session_id"]});
  });
  // pg.orders

  // .createOrders({

  //   orderId: '1hjkhkh234', // required

  //   orderAmount: '155', // required

  //   orderCurrency: 'INR',

  //   orderNote: 'Subscription',

  //   customerName: 'Test Name', // required

  //   customerPhone: '9111122222', // required

  //   customerEmail: 'johndoe@cashfree.com', // required

  //   sellerPhone: '',

  //   returnUrl: 'https://example.com/return', // required

  //   notifyUrl: 'https://example.com/notify',

  //   paymentModes: '',

  //   pc: '',

  // })

  // .then((data) => console.log(data))
  // .catch((error) => console.error(error));

});


router.get("/getOrders", (res, req) => {
  pg.orders

  .getDetails({

    orderId: '123jlkjl456821', // required

  })

  .then((data) => {
    console.log(data);
    req.json(data);
  })

  .catch((error) => console.error(error));

})

export default router;
