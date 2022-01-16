/*
 * @copyright EveryWorkflow. All rights reserved.
 */

// import ResultResponseDataInterface from './ResultResponseDataInterface';
// import ListOrderInterface from './ListOrderInterface';
// import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';
// import ListColumnDataInterface from './ListColumnDataInterface';
// import ButtonActionInterface from './Action/ButtonActionInterface';
// import ListBulkActionInterface from './Action/ListBulkActionInterface';
// import ListHeaderActionInterface from './Action/ListHeaderActionInterface';
import DataFormInterface from '@EveryWorkflow/DataFormBundle/Model/DataFormInterface';
import DataCollectionInterface from '@EveryWorkflow/DataGridBundle/Model/DataCollectionInterface';
import DataGridConfigInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridConfigInterface';
import DataGridColumnInterface from '@EveryWorkflow/DataGridBundle/Model/DataGridColumnInterface';

interface DataGridStateInterface {
    // list_builder_id?: string;
    // list_builder_type?: string;
    active_panel?: string;
    selected_row_ids: Array<string>;
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;
    // active_columns: Array<string>;

    // response_data?: ResultResponseDataInterface;
    // form_builder_data: Array<BaseFieldInterface>;
    // column_data: Array<ListColumnDataInterface>;
    // list_order?: ListOrderInterface;
    // list_actions: Array<ButtonActionInterface>;
    // list_bulk_actions: Array<ListBulkActionInterface>;
    // list_header_actions: Array<ListHeaderActionInterface>;

    data_grid_id?: string;
    data_grid_type?: string;
    data_grid_url?: string;
    data_collection?: DataCollectionInterface;
    data_grid_config?: DataGridConfigInterface;
    data_form?: DataFormInterface;
    data_grid_column_state: Array<DataGridColumnInterface>;

    grid_header_action_maps?: any;
    grid_row_action_maps?: any;
    grid_bulk_action_maps?: any;
    grid_column_maps?: any;
    grid_filter_fields_maps?: any;

    popup_form_data?: {
        get_path?: string;
    };
}

export default DataGridStateInterface;
