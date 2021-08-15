<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Support\ArrayableInterface;

interface ActionInterface extends ArrayableInterface
{
    public const KEY_ACTION_TYPE = 'action_type';
    public const KEY_LABEL = 'label';
    public const KEY_PATH = 'path';
    public const KEY_ICON_SVG = 'icon_svg';

    public function getActionType(): ?string;

    public function getLabel(): ?string;

    public function setLabel(string $label): self;

    public function getPath(): ?string;

    public function setPath(string $path): self;

    public function getIconSvg(): ?string;

    public function setIconSvg(string $iconSvg): self;
}
