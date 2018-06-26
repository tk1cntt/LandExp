	$('.like-button i')
	.mouseover(function() {
		$(this).removeClass( "fa-heart-o" ).addClass( "fa-heart" );
	})
	.mouseout(function() {
		$(this).removeClass( "fa-heart" ).addClass( "fa-heart-o" );
	});

	$(document).ready(function(){
		$('.dropdown-submenu div').on("click", function(e){
		    $(this).next('ul').toggle();
		   	e.stopPropagation();
		   	e.preventDefault();
		});
	});