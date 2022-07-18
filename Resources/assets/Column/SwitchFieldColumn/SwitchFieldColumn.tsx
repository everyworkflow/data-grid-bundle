/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import SwitchFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SwitchFieldInterface';

interface SwitchFieldColumnProps {
    fieldData?: SwitchFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const SwitchFieldColumn = ({ fieldData, fieldValue }: SwitchFieldColumnProps) => {
    return <div style={{ textAlign: 'center' }}>{fieldValue ? 'Yes' : 'No'}</div>;
}

export default SwitchFieldColumn;
