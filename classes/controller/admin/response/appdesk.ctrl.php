<?php
/**
 * NOVIUS OS - Web OS for digital communication
 *
 * @copyright  2011 Novius
 * @license    GNU Affero General Public License v3 or (at your option) any later version
 *             http://www.gnu.org/licenses/agpl-3.0.html
 * @link http://www.novius-os.org
 */

namespace Nos\Form;

class Controller_Admin_Response_Appdesk extends \Nos\Controller_Admin_Appdesk
{
    public function load_config()
    {
        parent::load_config();

        $form_id = \Input::get('form_id', null);
        if (!empty($form_id)) {
            $this->config['form_id'] = $form_id;

            $form = Model_Form::find($form_id);
            $this->config['appdesk']['tab']['label'] = strtr(__('Responses of "{{title}}"'), array('{{title}}' => $form->form_name));
            $this->config['appdesk']['appdesk']['buttons'] = array(
                'Nos\Form\Model_Form.export' => array(
                    'label' => __('Export'),
                    'action' => array(
                        'action' => 'window.open',
                        'url' => 'admin/noviusos_form/response/appdesk/export?form_id='.$form->form_id,
                    ),
                ),
            );
            $this->config['appdesk']['appdesk']['values']['form_id'] = $form_id;
            $this->config['appdesk']['appdesk']['grid']['urlJson'] = $this->config['appdesk']['appdesk']['grid']['urlJson'].'?form_id='.$form->form_id;
            $this->config['hideContexts'] = true;

            $fields = preg_split("/[\n,]+/", $form->form_layout);
            $columns = array();
            $dataset = array();
            foreach ($fields as $field) {
                list($field_id, $width) = explode('=', $field);
                $field = $form->fields[$field_id];
                if (!in_array($field->field_type, array('text', 'select', 'email', 'number', 'date'))) {
                    continue;
                }

                $id = 'field_'.$field->field_id;
                $column = array (
                    'headerText' => preg_replace('/\:/', ' ', $field->field_label),
                    'dataKey' => $id,
                    'dataType' => $field->field_type === 'date' ? 'datetime' : ($field->field_type === 'number' ? 'number' : ('string')),
                );

                $columns[$id] = $column;
                $dataset[$id] = array_merge($column, array('value' => function($item) use ($field) {
                    $answer = Model_Answer_Field::find('first', array('where' => array(
                            array('anfi_answer_id', $item->answer_id),
                            array('anfi_field_id', $field->field_id),
                    )));
                    return $answer->anfi_value;
                }));

                if (count($columns) === 3) {
                    break;
                }
            }

            $actions = $this->config['appdesk']['appdesk']['grid']['columns']['actions'];
            unset($this->config['appdesk']['appdesk']['grid']['columns']['actions']);
            $this->config['appdesk']['appdesk']['grid']['columns'] = array_merge($this->config['appdesk']['appdesk']['grid']['columns'], $columns, array('actions' => $actions));
            $this->config['dataset'] = array_merge($this->config['dataset'], $dataset);
        }

        return $this->config;
    }
}
