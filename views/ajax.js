$(function()
{
	$("a[rel='tab']").click(function(e)
	{
		
		//get the link location that was clicked
		pageurl = $(this).attr('href');
		
		//to get the ajax content and display in div with id 'content'
		$.ajax({url:pageurl+'?rel=tab',success: function(data)
		{
			$('#content').html(data);
		}});
		
		//to change the browser URL to 'pageurl'
		if(pageurl!=window.location)
		{
			window.history.pushState({path:pageurl},'',pageurl);	
		}
		return false;  
	});
});

/* the below code is to override back button to get the ajax content without reload*/
$(window).bind('popstate', function() 
{
	$.ajax({url:location.pathname+'?rel=tab',success: function(data)
	{
		$('#content').html(data);
	}});
});
