/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import DataGridStateInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridStateInterface';
import {dataGridState} from "@EveryWorkflow/DataGridBundle/State/DataGridState";

export const PANEL_ACTIVE_FILTERS = 'panel_filters';
export const PANEL_ACTIVE_COLUMN_SETTINGS = 'column_settings';

export interface DataGridContextInterface {
    state: DataGridStateInterface;
    dispatch: any;
}

const DataGridContext = createContext<DataGridContextInterface>({
    state: dataGridState,
    dispatch: () => null,
});

export default DataGridContext;
