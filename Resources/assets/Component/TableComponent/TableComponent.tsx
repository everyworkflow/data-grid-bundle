/*
 * @copyright EveryWorkflow. All rights reserved.
 */
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from 'antd/lib/table';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import FilterComponent from '@EveryWorkflow/DataGridBundle/Component/FilterComponent';
import HeaderPanelComponent from '@EveryWorkflow/DataGridBundle/Component/HeaderPanelComponent';
import { DATA_GRID_TYPE_INLINE } from '@EveryWorkflow/DataGridBundle/Component/DataGridComponent/DataGridComponent';
import ColumnConfigComponent from '@EveryWorkflow/DataGridBundle/Component/ColumnConfigComponent';
import { ACTION_SET_SELECTED_ROW_IDS } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import SelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SelectFieldInterface';
import DataGridStateInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridStateInterface';

const TableComponent = () => {
  const { state: gridState, dispatch: gridDispatch } =
    useContext(DataGridContext);
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);
  const history = useHistory();
  const urlParams = new URLSearchParams(history.location.search);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tableData, setTableData] = useState<DataGridStateInterface | any>({});
  const [id, setid] = useState<string>('');

  useEffect(() => {
    setTableData(gridState);
  }, [gridState]);

  const showPopconfirm = (_id: string) => {
    setid(_id);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    //api for delete
    //filter data after response from api
    setTableData({
      ...tableData,
      data_collection: {
        results: tableData.data_collection?.results.filter(
          (item: any) => item._id !== id
        ),
      },
    });
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleAction = ({
    action,
    index,
    record,
  }: {
    action: any;
    index: number;
    record: any;
  }) => {
    switch (action.label.toLowerCase()) {
      case 'edit':
        return (
          <Link
            to={() => {
              if (action.path) {
                let path: string = action.path;
                Object.keys(record).forEach((itemKey: string) => {
                  path = path.replace('{' + itemKey + '}', record[itemKey]);
                });
                return path;
              }
              return '';
            }}
          >
            {action.label}
          </Link>
        );
      case 'delete':
        return (
          <div onClick={() => showPopconfirm(record._id)}>{action.label}</div>
        );
      default:
        break;
    }
  };

  const getColumnData = useCallback(() => {
    const columnData: Array<any> = [];
    const sortField = urlParams.get('sort-field');
    let sortOrder = 'ascend';
    if (urlParams.get('sort-order') && urlParams.get('sort-order') === 'desc') {
      sortOrder = 'descend';
    }

    tableData.data_grid_column_state.forEach((col: any) => {
      const field = tableData.data_form?.fields.find(
        (item: any) => item.name === col.name
      );

      if (field) {
        columnData.push({
          title: field.label,
          dataIndex: field.name,
          sorter: tableData.data_grid_config?.sortable_columns?.includes(
            field.name ?? ''
          ),
          // eslint-disable-next-line react/display-name
          render: (value: any) => <span>{value}</span>,
          sortOrder: field.name === sortField ? sortOrder : false,
          width: 240,
        });
      }
    });
    if (columnData.length) {
      columnData.push({
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 84,
        // eslint-disable-next-line react/display-name
        render: (_: any, record: any) => {
          console.log('id -> ', id === record._id);

          return (
            <>
              {id === record._id && (
                <Popconfirm
                  title={'Are you sure you want delete this ?'}
                  okText="Delete"
                  visible={visible}
                  onConfirm={handleOk}
                  okButtonProps={{ loading: confirmLoading }}
                  onCancel={handleCancel}
                />
              )}
              <Dropdown
                overlay={
                  <Menu>
                    {tableData.data_grid_config?.row_actions?.map(
                      (action: any, index: number) => (
                        <Menu.Item key={index}>
                          {handleAction({ action, index, record })}
                        </Menu.Item>
                      )
                    )}
                  </Menu>
                }
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" size="small">
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </>
          );
        },
      });
    }
    return columnData;
  }, [tableData, visible, confirmLoading, id]);

  const getDataSource = useCallback(() => {
    const data: Array<any> = [];

    const getSelectOptionValue = (
      field: SelectFieldInterface,
      fieldValue: string
    ): string => {
      field.options?.forEach((option) => {
        if (option.key?.toString() === fieldValue.toString()) {
          fieldValue = option.value?.toString();
        }
      });
      return fieldValue;
    };

    tableData.data_collection?.results.forEach((item: any) => {
      const newItem: any = {
        key: item._id,
      };
      tableData.data_grid_column_state.forEach((col: any) => {
        if (col.name in item) {
          const fieldValue: any = item[col.name];
          const field = tableData.data_form?.fields.find((field: any) => {
            return field.name === col.name;
          });
          if (field && 'select_field' === field.field_type) {
            newItem[col.name] = getSelectOptionValue(field, fieldValue);
          } else {
            newItem[col.name] = fieldValue;
          }
        }
      });
      data.push(newItem);
    });

    return data;
  }, [tableData, confirmLoading]);

  const getRowSelection = useCallback(() => {
    const onSelectChange = (selectedRowKeys: Array<any>) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
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
    if (tableData.data_grid_url) {
      let newUrlPath = history.location.pathname;
      newUrlPath += '?page=' + pagination.current;
      if (
        pagination.pageSize &&
        pagination.pageSize > 0 &&
        pagination.pageSize !== 20
      ) {
        newUrlPath += '&per-page=' + pagination.pageSize;
      }
      if (urlParams.get('filter')) {
        try {
          newUrlPath +=
            '&filter=' +
            JSON.stringify(JSON.parse(urlParams.get('filter') ?? '{}'));
        } catch (e) {
          // ignore urlPramData is cannot parse as json
        }
      }
      if (sorter.field && sorter.order) {
        let sortOrder = 'asc';
        if (sorter.order === 'descend') {
          sortOrder = 'desc';
        }
        newUrlPath +=
          '&sort-field=' + sorter.field + '&sort-order=' + sortOrder;
      }
      history.push(newUrlPath);
    }
  };

  return (
    <>
      {tableData.data_grid_type === DATA_GRID_TYPE_INLINE && (
        <HeaderPanelComponent />
      )}
      {tableData.data_collection && (
        <>
          <FilterComponent />
          <Table
            className="virtual-grid"
            rowSelection={getRowSelection()}
            dataSource={getDataSource()}
            columns={getColumnData()}
            scroll={{ x: 1500 }}
            pagination={{
              position: ['topRight', 'bottomRight'],
              defaultPageSize: Number(urlParams.get('per-page'))
                ? Number(urlParams.get('per-page'))
                : 20,
              pageSizeOptions: ['20', '50', '100', '200'],
              showQuickJumper: true,
              hideOnSinglePage: true,
              showTotal: (total, range) => {
                return `Showing ${range[0]}-${range[1]} of ${total} items`;
              },
              current: tableData.data_collection.meta?.current_page,
              total: tableData.data_collection.meta?.total_count,
            }}
            onChange={onTableChange}
            // size={'small'}
          />
          <ColumnConfigComponent />
        </>
      )}
    </>
  );
};

export default TableComponent;
