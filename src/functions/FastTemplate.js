/*
 * Created by David Maser on 22/06/2017.
 */
import {Template} from '../config/Template';
import {TemplateUtilities} from '../templates/TemplateUtilities';
import {TemplateTableUtilities} from '../templates/TemplateTableUtilities';
export function FastTemplate(data, template) {
  let mainLayout = Template[template].layout;
  let d;
  let accepted = ['class','id','style'];
  for (d in data) {
    if(accepted.includes(d)) {
      let rep = TemplateUtilities.handleStringRep(Template[template][d], `@${d}`, TemplateUtilities.handleObject(data[d]));
      mainLayout = mainLayout.replace(`@${template}.${d}`, rep);
    }
  }
  if(template === 'table'){
    mainLayout = TemplateTableUtilities.init(mainLayout);
  }
  return mainLayout;
}