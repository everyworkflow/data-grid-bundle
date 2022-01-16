/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { ACTION_SET_GRID_DATA } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import FetchRemoteData from '@EveryWorkflow/DataGridBundle/Action/FetchRemoteData';
import DataGridInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridInterface';
import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';
import DataGridColumnInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridColumnInterface';
import AlertAction, { ALERT_TYPE_ERROR } from '@EveryWorkflow/PanelBundle/Action/AlertAction';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import BaseSectionInterface from '@EveryWorkflow/DataFormBundle/Model/Section/BaseSectionInterface';

const InitDataGridAction = (dataGridUrl: string) => {

    const initDataGrid = (dispatch: any, data: DataGridInterface) => {
        if (dataGridUrl) {
            // fetch from localstorage
        }

        const getColumnState = (dataFormOrSection: DataFormInterface | BaseSectionInterface): Array<DataGridColumnInterface> => {
            let columnState: Array<DataGridColumnInterface> = [];
            dataFormOrSection.fields?.forEach((field: BaseFieldInterface) => {
                if (field.name) {
                    columnState.push({
                        name: field.name,
                        sort_order: field.sort_order,
                        is_active: data.data_grid_config?.active_columns?.includes(field.name),
                        is_sortable: data.data_grid_config?.sortable_columns?.includes(field.name),
                        is_filterable: data.data_grid_config?.filterable_columns?.includes(field.name),
                    });
                }
            });
            if (dataFormOrSection.sections) {
                dataFormOrSection.sections.forEach((section: BaseSectionInterface) => {
                    columnState = [...columnState, ...getColumnState(section)];
                });
            }
            return columnState;
        }

        if (data.data_form) {
            const currentColumnState = getColumnState(data.data_form);
            dispatch({
                type: ACTION_SET_GRID_DATA,
                payload: { ...data, data_grid_column_state: currentColumnState },
            });
        }
    }

    return async (dispatch: any) => {
        if (!dataGridUrl) {
            return false;
        }

        FetchRemoteData(dataGridUrl).then((data: DataGridInterface) => {
            initDataGrid(dispatch, data);
        }).catch((error: any) => {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        });
    };
};

export default InitDataGridAction;
