/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import ButtonBulkActionInterface from '@EveryWorkflow/DataGridBundle/Model/BulkAction/ButtonBulkActionInterface';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import Remote from '@EveryWorkflow/PanelBundle/Service/Remote';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@EveryWorkflow/PanelBundle/Action/AlertAction';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import InitDataGridAction from '@EveryWorkflow/DataGridBundle/Action/InitDataGridAction';

interface ButtonBulkActionProps {
    actionData: ButtonBulkActionInterface;
}

const ButtonBulkAction = ({ actionData }: ButtonBulkActionProps) => {
    const { state: gridState, dispatch: gridDispatch } = useContext(DataGridContext);
    const navigate = useNavigate();

    const reloadDataGrid = () => {
        if (!gridState.data_grid_url) {
            return;
        }

        try {
            InitDataGridAction(gridState.data_grid_url)(gridDispatch);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        }
    }

    const handleAction = async () => {
        if (actionData.onClick) {
            actionData.onClick();
        }

        if (!actionData.button_path) {
            return;
        }

        if (actionData.path_type === 'post_call') {
            try {
                const response = await Remote.post(actionData.button_path, {
                    rows: gridState.selected_row_ids
                });
                reloadDataGrid();
                AlertAction({
                    message: response.title,
                    description: response.detail,
                    type: ALERT_TYPE_SUCCESS,
                });
            } catch (error: any) {
                AlertAction({
                    message: error.message,
                    type: ALERT_TYPE_ERROR,
                });
            }
        } else {
            const params = {
                rows: JSON.stringify(gridState.selected_row_ids),
            }
            console.log('params -->', params);
            const path = generatePath(":url?:queryString", {
                url: actionData.button_path,
                queryString: createSearchParams(params).toString()
            });
            navigate(path);
        }
    }

    const renderMenuContent = useCallback(() => {
        if (gridState.data_grid_config?.header_action_type === 'dropdown') {
            return (
                <span className="ant-dropdown-menu-title-content">{actionData.button_label}</span>
            );
        }

        return (
            <Button
                onClick={actionData.is_confirm ? undefined : handleAction}
                type={actionData.button_type ?? 'link'}
                danger={actionData.is_danger}>{actionData.button_label}</Button>
        );
    }, [gridState.data_grid_config?.header_action_type]);

    const renderConfirmedMenuContent = () => {
        if (actionData.is_confirm) {
            return (
                <Popconfirm
                    placement="bottomLeft"
                    title={actionData.confirm_message ?? "Are you sure？"}
                    onConfirm={handleAction}
                    okText="Yes"
                    cancelText="No">
                    {renderMenuContent()}
                </Popconfirm>
            );
        }

        return renderMenuContent();
    };

    return (
        <>
            {gridState.data_grid_config?.header_action_type === 'dropdown' ? (
                <li className="ant-dropdown-menu-item"
                    onClick={actionData.is_confirm ? undefined : handleAction}>{renderConfirmedMenuContent()}</li>
            ) : renderConfirmedMenuContent()}
        </>
    );
};

export default ButtonBulkAction;
