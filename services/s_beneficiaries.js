import Beneficiary from "../sequelize/models/m_beneficiery";
import { PayOutClientId, PayOutClientSecretId } from "../secrets";


const AUTH_TOKEN_URL = "https://payout-gamma.cashfree.com/payout/v1/authorize";
const ADD_BENEFICIARY_URL = "https://payout-gamma.cashfree.com/payout/v1/addBeneficiary";


export const addBeneficiary = async (beneficiary) => {
    try {
        fetch(AUTH_TOKEN_URL, {
            method: 'POST',
            headers: {
                'x-client-id': PayOutClientId,
                'x-client-secret': PayOutClientSecretId,
            },
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            fetch(ADD_BENEFICIARY_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                },
                body: JSON.stringify(beneficiary)
            }).then(async (res) => {
                const json = await res.json();
                if (json.status === 'SUCCESS') {
                    const user = await Beneficiary.create(beneficiary);
                    console.log(user)
                }
                return res;
            }).catch((err) => {
                return err;
            });
        }).catch((err) => {
            return err;
        });
        return res.status(200).json(user);
    } catch (e) {
        return res.send(e);
    }

}