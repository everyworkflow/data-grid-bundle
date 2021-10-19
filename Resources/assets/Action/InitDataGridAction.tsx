/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { ACTION_SET_GRID_DATA } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import FetchRemoteData from '@EveryWorkflow/DataGridBundle/Action/FetchRemoteData';
import DataGridInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridInterface';
import AbstractFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface';
import DataGridColumnInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridColumnInterface';

const InitDataGridAction = (dataGridUrl: string) => {
    return async (dispatch: any) => {
        if (!dataGridUrl) {
            return false;
        }

        const data: DataGridInterface = await FetchRemoteData(dataGridUrl);

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
    };
};

export default InitDataGridAction;
