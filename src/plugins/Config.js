/**
 * Created by David Maser on 29/06/2017.
 */
export const PluginConfig = {
  registerTo:'window',
  scope:'public',
  nameSpace:'fpi',
  installed:['langy','stripper'],
  library:{
    langy:{
      run:'onLoad',
      process:'init',
      use:'defaults',
      path:'./',
      package:true
    },
    stripper:{
      run:'afterLoad',
      process:'run',
      use:'defaults',
      path:'./dist/',
      package:true
    }
  }
};
export const PluginAbstractor = {
  run:false,
  list:PluginConfig.installed,
  import:'library',
  exports:true
};