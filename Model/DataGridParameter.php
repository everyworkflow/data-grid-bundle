<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use Symfony\Component\HttpFoundation\Request;

class DataGridParameter implements DataGridParameterInterface
{
    protected ?Request $request = null;

    public function __construct(
        protected DataObjectInterface $dataObject,
        protected array $filters = [],
        protected array $options = [],
        protected array $requestFilters = [],
        protected array $requestOptions = [],
    ) {
    }

    public function getRequest(): ?Request
    {
        return $this->request;
    }

    public function setRequest(Request $request): self
    {
        $this->request = $request;

        return $this;
    }

    public function getFilters(): array
    {
        return $this->filters;
    }

    public function setFilters(array $filters): self
    {
        $this->filters = $filters;

        return $this;
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function setOptions(array $options): self
    {
        $this->options = $options;

        return $this;
    }

    public function getRequestFilters(): array
    {
        return $this->requestFilters;
    }

    public function setRequestFilters(array $requestFilters): self
    {
        $this->requestFilters = $requestFilters;

        return $this;
    }

    public function getRequestOptions(): array
    {
        return $this->requestOptions;
    }

    public function setRequestOptions(array $requestOptions): self
    {
        $this->requestOptions = $requestOptions;

        return $this;
    }

    public function setFromRequest(Request $request): self
    {
        $this->request = $request;

        $perPage = $request->query->getInt('per-page', 20);
        $limit = 20;
        if ($perPage >= 1) {
            $limit = $perPage;
        }
        $page = $request->query->getInt('page', 1);
        $skip = 0;
        if ($page >= 1) {
            $skip = ($page - 1) * $perPage;
        }

        $optionData = [
            'skip' => $skip,
            'limit' => $limit,
            'sort_field' => $request->query->get('sort-field'),
            'sort_order' => $request->query->get('sort-order'),
        ];
        $this->setRequestOptions($optionData);

        $requestFilter = $request->query->get('filter');
        $filterData = [];
        if (is_string($requestFilter)) {
            try {
                $requestFilterData = json_decode($requestFilter, true, 512, JSON_THROW_ON_ERROR);
                if (is_array($requestFilterData)) {
                    $filterData = array_merge($filterData, $requestFilterData);
                }
            } catch (\Exception $e) {
                // Ignore filter data if unable to decode
            }
        }
        $this->setRequestFilters($filterData);

        return $this;
    }

    public function toArray(): array
    {
        $data = $this->dataObject->toArray();
        $data[self::KEY_FILTERS] = $this->getFilters();
        $data[self::KEY_OPTIONS] = $this->getOptions();

        return $data;
    }
}
