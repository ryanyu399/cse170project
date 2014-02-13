	jQuery(document).ready(function($) 
	{
      $(".clickableRow").click(function() 
      {
      	var name = $(this).attr("id");
		window.document.location = $(this).attr("href");
      	//var name = $(this).attr("id");
      	//$("#reload").load("labs.html");
      });
	});
