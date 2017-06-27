/**
 * Created by David Maser on 27/06/2017.
 */
import {Template} from '../config/Template';
export default function FastGutter(option, expression){
  let templateString = Template.gutter.layout;
  templateString = expression !== undefined && expression !== '' ? templateString.replace('@render',expression) : templateString;

  return templateString;
}