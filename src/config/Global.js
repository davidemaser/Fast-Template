/**
 * Created by David Maser on 19/06/2017.
 */
export const Global = {
  noWrapperElements:['panel','gutter'],
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
    node:'fta',
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
  options:{
    app:{
      onFail:['killFunctions','emptyCache','log','restart'],
      onEnter:['runSniffer','runCycle','waitAndSnoop'],
      onLeave:['pauseFunctions','registerWait','stopFunctions','waitFor10ThenKillAll']
    },
    views:{
      model:'default'
    }
  }
};
export let Log = [];