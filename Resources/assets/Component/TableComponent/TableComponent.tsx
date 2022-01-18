/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'antd/lib/table';
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import FilterComponent from '@EveryWorkflow/DataGridBundle/Component/FilterComponent';
import HeaderPanelComponent from '@EveryWorkflow/DataGridBundle/Component/HeaderPanelComponent';
import { DATA_GRID_TYPE_INLINE } from '@EveryWorkflow/DataGridBundle/Component/DataGridComponent/DataGridComponent';
import ColumnConfigComponent from '@EveryWorkflow/DataGridBundle/Component/ColumnConfigComponent';
import { ACTION_SET_SELECTED_ROW_IDS } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import BaseSectionInterface from '@EveryWorkflow/DataFormBundle/Model/Section/BaseSectionInterface';
import RowActionRenderComponent from '@EveryWorkflow/DataGridBundle/Component/RowActionRenderComponent';
import ColumnRenderComponent from '@EveryWorkflow/DataGridBundle/Component/ColumnRenderComponent';

const TableComponent = () => {
    const { state: gridState, dispatch: gridDispatch } = useContext(DataGridContext);
    const [selectedRows, setSelectedRows] = useState<Array<any>>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);

    const getSortedData = (items: Array<any>): Array<any> => {
        return items?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const getColumnData = useCallback(() => {
        const columnData: Array<any> = [];
        const sortField = urlParams.get('sort-field') ?? gridState.data_grid_config?.default_sort_field;
        let sortOrder = 'ascend';
        if (urlParams.get('sort-order') && urlParams.get('sort-order') === 'desc') {
            sortOrder = 'descend';
        }
        if (urlParams.get('sort-order') === null && gridState.data_grid_config?.default_sort_order) {
            switch (gridState.data_grid_config?.default_sort_order) {
                case 'desc':
                    sortOrder = 'descend';
                    break;
                case 'asc': {
                    sortOrder = 'ascend';
                    break;
                }
            }
        }

        getSortedData([...gridState.data_grid_column_state]).forEach((col) => {
            if (!col.is_active || !gridState.data_form) {
                return;
            }

            const getFieldFromName = (dataFormOrSection: DataFormInterface | BaseSectionInterface, name: string) => {
                const field = dataFormOrSection.fields?.find(
                    (item) => item.name === col.name
                );
                if (field) {
                    return field;
                }
                if (dataFormOrSection.sections) {
                    let secfield: any = undefined;
                    dataFormOrSection.sections.forEach(section => {
                        let field: any = getFieldFromName(section, name);
                        if (field) {
                            secfield = field;
                        }
                    });
                    if (secfield) {
                        return secfield;
                    }
                }
                return undefined;
            }

            const field = getFieldFromName(gridState.data_form, col.name);
            if (field) {
                columnData.push({
                    title: field.label,
                    dataIndex: field.name,
                    sorter: gridState.data_grid_config?.sortable_columns?.includes(field.name ?? ''),
                    render: (value: any) => <ColumnRenderComponent fieldData={field} fieldValue={value} />,
                    sortOrder: field.name === sortField ? sortOrder : undefined,
                });
            }
        });

        if (columnData.length && gridState.data_grid_config?.row_actions?.length) {
            columnData.push({
                title: 'Action',
                key: 'operation',
                render: (_: any, record: any) => {
                    return <RowActionRenderComponent rowData={record} />;
                },
            });
        }
        return columnData;
    }, [gridState]);

    const getDataSource = useCallback(() => {
        const data: Array<any> = [];
        gridState.data_collection?.results.forEach((item) => {
            const newItem: any = {
                key: item._id,
            };
            gridState.data_grid_column_state.forEach((col) => {
                if (col.name in item) {
                    newItem[col.name] = item[col.name];
                }
            });
            data.push(newItem);
        });
        return data;
    }, [gridState]);

    const getRowSelection = useCallback(() => {
        const onSelectChange = (selectedRowKeys: Array<any>) => {
            setSelectedRows(selectedRowKeys);
            gridDispatch({
                type: ACTION_SET_SELECTED_ROW_IDS,
                payload: selectedRowKeys,
            });
        };

        return {
            selectedRows,
            onChange: onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
            ],
        };
    }, [selectedRows, gridDispatch]);

    const onTableChange = (pagination: any, filters: any, sorter: any) => {
        if (gridState.data_grid_url) {
            let newUrlPath = location.pathname;
            newUrlPath += '?page=' + pagination.current;
            if (pagination.pageSize && pagination.pageSize > 0 && pagination.pageSize !== 20) {
                newUrlPath += '&per-page=' + pagination.pageSize;
            }
            if (urlParams.get('filter')) {
                try {
                    newUrlPath += '&filter=' + JSON.stringify(JSON.parse(urlParams.get('filter') ?? '{}'));
                } catch (e) {
                    // ignore urlPramData is cannot parse as json
                }
            }
            if (sorter.field && sorter.order) {
                let sortOrder = 'asc';
                if (sorter.order === 'descend') {
                    sortOrder = 'desc';
                }
                newUrlPath += '&sort-field=' + sorter.field + '&sort-order=' + sortOrder;
            }
            navigate(newUrlPath);
        }
    }

    return (
        <>
            {gridState.data_grid_type === DATA_GRID_TYPE_INLINE && (
                <HeaderPanelComponent />
            )}
            {gridState.data_collection && (
                <>
                    <FilterComponent />
                    <Table
                        className="virtual-grid"
                        rowSelection={gridState.data_grid_config?.bulk_actions?.length ? getRowSelection() : undefined}
                        dataSource={getDataSource()}
                        columns={getColumnData()}
                        scroll={{ x: gridState.data_grid_column_state.filter(item => !!item.is_active).length * 160 }}
                        pagination={{
                            position: ["topRight", "bottomRight"],
                            defaultPageSize: Number(urlParams.get('per-page')) ? Number(urlParams.get('per-page')) : 20,
                            pageSizeOptions: ['20', '50', '100', '200'],
                            showQuickJumper: true,
                            showTotal: (total, range) => {
                                return `Showing ${range[0]}-${range[1]} of ${total} items`;
                            },
                            current: gridState.data_collection.meta?.current_page,
                            total: gridState.data_collection.meta?.total_count,
                        }}
                        onChange={onTableChange}
                    />
                    <ColumnConfigComponent />
                </>
            )}
        </>
    );
};

export default TableComponent;
