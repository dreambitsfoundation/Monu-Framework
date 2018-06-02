# Monu Framework
## The simplest and hackable Javascript Frontend Framework

## Intro

Monu is a versatile Javascript framework developed on **MVC (Model View Controller)** architechture to provide frontend rendering to your web application.

It is powered by **JQuery** and **Moustache Framework**.


## Installation

It is very easy to install **Monu** in your exising web application.

You need to mention **Mustache CDN** and **Monu CDN** just after you **JQuery** library import.

```html
Mustache. CDN
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>

Development CDN
<script src="https://rawgit.com/dreambitsfoundation/Monu-Framework/master/monu.js" type="text/javascript"></script>

Production CDN
<script src="https://cdn.rawgit.com/dreambitsfoundation/Monu-Framework/3e3238b7/monu.js" type="text/javascript"></script>
```

## Initialisation

To initialise a **Monu Application** you have to create an instance of the object **MonuApp**.

```html
<script type="text/javascript">
  var app = new MonuApp();
</script>
```

Monu Framework is distributed into three modules **App**, **View** and **Router**

1. **App**

The App module is named by **MonuApp**, it contains all the required functions needed to run the MonuApp instance.

```html
<script type="text/javascript">
	// Create a MonuApp instance
	var app = new MonuApp();
	
	/* This place is meant to initialize the MRouter instances */
	
	// Run Monu app
	app.run();
</script>
```
_Note:_ A MonuApp instance cannot run without minimum one router. Most specifically the *root* MRouter instance. Calling a *run()* function without registering a root router will cause the app to throw exception.

_You will learn more about MRouter instance in the later part of this tutorial._

2. **View**

The View module is named by **MView**, it contains all the functions required to render a **MTemplate** to a tagret DOM element.
Monu is built on **MustacheJS** templating engine which provides the templating capability to the MView Module.

An **MView** object is initialised inside a **MRouter** module. MRouter is described in the **Router** part of the documentation.

```javascript

var view = new MView(source_MTemplate_DOM, target_DOM_to_render_content);

```
Here _source_MTemplate_DOM_ parameter refers to the value of **m_model** attibute of the source _MTemplate_ DOM.
And _target_DOM_to_render_content_ parameter refers to the value of the **m-view** attribute of the target DOM. This target DOM can be any HTML DOM.

To assign dynamic values into the MTemplate **.addContent(key,value)** function will be called on the MView instance.
Here the **key** refers to the specific template tags places in the MTemplate DOM.

```javascript

var view = new MView(source_MTemplate_DOM, target_DOM_to_render_content);
view.addContent("first_name", "John");
view.addContent("last_name", "Doe");

```
An associated MTemplate will be defined as follows

```html

<mtemplate m_model="source-template">
	Hi My name is {{first_name}} {{last_name}}!
</mtemplate>	

```

And the target DOM be like 

```html

<div m-view="target-dom">
</div>

```

_Note:_ MTemplate is explained in-depth in later part of the documentation.

Finally to compile a template **.prepareView()** function should be called on each view instances.

```javascript

var view = new MView("source_MTemplate_DOM", "target_DOM_to_render_content");
view.addContent("first_name", "John");
view.addContent("last_name", "Doe");
// Compile the template
view.prepareView();

```

3. **Router**

A Router module named by **MRouter**, it is the module that handles all the routes for the MonuApp instance.
MonuApp uses the _history_ stack of the **Window** object of a browser to navigate between different targets without reloading the pages. 

The change of location state is detected by the MonuApp instance and approprite router is execute that matches the value of the target parameter of the present _query string_.

A MRouter is instantiated using two parameters _target-value_ and the _callback function_.
Where _target-value_ is used to match the value of the "target" variable in the current URL query string, if the current _target_ value matches the _target-value_ parameter value then the router is executed by the MonuApp instance.

A MRouter is initialized by 

```javascript

var router = new MRouter("target-value", function(){});

```
MonuApp collects the URL query string data and process it in the key,value pair format and is stored in a Javascript Object that is passed to the _callback_ function by default. 



You can use the [editor on GitHub](https://github.com/dreambitsfoundation/Monu-Framework/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/dreambitsfoundation/Monu-Framework/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
