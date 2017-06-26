/**
 * Created by David Maser on 19/06/2017.
 */
export const Global = {
  node:'ft',
  experiment:{
    node:'ftx',
    render:'<span ftx-render>@return</span>',
    nested:'nested',
    date:{
      full:'mm/dd/yyyy h:m:s',
      noTime:'mm/dd/yyyy',
      compact:'mm/dd/yy'
    }
  },
  ignore:'ignore',
  ajax:{
    node:'ftxj',
    useDefault:true,
    render:'<span ftx-ajax>@return</span>',
    root:{
      node:'data',
      url:'../data'
    }
  },
  init:{
    all:['this.Faster.remove.emptyTags','this.Faster.remove.ignoredTags','Architect.render']
  },

};
export let Log = [];