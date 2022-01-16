/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import DataGridContext from '@EveryWorkflow/DataGridBundle/Context/DataGridContext';
import { DataGridColumnMaps } from '@EveryWorkflow/DataGridBundle/Root/DataGridColumnMaps';
import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';
import TextFieldColumn from '@EveryWorkflow/DataGridBundle/Column/TextFieldColumn';

interface ColumnRenderComponentProps {
    fieldData?: BaseFieldInterface;
    fieldValue?: any;
}

const ColumnRenderComponent = ({ fieldData, fieldValue }: ColumnRenderComponentProps) => {
    const { state: gridState } = useContext(DataGridContext);

    if (fieldData?.name && !!gridState.grid_column_maps[fieldData.name]) {
        const DynamicComponent = gridState.grid_column_maps[fieldData.name];
        return <DynamicComponent fieldData={fieldData} fieldValue={fieldValue} />;
    }
    if (fieldData?.field_type && !!DataGridColumnMaps[fieldData.field_type]) {
        const DynamicComponent = DataGridColumnMaps[fieldData.field_type];
        return <DynamicComponent fieldData={fieldData} fieldValue={fieldValue} />;
    }

    return <TextFieldColumn fieldData={fieldData} fieldValue={fieldValue} />;
}

export default ColumnRenderComponent;
