<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;

class Action implements ActionInterface
{
    protected string $actionType = 'link';

    /**
     * @var DataObjectInterface
     */
    protected DataObjectInterface $dataObject;

    public function __construct(DataObjectInterface $dataObject)
    {
        $this->dataObject = $dataObject;
    }

    public function getActionType(): ?string
    {
        return $this->actionType;
    }

    public function getLabel(): string
    {
        return $this->dataObject->getData(self::KEY_LABEL);
    }

    public function setLabel(string $label): self
    {
        $this->dataObject->setData(self::KEY_LABEL, $label);
        return $this;
    }

    public function getPath(): string
    {
        return $this->dataObject->getData(self::KEY_PATH);
    }

    public function setPath(string $path): self
    {
        $this->dataObject->setData(self::KEY_PATH, $path);
        return $this;
    }

    public function getIconSvg(): ?string
    {
        return $this->dataObject->getData(self::KEY_ICON_SVG);
    }

    public function setIconSvg(string $iconSvg): self
    {
        $this->dataObject->setData(self::KEY_ICON_SVG, $iconSvg);
        return $this;
    }

    public function toArray(): array
    {
        $data = $this->dataObject->toArray();
        $data[self::KEY_ACTION_TYPE] = $this->getActionType();
        return $data;
    }
}
