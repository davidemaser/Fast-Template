/**
 * Created by David Maser on 18/07/2017.
 */
import {Template} from '../config/Template';
export default function (option,expression) {
  const parser = {
    params:function(obj){
      let subItem = 'banner';
      let o;
      let objString = '';
      let parentString = '';
      for (o in obj) {
        let objType = obj[o].split(':')[0].replace('{','').replace('}','');
        let objTemplate = Template[subItem][objType];
        let objContent = obj[o].split(':')[1].replace('{','').replace('}','');
        if(objType === 'image'){
          parentString = objTemplate.replace(`@${subItem}.${objType}`,objContent);
        }else if(objType === 'action'){
          if(parentString.length > 0){
            parentString = parentString.replace(`@${subItem}.${objType}`,objContent);
          }
        }else{
          objString += objTemplate.replace(`@${subItem}.${objType}`,objContent);
        }
      }
      return parentString.replace('@banner.content',objString);
    },
    init: function (obj) {
      if (obj.indexOf(',') > -1) {
        return this.params(obj.split(','));
      }
    },

  };
  option = option !== null ? option : '';
  let bannerArray = expression.trim().split(/\r?\n/);
  let bannerTemplate = Template.banner.layout;
  let bannerContent = '';
  if(Array.isArray(bannerArray)){
    bannerArray.map(function(a){
      bannerContent += a.indexOf('{') > -1 ? parser.init(a.trim()) : a.trim();
    })
  }
  bannerTemplate = bannerTemplate.replace('@option',option).replace('@content',bannerContent);
  return bannerTemplate;
}