/*
*   MonuJS is a lightweight hackable JS framework, powered by JQuery and Mustache JS
*
*  This framework is built on MVT (Model View Template) architecture that allows single page navigation and rendering
*   using Templates, Views and Routers.
*
*  For complete documentation please visit https://github.com/dreambitsfoundation/Monu-Framework
*  Please rate the project with Star and Submit a pull request if you wish to contribute.
*
*  Note: MonuJS is undergoing regular updates and bug fixes. Please be active to get latest changes.
*
* */


// Starting the navigation randering using Jquery

$(document).ready(function(){
	$(".manchor").css("cursor","pointer");
});

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
};

//Load Mustache Templating Engine
function loadMustache(){
	var mustache = document.createElement('script');
	mustache.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js');
	document.head.appendChild(mustache);
}




//Monu Router Class
function MRouter(targetURl,viewfunction){
	/*
		*Target URL is the target parameter seen on the get request

		*viewFunction is the callback function which is to be initiated
		 while target URL maches the current target parameter
	*/
	this.targetURl = targetURl;
	this.views = null;
	this.run = function(DataSet){
		//After the execution of the view function. Views are retured to the router.
		this.views = viewfunction(DataSet);
		if(this.views instanceof Array){
			for(var i=0; i<this.views.length; i++){
				this.views[i].StageView();
			}
		}else{
			this.views.StageView();
		}
	}
	this.dissolve = function(){
		if(this.views instanceof Array){

			for(var i=0; i<this.views.length; i++){
				this.views[i].CurtainView();
				delete this.views[i];
			}
		}else{
			this.views.CurtainView();
			delete this.views;
		}
	}
}


//Monu Application

function MonuApp(){
	MonuApp.instances.push(this);
	this.runnerObjects = {};
	this.activeView = null; //Router Object
	this.lastRequestHref = "";
	this.currentRequestTarget = null;
	this.currentRequestDataSet = {};
	this.root = null; //Router Object
	this.defaultTemplateTags = new Array('{{','}}');
	this.changeTemplateTags = function(startTag, endTag){
		if(typeof startTag == "string" && typeof endTag == "string"){
			this.defaultTemplateTags = new Array(startTag,endTag);
		}
	};
	this.registerRoot = function(Router){
		this.root=Router
	};

	this.registerRouter = function(Router){
		this.runnerObjects[Router.targetURl] = Router;
	};

	this.ProcessUrl = function(){

		    this.ParseURL();
		    //This point forward we have the current request target and current request DataSet.
		    if(this.currentRequestTarget == null){
		    	if(this.root == null){
		    		throw ("Error 404: Root Router Not Set");
		    	}else{
		    		if(this.activeView){
		    			this.activeView.dissolve();
		    		}
		    		var router = this.root;
		    		router.run(this.currentRequestDataSet);
		    		this.activeView = router;
		    	}
		    }else{
		    	var router = this.getRouter();
		    	if(this.activeView){
		    		this.activeView.dissolve();
		    	}
		    	//console.log(router);
			    router.run(this.currentRequestDataSet);
			    //console.log(router);
			    this.activeView = router;
		    }
	};

	this.ParseURL = function () {
        var sPageURL = window.location.search.substring(1);
        if(document.location.search == ""){
        	this.currentRequestTarget = null;
        	this.currentRequestDataSet = {};
        }else{
        	this.currentRequestDataSet={};
        	var sURLVariables = sPageURL.split('&');
	        for (var i = 0; i < sURLVariables.length; i++)
	        {
	            var sParameterName = sURLVariables[i].split('=');
	            if (sParameterName[0] == "target")
	            {
	            	//console.log(decodeURIComponent(sParameterName[1]));
	            	this.currentRequestTarget = decodeURIComponent(sParameterName[1]);
	            }else{
	            	this.currentRequestDataSet[sParameterName[0]] = decodeURIComponent(sParameterName[1]);
	            }
	        }
	        //console.log(this.currentRequestTarget);
        }

    };

    this.serializeCurrentDataSet = function(){
    	var str = [];
		  for (var p in this.currentRequestDataSet)
		    if (this.currentRequestDataSet.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this.currentRequestDataSet[p]));
		    }
		  return str.join("&");
    };

    

	this.run = function(){

		createNavigationQueryString = function(JSONQueryData){
			var final_query_string = "";
			for(var q in JSONQueryData){
				if(JSONQueryData.hasOwnProperty(q)){
					final_query_string += "&" + encodeURIComponent(q) + "=" + encodeURIComponent(JSONQueryData[q]);
				}
			}
			return final_query_string;
		};

		$("a").on("click", function(event){
			//console.log("Anchor click");
			var target = $(this).attr("href");
			if(target != undefined && target[0] == "#"){
				if(target.length > 1){
                    $(window).scrollTop($(target).offset().top);
				}
			}
		});
        $(".manchor").on("click",function(event){
            ////console.log("Click action caused");
            ////console.log($(this));
            var template = $(this).attr("target");
            var data = $(this).attr("data");
            var target_string = "?target="+template;
            if(data){
                ////console.log(data);
                try{
                    data = JSON.parse(data.replaceAll("'","\""));
                    ////console.log(typeof data);
                    target_string += createNavigationQueryString(data);

                }catch(e){
                    throw(e);
                }
            }
            window.history.pushState({},null,target_string);
            event.preventDefault();
        });
		window.onpopstate = history.onpushstate = function(e) {
		    ////console.log(e.State);
		    ////console.log(window.location.href);
		    return RefreshAllRoutes(window.location.href);
		};



		//Run ProcessUrl function of Class Initialization
		$("[m-view]").hide();
		$("mtemplate").hide();
		if (typeof Mustache == 'undefined') {
			$.getScript("https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js")
			.done(function(){
				Mustache.tags=this.defaultTemplateTags;
			})
		}else{
			Mustache.tags=this.defaultTemplateTags;
		}
		this.ProcessUrl();
	};

	//Returns the router assosciated with the current URL pattern
	this.getRouter = function(){
		if(this.currentRequestTarget == ""){
			return this.root;
		}
		var router = this.runnerObjects[this.currentRequestTarget]; // Returns Router Object
		return router;
	}
}
//End of Monu App Class

MonuApp.prototype.destroy = function () {
    var i = 0;
    while (MonuApp.instances[i] !== this) { i++; }
    MonuApp.instances.splice(i, 1);
};

MonuApp.instances = [];

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        var a = pushState.apply(history, arguments);
        RefreshAllRoutes(window.location.href);
        return a;
    };
    var popState = history.popState;
    history.popState = function(state) {
        if (typeof history.onpopstate == "function") {
            history.onpopstate({state: state});
        }
        var a = popState.apply(history, arguments);
        RefreshAllRoutes(window.location.href);
        return a;
    };
})(window.history);

/*
	RefreshAllRoutes function is used to call ProcessUrl() menthod
	in all the instance of MonuApp class on change in window.history stack
*/

function RefreshAllRoutes(a){
	////console.log("Refresing all Routes");
	for(var i = 0; i<MonuApp.instances.length; i++){
		MonuApp.instances[i].ProcessUrl();
	}
}

// End of RefreshAllRoutes method

//Definition of replaceAll function for String class.
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
//End of String class replaceAll() method.

//Monu View Class
function MView(){
	this.template = null; //Jquery Selector object
	this.view = null; //Jquery Selector object
	this.content = {};
	this.html = "";
	this.isStaged = false;
	this.registerView = function(sourceTemplate,targetView){
		this.template = $("mtemplate[m_model="+sourceTemplate+"]");
		this.view = $("[m-view="+targetView+"]");
		////console.log(this.template);
		////console.log(this.view);
	}

	this.addContent = function(key,value){
		this.content[key] = value;
	}

	//PrepareView function loads the Mustache template and assign the data Context to the template
	//provided that the keys in the content must match the template field.
	this.prepareView = function(){
		
		var templateModel = this.template.html();
		var renderModel = "";
		if (typeof Mustache == 'undefined') {
			$.getScript("https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js")
			.done(function(){
				
				Mustache.parse(templateModel);
			    ////console.log(this.content);
				renderModel = Mustache.render(templateModel,this.content);
			})
		}else{
			
			Mustache.parse(templateModel);
		    ////console.log(this.content);
			renderModel = Mustache.render(templateModel,this.content);
		}
		this.html = renderModel;
	};

	//StageView function sets the view object html content and show.
	this.StageView = function(){
		
		if(!this.isStaged){
			this.view.html(this.html);
			this.view.show();
			this.isStaged = true;
		}
	};

	//CurtainView function cleares the html content in the view object and hides it.
	this.CurtainView = function(){
		//console.log("hiding");
		if(this.isStaged){
			this.view.html("");
			this.view.hide();
		}
	};
}
