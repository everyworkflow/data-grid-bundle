/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ActionInterface';
import ButtonActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ButtonActionInterface';
import ConfirmedButtonActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ConfirmedButtonActionInterface';

interface DataGridConfigInterface {
    header_actions?: Array<
    ActionInterface |
    ButtonActionInterface |
    ConfirmedButtonActionInterface
    >;
    row_actions?: Array<
    ActionInterface |
    ButtonActionInterface |
    ConfirmedButtonActionInterface
    >;
    bulk_actions?: Array<
    ActionInterface |
    ButtonActionInterface |
    ConfirmedButtonActionInterface
    >;
    active_columns?: Array<string>;
    sortable_columns?: Array<string>;
    filterable_columns?: Array<string>;
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;
    default_sort_field?: string;
    default_sort_order?: string;
}

export default DataGridConfigInterface;
