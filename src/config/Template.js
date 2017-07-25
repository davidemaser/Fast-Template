/**
 * Created by David Maser on 22/06/2017.
 */
/**
 * Defines all tamplate objects used by Faster.
 * Template params are stated as @value or @parent.value
 * @type {{div: {basic: string, styled: string}, footer: string, clone: string, banner: {layout: string, image: string, title: string, subtext: string, button: string}, video: {layout: string, dimensions: {layout: string, width: string, height: string}, options: {layout: string, autoplay: string, control: string, poster: string}, track: {subtitles: string, source: string}}, fastAnimator: {container: {layout: string, class: string, position: string}}, head: {prefetch: string}, nav: {link: string, layout: {horizontal: string, vertical: string}, node: {layout: string, entry: string}}, table: {layout: {basic: string}, header: {layout: string}, footer: {layout: string}, body: {layout: string}, row: {layout: string}, column: {layout: string}}, accordion: {parent: string, item: string, params: {speed: number, trigger: string, target: string}}, gutter: {layout: string}, panel: {layout: string}, modal: {full: {layout: string, prompt: {simple: string, full: string}}, params: {speed: number, trigger: string, target: string, prompts: {yes: {speed: number, trigger: string, target: string}, no: {speed: number, trigger: string, target: string}}}}, random: {layout: string}, class: string, id: string, name: string, forms: {search: {layout: string, button: string}, login: {layout: string, class: string, id: string, style: string, action: string, elements: [*]}, account: {layout: string, elements: [*]}}, analytics: {google: {gtmCode: string, gtAnalytics: string, gtmDataLayer: string}}, instruct: {events: [*], keys: [*], containers: [*], attributes: [*]}}}
 */
export const Template = {
  div:{
    basic:'<div data-atrribute="jeer">',
    styled:'<@elem @id style="@style">@content</@elem>'
  },
  footer:'<footer>',
  clone:'<section ftx-render ftx-clone></section>',
  banner:{
    layout:'<section ftx-render class="ftx__banner @option">@content</section>',
    image:'<div id="@ftx.id" class="ftx__banner container" ftx-action="@banner.action" style="background:url(@banner.image);background-size: cover;background-repeat: no-repeat;">@banner.content</div>',
    title:'<h1 class="ftx__banner_title">@banner.title</h1>',
    subtext:'<p class="ftx__banner_subtext">@banner.subtext</p>',
    button:'<div class="ftx__banner_row"><button class="ftx__banner_button">@banner.button</button></div>'
  },
  video:{
    layout:'<video @id ftx-render @dimensions @url @options>@video.src@video.track</videoftx-render>',
    dimensions:{
      layout:'@dimensions.width @dimensions.height',
      width:'width="@video.width"',
      height:'height="@video.height"'
    },
    options:{
      layout:'@autoplay @controls @poster',
      autoplay:'autoplay',
      control:'controls',
      poster:'poster="@video.poster"'
    },
    track:{
      subtitles:'<track kind="subtitles" src="@video.subtitles.url" srclang="@video.subtitles.lang">',
      source:'<source src="@video.subtitles.url" type="video/@video.subtitles.format">'
    }
  },
  fastAnimator:{
    container:{
      layout:'<div ftx-render @container.class></divftx-render>',
      class:'animation-layer',
      position:'absolute'
    }
  },
  head:{
    prefetch:'<link ftx-render rel="prefetch" href="@prefetch.url" />'
  },
  nav:{
    link:'<div ftx-role="nav-parent" ftx-link="@link">@label@nav</div>',
    layout:{
      horizontal:'<nav ftx-render class="ftx__nav_horizontal">@nav.node</nav>',
      vertical:'<nav ftx-render class="ftx__nav_vertical">@nav.node</nav>'
    },
    node:{
      layout:'<div class="ftx__nav_dropdown">@node</div>',
      entry:'<div class="ftx__nav_node" ftx-link="@node.link">@node.entry</div>'
    }
  },
  table:{
    layout:{
      basic:'<table ftx-render class="ftx__table">@table.header@table.body@table.footer</tableftx-render>'
    },
    header:{
      layout:'<thead>@table.row</thead>'
    },
    footer:{
      layout:'<tfoot>@table.row</tfoot>'
    },
    body:{
      layout:'<tbody>@table.row</tbody>'
    },
    row:{
      layout:'<tr>@table.column</tr>'
    },
    column:{
      layout:'<td>@content</td>'
    }
  },
  accordion:{
    parent:'<div ftx-render class="ftx__accordion">@accordion.item</div>',
    item:'<div class="accordion_item"><div class="item__title">@accordion.item.title</div><div class="item__body">@accordion.item.body</div></div>',
    params:{
      speed:500,
      trigger:'.ftx__accordion .accordion_item .item__title',
      target:'.item__body'
    }
  },
  gutter:{
    layout:'<section ftx-render class="ftx__gutter">@render</section>'
  },
  panel:{
    layout:'<section ftx-render class="ftx__panel">@render</section>'
  },
  modal:{
    full:{
      layout:'<div ftx-render class="ftx__modal__cta"><button ftx-event="user opens modal">@modal.cta</button></div><div class="ftx__modal"><div class="ftx__modal__overlay"></div><div class="ftx__modal__inlay"><div class="ftx__modal__title">@modal.title</div><div class="ftx__modal__message">@modal.message</div>@inject.prompt</div></div>',
      prompt:{
        simple:'<div class="ftx__modal__prompt"><button ftx-event="user agrees" ftx-user-agrees>@modal.prompt.confirm</button></div>',
        full:'<div class="ftx__modal__prompt"><button ftx-event="user agrees" ftx-user-agrees>@modal.prompt.confirm</button><button ftx-event="user refuses" ftx-user-refuses>@modal.prompt.refuse</button></div>'
      }
    },
    params:{
      speed:100,
      trigger:'.ftx__modal__cta button,.ftx__modal__prompt button',
      target:'.ftx__modal',
      prompts:{
        yes:{
          speed:100,
          trigger:'.ftx__modal__prompt button[ftx-user-agrees]',
          target:'.ftx__modal'
        },
        no:{
          speed:100,
          trigger:'.ftx__modal__prompt button[ftx-user-refuses]',
          target:'.ftx__modal'
        }
      }
    }
  },
  random:{
    layout:'<@option ftx-render class="ftx__random">@content</@option>'
  },
  class:' class="@class"',
  id:' id="@id"',
  name:' name="@name"',
  forms:{
    search:{
      layout:'<div class="ftx__component search"><input ftx-target="@search.target" name="ftx_search" id="ftx_comp_search" type="text" placeholder="@search.placeholder" />@search.button</div>',
      button:'<button ftx-event="user executes search">@search.label</button>'
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
  },
  analytics: {
    google: {
      gtmCode: "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});" +
      "var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })" +
      "(window,document,'script','dataLayer','@user.id');</script>",
      gtAnalytics: "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', '@user.id', 'auto'); ga('send', 'pageview'); </script>",
      gtmDataLayer: "<script>dataLayer = [{'pageCategory': 'signup','visitorType': 'high-value'}];</script>"

    }
  },
  instruct:{
    events:['make'],
    keys:['with','except','and','only'],
    containers:['div','section','paragraph','span'],
    attributes:['background']
  }
};