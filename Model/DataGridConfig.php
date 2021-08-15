<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataGridBundle\Factory\ActionFactoryInterface;
use EveryWorkflow\DataGridBundle\Model\Action\ButtonActionInterface;

class DataGridConfig implements DataGridConfigInterface
{
    /**
     * @var ButtonActionInterface[]
     */
    protected array $headerActions = [];
    /**
     * @var ButtonActionInterface[]
     */
    protected array $rowActions = [];
    /**
     * @var ButtonActionInterface[]
     */
    protected array $bulkActions = [];

    /**
     * @var DataObjectInterface
     */
    protected DataObjectInterface $dataObject;
    /**
     * @var ActionFactoryInterface
     */
    protected ActionFactoryInterface $actionFactory;

    public function __construct(DataObjectInterface $dataObject, ActionFactoryInterface $actionFactory)
    {
        $this->dataObject = $dataObject;
        $this->actionFactory = $actionFactory;
    }

    public function getActionFactory(): ActionFactoryInterface
    {
        return $this->actionFactory;
    }

    /**
     * @return ButtonActionInterface[]
     */
    public function getHeaderActions(): array
    {
        return $this->headerActions;
    }

    /**
     * @param ButtonActionInterface[] $actions
     * @return $this
     */
    public function setHeaderActions(array $actions): self
    {
        $this->headerActions = $actions;
        return $this;
    }

    /**
     * @return ButtonActionInterface[]
     */
    public function getRowActions(): array
    {
        return $this->rowActions;
    }

    /**
     * @param ButtonActionInterface[] $actions
     * @return $this
     */
    public function setRowActions(array $actions): self
    {
        $this->rowActions = $actions;
        return $this;
    }

    /**
     * @return ButtonActionInterface[]
     */
    public function getBulkActions(): array
    {
        return $this->bulkActions;
    }

    /**
     * @param ButtonActionInterface[] $actions
     * @return $this
     */
    public function setBulkActions(array $actions): self
    {
        $this->bulkActions = $actions;
        return $this;
    }

    /**
     * @return string[]
     */
    public function getActiveColumns(): array
    {
        return $this->dataObject->getData(self::KEY_ACTIVE_COLUMNS) ?? [];
    }

    /**
     * @param string[] $activeColumns
     * @return self
     */
    public function setActiveColumns(array $activeColumns): self
    {
        $this->dataObject->setData(self::KEY_ACTIVE_COLUMNS, $activeColumns);
        return $this;
    }

    /**
     * @return string[]
     */
    public function getSortableColumns(): array
    {
        return $this->dataObject->getData(self::KEY_SORTABLE_COLUMNS) ?? [];
    }

    /**
     * @param string[] $sortableColumns
     * @return self
     */
    public function setSortableColumns(array $sortableColumns): self
    {
        $this->dataObject->setData(self::KEY_SORTABLE_COLUMNS, $sortableColumns);
        return $this;
    }

    /**
     * @return string[]
     */
    public function getFilterableColumns(): array
    {
        return $this->dataObject->getData(self::KEY_FILTERABLE_COLUMNS) ?? [];
    }

    /**
     * @param string[] $filterableColumns
     * @return self
     */
    public function setFilterableColumns(array $filterableColumns): self
    {
        $this->dataObject->setData(self::KEY_FILTERABLE_COLUMNS, $filterableColumns);
        return $this;
    }

    public function isFilterEnabled(): bool
    {
        return $this->dataObject->getData(self::KEY_IS_FILTER_ENABLED);
    }

    public function setIsFilterEnabled(bool $isFilterEnabled): self
    {
        $this->dataObject->setData(self::KEY_IS_FILTER_ENABLED, $isFilterEnabled);
        return $this;
    }

    public function isColumnSettingEnabled(): bool
    {
        return $this->dataObject->getData(self::KEY_IS_COLUMN_SETTING_ENABLED);
    }

    public function setIsColumnSettingEnabled(bool $isColumnSettingEnabled): self
    {
        $this->dataObject->setData(self::KEY_IS_COLUMN_SETTING_ENABLED, $isColumnSettingEnabled);
        return $this;
    }

    public function toArray(): array
    {
        $data = $this->dataObject->toArray();

        $data[self::KEY_HEADER_ACTIONS] = [];
        foreach ($this->getHeaderActions() as $action) {
            if ($action instanceof ArrayableInterface) {
                $data[self::KEY_HEADER_ACTIONS][] = $action->toArray();
            }
        }
        $data[self::KEY_ROW_ACTIONS] = [];
        foreach ($this->getRowActions() as $action) {
            if ($action instanceof ArrayableInterface) {
                $data[self::KEY_ROW_ACTIONS][] = $action->toArray();
            }
        }
        $data[self::KEY_BULK_ACTIONS] = [];
        foreach ($this->getBulkActions() as $action) {
            if ($action instanceof ArrayableInterface) {
                $data[self::KEY_BULK_ACTIONS][] = $action->toArray();
            }
        }
        $data[self::KEY_ACTIVE_COLUMNS] = [];
        foreach ($this->getActiveColumns() as $column) {
            if (is_string($column)) {
                $data[self::KEY_ACTIVE_COLUMNS][] = $column;
            }
        }
        $data[self::KEY_SORTABLE_COLUMNS] = [];
        foreach ($this->getSortableColumns() as $column) {
            if (is_string($column)) {
                $data[self::KEY_SORTABLE_COLUMNS][] = $column;
            }
        }
        $data[self::KEY_FILTERABLE_COLUMNS] = [];
        foreach ($this->getFilterableColumns() as $column) {
            if (is_string($column)) {
                $data[self::KEY_FILTERABLE_COLUMNS][] = $column;
            }
        }
        return $data;
    }
}
