import { reactive } from '@vue/composition-api';
import baseService from '@imagina/qcrud/_services/baseService.js'
import featureStore from './featureStore.js';
import _ from 'lodash';

const state = reactive({
    form: {},
});

export default function sortStore() {
    function factoryOfDynamicSelect() {
        const data = {};
        
        featureStore().getSelectedColumns().forEach(item => {
            const icon = state.form[item.id] === '1' ? 'fas fa-sort-amount-up'
            :'fas fa-sort-amount-down';
            data[item.id] = {
                value: '1',
                type: 'select',
                props: {
                    label: item.title,
                    icon,
                    color: 'primary',
                    options: [
                        { label: 'Ascending', value: '1' },
                        { label: 'Descending', value: '0' }
                    ],
                }
            };
        });
        return data;
    }
    function getForm() {
        return state.form;
    }
    function removeObjectIdentifiers() {
        Object.entries(state.form).forEach(([key, value]) => {
            const filter = featureStore().getSelectedColumns().some(item => item.field === key);
            if (!filter) {
                delete state.form[key];
            }
        })
    }
    function payloadSort() {
        const sort = _.mapKeys(state.form, (v, k) => _.camelCase(k))
        return  {
            sort,
        }
    }
    return {
        factoryOfDynamicSelect,
        removeObjectIdentifiers,
        getForm,
        payloadSort,
    }
}