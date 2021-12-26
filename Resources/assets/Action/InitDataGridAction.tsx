/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { ACTION_SET_GRID_DATA } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import FetchRemoteData from '@EveryWorkflow/DataGridBundle/Action/FetchRemoteData';
import DataGridInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridInterface';
import AbstractFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface';
import DataGridColumnInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridColumnInterface';
import AlertAction, { ALERT_TYPE_ERROR } from '@EveryWorkflow/PanelBundle/Action/AlertAction';

const InitDataGridAction = (dataGridUrl: string) => {

    const initDataGrid = (dispatch: any, data: DataGridInterface) => {
        const columnState: Array<DataGridColumnInterface> = [];
        if (dataGridUrl) {
            // fetch from localstorage
        }
        data.data_form?.fields.forEach((field: AbstractFieldInterface) => {
            if (field.name && (data.data_grid_config?.active_columns?.includes(field.name) || data.data_grid_config?.active_columns === undefined)) {
                columnState.push({
                    name: field.name,
                    sort_order: field.sort_order,
                    is_active: true,
                    is_sortable: true,
                    is_filterable: true,
                });
            }
        });

        columnState.sort((a: any, b: any) => a.sort_order > b.sort_order ? 1 : -1);

        dispatch({
            type: ACTION_SET_GRID_DATA,
            payload: { ...data, data_grid_column_state: columnState },
        });
    }

    return async (dispatch: any) => {
        if (!dataGridUrl) {
            return false;
        }

        FetchRemoteData(dataGridUrl).then((data: DataGridInterface) => {
            initDataGrid(dispatch, data);
        }).catch((error: any) => {
            console.log('error -->', error.message);
            AlertAction({
                message: error.message,
                title: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        });
    };
};

export default InitDataGridAction;
