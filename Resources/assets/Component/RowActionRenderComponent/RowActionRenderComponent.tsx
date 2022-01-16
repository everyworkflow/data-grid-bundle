/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import { DataGridRowActionMaps } from '@EveryWorkflow/DataGridBundle/Root/DataGridRowActionMaps';
import Space from 'antd/lib/space';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';

interface RowActionRenderComponentProps {
    rowData?: any;
}

const RowActionRenderComponent = ({ rowData }: RowActionRenderComponentProps) => {
    const { state: gridState } = useContext(DataGridContext);

    const getSortedData = (items: Array<any>): Array<any> => {
        return items?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderItemContent = (item: any, index: number) => {
        if (item.name && !!gridState.grid_row_action_maps[item.name]) {
            const DynamicComponent = gridState.grid_row_action_maps[item.name];
            return <DynamicComponent
                key={index}
                indexKey={index}
                actionData={item}
                rowData={rowData} />;
        }
        if (item.action_type && !!DataGridRowActionMaps[item.action_type]) {
            const DynamicComponent = DataGridRowActionMaps[item.action_type];
            return <DynamicComponent
                key={index}
                indexKey={index}
                actionData={item}
                rowData={rowData} />;
        }
        const DynamicComponent = () => (
            <p style={{ padding: 16 }}>
                Action not found &quot;{item.action_type}&quot;
            </p>
        );
        return <DynamicComponent key={index} />;
    }

    if (gridState.data_grid_config?.row_actions?.length && gridState.popup_form_data === undefined) {
        if (gridState.data_grid_config?.row_action_type === 'dropdown') {
            return (
                <Dropdown
                    overlay={
                        <Menu>
                            {getSortedData(gridState.data_grid_config?.row_actions ?? []).map(renderItemContent)}
                        </Menu>
                    }
                    trigger={['click']}
                    placement="bottomRight">
                    <Button type="text" size="small">
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>
            )
        }

        return (
            <Space>
                {getSortedData(gridState.data_grid_config?.row_actions ?? []).map(renderItemContent)}
            </Space>
        )
    }

    return null;
}

export default RowActionRenderComponent;
