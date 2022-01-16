/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ButtonInterface from "@EveryWorkflow/PanelBundle/Model/ButtonInterface";

interface ActionInterface extends ButtonInterface {
    action_type: string;
    name?: string;
    path_type?: string;
    is_confirm?: boolean;
    confirm_message?: string;
    icon_svg?: string;
}

export default ActionInterface;
