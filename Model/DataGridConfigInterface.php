<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataGridBundle\Factory\ActionFactoryInterface;
use EveryWorkflow\DataGridBundle\Model\Action\ButtonActionInterface;

interface DataGridConfigInterface extends ArrayableInterface
{
    public const KEY_HEADER_ACTIONS = 'header_actions';
    public const KEY_ROW_ACTIONS = 'row_actions';
    public const KEY_BULK_ACTIONS = 'bulk_actions';
    public const KEY_ACTIVE_COLUMNS = 'active_columns';
    public const KEY_SORTABLE_COLUMNS = 'sortable_columns';
    public const KEY_FILTERABLE_COLUMNS = 'filterable_columns';
    public const KEY_IS_FILTER_ENABLED = 'is_filter_enabled';
    public const KEY_IS_COLUMN_SETTING_ENABLED = 'is_column_setting_enabled';
    public const KEY_DEFAULT_SORT_ORDER = 'default_sort_order';
    public const KEY_DEFAULT_SORT_FIELD = 'default_sort_field';

    public const SORT_ORDER_ASC = 'asc';
    public const SORT_ORDER_DESC = 'desc';

    public function getActionFactory(): ActionFactoryInterface;

    /**
     * @return ButtonActionInterface[]
     */
    public function getHeaderActions(): array;

    /**
     * @param ButtonActionInterface[] $actions
     * @return self
     */
    public function setHeaderActions(array $actions): self;

    /**
     * @return ButtonActionInterface[]
     */
    public function getRowActions(): array;

    /**
     * @param ButtonActionInterface[] $actions
     * @return self
     */
    public function setRowActions(array $actions): self;

    /**
     * @return ButtonActionInterface[]
     */
    public function getBulkActions(): array;

    /**
     * @param ButtonActionInterface[] $actions
     * @return self
     */
    public function setBulkActions(array $actions): self;

    /**
     * @return string[]
     */
    public function getActiveColumns(): array;

    /**
     * @param string[] $activeColumns
     * @return self
     */
    public function setActiveColumns(array $activeColumns): self;

    /**
     * @return string[]
     */
    public function getSortableColumns(): array;

    /**
     * @param string[] $sortableColumns
     * @return self
     */
    public function setSortableColumns(array $sortableColumns): self;

    /**
     * @return string[]
     */
    public function getFilterableColumns(): array;

    /**
     * @param string[] $filterableColumns
     * @return self
     */
    public function setFilterableColumns(array $filterableColumns): self;

    public function isFilterEnabled(): bool;

    public function setIsFilterEnabled(bool $isFilterEnabled): self;

    public function isColumnSettingEnabled(): bool;

    public function setIsColumnSettingEnabled(bool $isColumnSettingEnabled): self;

    public function getDefaultSortOrder(): string;

    public function setDefaultSortOrder(string $defaultSortOrder): self;

    public function getDefaultSortField(): string;

    public function setDefaultSortField(string $defaultSortOrder): self;
}
