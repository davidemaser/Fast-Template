/*
 * Created by David Maser on 02/08/2017.
 */
const dbArchitecture = [
  {
    item: {
      id: 'numeric',
      hash: 'alphanumeric',
      entries: [
        {
          dateTime: 'string',
          link: 'string',
          dataSet: 'object',
          bind: 'object',
          expires:'boolean'
        }
      ]
    }
  }
];
export class DataBuilder{
  constructor(obj,scope,name){
    this.obj = obj;
    this.scope = scope;
    this.name = name;
    this.build();
  }
  build(){
    const task = new Date();
  }
}
