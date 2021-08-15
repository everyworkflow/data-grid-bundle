/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Remote from '@EveryWorkflow/AdminPanelBundle/Admin/Service/Remote';
import DataGridInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridInterface';

const FetchRemoteData = async (
    url: string,
    params?: any
): Promise<DataGridInterface> => {
    const apiSuffixArray: Array<string> = ['for=data-grid'];
    if (params) {
        Object.keys(params).forEach((key) => {
            let suffix = key + '=';
            if (typeof params[key] === 'object' || Array.isArray(params[key])) {
                suffix += JSON.stringify(params[key]);
            } else {
                suffix += params[key];
            }
            apiSuffixArray.push(suffix);
        });
    }
    let apiUrl = url
    if (apiUrl.includes('?')) {
        apiUrl += '&';
    } else {
        apiUrl += '?';
    }
    apiUrl += apiSuffixArray.join('&').toString();
    return await Remote.get(apiUrl);
};

export default FetchRemoteData;
