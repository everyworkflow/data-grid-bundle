<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Collection;

use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataGridBundle\Model\DataCollectionInterface;

interface ArraySourceInterface extends ArrayableInterface
{
    public function getCollection(): DataCollectionInterface;

    public function setCollection(DataCollectionInterface $dataCollection): self;

    public function toCollection(): DataCollectionInterface;
}
