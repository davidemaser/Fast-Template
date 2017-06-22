/**
 * Created by David Maser on 22/06/2017.
 */
export const Template = {
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
  }
};