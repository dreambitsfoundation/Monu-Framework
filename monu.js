// Starting the navigation randering using Jquery

$(document).ready(function(){
	$(".manchor").css("cursor","pointer");
  loadMustache();
  hideAllTemplates();
  checkActiveAnchor();
  templateEngine();

  // $(".manchor").click(function(){
  //   var anchor_target = $(this).attr("target");
  //   activateTemplate(anchor_target);
  // });
});

//Load Mustache Templating Engine
function loadMustache(){
	var mustache = document.createElement('script');  
	mustache.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js');
	document.head.appendChild(mustache);
}


//Monu Router Class
function MRouter(targetURl,viewfunction){
	this.targetURl = null;
	this.run = function(){
		viewfunction();
	}
}


//Monu Application

function MonuApp(){
	//this.urls = [];
	this.runnerObjects = {};
	this.activeView = null; //Router Object
	this.currentRequestTarget = "";
	this.currentRequestDataSet = {};
	this.root = null; //Router Object
	this.registerRouter = function(Router){
		//this.urls.push(Router);
		this.runnerObjects[Router.targetURl] = Router;
	}

	this.ParseURL = function () {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == "target")
            {
            	this.currentRequestTarget = decodeURIComponent(sParameterName[1]);
            }else{
            	this.currentRequestDataSet[sParameterName[0]] = decodeURIComponent(sParameterName[1]);
            }
        }
    }

    this.serializeCurrentDataSet = function(){
    	var str = [];
		  for (var p in this.currentRequestDataSet)
		    if (this.currentRequestDataSet.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this.currentRequestDataSet[p]));
		    }
		  return str.join("&");
    }

	this.run = function(){
		$(".manchor").click(function(){
			var template = $(this).attr("target");
			var data = $(this).attr("data");
			var target_string = "?target="+template;
			if(data){
				try{
					JSON.parse(data);
					target_string += "&"+this.serializeCurrentDataSet()
				}
			}
			window.history.pushState({},null,target_string);
		});

		(function(history){
		    var pushState = history.pushState;
		    history.pushState = function(state) {
		        if (typeof history.onpushstate == "function") {
		            history.onpushstate({state: state});
		        }
		        return pushState.apply(history, arguments);
		    };
		})(window.history);

		window.onpopstate = history.onpushstate = function(e) {
		    // i++;
		    // $('#location').text(window.location.href);
		    // $('#msg').text('History changed ' + i  +
		    //                ' times (State object: ' +
		    //                JSON.stringify(e.state) + ')');

		    //Need to add the router locator
		    this.ParseURL();
		    //This point forward we have the current request target and current request DataSet.

		};
	}

	this.getRouter = function(){
		var router = 
	}




}



//Monu View Class
function MView(){
	this.template = null;
	this.view = null;
	this.content = {};
	this.registerView = function(sourceTemplate,targetView){
		this.template = sourceTemplate;
		this.view = targetView;
	}

	this.addContent = function(key,value){
		this.content[key] = value;
	}

	this.prepareView = function(){
		var templateModel = $("mtemplate" + obj.sourceTemplate).html();
		Mustache.parse(templateModel);
		var renderModel = Mustache.render(templateModel,obj.content);
		return renderModel;
	}
}



function templateEngine(){
	var template = $("mtemplate").html();
	Mustache.parse(template);
	var rendered = Mustache.render(template,{"some_information": "Hello"});
	$("div").html(rendered);
}

function checkActiveAnchor(){
  var active_target = $(".anchor.m_active_menu").attr("target");
  activateTemplate(active_target);
}

function hideAllTemplates(){
  //This function will be used to hide all the templates.
  $("mtemplate").removeClass("m_active").addClass("m_hidden");
}

function activateTemplate(anchor_target){
  //Here anchor target is the id of the template that is mentioned
  //target parameter in <a> with anchor class
  (function(){
    //Deactivate all other anchors
    $(".anchor.m_active_menu").removeClass("m_active_menu");
    hideAllTemplates();
  })();
  $("mtemplate"+anchor_target).removeClass("m_hidden").addClass("m_active");
}
