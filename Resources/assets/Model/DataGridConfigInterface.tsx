/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ActionInterface from '@EveryWorkflow/DataGridBundle/Model/ActionInterface';

interface DataGridConfigInterface {
    header_actions?: Array<ActionInterface>;
    row_actions?: Array<ActionInterface>;
    bulk_actions?: Array<ActionInterface>;

    header_action_type?: string;
    row_action_type?: string;
    bulk_action_type?: string;

    active_columns?: Array<string>;
    sortable_columns?: Array<string>;
    filterable_columns?: Array<string>;
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;
    default_sort_field?: string;
    default_sort_order?: string;
    row_action_position?: string;
}

export default DataGridConfigInterface;
