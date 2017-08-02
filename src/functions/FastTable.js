/*
 * Created by David Maser on 13/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import {Architect} from '../components/Faster';
/**
 *
 * @param {string} option
 * @param {string|object} expression
 * @param {string|object} element
 * @constructor
 */
export default function FastTable(option,expression,element){
  let objLayout = Template.table.layout[option];
  let objRow = Template.table.row.layout;
  let objCol = Template.table.column.layout;
  let objHeader = Template.table.header.layout;
  let objFooter = Template.table.footer.layout;
  let objBody = Template.table.body.layout;
  let ajaxUrl = Global.ajax.root.url;
  if(expression.indexOf('json:')>-1){
    let jsonPath = expression.split('json:')[1].split('}')[0];
    getRemoteJson(`${ajaxUrl}/${jsonPath}.json`);
  }
  function getRemoteJson(url){
    $.ajax({
      url:url,
      success:function(data){
        build.all(data);
      },
      error:function(e){
        new Woops({
          origin:'FastNav.getRemoteJson',
          type:'AJAX Error',
          message:'Unable to handle the AJAX request',
          log:false
        })
      }
    })
  }
  let build = {
    all:function(obj){
      let inNode = obj.table;
      let tableHeader = typeof inNode.columns === 'object' ? this.header(inNode.columns) : '' ;
      let tableFooter = typeof inNode.columns === 'object' ? this.footer(inNode.columns) : '' ;
      let tableRows = typeof inNode.rows === 'object' ? this.rows(inNode.rows) : null;
      objLayout = tableHeader !== undefined && tableHeader !== '' ? objLayout.replace('@table.header',tableHeader) : objLayout.replace('@table.header','');
      objLayout = tableRows !== undefined && tableRows !== '' ? objLayout.replace('@table.body',tableRows) : objLayout.replace('@table.body','');
      objLayout = tableFooter !== undefined && tableFooter !== '' ? objLayout.replace('@table.footer',tableFooter) : objLayout.replace('@table.footer','');
      Architect.build.experiment($(Global.appRoot).find(`[fstx-id="${element}"]`),null,objLayout,true);
    },
    rows:function(obj){
      let rowString = '';
      if(Array.isArray(obj)) {
        obj.map(function (a) {
          rowString += objRow.replace('@table.column', build.columns(a.line));
        });
      }
      return objBody.replace('@table.row',rowString);
    },
    columns:function(obj){
      let columnString = '';
      if(Array.isArray(obj)){
        obj.map(function(a){
          columnString += objCol.replace('@content',a);
        })
      }
      return columnString;
    },
    header:function(obj){
      if(typeof obj.header === 'object'){
        let colString = '';
        obj.header.map(function(a){
          colString += objCol.replace('@content',a);
        });
        let rowString = objRow.replace('@table.column',colString);
        return objHeader.replace('@table.row',rowString);
      }
    },
    footer:function(obj){
      if(typeof obj.footer === 'object'){
        let colString = '';
        obj.footer.map(function(a){
          colString += objCol.replace('@content',a);
        });
        let rowString = objRow.replace('@table.column',colString);
        return objFooter.replace('@table.row',rowString);
      }
    }
  }
}