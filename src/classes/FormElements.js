/**
 * Created by David Maser on 26/06/2017.
 */
export default function FormElements(obj){
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
            let elementTemplate = `<input type="${bo['type']}"`;
            elementTemplate += bo.name !== undefined && bo.name !== '' ? ` name="${bo['name']}"` : '';
            elementTemplate += bo.placeholder !== undefined && bo.placeholder !== '' ? ` placeholder="${bo['placeholder']}"` : '';
            elementTemplate += bo.class !== undefined && bo.class !== '' ? ` class="${bo['class']}"` : '';
            elementTemplate += bo.id !== undefined && bo.id !== '' ? ` id="${bo['id']}"` : '';
            elementTemplate += ' />';
            elementString += elementTemplate;
            break;
        }
      }
    }
    return elementString;
}