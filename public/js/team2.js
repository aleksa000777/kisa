$(document).ready(function () {
	function hideContentDivs(){
						$('.description div').each(function(){
							$(this).hide();

						});
$('#slideshow-main a, #slideshow-carousel a').click(function(e){
						hideContentDivs();
						var tmp_div = $(this).parent().index();
						$('.description div').eq(tmp_div).show();
					});
					
					}
					hideContentDivs();
})