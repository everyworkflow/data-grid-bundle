/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ButtonActionInterface from './ButtonActionInterface';

interface ConfirmedButtonActionInterface extends ButtonActionInterface {
    confirm_message?: string;
}

export default ConfirmedButtonActionInterface;
