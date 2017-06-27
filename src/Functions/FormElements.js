/**
 * Created by David Maser on 26/06/2017.
 */
export default function FormElements(obj){
  function handleOptions(obj,type){
    if(typeof obj === 'object'){
      let o;
      let optionString = '';
      for(o in obj){
        optionString += `<${type} value="${obj[o].value}"`;
        optionString += obj[o].selected === true ? ' selected="selected"' : '';
        optionString += type === 'radio' ? `label="${obj[o].label}" />` : `>${obj[o].label}</option>`;
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
            iTemplate += bo.class !== undefined && bo.class !== '' ? ` class="${bo['class']}"` : '';
            iTemplate += bo.id !== undefined && bo.id !== '' ? ` id="${bo['id']}"` : '';
            iTemplate += bo.id !== undefined && bo.checked === true ? ` checked="checked"` : '';
            iTemplate += bo['type'] === 'button' || bo['type'] === 'submit' ? ` value="${bo.placeholder}"` : bo.placeholder !== undefined ? ` placeholder="${bo['placeholder']}"` : '';
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
            sTemplate += handleOptions(bo.options,'option');
            sTemplate += '</select>';
            elementString += sTemplate;
            break;
          case 'radiogroup':
            let rTemplate = '<radiogroup>';
            rTemplate += handleOptions(bo.options,'radio');
            rTemplate += '</radiogroup>';
            elementString += rTemplate;
            break;
        }
      }
    }
    return elementString;
}