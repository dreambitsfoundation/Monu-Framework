// Starting the navigation randering using Jquery

$(document).ready(function(){
  loadMustache();
  hideAllTemplates();
  checkActiveAnchor();
  templateEngine();

  $(".anchor").click(function(){
    var anchor_target = $(this).attr("target");
    activateTemplate(anchor_target);
  });
});

//Load Mustache Templating Engine
function loadMustache(){
	var mustache = document.createElement('script');  
	mustache.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js');
	document.head.appendChild(mustache);
}

function templateEngine(){
	var template = $("mtemplatemodel").html();
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
