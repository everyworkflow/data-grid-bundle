/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface DataGridColumnInterface {
    name: string;
    sort_order?: number;
    is_active?: boolean;
    is_sortable?: boolean;
    is_filterable?: boolean;
}

export default DataGridColumnInterface;
