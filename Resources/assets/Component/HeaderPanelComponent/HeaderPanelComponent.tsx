/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useContext} from 'react';
import DataGridContext, {
    PANEL_ACTIVE_COLUMN_SETTINGS,
    PANEL_ACTIVE_FILTERS,
} from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import {ACTION_SET_ACTIVE_PANEL} from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';

const HeaderPanelComponent = () => {
    const {state: listBuilderState, dispatch: listBuilderDispatch} = useContext(
        DataGridContext
    );

    return (
        <div className="row g-0 mb-3">
            <div className="col flex-grow-1">
                {listBuilderState.selected_row_ids.length > 0 && (
                    <div className="">
                        <span className="me-1">{listBuilderState.selected_row_ids.length}</span>
                        <span>rows selected</span>
                    </div>
                )}
            </div>
            <div className="col-auto">
                {listBuilderState.is_filter_enabled && (
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => {
                            if (listBuilderState.active_panel === PANEL_ACTIVE_FILTERS) {
                                listBuilderDispatch({
                                    type: ACTION_SET_ACTIVE_PANEL,
                                    payload: undefined,
                                });
                            } else {
                                listBuilderDispatch({
                                    type: ACTION_SET_ACTIVE_PANEL,
                                    payload: PANEL_ACTIVE_FILTERS,
                                });
                            }
                        }}>
                        Filter
                    </button>
                )}
                {listBuilderState.is_column_setting_enabled && (
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            if (
                                listBuilderState.active_panel === PANEL_ACTIVE_COLUMN_SETTINGS
                            ) {
                                listBuilderDispatch({
                                    type: ACTION_SET_ACTIVE_PANEL,
                                    payload: undefined,
                                });
                            } else {
                                listBuilderDispatch({
                                    type: ACTION_SET_ACTIVE_PANEL,
                                    payload: PANEL_ACTIVE_COLUMN_SETTINGS,
                                });
                            }
                        }}>
                        Column settings
                    </button>
                )}
            </div>
        </div>
    );
};

export default HeaderPanelComponent;
