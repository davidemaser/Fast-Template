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

### Faster Tags 

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
><b>{form}{~form}</b>
#### panel
><b>{panel}{~panel}</b>
#### gutter
><b>{gutter}{~gutter}</b>
#### modal
><b>{modal}{~modal}</b>
#### html
><b>{html}{~html}</b>
#### animate
><b>{animate}{~animate}</b>
#### nav
><b>{nav}{~nav}</b>
#### placeholder
><b>{placeholder}{~placeholder}</b>
#### accordion
><b>{accordion}{~accordion}</b>
#### table
><b>{table}{~table}</b>
#### group
><b>{group}{~group}</b>
#### sticky
><b>{sticky}{~sticky}</b>
#### search
><b>{search}{~search}</b>
#### bind
><b>{bind}{~bind}</b>
#### random
><b>{random}{~random}</b>



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