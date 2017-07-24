/**
 * Created by David Maser on 24/07/2017.
 */
import {Global} from '../config/Global';
import {Architect} from '../components/Faster';
export const StylizeUtilities = {
  argsObj: {},
  default: 'styles',
  build:function(obj,params,element){
    let htmlContent = this.argsObj[obj]['content'].trim();
    let htmlString = `<${obj} style="@style">@content</${obj}>`;
    let styleString = '';
    if(typeof params === 'object'){
      let p;
      for(p in params){

        styleString+=`${p}:${params[p]};`;
      }
    }
    Architect.build.experiment($(Global.appRoot).find(`[fstx-id="${element}"]`),null,htmlString.replace('@style',styleString).replace('@content',htmlContent),true);
  },
  make: function (arg,content) {
    let argsArray = arg.split(' ');
    this.argsObj[argsArray[0]] = {};
    this.argsObj[argsArray[0]]['content'] = content;
    this.argsObj[argsArray[0]][this.default] = {};
    let tempObj = argsArray[0];
    argsArray = argsArray.splice(1);
    let a;
    let altString = [];
    let bltString = [];
    for (a in argsArray) {
      if ((a % 2 === 0)) {
        argsArray[a] !== '' ? altString.push(argsArray[a]) : null;
      } else {
        argsArray[a] !== '' ? bltString.push(argsArray[a]) : null;
      }
    }
    return this.objectify(tempObj, altString, bltString)
  },
  objectify: function (obj, a, b) {
    if (a.length === b.length) {
      let i;
      for (i in a) {
        this.argsObj[obj]['styles'][a[i]] = b[i];
      }
    }
    return this.argsObj;
  }
};