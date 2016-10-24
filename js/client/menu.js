$(document).ready(function () {


    /*** Met à jour le menu lors du changement de page ***/
    $(".menu a[href!='#']").click(function () {
        $(".menu a").removeClass("current");
        $(this).addClass("current");
    });

    setCurrentPage();

});

function setCurrentPage() {
    $(".menu a").removeClass("current");
    
    page = './' + location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    if (page == "./")
        page = "./index.html";

    var current = $(".menu a[href='" + page + "']");

    if (current)
        current.addClass("current");
}