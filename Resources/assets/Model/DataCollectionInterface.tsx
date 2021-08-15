/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataCollectionMetaInterface from "@EveryWorkflow/DataGridBundle/Model/DataCollectionMetaInterface";

interface DataCollectionInterface {
    meta?: DataCollectionMetaInterface;
    results: Array<any>;
}

export default DataCollectionInterface;
