/*
 * Created by David Maser on 22/06/2017.
 */
export const TemplateUtilities = {
  handleObject(obj){
    let o;
    let objString = '';
    for (o in obj) {
      objString += `${o}:${obj[o]};`;
    }
    return objString;
  },
  handleStringRep(a,b,c){
    return a.replace(b,c);
  }
};