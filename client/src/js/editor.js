// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: header,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
      onLoad: (instance) => {
        this.initializeEditor(instance, localData);
      },
    });
  }

  initializeEditor(instance, localData) {
    this.editorInstance = instance;

    // set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editorInstance.setValue(data || localData || header);
    });

    this.editorInstance.on('change', () => {
      localStorage.setItem('content', this.editorInstance.getValue());
    });

    // Save the content of the editor when loses focus
    this.editorInstance.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}