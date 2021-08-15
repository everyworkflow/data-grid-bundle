/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import DataCollectionInterface from '@EveryWorkflow/DataGridBundle/Model/DataCollectionInterface';
import DataGridConfigInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridConfigInterface';
// import ButtonActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ButtonActionInterface';
// import ListBulkActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ListBulkActionInterface';
// import ListHeaderActionInterface from '@EveryWorkflow/DataGridBundle/Model/Action/ListHeaderActionInterface';
// import ListBuilderMetaInterface from './ListBuilderMetaInterface';
// import ListColumnDataInterface from './ListColumnDataInterface';
// import ListOrderInterface from './ListOrderInterface';

interface DataGridInterface {
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;

    // list_order?: ListOrderInterface;
    // column_data: Array<ListColumnDataInterface>;
    // meta: ListBuilderMetaInterface;

    // results: Array<any>;

    // list_actions: Array<ButtonActionInterface>;
    // list_bulk_actions: Array<ListBulkActionInterface>;
    // list_header_actions: Array<ListHeaderActionInterface>;

    data_collection?: DataCollectionInterface;
    data_grid_config?: DataGridConfigInterface;
    data_form?: DataFormInterface;
}

export default DataGridInterface;
