/**
 * Created by David Maser on 27/06/2017.
 */
import {Template} from '../config/Template';
export default function FastPanel(option, expression){
  let templateString = Template.panel.layout;
  templateString = expression !== undefined && expression !== '' ? templateString.replace('@render',expression) : templateString;

  return templateString;
}