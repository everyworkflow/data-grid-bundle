<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Action;

class ConfirmedActionButton extends ButtonAction implements ConfirmedActionButtonInterface
{
    protected string $actionType = 'confirmed_button';

    public function getConfirmMessage(): string
    {
        return $this->dataObject->getData(self::KEY_CONFIRM_MESSAGE);
    }

    public function setConfirmMessage(string $message): ConfirmedActionButtonInterface
    {
        $this->dataObject->setData(self::KEY_CONFIRM_MESSAGE, $message);
        return $this;
    }
}
