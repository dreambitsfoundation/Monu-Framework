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

Let's see a complete example

```html

<!DOCTYPE html>
<html>
	<head>
		<!-- Head Contents like <title>, <meta>, <style>, <link> etc -->
	</head>
	<body>


		<!-- Jquery CDN -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"
		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

		<!-- Mustache CDN -->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>

		<!-- Monu JS CDN -->
		<script src="https://cdn.rawgit.com/dreambitsfoundation/Monu-Framework/3e3238b7/monu.js" type="text/javascript"></script>

		<!-- Create Monu Application Instance -->
		<script type="text/javascript">
			
			// Initialization

			var app = new MonuApp();

			// Follow the instruction in the below documentation to get the MonuApp running

			app.run()
		</script>
	</body>
</html>

```

## Initialization

To initialize a **Monu Application** you have to create an instance of the object **MonuApp**.

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
_Note:_ A MonuApp instance cannot run without minimum one router. Most specifically the *root* MRouter instance. Calling a *`run()`* function without registering a root router will cause the app to throw exception and crash.

_You will learn more about MRouter instance in the later part of this tutorial._

2. **View**

The View module is named by **MView**, it contains all the functions required to render a **MTemplate** to a tagret DOM element.
Monu is built on **MustacheJS** templating engine which provides the templating capability to the MView Module.

An **MView** object is initialised inside a **MRouter** module. MRouter is described in the **Router** part of the documentation.

```javascript

var view = new MView();

// Set the source mtemplate and destination DOM element
view.registerView("source_MTemplate_DOM", "target_DOM_to_render_content");

```
Here _source_MTemplate_DOM_ parameter refers to the value of **m_model** attibute of the source _MTemplate_ DOM.
And _target_DOM_to_render_content_ parameter refers to the value of the **m-view** attribute of the target DOM. This target DOM can be any HTML DOM.

To assign dynamic values into the MTemplate **.addContent(key,value)** function will be called on the MView instance.
Here the **key** refers to the specific template tags places in the MTemplate DOM.

```javascript

var view = new MView();
view.registerView(source_MTemplate_DOM, target_DOM_to_render_content);
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

var view = new MView();
view.registerView("source_MTemplate_DOM", "target_DOM_to_render_content");
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

var router = new MRouter("target-value", function(queryStringParameters){});

```
MonuApp collects the URL query string data and process it in the key,value pair format and is stored in a Javascript Object that is passed to the _callback_ function by default by the MRouter object. 

To access the current query string parameters pass a variable to the _callback_ function as parameter. 
_Note:_ you can use your own variable in place of _queryStringParameters_.

MView instances are initialised inside MRouter callback function. Each MRouter may have _n_ number of MView instances as per the developer's requirement.

For Example:

Let the current URL be `http://www.example.com/subnav?target=user_info&firstname=John&lastname=Doe`

Then to catch the current route a router should be designed like this.

```javascript

var router = new MRouter("user_info", function(userData){
	var view = new MView("user_details_model","user_details_view");
	view.addContent("firstname",userData["firstname"]);
	view.addContent("lastname",userData["lastname"]);
	view.prepareView();
	//All the view instances must be returned in the end of the router callback function or else they won't be executed
	return view;
});

```
If this code is executed in favour of the HTML below

```html

<div m-view="user_details_view">
	<!-- Here the content from the template wii sit -->
</div>

<mtemplate m_model="user_details_model">
	Hello! My name is {{firstname}} {{lastname}}. 
</mtemplate>

```
This will produce the following result in the _div_ DOM
```markdown

Hello! My name is John Doe.

```

## MRouter 
## -------------------

### Routers are very specific
As explained above in the **App** section, a MonuApp instance must have a root router or else it will throw exception while executed. 

A root router does not have a _target-value_ and hence it is _null_ incase of the root router.
A root MRouter instance is executed when either there is no query string in the currrent URL or the _target_ value in the current query string is empty.

Everytime we create a new router they need to be registered within the app instance which is responsible for executing the router.

### Routers are synchronous
Routers are created as synchronous instances hence **MView** elements are good to be initialized when an asynchronous function has completed executing or else the values passed to an MView template which is an end result of the asynchronous task may result to an **undefined** value.

### A Router Instance in Depth
A Router instance houses the callback function that will be executed everytime user navigates to a new location using an **MAnchor** (described in the later part of this documentation). This may contains operations related to preparing data for the hence created **MView** instances, AJAX requests, initialization of **MView** instances etc. A router's callback function must return all variable having **MView** instance or else the hence initilized elements in the missing MView instance variable are not shown in the resulting route view.

_Please Note:_ **MView** view instances can be made to be rendered earlier within the _callback_ function. This is explained in the later part of this documentation.

### Connecting the Router to the MonuApp instance
After the router is initialized it has to be registered with the current _Monu App_ instance to listen to routes. Here the **registerRouter(routerInstanceVariable)** comes into use. **registerRouter(routerInstanceVariable)** is a memeber function of the MonuApp instance, so it has to be called on the current MonuAPP instance variable.

Moreover there is another function called **registerRoot(rootRouterInstanceVariable)** which is also a member function of the MonuApp class that is responsible for registering the _Root Router_ for the current MonuApp instance. **Be informed:** MonuApp instance will throw exception without a root router. So, consider creating a root router instance and register it prior to calling the **run()** function on the MonuApp instance because **RootRouter** is mandatory where as other member routers are complimentary.

Lets Look at an example:

```javascript

var app = new MonuApp();

var rootRouter = new MRouter(null,function(dataSet){
	var view = new MView();
	view.registerView("source_mtemplate_DOM","destination_DOM");
	
	//Any other code you would like to add

	view.prepareView()
	return view;
});


var contactRouter = new MRouter("contact",function(dataSet){

	//This router renders two different views

	var view = new MView();
	view.registerView("source_contact_mtemplate_DOM","destination_DOM");
	
	var viewTwo = new MView();
	viewTwo.registerView("second_source_contact_mtemplate_DOM","destination_DOM");
	
	//Any other code you would like to add

	view.prepareView();
	viewTwo.prepareView();
	return [view,viewTwo];
});

//Registering Routers
app.registerRoot(rootRouter);
app.registerRouter(contactRouter);

//Finally, running the MonuApp instance
app.run();

```

## MView
## ---------------

### Overview
An MView object works as a channel between an **mtemplate** DOM element and a desired output DOM element. It prepares a virtual template to be rendered into a real DOM element.

**Concept of MView**

Any dynamic website contains only a minimum part of content that is dynamic and the rest of the content that is used 
to present that data is static. So, if this static content is kept as a template and then compiled with dynamic 
contents and rendered into a physical DOM element that would be a lot easier for a developer to handle the data back 
and forth with the web application server. 

It also facilitates front-end navigation in the website as the developer can employ REST API endpoints to fetch
content and execute CRUD operations directly from the front-end.

All the data members (including variables and functions) related to a particular view are suggested to be written 
within the router's callback function so that they gets out of scope once the router has completed executing unless 
any data member within the function is required by other router instances which needs the same data member to be 
declared or initialized globally.

**MView in depth**

MView is used in MRouter instances to put a template into view, it also inserts and hence compiles the template with dynamic data 




<!-- 
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

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out. -->
