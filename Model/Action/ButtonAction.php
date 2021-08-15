<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Action;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\DataGridBundle\Model\Action;

class ButtonAction extends Action implements ButtonActionInterface
{
    protected string $actionType = 'button';

    public function __construct(DataObjectInterface $dataObject)
    {
        parent::__construct($dataObject);
        $this->dataObject->setDataIfNot(self::KEY_BUTTON_TYPE, self::BUTTON_TYPE_DEFAULT);
    }

    public function getButtonType(): ?string
    {
        return $this->dataObject->getData(self::KEY_BUTTON_TYPE);
    }

    public function setButtonType(string $buttonType): self
    {
        $this->dataObject->setData(self::KEY_BUTTON_TYPE, $buttonType);

        return $this;
    }

    public function getButtonShape(): ?string
    {
        return $this->dataObject->getData(self::KEY_BUTTON_SHAPE);
    }

    public function setButtonShape(string $buttonShape): self
    {
        $this->dataObject->setData(self::KEY_BUTTON_SHAPE, $buttonShape);

        return $this;
    }

    public function getButtonTarget(): ?string
    {
        return $this->dataObject->getData(self::KEY_BUTTON_TARGET);
    }

    public function setButtonTarget(string $buttonTarget): self
    {
        $this->dataObject->setData(self::KEY_BUTTON_TARGET, $buttonTarget);

        return $this;
    }
}
