import {getRequest} from '../../helpers/axiosRequest';
import {MainHttp} from '@env';

async function getAlerts() {

    try {
        const {data} = await getRequest(`${MainHttp}incident/list`,{withCredentials: true});
        return data?.data || [];
    } catch (error) {
        console.log(error.toJSON().status)
        throw error;
    }
}

export {getAlerts};