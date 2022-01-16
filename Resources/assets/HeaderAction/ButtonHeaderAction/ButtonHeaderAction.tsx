/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import ButtonHeaderActionInterface from '@EveryWorkflow/DataGridBundle/Model/HeaderAction/ButtonHeaderActionInterface';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import { useNavigate } from 'react-router-dom';

interface ButtonHeaderActionProps {
    actionData: ButtonHeaderActionInterface;
    headerActionType?: string;
}

const ButtonHeaderAction = ({ actionData, headerActionType }: ButtonHeaderActionProps) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (actionData.onClick) {
            actionData.onClick();
        }
        if (!actionData.button_path) {
            return;
        }
        navigate(actionData.button_path);
    };

    const renderMenuContent = useCallback(() => {
        if (headerActionType === 'dropdown') {
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
    }, [headerActionType]);

    const renderConfirmedMenuContent = () => {
        if (actionData.is_confirm) {
            return (
                <Popconfirm
                    placement="bottomRight"
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
            {headerActionType === 'dropdown' ? (
                <li className="ant-dropdown-menu-item"
                    onClick={actionData.is_confirm ? undefined : handleAction}>{renderConfirmedMenuContent()}</li>
            ) : renderConfirmedMenuContent()}
        </>
    );
};

export default ButtonHeaderAction;
