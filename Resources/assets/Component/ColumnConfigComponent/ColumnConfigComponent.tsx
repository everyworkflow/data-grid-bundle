/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import SidePanelComponent from '@EveryWorkflow/CoreBundle/Component/SidePanelComponent';
import { PANEL_SIZE_SMALL } from '@EveryWorkflow/CoreBundle/Component/SidePanelComponent/SidePanelComponent';
import DataForm from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent';
import { FORM_TYPE_HORIZONTAL } from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';
import AbstractFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface';
import CheckFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/CheckFieldInterface';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import DataGridContext, { PANEL_ACTIVE_COLUMN_SETTINGS } from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import {
    ACTION_SET_ACTIVE_COLUMNS,
    ACTION_SET_ACTIVE_PANEL
} from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';

const ColumnConfigComponent = () => {
    const { state: gridState, dispatch: gridDispatch } = useContext(
        DataGridContext
    );
    const [form] = Form.useForm();

    const onPanelClose = useCallback(() => {
        gridDispatch({ type: ACTION_SET_ACTIVE_PANEL, payload: undefined });
    }, [gridDispatch]);

    const getColumnFormData = () => {
        const data: DataFormInterface = {
            fields: []
        };
        if (gridState.data_form?.fields) {
            const activeColumns: Array<string> = [];
            gridState.data_grid_column_state.forEach((item) => {
                if (item.is_active) {
                    activeColumns.push(item.name);
                }
            });
            gridState.data_form.fields.sort((a, b) => ((a.sort_order ?? 0) > (b.sort_order ?? 0)) ? 1 : -1)
                .map((item: AbstractFieldInterface) => {
                    const checkField: CheckFieldInterface = {
                        _id: item.name,
                        name: item.name,
                        field_type: 'switch_field',
                        label: item.label,
                        sort_order: item.sort_order,
                    };
                    if (item.name && activeColumns.includes(item.name)) {
                        checkField['value'] = true;
                    }
                    data.fields.push(checkField);
                    return null;
                });
        }

        return data;
    };

    const onColumnFormSubmit = (data: any) => {
        console.log('onColumnFormSubmit -> activeColumns --> data', data);
        const activeColumns: Array<string> = [];
        Object.keys(data).forEach((name) => {
            activeColumns.push(name);
        });
        gridDispatch({
            type: ACTION_SET_ACTIVE_COLUMNS,
            payload: activeColumns,
        });
        // listBuilderDispatch({ type: ACTION_SET_ACTIVE_PANEL, payload: undefined });
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
                footerStyle={{ textAlign: 'center' }}
                footer={(
                    <Button type="primary" onClick={() => {
                        form?.submit();
                    }}>Save</Button>
                )}
            >
                <DataForm
                    form={form}
                    formData={getColumnFormData()}
                    formType={FORM_TYPE_HORIZONTAL}
                    onSubmit={onColumnFormSubmit}
                    labelCol={{ span: 18 }}
                    wrapperCol={{ span: 6 }}
                />
            </SidePanelComponent>
        </>
    );
};

export default ColumnConfigComponent;
