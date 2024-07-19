$(document).ready(function () {
    //사이드바
    $('header > img').on("mouseenter", (function () {
        $('.sideBar').animate({ left: 0 }, "slow", "swing");
        $(this).css("opacity", 0)
    }));

    $(document).on('click', function(e) {
        var container = $(".sideBar");
        if (!$(e.target).closest(container).length) {
            // container.hide();
            $(".sideBar").animate({ left: "-320" }, "slow", "swing");
        }
        $('header > img').css("opacity", "unset")

    });

    //메뉴
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500)
        // $('.navi li img').toggleClass('active');
        $(this).find('img').toggleClass('active');

    })


});