$(document).ready(function() {
	   
	var hash = window.location.hash.substr(1);
	var href = $('#nav li a').each(function(){
		var href = $(this).attr('href');
		if(hash==href.substr(0,href.length-5)){
			var toLoad = hash+'.html #content';
			$('#content').load(toLoad)
		}											
	});

	$('#nav li a').click(function(){
								  
		var toLoad = $(this).attr('href')+' #content';
		$('#content').hide('fast',loadContent);
		$('#load').remove();
		$('#wrapper').append('<span id="load">LOADING...</span>');
		$('#load').fadeIn('normal');
		window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
		function loadContent() {
			$('#content').load(toLoad,'',showNewContent())
		}
		function showNewContent() {
			$('#content').show('normal',hideLoader());
		}
		function hideLoader() {
			$('#load').fadeOut('normal');
		}
		return false;
	});
	$('.submitProblem').on('click', function(e)
	{
		var reportOK = false;
		if ($('#room').val() == 'Select a room')
		{
			reportOK = false;
			$('#noRoom').slideDown();
		}
		else
		{
			reportOK = true;
		}
		if(reportOK == true)
		{
			$('#noRoom').slideUp();
			$('#myModal').modal('hide');			
		}
	});


	$(function() 
  	{
	    $( "#slider-range-min" ).slider(
	    {
		    range: "min",
		    value: 1,
		    min: 1,
		    max: 10,
		    slide: function( event, ui ) {
		        $( "#stank" ).val( "" + ui.value );
	    }
	    });
	    $( "#stank" ).val( "" + $( "#slider-range-min" ).slider( "value" ) );
	});

	$(function() 
  	{
	    $( "#slider-range-min2" ).slider(
	    {
		    range: "min",
		    value: 1,
		    min: 1,
		    max: 10,
		    slide: function( event, ui ) {
		        $( "#crowd" ).val( "" + ui.value );
	    }
	    });
	    $( "#crowd" ).val( "" + $( "#slider-range-min" ).slider( "value" ) );
	});
});