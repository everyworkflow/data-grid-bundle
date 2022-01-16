/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import TextFieldColumn from '@EveryWorkflow/DataGridBundle/Column/TextFieldColumn';
import SelectFieldColumn from '@EveryWorkflow/DataGridBundle/Column/SelectFieldColumn';
import DatePickerFieldColumn from '@EveryWorkflow/DataGridBundle/Column/DatePickerFieldColumn';
import DateTimePickerFieldColumn from '@EveryWorkflow/DataGridBundle/Column/DateTimePickerFieldColumn';
import SwitchFieldColumn from '@EveryWorkflow/DataGridBundle/Column/SwitchFieldColumn';

export const DataGridColumnMaps: any = {
    text_field: TextFieldColumn,
    select_field: SelectFieldColumn,
    date_picker_field: DatePickerFieldColumn,
    date_time_picker_field: DateTimePickerFieldColumn,
    switch_field: SwitchFieldColumn,
};
