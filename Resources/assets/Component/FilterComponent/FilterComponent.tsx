/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useCallback, useContext} from 'react';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import {useHistory} from "react-router-dom";
import {FORM_TYPE_INLINE} from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';
import DataFormComponent from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent';
import DataGridContext, {PANEL_ACTIVE_FILTERS} from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import {ACTION_SET_ACTIVE_PANEL} from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import '@EveryWorkflow/DataGridBundle/Component/FilterComponent/FilterStyle.scss';

const FilterComponent = () => {
    const {state: gridState, dispatch: gridDispatch} = useContext(DataGridContext);
    const [form] = Form.useForm();
    const history = useHistory();

    const getFilterFormData = useCallback(() => {
        const formData: DataFormInterface = {
            fields: []
        };
        const urlParams = new URLSearchParams(history.location.search);
        let urlParamData: any | undefined = undefined;
        if (urlParams.get('filter') !== null && urlParams.get('filter') !== '') {
            try {
                urlParamData = JSON.parse(urlParams.get('filter') as string);
            } catch (e) {
                // ignore urlPramData is cannot parse as json
            }
        }
        gridState.data_form?.fields.forEach((item) => {
            if (item.name && gridState.data_grid_config?.filterable_columns?.includes(item.name)) {
                const newItem: any = item;
                newItem['is_required'] = false;
                newItem['is_disabled'] = false;
                newItem['is_readonly'] = false;
                newItem['allow_clear'] = true;
                if (newItem['field_type'] === 'date_time_picker_field') {
                    newItem['field_type'] = 'date_time_range_picker_field';
                }
                if (newItem['name'] && urlParamData && urlParamData[newItem['name']]) {
                    newItem['value'] = urlParamData[newItem['name']];
                } else {
                    newItem['value'] = '';
                }
                formData.fields.push(newItem);
            }
        });
        return formData;
    }, [gridState.data_form, gridState.data_grid_config, history]);

    const onColumnFormSubmit = (data: any) => {
        const filterData: any = {};
        Object.keys(data).forEach(key => {
            if (data[key]) {
                filterData[key] = data[key];
            }
        });
        let newUrlPath = history.location.pathname;
        if (Object.keys(filterData).length) {
            newUrlPath += '?filter=' + JSON.stringify(filterData);
        }
        history.push(newUrlPath);
    };

    const handleResetFilter = () => {
        form.resetFields();
        const emptyFieldValues: any = {};
        getFilterFormData().fields.forEach(field => {
            if (field.name) {
                emptyFieldValues[field.name] = '';
            }
        })
        form.setFieldsValue(emptyFieldValues);
        history.push(history.location.pathname);
    }

    if (!(gridState.active_panel === PANEL_ACTIVE_FILTERS || history.location.search.includes('filter={'))) {
        return null;
    }

    return (
        <Card
            title={'Filters'}
            style={{
                marginBottom: 24,
            }}
            extra={
                <Space>
                    <Button
                        type="default"
                        onClick={() => {
                            gridDispatch({
                                type: ACTION_SET_ACTIVE_PANEL,
                                payload: undefined,
                            });
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        type="default"
                        onClick={handleResetFilter}
                    >
                        Reset filter
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        Submit filter
                    </Button>
                </Space>
            }
        >
            {getFilterFormData() && (
                <DataFormComponent
                    className={'data-grid-filters'}
                    form={form}
                    formType={FORM_TYPE_INLINE}
                    formData={getFilterFormData()}
                    onSubmit={onColumnFormSubmit}
                />
            )}
        </Card>
    );
};

export default FilterComponent;
