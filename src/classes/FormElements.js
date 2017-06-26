/**
 * Created by David Maser on 26/06/2017.
 */
export default function FormElements(obj){
  function handleOptions(obj){
    if(typeof obj === 'object'){
      let o;
      let optionString = '';
      for(o in obj){
        optionString += `<option value="${obj[o].value}"`;
        optionString += obj[o].selected === true ? ' selected="selected"' : '';
        optionString += `>${obj[o].label}</option>`;
      }
      return optionString;
    }
  }
    this.obj = obj;
    let o;
    let elementString = '';
    let ob = this.obj;
    for(o in ob){
      let b;
      let bo = ob[o];
      for(b in bo){
        switch(bo[b]){
          case 'input':
            let iTemplate = `<input type="${bo['type']}"`;
            iTemplate += bo.name !== undefined && bo.name !== '' ? ` name="${bo['name']}"` : '';
            iTemplate += bo.placeholder !== undefined && bo.placeholder !== '' ? ` placeholder="${bo['placeholder']}"` : '';
            iTemplate += bo.class !== undefined && bo.class !== '' ? ` class="${bo['class']}"` : '';
            iTemplate += bo.id !== undefined && bo.id !== '' ? ` id="${bo['id']}"` : '';
            iTemplate += ' />';
            elementString += iTemplate;
            break;
          case 'textarea':
            let tTemplate = '<textarea';
            tTemplate += bo.rows !== undefined && bo.rows !== '' ? ` rows="${bo['rows']}"` : '';
            tTemplate += bo.cols !== undefined && bo.cols !== '' ? ` columns="${bo['cols']}"` : '';
            tTemplate += bo.name !== undefined && bo.name !== '' ? ` name="${bo['name']}"` : '';
            tTemplate += bo.placeholder !== undefined && bo.placeholder !== '' ? ` placeholder="${bo['placeholder']}"` : '';
            tTemplate += bo.class !== undefined && bo.class !== '' ? ` class="${bo['class']}"` : '';
            tTemplate += bo.id !== undefined && bo.id !== '' ? ` id="${bo['id']}"` : '';
            tTemplate += ' />';
            elementString += tTemplate;
            break;
          case 'select':
            let sTemplate = '<select';
            sTemplate += bo.name !== undefined && bo.name !== '' ? ` name="${bo['name']}"` : '';
            sTemplate += bo.class !== undefined && bo.class !== '' ? ` class="${bo['class']}"` : '';
            sTemplate += bo.id !== undefined && bo.id !== '' ? ` id="${bo['id']}"` : '';
            sTemplate += '>';
            sTemplate += handleOptions(bo.options);
            sTemplate += '</select>';
            elementString += sTemplate;
        }
      }
    }
    return elementString;
}