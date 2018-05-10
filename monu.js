// Starting the navigation randering using Jquery

$(document).ready(function(){
  hideAllTemplates();
  checkActiveAnchor();

  $(".anchor").click(function(){
    var anchor_target = $(this).attr("target");
    activateTemplate(anchor_target);
  });
});

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
