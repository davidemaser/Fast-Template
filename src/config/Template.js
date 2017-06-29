/**
 * Created by David Maser on 22/06/2017.
 */
export const Template = {
  div:'<div data-atrribute="jeer">',
  footer:'<footer>',
  gutter:{
    layout:'<section ftx-render class="ftx__gutter">@render</section>'
  },
  panel:{
    layout:'<section ftx-render class="ftx__panel">@render</section>'
  },
  modal:{
    full:{
      layout:'<div class="ftx__modal__cta"><button>@modal.cta</button></div><div class="ftx__modal"><div class="ftx__modal__overlay"></div><div class="ftx__modal__inlay"><div class="ftx__modal__title">@modal.title</div><div class="ftx__modal__message">@modal.message</div><div class="ftx__modal__prompt"><button>@modal.prompt</button></div></div></div>'
    }
  },
  table:{
    layout:'<table@table.class@table.id@table.style>@table.elements.header@table.elements.body@table.elements.footer</table>',
    class:' class="@class"',
    id:' id="@id"',
    style:' style="@style"',
    elements:{
      header:{
        layout:'<thead></thead>'
      },
      footer:{
        layout:'<tfoot></tfoot>'
      },
      body:{
        layout:'<tbody>@body.rows</tbody>',
        rows:{
          layout:'<tr>@body.rows.columns</tr>',
          style:'style="@table.rows.style"',
          columns:'<td></td>'
        }
      },
    }
  },
  login:{
    layout:'<form@login.class@login.id@login.style@login.action>@login.elements</form>',
    class:' class="@class"',
    id:' id="@id"',
    style:' style="@style"',
    action:' action="@action"',
    elements:[
      {
        element:'input',
        type:'text',
        name:'userName',
        placeholder:'USER NAME',
        class:'',
        id:''
      },
      {
        element:'input',
        type:'password',
        name:'passWord',
        placeholder:'PASSWORD',
        class:'',
        id:''
      },
      {
        element:'input',
        type:'checkbox',
        name:'myCheck',
        class:'',
        id:'',
        checked:true
      },
      {
        element:'input',
        type:'radio',
        name:'myRadio',
        class:'',
        id:''
      },
      {
        element:'radiogroup',
        type:'radio',
        name:'myRadio',
        class:'',
        id:'',
        options:[
          {
            label:'hi',
            value:'hi'
          },
          {
            label:'bye',
            value:'bye'
          },
          {
            label:'what',
            value:'what',
            selected:true
          }
        ]
      },
      {
        element:'textarea',
        placeholder:'',
        name:'TEXT',
        rows:10,
        cols:10,
        class:'',
        id:''
      },
      {
        element:'select',
        name:'TEXT',
        class:'',
        id:'',
        options:[
          {
            label:'hi',
            value:'hi'
          },
          {
            label:'bye',
            value:'bye'
          },
          {
            label:'what',
            value:'what',
            selected:true
          }
        ]
      },
      {
        element:'input',
        type:'submit',
        name:'myButton',
        placeholder:'CLICK',
        class:'',
        id:''
      },
    ]
  },
  account:{
    layout:'<form@account.class@account.id@account.style@account.action>@account.elements</form>',
    elements:[
      {
        element:'input',
        type:'text',
        name:'userName',
        placeholder:'USER NAME',
        class:'',
        id:''
      }
    ]
  }
};