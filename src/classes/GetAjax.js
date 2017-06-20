/**
 * Created by David Maser on 20/06/2017.
 */
import {Global} from '../config/Global';
import Woops from './Woops';
export default class GetAjax{
  constructor(url){
    this.url = url;
    this.ajaxUrl = `../${Global.ajax.root}${this.url}`;
    this.execute();
  }

  execute(){
    return new Promise((resolve, reject)=>{
      let req = new XMLHttpRequest();
      req.open("GET", this.ajaxUrl);
      req.onload = () => {
        if (req.status === 200) {
          console.log(req.response);
          resolve(req.response);
        } else {
          reject(
            new Woops({
              origin:'GetAjax.execute',
              type:'AJAX Error',
              message:req.statusText,
              log:false
            })
          )
        }
      };

      req.onerror = () => {
        reject(
          new Woops({
            origin:'GetAjax.execute',
            type:'AJAX Error',
            message:'Unable to process the ajax request. Check the path to your json file',
            log:false
          })
        );
      };

      req.send();
    });
  }
}