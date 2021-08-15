/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface DataCollectionMetaInterface {
    from?: number;
    to?: number;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total_count?: number;
    path?: string;
}

export default DataCollectionMetaInterface;
