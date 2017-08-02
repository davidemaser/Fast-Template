/*
 * Created by David Maser on 22/06/2017.
 */
import {Template} from '../config/Template';
export const TemplateTableUtilities = {
  elem: 'table.elements',
  template: Template['table'],
  hold: '',
  init(obj){
    $.when(this.header(obj)).then(()=> {
      this.footer();
    }).then(()=> {
      this.body();
    }).done(()=> {
      return this.hold;
    })
  },
  header(obj){
    let root = `@${this.elem}.header`;
    let model = this.template['elements']['header']['layout'];
    this.hold = obj.replace(root, model);
  },
  footer(){
    let obj = this.hold;
    let root = `@${this.elem}.footer`;
    let model = this.template['elements']['footer']['layout'];
    this.hold = obj.replace(root, model);
  },
  body(){
    let obj = this.hold;
    let root = `@${this.elem}.body`;
    let model = this.template['elements']['body']['layout'];
    this.hold = obj.replace(root, model);
  }
};