import jwt from 'jsonwebtoken';
import {findByPhoneNumber} from '../services/s_merchant';

export const login = async (req, res) => {

    try {
      // Get user input
      const phoneNumber = req.params.phoneNumber;
  
      // Validate user input
      if (!phoneNumber) {
        res.status(400).send("phone number required for authentication");
      }
      // Validate if user exist in our database
      const user = await findByPhoneNumber(`+91 ${phoneNumber}`);
      console.log("phone number", user);
  
      if (user) {
        // Create token
        const token = jwt.sign(
          { id: user.id, phoneNumber },
          "require_payziff_secretkey",
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
};

export default {
}