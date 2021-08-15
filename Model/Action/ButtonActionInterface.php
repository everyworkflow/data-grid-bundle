<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Action;

use EveryWorkflow\DataGridBundle\Model\ActionInterface;

interface ButtonActionInterface extends ActionInterface
{
    public const BUTTON_TYPE_DEFAULT = 'default';
    public const BUTTON_TYPE_PRIMARY = 'primary';
    public const BUTTON_TYPE_DASHED = 'dashed';
    public const BUTTON_TYPE_GHOST = 'ghost';
    public const BUTTON_TYPE_LINK = 'link';
    public const BUTTON_TYPE_TEXT = 'text';

    public const BUTTON_SHAPE_CIRCLE = 'circle';
    public const BUTTON_SHAPE_ROUND = 'round';

    public const KEY_BUTTON_TYPE = 'button_type';
    public const KEY_BUTTON_SHAPE = 'button_shape';

    public const KEY_BUTTON_TARGET = 'button_target';

    public function getButtonType(): ?string;

    public function setButtonType(string $buttonType): self;

    public function getButtonShape(): ?string;

    public function setButtonShape(string $buttonShape): self;

    public function getButtonTarget(): ?string;

    public function setButtonTarget(string $buttonTarget): self;
}
