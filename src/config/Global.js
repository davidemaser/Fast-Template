/**
 * Created by David Maser on 19/06/2017.
 */
export const Global = {
  appObj:'__faster__',
  appHead:'head',
  appRoot:'body',
  appStatus:'prod', //change this to dev if you want to see the pre-processed Faster tags
  appEvents:{
    enable:true, //this will turn on/off the mutation observer for all ftx-render objects
    root:'*[ftx-render]'
  },
  node:'ft',
  cycleOrder:['ftx','ft','fta'],
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
    render:'<span ftx-render ftx-ajax>@return</spanftx-render>',
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
    noWrapperElements:['panel','gutter','html','nav','placeholder','group','banner','mobile','video'],
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
  rules:{
    language:{
      restricted:['crap','poo','caca'],
      replacement:'***'
    }
  },
  userObjects:{
    enable:true,
    handle:'userObjects',
    array:{
      identifier:'arrays'
    },
    object:{
      identifier:'objects'
    },
    function:{
      identifier:'functions'
    }
  }
};
export let Log = [];