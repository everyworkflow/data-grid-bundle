/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataGridStateInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridStateInterface';

export const ACTION_SET_ACTIVE_PANEL = 'set_active_panel';
export const ACTION_SET_SORT_ORDER = 'set_sort_order';
export const ACTION_SET_SELECTED_ROW_IDS = 'set_selected_row_ids';
export const ACTION_SET_ACTIVE_COLUMNS = 'set_active_columns';

export const ACTION_SET_GRID_DATA = 'set_grid_data';

const DataGridReducer = (state: DataGridStateInterface, action: any) => {
    switch (action.type) {
        case ACTION_SET_ACTIVE_PANEL: {
            return {
                ...state,
                active_panel: action.payload,
            };
        }
        case ACTION_SET_SORT_ORDER: {
            // const listOrder: ListOrderInterface = action.payload;
            return {
                ...state,
                // list_order: listOrder,
            };
        }
        case ACTION_SET_SELECTED_ROW_IDS: {
            const selectedRowIds: Array<string> = action.payload;
            return {
                ...state,
                selected_row_ids: selectedRowIds,
            };
        }
        case ACTION_SET_ACTIVE_COLUMNS: {
            const activeColumns: Array<string> = action.payload;
            return {
                ...state,
                active_columns: activeColumns,
            };
        }
        case ACTION_SET_GRID_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default DataGridReducer;
