/**
 * Created by David Maser on 29/06/2017.
 */
import {PluginConfig} from './config';
import Woops from '../classes/Woops';
import RegisterState from '../classes/RegisterState';
export default class InitPlugins{
  constructor(){
    this.run();
  }
  run(){
    let runList;
    if(Array.isArray(PluginConfig.installed)){
      runList = PluginConfig.installed;
      let p;
      for(p in runList){
        if(typeof PluginConfig.library[runList[p]] === 'object'){
          new RegisterState(runList[p],PluginConfig.library[runList[p]],'plugins');
          //execute plugin
        }else{
          new Woops({
            origin: 'InitPlugins.run',
            type: 'Plugin',
            message: 'Plugin Not found in configuration file',
            log: false
          })
        }
      }
    }else{
      runList = PluginConfig.installed;
      if(typeof PluginConfig.library[runList]){
        new RegisterState(runList,true,'plugins');
        //execute plugin
      }
    }
  }
}