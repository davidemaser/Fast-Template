FASTER Template
======

## A scalable and scriptable templating engine model

Installation
------

- Fork this projects repo and clone locally git clone ...
- CD into the project root
- Execute npm install (install Node.js and NPM if not already done)
- Execute npm run build to build a local distribution.

Webpack configuration can be modified in the webpack.Config.js file. 

Introduction
------

Faster is a flexible templating engine that uses common html/xml tag formatting to simplify the creation of complex components and data fed objects.

Faster uses special tags within an html page that allows the user to inject a template assignment or data call simply, without having to code or tweak an existing component or layout.

How It Works
------

Faster tags are custom html elements that can be added to any html document. The faster tag (<b>&lt;ft&gt;,&lt;ftx&gt;,&lt;fta&gt;</b>) instructs Faster to treat the content of the tag
as a method with arguments, options and expressions. When the app is loaded by the browser, Faster will cycle through all tags and process the contents and objects it encounters. The Faster object
will be processed in order or asynchronously and the data returned will take the place of the Faster object. Faster does not register it's
own tags in order to avoid issues with older browsers. 

Semantics
------

This document uses some terms that may not be seen as standard identifiers. Since Faster has it's own markup format, it was difficult to
 define a naming convention. Below are some terms you will encounter and a description of their use in and by Faster tags.
 
##### Options
  
Options are encapsulated into the faster object's tag itself. Not all objects have options. ``{fastObject:option}``.
 
 NOTE: Faster logic objects like the IF object do not have options. The comparison value takes the place of the option. (i.e. {if:9*9=81}...)

##### Expressions  

Expressions make up the core of the Faster object. Expressions reside between the opening and closing Faster object tags. ``{tag}expression{~tag}``. There
is no predefined format for an expression. It can contain multiple comma separated parameters or arrays. Certain expressions are formatted as objects as they can
contain multiple objects or child objects. 

### Faster Tags 

<b><i>NOTE: Standard Faster tags will be deprecated in the next version. Functionality will be transferred to Faster eXperiment utilities</i></b>

><b>&lt;ft&gt;Standard Faster tags&lt;/ft&gt;</b>

Standard Faster tags allow you to create basic template objects and render simple html and/or JSON. FT tags, contrary to FTX tags are not objects. The tag content is a string and is parsed as such.

Below is a list of attributes that can be used in Faster Tags.

- class - defines the class to be assigned to the host
- render - define a html object into which the content will be rendered (i.e div, section, nav...)
- id - define the ID of the host element
- template - inputs a more complex html template into which the content will be injected
- json - inject a json formatted string as data. The json string will be parsed as content if no model is provided (not yet implemented)
- content - define the content of the html object (can be html)
##### Examples
1:
``<ft>class:new,render:div,content:{this is my content}</ft>``

will be parsed as:

``<div class="new">This is my content</div>``

2:
``<ft>template:div,content:{this is a template}</ft>``

will be parsed as

``<div class="assigned_in_template">this is a template</div>``

3:
``<ft>class:old,render:section,json:|{"name": "faster",
      "version": "1.0.0",
      "description": "",
      "main": "App.js"}|</ft>``
      
will render as
      
``<section class="old">Compiled JSON here</section>``

Tags can also have an ignore property assigned. These tags will not be parsed by Faster and will be removed from the dom. Ignore property is formatted as: ``<ft ignore>``

### Faster eXperiment tags
><b>&lt;ftx&gt;{object:option}expression{~object}&lt;/ftx&gt;</b>

Experiment tags are, as their name implies, the result of an experiment to render advanced properties using a simple template tag. These tags can be used to execute mathemtical equations, conditional clauses, build forms and page elements and render data in a table layout.
An FTX tag contains an object within which an expression determines the rendered result or modifies the parameters of the returned data.

FTX tags are made up of an opening and a closing tag ``{tag}{~tag}``. The tilda symbol close the FTX object. Between these tags, object parameters can be passed or, more simply, html can be injected. The following example shows the use of the
FTX form object.
 
``{form:login}{~form}`` If left as such, the basic login form will be rendered. This basic form will need to have an event handler bound to the button or submit event. 
``{form:login}action:a_url{~form}`` In this example, we've added the action property that will be added to the form object.

Each object has a specific list of accepted properties that can be chained together in the expression. Each property is separated by a comma. Properties are formatted as ``property:value``.
Certain properties can accept objects or arrays.

Below is a list of currently supported tags, how to implement them as well as accepted properties and options

#### math 
><b>{math}formula here{~math}</b>

The math tag has no options. The expression can be any mathematical formula
#### date 
><b>{date:option}date string {~date}</b>

The date tag has one option that can be either 'full' or 'short'. A full date view will display in the format dd/mm/yyyy h:m:s. A short date view will format only the date without the time. The
expression can be used to define the date string to render (i.e dd/mm/yy h:m)
#### if 
><b>{if:something=this}do this{else}do that{~if}</b>

The if tag allows you to insert logic. The option is the condition to check. It can be a string comparison, a mathematical comparison or a boolean comparison. In the case of mathematical operations,
if the condition calls a function than wrap it in square brackets (i.e. ``{if:[round(238*1.85)]=4}``). The expression returned by the tag can be a string.
#### form 
><b>{form:option}{~form}</b>

Awaiting documentation
#### panel
><b>{panel:option}{~panel}</b>

Awaiting documentation
#### gutter
><b>{gutter}string{~gutter}</b>

Awaiting documentation
#### json
><b>{json:url}expression{~json}</b>

Awaiting documentation
#### modal
><b>{modal:option}{~modal}</b>

Awaiting documentation
#### html
><b>{html}{~html}</b>

Awaiting documentation
#### animate
><b>{animate}{~animate}</b>

Awaiting documentation
#### nav
><b>{nav}{~nav}</b>

Awaiting documentation
#### placeholder
><b>{placeholder:option}{~placeholder}</b>

The placeholder object inserts an empty "placeholder" element. It's options can be large or small. The large or small size values
can be modified in the CSS.
#### accordion
><b>{accordion}{~accordion}</b>

The accordion object creates a simple and dynamic accordion object on the page. It does not have any options. Each accordion entry
must be separated by a line break. If a title is required, it can be added using the following format:

``{accordion}
[title=STRING] content is here
{~accordion}``
#### table
><b>{table:option}{~table}</b>
#### group
><b>{group}{~group}</b>

The group object, as it's name implies, "groups" all elements encapsulated by it in a section.
#### sticky
><b>{sticky:option}{~sticky}</b>

The sticky object creates a persistent (or sticky) element on the page. Option can be top or bottom 
#### search
><b>{search:default}target:this_link,placeholder:Enter Search Term Here,button:true,label:Search{~search}</b>

The search object creates a pre styled search component that can be placed in the page. The accepted option is default (generic search) or option (adds account creation and password
recovery links).

The search expression accepts the following parameters:

- target   url for the search form to process
- placeholder    text placeholder for the input box 
- button     boolean 
- label    text label for the button


#### bind
><b>{bind}{~bind}</b>
#### random
><b>{random:option}{~random}</b>

This object randomizes items it contains. Item should be separated by a line break. 

``{random}``

``<div>this is the first</div>``

``<div>this is the second</div>``

``{~random}``

#### mobile
><b>{mobile}{~mobile}</b>

This object wraps a mobile identifier around all content. Content within will be hidden from mobile browsers or styled to display correctly on mobile browsers. 
#### banner
><b>{banner:option}{~banner}</b>

The banner object creates a hero banner instance on the page. The hero banner consists of a full spanning background image, a title, a subtitle
and a CTA button. The banner can also be a basic text object or an html element. 

The banner option can be full or adapt. Adapt will format the banner to the size of it's parent. The banner expression accepts the following parameters. NOTE: The banner 
expression is formatted as an object 

- image: a schema-less url to the image
- title: this is the header text that will appear at the top of the banner container
- subtext: this is the text that will appear below the header text
- button: this is the label that will appear on the CTA button
- action: this is the link or action that will be applied to the CTA button


#### video
><b>{video:option}string{~video}</b>

Object creates a HTML5 video element that can contain multiple sources, tracks and parameters. Tag can bind to callback functions or external events.
The video option can be default or stream. A streamed video will load and buffer the video before playing.

The video expression accepts the following parameters.

- url: a schema-less url to the video. The url can also be formatted as an array to define multiple video source formats (``url:[//www.link.com format,//www.other.com format]``)
- width: the width of the video object
- height: the height of the video
- controls: display whether the video controls will be shown by default (true or false)
- autoplay: defines whether the video will play on load (true or false)
- poster: define the schema-less url to a preview image for the video
- subtitles: defines the link to the subtitles with the language parameter. The subtitles can be 
 formatted as an array (``subtitles:[en link,es link]``)
 
#### prefetch
><b>{prefetch}{~prefetch}</b>

Simple object that prefetches an asset and appends it to the document head
#### image
><b>{image:ratio}url:string{~image}</b>

The image object displays an image with specific proportions that are defined in the tag. The option can be a fraction or a numeric value. If numeric, the width/height
ratio will be reduced by X percent. 

The expression accepts one parameter, url. (i.e. ``{image:20}url://my_url.net{~image}``)
#### analytics
><b>{analytics:option}id:your_id{~analytics}</b>

The analytics object will inject either a basic google analytics tracker or a google tag manager instance to the page. The type can be either gtm or basic. 
The content must contain your analytics or GTM ID 
#### stylize
><b>{stylize}{~stylize}</b>

The stylize object allows you to create stylized html elements using a simple, semantic format. 

The first line of the stylize object, defines style attributes. All lines below define the content of the stylized element.

``{stylize}make paragraph background black color white size 22px font-family Verdana
      this is the content of the above item (in this case a div){`stylize}``
      
The first word of the stylize expression must be an accepted instruction (i.e. make,convert)      
#### trim
><b>{trim:length,direction}{ellipsis}{~trim}</b>

The trim object trims a string to a specified length. The trim object accepts a parameter to define whether the string is to be trimmed from the start of from the end (i.e. ``{trim:20,start}``) 

The trim object can also inject an ellipsis to the beginning or end of the trimmed string. To do so, add an ellipsis object (i.e. ``{trim:20,start}{ellipsis}string{~trim}`` )
#### links
><b>{links:option}{~links}</b>

The links object creates a multi-level link map that can be used to generate a site map. Links can be grouped into a hierarchical view.

The link option can be order (displays in the order they are written) or random. 

Line breaks split links into groups. To group multiple links together, use a greater then symbol ( > ) to separate them (i.e ``this is the text,thelink.com > this is the text,thelink.com > this is the text,thelink.com``)
#### filter
><b>{filter:option}{rules:string}{~filter}</b>

The filter object removes words from a string or from all elements that are children of this object. The filter object can also use rules to 
filter specific elements or words. Type can be code or word. The word option strips all explicit language and replaces with a defined replacement string. Rules
are defined as an object and work if the defined type is code. ``{filter:code}{rules:b,br}<i>Here</i> is <b>some</b> dummy text <br /> for this example{~filter}`` will return ``<i>Here</i> is some dummy text for this example``
#### wrap
><b>{wrap:option}{origin tag}{~wrap}</b>

The wrap object finds and wraps specific words with html tags. Option can be word or phrase. ``{wrap:word}{this div}Here is this text{~wrap}`` will return ``here is <div>this</div> text``
#### object
><b>{object:option}{save:string}string{~object}</b>

The object tag allows the user to define an object as a string within the page's html. The is saved to the global object and is accessible to other functions or methods. Accepted types are:

- array : Formatted as strings separated by commas. 
- object : Object must be a JSON formatted string.
- variable : Simple variable. Can be formatted as an array ({save:[first=this,second=that,third=those]}) 
- function : A simple function can be passed to the global object. It can be called by name.

#### poll
><b>{poll}url_or_ip{~poll}</b>

Object "pings" a url or ip to determine if the url or server is responding.
``{poll}www.google.com{~poll}``


### Faster Ajax Tags
><b>&lt;fta&gt;{json:url}node=root_node,show=5,saveAs=something{~json}&lt;/fta&gt;</b>

Faster Ajax tags allow you to execute an XHR request without ever touching the actual ajax call. The JSON data returned can be passed to a template and rendered or saved as a global object and used by other functions in the application (template models are currently in work).

The Faster Ajax tag only has one require parameter, the URL. Callbacks can be bound to the function to execute a custom function with the returned data.

The Faster Ajax object can accept the following properties:

- url: the url to the JSON file (the root of your data objects can be defined in the Global config file)
- node: defines the starting node in the JSON. If, for example your json is formatted as below:
````
{
  "thing":[
    {
    "param":"value"
    }
  ]
}
````
defining thing as the starting node ``node:thing`` would return only the data in the thing array.

- show: defines the number of the results to show from the returned data.
- saveAs: defines the name that the object will saves as. The object is bound to the window ``window['object']`` and is globally accessible.

### Customizing Templates

All templates used by Faster are completely customizable by modifying their associated code in the template config file. You can also very easily create your
own templates and use them to extend Faster's capabilities. Templates follow a simple structure that is defined below and contains only strict html and Faster 
placeholders. Continue reading below to learn how to extend templates and create your own.

##### Schema

Template objects follow a simple and straightforward schema. The object name is the same as the option passed in the Faster tag. (i.e. ``{form:login}``). This means
that within the template.js file, you need to have a node with the option name of your tag. 

### Faster Dom Manager

Faster includes a dom manager that allows the app to register and watch for events on the page. It is essentially a mutation observer that can execute sub calls when an event
occurs in the dom. The Dom Manager is registered to the window (under the core Faster object: see Global.appEvents) so it can be called by other functions. 

By default, the Dom Manager initializes a lister that is bound to all elements that have a ftx-render attribute. This can be modified to fit specific needs. Listeners can also be created
by other functions or methods.