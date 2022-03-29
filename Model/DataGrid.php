<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataGridBundle\Model;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\DataFormBundle\Model\FormInterface;
use EveryWorkflow\DataGridBundle\Model\Collection\ArraySourceInterface;
use EveryWorkflow\DataGridBundle\Model\Collection\RepositorySourceInterface;
use Symfony\Component\HttpFoundation\Request;

class DataGrid implements DataGridInterface
{
    protected ?Request $request = null;

    protected DataObjectInterface $dataObject;
    protected DataGridConfigInterface $dataGridConfig;
    protected FormInterface $form;
    protected ArraySourceInterface $source;

    public function __construct(
        DataObjectInterface $dataObject,
        DataGridConfigInterface $dataGridConfig,
        FormInterface $form,
        ArraySourceInterface $source
    ) {
        $this->dataObject = $dataObject;
        $this->dataGridConfig = $dataGridConfig;
        $this->form = $form;
        $this->source = $source;
    }

    public function getConfig(): DataGridConfigInterface
    {
        return $this->dataGridConfig;
    }

    public function setConfig(DataGridConfigInterface $dataGridConfig): self
    {
        $this->dataGridConfig = $dataGridConfig;

        return $this;
    }

    public function getForm(): FormInterface
    {
        return $this->form;
    }

    public function setForm(FormInterface $form): self
    {
        $this->form = $form;

        return $this;
    }

    public function getSource(): ArraySourceInterface
    {
        return $this->source;
    }

    public function setSource(ArraySourceInterface $collectionSource): self
    {
        $this->source = $collectionSource;

        return $this;
    }

    public function setFromRequest(Request $request): self
    {
        $this->request = $request;

        return $this;
    }

    public function toArray(): array
    {
        $form = $this->getForm();
        $source = $this->getSource();
        $config = $this->getConfig();

        if ($source instanceof RepositorySourceInterface) {
            $source->setForm($form);

            if ($this->request) {
                $source->getParameter()->setFromRequest($this->request);
            }
        }

        $data = [
            self::KEY_DATA_COLLECTION => $source->toArray()
        ];
        if ($this->request->get('for') === 'data-grid') {
            $data[self::KEY_DATA_GRID_CONFIG] = $config->toArray();
            $data[self::KEY_DATA_FORM] = $form->toArray();
        }
        return $data;
    }
}
