/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useEffect, useReducer, useContext} from 'react';
import PushAlertAction from '@EveryWorkflow/AdminPanelBundle/Admin/Action/PushAlertAction';
import {dataGridState} from "@EveryWorkflow/DataGridBundle/State/DataGridState";
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import DataGridReducer from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import PanelContext from '@EveryWorkflow/AdminPanelBundle/Admin/Context/PanelContext';
import TableComponent from '@EveryWorkflow/DataGridBundle/Component/TableComponent';
import InitDataGridAction from '@EveryWorkflow/DataGridBundle/Action/InitDataGridAction';
import PageWrapperComponent from "@EveryWorkflow/DataGridBundle/Component/PageWrapperComponent";
import {ALERT_TYPE_ERROR} from "@EveryWorkflow/CoreBundle/Action/AlertAction";

export const DATA_GRID_TYPE_INLINE = 'type_inline'; // default
export const DATA_GRID_TYPE_PAGE = 'type_page';

interface DataGridComponentProps {
    dataGridUrl?: string;
    dataGridType?: string;
    children?: JSX.Element;
}

const DataGridComponent = ({
    dataGridUrl,
    dataGridType = DATA_GRID_TYPE_INLINE,
    children,
}: DataGridComponentProps) => {
    const {dispatch: panelDispatch} = useContext(PanelContext);
    const [state, dispatch] = useReducer(DataGridReducer, dataGridState);

    useEffect(() => {
        if (dataGridUrl) {
            try {
                InitDataGridAction(dataGridUrl)(dispatch);
            } catch (error: any) {
                PushAlertAction({
                    message: error.message,
                    title: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                })(panelDispatch);
            }
        }
    }, [dataGridUrl, dispatch, panelDispatch]);

    return (
        <>
            <DataGridContext.Provider
                value={{
                    state: {
                        ...state,
                        data_grid_type: dataGridType,
                        data_grid_url: dataGridUrl,
                    },
                    dispatch: dispatch,
                }}
            >
                <>
                    {dataGridType === DATA_GRID_TYPE_INLINE && <TableComponent/>}
                    {dataGridType === DATA_GRID_TYPE_PAGE && (
                        <PageWrapperComponent>
                            <TableComponent/>
                        </PageWrapperComponent>
                    )}
                    {children}
                </>
            </DataGridContext.Provider>
        </>
    );
};

export default DataGridComponent;
