/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import moment from 'moment';
import SelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SelectFieldInterface';

interface DatePickerFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const DatePickerFieldColumn = ({ fieldData, fieldValue }: DatePickerFieldColumnProps) => {
    const getDateObject = useCallback(() => {
        return moment(fieldValue);
    }, [fieldValue])

    return (
        <span className={'field-type-' + fieldData?.field_type + ' column-name-' . fieldData?.name}>{fieldValue ? getDateObject().format('YYYY-MM-DD') : ''}</span>
    );
}

export default DatePickerFieldColumn;
