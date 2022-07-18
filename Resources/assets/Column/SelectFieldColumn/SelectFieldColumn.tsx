/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import SelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SelectFieldInterface';

interface SelectFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const SelectFieldColumn = ({ fieldData, fieldValue }: SelectFieldColumnProps) => {
    const getSelectOptionValue = (): string => {
        fieldData?.options?.forEach(option => {
            if (option.key?.toString() === fieldValue?.toString()) {
                fieldValue = option.value?.toString();
            }
        });
        return fieldValue;
    }

    return <span>{getSelectOptionValue()}</span>;
}

export default SelectFieldColumn;
