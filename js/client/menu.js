$(document).ready(function () {


    /*** Met à jour le menu lors du changement de page ***/
    $(".menu a[href!='#']").click(function() {
		$(".menu a").removeClass("current");
		$(this).addClass("current");
	});
});