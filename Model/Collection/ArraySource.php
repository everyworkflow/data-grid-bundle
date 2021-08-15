<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model\Collection;

use EveryWorkflow\CoreBundle\Model\DataObjectFactoryInterface;
use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataGridBundle\Model\DataCollectionInterface;

class ArraySource implements ArraySourceInterface
{
    /**
     * @var ArrayableInterface[]
     */
    protected array $results = [];
    /**
     * @var DataCollectionInterface
     */
    protected DataCollectionInterface $dataCollection;
    /**
     * @var DataObjectFactoryInterface
     */
    protected DataObjectFactoryInterface $dataObjectFactory;

    public function __construct(
        array $results,
        DataCollectionInterface $dataCollection,
        DataObjectFactoryInterface $dataObjectFactory
    ) {
        $this->results = $results;
        $this->dataCollection = $dataCollection;
        $this->dataObjectFactory = $dataObjectFactory;
    }

    public function getCollection(): DataCollectionInterface
    {
        return $this->dataCollection;
    }

    public function setCollection(DataCollectionInterface $dataCollection): self
    {
        $this->dataCollection = $dataCollection;
        return $this;
    }

    protected function processResult(): array
    {
        return $this->results;
    }

    public function toCollection(): DataCollectionInterface
    {
        $collection = $this->getCollection();
        $results = [];
        foreach ($this->processResult() as $item) {
            if ($item instanceof ArrayableInterface) {
                $results[] = $item;
            } elseif (is_array($item)) {
                $results[] = $this->dataObjectFactory->create($item);
            }
        }
        $resultCount = count($results);
        $collection->setResults($results)
            ->setPerPage($resultCount)
            ->setResultCount($resultCount)
            ->setTotalCount($resultCount)
            ->setLastPage(1)
            ->setCurrentPage(1);
        return $collection;
    }

    public function toArray(): array
    {
        return $this->toCollection()->toArray();
    }
}
