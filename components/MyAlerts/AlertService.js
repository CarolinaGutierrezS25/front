import {getRequest} from '../../helpers/axiosRequest';
import {MainHttp} from '@env';

async function getAlerts() {

    try {
        const {data} = await getRequest(`${MainHttp}incident/list`,{withCredentials: true});
        return data?.data || [];
    } catch (error) {
        throw error;
    }
}

export {getAlerts};