/**
 * Created by David Maser on 19/06/2017.
 */
export const Global = {
  appObj:'__faster__',
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
    },
    overWriteSaves:false
  },
  init:{
    all:['this.Faster.remove.emptyTags','this.Faster.remove.ignoredTags','Architect.render']
  },
  options:{
    noWrapperElements:['panel','gutter','html'],
    app:{
      onFail:['killFunctions','emptyCache','log','restart'],
      onEnter:['runSniffer','runCycle','waitAndSnoop'],
      onLeave:['pauseFunctions','registerWait','stopFunctions','waitFor10ThenKillAll']
    },
    views:{
      model:'default'
    }
  },
  fastHtmlTags:{
    closes : [
      'div','section','button','nav','p','span','header','footer','strong','i','h1','h2','h3','h4','h5','h6','ul','li','menu','pre','select','u'
    ]
  },
  fastAnimator:{
    container:{
      layout:'<div @container.class></div>',
      class:'animation-layer',
      position:'absolute'
    }
  }
};
export let Log = [];