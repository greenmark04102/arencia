$.ajax({
    type: "GET",
    url: "js/product.json",
    dataType: "json",
    success: function(data) {
        var elem = "";
        $.each(data, function(index, obj) {
            elem += `<li class="swiper-slide">`;
                elem += `<div class="pd">`;
                    elem += `<a href="${this.link}">`;
                        elem += `<img src='${this.imgfile1}' alt='${this.link}'>`;
                        elem += `<img src='${this.imgfile2}' alt='${this.link}'>`;
                    elem += `</a>`;
                elem += `</div>`;
                elem += `<div class="ds">`;
                    elem += `<p>${this.title}</p>`;
                    elem += `<ul>`;
                        elem += `<li>${this.price}</li>`;
                        elem += `<li>`;
                            elem += `<span>${this.ori}</span>`
                            elem += `<span>${this.per}</span>`
                        elem += `</li>`;
                    elem += `</ul>`;
                elem += `</div>`;
            elem += `</li>`;
        });
        $(".swiper-wrapper").prepend(elem);
    },
    error: function(xhr) {
        console.log(xhr.status + "/" + xhr.errorText);
    }

});

$.ajax({
    type: "GET",
    url: "js/archive.json",
    dataType: "json",
    success: function(data) {
        var con = "";
        $.each(data, function(index, obj) {
           con += `<div>`;
                con += `<div class="box">`
                    con += `<div class="scale">`
                        con += `<img src='${this.imgfile}' alt='${this.alt}'>`
                    con += `</div>`
                con += `</div>`;
                con += `<h2>${this.title}</h2>`
                con += `<p>${this.sub}</p>`
           con += `</div>`;
        });
        $(".sec4 > div > div").prepend(con);
    },
    error: function(xhr) {
        console.log(xhr.status + "/" + xhr.errorText);
    }

});



$(document).ready(function () {
 
    //사이드바
    $('.sec1 img').on("mouseenter", (function () {
        $('.sideBar').animate({ left: 0 }, "slow", "swing");
        $(this).css("opacity", 0)
    }));

    $(document).on('click', function(e) {
        var container = $(".sideBar");
        if (!$(e.target).closest(container).length) {
            // container.hide();
            $(".sideBar").animate({ left: "-320" }, "slow", "swing");
        }
        $('.sec1 img').css("opacity", "unset")

    });

    //메뉴
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500)
        // $('.navi li img').toggleClass('active');
        $(this).find('img').toggleClass('active');

    })


    //sec2 swiper
    var swiper = new Swiper(".container", {
        slidesPerView: 3.1,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        loop: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    $(".pd > a").prepend(`<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 15.7C3.78333 15.7 3.50417 15.6125 3.2625 15.4375C3.02083 15.2625 2.85833 15.025 2.775 14.725L0.624999 7.15C0.558332 6.93333 0.590249 6.7375 0.720749 6.5625C0.851082 6.3875 1.03583 6.3 1.275 6.3H6.05525L9.45 1.175C9.53333 1.05833 9.62083 0.979167 9.7125 0.9375C9.80417 0.895833 9.90833 0.875 10.025 0.875C10.1417 0.875 10.2458 0.9 10.3375 0.95C10.4292 1 10.5167 1.08333 10.6 1.2L13.95 6.3H18.725C18.9642 6.3 19.1531 6.3875 19.2917 6.5625C19.4306 6.7375 19.4667 6.93333 19.4 7.15L17.175 14.725C17.0917 15.025 16.9292 15.2625 16.6875 15.4375C16.4458 15.6125 16.175 15.7 15.875 15.7H4.1ZM4 15.15H16C16.1833 15.15 16.3417 15.0958 16.475 14.9875C16.6083 14.8792 16.7 14.7333 16.75 14.55L18.9 6.85H1.1L3.25 14.55C3.3 14.7333 3.39167 14.8792 3.525 14.9875C3.65833 15.0958 3.81667 15.15 4 15.15ZM10.0085 11.55C10.1528 11.55 10.2792 11.493 10.3875 11.379C10.4958 11.2652 10.55 11.136 10.55 10.9915C10.55 10.8472 10.493 10.7208 10.379 10.6125C10.2652 10.5042 10.136 10.45 9.9915 10.45C9.84717 10.45 9.72083 10.507 9.6125 10.621C9.50417 10.7348 9.45 10.864 9.45 11.0085C9.45 11.1528 9.507 11.2792 9.621 11.3875C9.73483 11.4958 9.864 11.55 10.0085 11.55ZM6.725 6.3H13.275L10 1.3L6.725 6.3Z"
        fill="#5F6368" />`
    );


    // $(".sec4 > div > div > div, .sec5 img").each(function (index) {
    //     $(this).css("order", function (n) {
    //         var n = 0;
    //         while (n < 5) {
    //             index + n;
    //             n++;
    //         }
    //         return index;
    //     });
    //     $(this).css("flex", "1 1 0");
    //     $(".sec4 > div > div").css("flex", "index");
    // });

    $(".top").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });


});

$(document).scroll(function() {
    var scrolltop = $(window).scrollTop();
    $(".sec2").each(function() {
        if (scrolltop > $(this).offset().top) {
            $(".sec3 > img, .sec3 > div").addClass("on");
        }
    });
    $(".sec3").each(function() {
        if (scrolltop > $(this).offset().top) {
            $('.sec4 > div').addClass('on')
        }
    });
});


setTimeout(function(){
    var str = 'undefined';
    $(".ds span").each(function() {
        if (str == $(this).text()) {
            $(this).parent().remove();
        }
    });

    $(".sec4 > div > div > div, .sec5 img").each(function (index) {
        $(this).css("order", function (n) {
            var n = 0;
            while (n < 5) {
                index + n;
                n++;
            }
            return index;
        });
        $(this).css("flex", "1 1 0");
        $(".sec4 > div > div").css("flex", "index");
    });
}, 50);