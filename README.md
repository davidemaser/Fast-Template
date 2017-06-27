# FAST Template
### A scalable and scriptable templating engine model

Fast is a flexible templating engine that uses common html/xml tag formatting to simplify the creation of complex components and data fed objects.

Fast uses special tags within an html page that allows the user to inject a template assignment or data call simply, without having to code or tweak an existing component or layout.

#### Fast Tags 
``<ft>Standard Fast tags</ft>``

Standard Fast tags allow you to create basic template objects and render simple html and/or JSON. FT tags, contrary to FTX tags are not objects. The tag content is a string and is parsed as such.

Below is a list of attributes that can be used in Fast Tags.

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

Tags can also have an ignore property assigned. These tags will not be parsed by Fast and will be removed from the dom. Ignore property is formatted as: ``<ft ignore>``

#### Fast eXperiment tags
``<ftx>{object:option}expression{~object}</ftx>``

#### Fast Ajax Tags
``<fta>Fast Ajax tags</fta>``