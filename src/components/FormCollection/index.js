import FormCollection from './FormCollection.js';
import FormItem from './FormItem.js';
import FormItems from './FormItems.js';
import { updateOptions, getTemplateItemByName, updateConfig } from './utils.js';
import { provide } from './config';

export { updateOptions, getTemplateItemByName, updateConfig, FormItems, FormItem };

FormCollection.provide = provide;

export default FormCollection;
