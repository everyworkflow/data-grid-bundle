<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Action;

interface ConfirmedActionButtonInterface extends ButtonActionInterface
{
    public const KEY_CONFIRM_MESSAGE = 'confirm_message';

    public function getConfirmMessage(): string;

    public function setConfirmMessage(string $message): self;
}
