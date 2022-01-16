/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import SidePanelComponent from '@EveryWorkflow/PanelBundle/Component/SidePanelComponent';
import { PANEL_SIZE_SMALL } from '@EveryWorkflow/PanelBundle/Component/SidePanelComponent/SidePanelComponent';
import DataForm from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent';
import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';
import CheckFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/CheckFieldInterface';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import DataGridContext, { PANEL_ACTIVE_COLUMN_SETTINGS } from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import { ACTION_SET_COLUMN_STATE, ACTION_SET_ACTIVE_PANEL } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import { FORM_TYPE_HORIZONTAL } from "@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent";

const ColumnConfigComponent = () => {
    const { state: gridState, dispatch: gridDispatch } = useContext(
        DataGridContext
    );
    const [form] = Form.useForm();

    const onPanelClose = useCallback(() => {
        gridDispatch({ type: ACTION_SET_ACTIVE_PANEL, payload: undefined });
    }, [gridDispatch]);

    const getFormInitialValues = useCallback(() => {
        const initialValues: any = {};
        gridState.data_grid_column_state.forEach((item) => {
            if (item.is_active) {
                initialValues[item.name] = true;
            }
        });

        return initialValues;
    }, [gridState.data_grid_column_state]);

    const getSortedData = (items: Array<any>): Array<any> => {
        return items?.sort((a: any, b: any) => {
            if (a.sort_order === undefined && b.sort_order !== undefined) return 1;
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const getColumnFormData = () => {
        const getAllFields = (form: any): Array<any> => {
            let fields: Array<any> = [];
            if (form.fields) {
                fields = form.fields;
            }
            if (form.sections) {
                form.sections.forEach((section: any) => {
                    fields = [...fields, ...getAllFields(section)];
                });
            }
            return fields;
        }
        const data: DataFormInterface = {
            fields: []
        };
        if (gridState.data_form) {
            getSortedData(getAllFields(gridState.data_form)).forEach((item: BaseFieldInterface) => {
                const checkField: CheckFieldInterface = {
                    _id: item.name,
                    name: item.name,
                    field_type: 'switch_field',
                    label: item.label,
                    sort_order: item.sort_order,
                };
                data.fields?.push(checkField);
            });
        }

        return data;
    };

    const onColumnFormSubmit = (data: any) => {
        const newColState: Array<string> = [];
        const columnState: Array<any> = gridState.data_grid_column_state ?? [];
        columnState.forEach((column) => {
            let newCol: any = { ...column };
            if (data[column.name] !== undefined) {
                newCol.is_active = data[column.name];
            }
            newColState.push(newCol);
        });
        gridDispatch({
            type: ACTION_SET_COLUMN_STATE,
            payload: newColState,
        });
        gridDispatch({ type: ACTION_SET_ACTIVE_PANEL, payload: undefined });
    };

    if (gridState.active_panel !== PANEL_ACTIVE_COLUMN_SETTINGS) {
        return null;
    }

    return (
        <>
            <SidePanelComponent
                title={'Settings'}
                size={PANEL_SIZE_SMALL}
                onClose={onPanelClose}
                bodyStyle={{ paddingRight: 14 }}
                footerStyle={{ textAlign: 'center' }}
                footer={(
                    <Button type="primary" onClick={() => {
                        form?.submit();
                    }}>Save</Button>
                )}>
                <DataForm
                    form={form}
                    initialValues={getFormInitialValues()}
                    formData={getColumnFormData()}
                    formType={FORM_TYPE_HORIZONTAL}
                    onSubmit={onColumnFormSubmit}
                    labelAlign="left"
                    labelCol={{ span: 18 }}
                    wrapperCol={{ span: 6 }}
                />
            </SidePanelComponent>
        </>
    );
};

export default ColumnConfigComponent;
