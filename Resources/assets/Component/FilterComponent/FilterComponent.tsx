/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext } from 'react';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import { useLocation, useNavigate } from "react-router-dom";
import DataFormComponent from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent';
import DataGridContext, { PANEL_ACTIVE_FILTERS } from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import { ACTION_SET_ACTIVE_PANEL } from '@EveryWorkflow/DataGridBundle/Reducer/DataGridReducer';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import '@EveryWorkflow/DataGridBundle/Component/FilterComponent/FilterStyle.less';
import { FORM_TYPE_INLINE } from "@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent";

const FilterComponent = () => {
    const { state: gridState, dispatch: gridDispatch } = useContext(DataGridContext);
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const getUrlParamData = useCallback(() => {
        const urlParams = new URLSearchParams(location.search);
        let urlParamData: any | undefined = undefined;
        if (urlParams.get('filter') !== null && urlParams.get('filter') !== '') {
            try {
                urlParamData = JSON.parse(urlParams.get('filter') as string);
            } catch (e) {
                // ignore urlPramData is cannot parse as json
            }
        }
        return urlParamData;
    }, [location]);

    const getFilterFormData = useCallback(() => {
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

        const formData: DataFormInterface = {
            fields: []
        };

        getAllFields(gridState.data_form).forEach((item) => {
            if (item.name && gridState.data_grid_config?.filterable_columns?.includes(item.name)) {
                const newItem: any = { ...item };
                newItem['is_required'] = false;
                newItem['is_disabled'] = false;
                newItem['is_readonly'] = false;
                newItem['allow_clear'] = true;
                newItem['is_actionable'] = false;
                if (newItem['field_type'] === 'date_time_picker_field') {
                    newItem['field_type'] = 'date_time_range_picker_field';
                } else if (newItem['field_type'] === 'switch_field') {
                    newItem['field_type'] = 'select_field';
                    newItem['options'] = [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No',
                        }
                    ]
                }
                formData.fields?.push(newItem);
            }
        });
        return formData;
    }, [gridState.data_form, gridState.data_grid_config, location]);

    const getInitialValues = () => {
        const urlParams = getUrlParamData();
        const initalFieldValues: any = {};
        getFilterFormData().fields?.forEach(field => {
            if (field.name) {
                if (urlParams && urlParams[field.name] !== undefined && urlParams[field.name] !== '') {
                    initalFieldValues[field.name] = urlParams[field.name];
                } else {
                    initalFieldValues[field.name] = '';
                }
            }
        });
        return initalFieldValues;
    }

    const onColumnFormSubmit = (data: any) => {
        const filterData: any = {};
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== '') {
                filterData[key] = data[key];
            }
        });
        const currentUrlParams = new URLSearchParams(location.search);
        currentUrlParams.set('filter', JSON.stringify(filterData));
        currentUrlParams.set('page', '1');
        navigate(location.pathname + '?' + currentUrlParams.toString());
    };

    const handleResetFilter = () => {
        form.resetFields();
        const emptyFieldValues: any = {};
        getFilterFormData().fields?.forEach(field => {
            if (field.name) {
                emptyFieldValues[field.name] = '';
            }
        });
        form.setFieldsValue(emptyFieldValues);
        const currentUrlParams = new URLSearchParams(location.search);
        currentUrlParams.set('filter', '{}');
        currentUrlParams.set('page', '1');
        navigate(location.pathname + '?' + currentUrlParams.toString());
    }

    if (!(gridState.active_panel === PANEL_ACTIVE_FILTERS || location.search.includes('filter={'))) {
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
                        }}>
                        Close
                    </Button>
                    <Button
                        type="default"
                        onClick={handleResetFilter}>
                        Reset filter
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.submit();
                        }}>
                        Submit filter
                    </Button>
                </Space>
            }>
            {getFilterFormData() && (
                <DataFormComponent
                    className={'data-grid-filters'}
                    form={form}
                    formType={FORM_TYPE_INLINE}
                    initialValues={getInitialValues()}
                    formData={getFilterFormData()}
                    onSubmit={onColumnFormSubmit}
                />
            )}
        </Card>
    );
};

export default FilterComponent;
