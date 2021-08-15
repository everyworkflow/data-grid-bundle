/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ActionInterface from "./ActionInterface";

interface ButtonActionInterface extends ActionInterface {
    button_type?: string;
    button_shape?: string;
    button_target?: string;
}

export default ButtonActionInterface;
