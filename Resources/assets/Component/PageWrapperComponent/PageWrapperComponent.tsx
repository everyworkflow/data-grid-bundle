/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Col from 'antd/lib/col';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import ControlOutlined from '@ant-design/icons/ControlOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import BreadcrumbComponent from '@EveryWorkflow/AdminPanelBundle/Component/BreadcrumbComponent';
import PageHeaderComponent from '@EveryWorkflow/AdminPanelBundle/Component/PageHeaderComponent';
import DataGridContext, {
    PANEL_ACTIVE_COLUMN_SETTINGS,
    PANEL_ACTIVE_FILTERS,
} from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import { ACTION_SET_ACTIVE_PANEL } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import Badge from "antd/lib/badge";
import HeaderActionRenderComponent from '@EveryWorkflow/DataGridBundle/Component/HeaderActionRenderComponent';
import BulkActionRenderComponent from '@EveryWorkflow/DataGridBundle/Component/BulkActionRenderComponent';

interface PageWrapperComponentProps {
    children?: JSX.Element;
}

const PageWrapperComponent = ({ children }: PageWrapperComponentProps) => {
    const location = useLocation();
    const { state: gridState, dispatch: gridDispatch } = useContext(
        DataGridContext
    );

    const getFilterCount = useCallback((): number => {
        const urlParams = new URLSearchParams(location.search);
        let urlParamData: any | undefined = undefined;
        if (urlParams.get('filter') !== null && urlParams.get('filter') !== '') {
            try {
                urlParamData = JSON.parse(urlParams.get('filter') as string);
            } catch (e) {
                // ignore urlPramData is cannot parse as json
            }
        }
        if (typeof urlParamData === 'object') {
            return Object.keys(urlParamData).length;
        }
        return 0;
    }, [location])

    return (
        <>
            <PageHeaderComponent>
                <>
                    <Col span={12}>
                        <Space>
                            {gridState.selected_row_ids.length > 0 && (
                                <>
                                    <div>
                                        <strong style={{ marginRight: 8 }}>
                                            {gridState.selected_row_ids.length}{' '}
                                        </strong>
                                        <span style={{ marginRight: 8 }}>
                                            {gridState.selected_row_ids.length > 1
                                                ? 'rows'
                                                : 'row'}{' '}
                                            selected
                                        </span>
                                    </div>
                                    <BulkActionRenderComponent />
                                </>
                            )}
                        </Space>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Space>
                            {gridState.data_grid_config?.is_filter_enabled && (
                                <Tooltip title="Filter" placement="bottom">
                                    <Badge count={getFilterCount()}>
                                        <Button
                                            type="dashed"
                                            shape="circle"
                                            icon={<FilterOutlined />}
                                            onClick={() => {
                                                if (gridState.active_panel === PANEL_ACTIVE_FILTERS) {
                                                    gridDispatch({
                                                        type: ACTION_SET_ACTIVE_PANEL,
                                                        payload: undefined,
                                                    });
                                                } else {
                                                    gridDispatch({
                                                        type: ACTION_SET_ACTIVE_PANEL,
                                                        payload: PANEL_ACTIVE_FILTERS,
                                                    });
                                                }
                                                window.scrollTo(0, 0);
                                            }}
                                        />
                                    </Badge>
                                </Tooltip>
                            )}
                            {gridState.data_grid_config?.is_column_setting_enabled && (
                                <Tooltip title="Column settings" placement="bottom">
                                    <Button
                                        type="dashed"
                                        shape="circle"
                                        icon={<ControlOutlined />}
                                        onClick={() => {
                                            if (gridState.active_panel === PANEL_ACTIVE_COLUMN_SETTINGS) {
                                                gridDispatch({
                                                    type: ACTION_SET_ACTIVE_PANEL,
                                                    payload: undefined,
                                                });
                                            } else {
                                                gridDispatch({
                                                    type: ACTION_SET_ACTIVE_PANEL,
                                                    payload: PANEL_ACTIVE_COLUMN_SETTINGS,
                                                });
                                            }
                                        }}
                                    />
                                </Tooltip>
                            )}
                            <HeaderActionRenderComponent />
                        </Space>
                    </Col>
                </>
            </PageHeaderComponent>
            <BreadcrumbComponent />
            <div className="app-container mt-4">{children}</div>
        </>
    );
};

export default PageWrapperComponent;
