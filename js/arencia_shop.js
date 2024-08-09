$.ajax({
    type: "GET",
    url: "./js/product.json",
    dataType: "json",
    success: function (data) {
        var elem = "";
        $.each(data, function(index, obj) {
            elem += `<li class="item" data-filter="${this.index}">`;
                elem += `<a href="${this.link}">`;
                    elem += `<img src='${this.imgfile1}' alt='${this.link}'>`;
                    elem += `<span><img src='${this.imgfile3}' alt='${this.link}'></span>`;
                elem += `</a>`;
                elem += `<ul>`;
                    elem += `<a href="${this.link}"><p>${this.title}</p></a>`;
                    elem += `<li>`;
                        elem += `<span>`;
                            elem += `<p class="per">${this.per}</p>`
                            elem += `<p>${this.price}</p>`
                        elem += `</span>`;
                        elem += `<p>${this.ori}</p>`;
                    elem += `</li>`;
                elem += `</ul>`;
            elem += `</li>`;
        });
        $(".shop").prepend(elem);

        
    },
    error: function (xhr) {
        console.log(xhr.status + "/" + xhr.errorText);
    }
});



$(document).ready(function () {


    //사이드 메뉴 토글
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500);
        $(this).siblings().find('.subMenu').stop().slideUp(500).siblings().find('img').removeClass('active');

        $(this).find('img').toggleClass('active');

    })

    //헤더 스크롤
    let lastScrollY = $(window).scrollTop();
    $(window).on("scroll", () => {
        const currentScrollY = $(window).scrollTop()
        if (currentScrollY > lastScrollY) {
            $('header').addClass('scroll'); //숨김
        } else {
            $('header').removeClass('scroll');
        }


    });

    //검색창
    $('header div span').click(function () {
        $('header div input').toggleClass('active');
    });
    $(document).on('click', function (e) {
        var container = $("header div");
        if (!$(e.target).closest(container).length) {
            $('header div input').removeClass('active');
        }
    });
    $('header div input').keyup(function () {
        var val = $(this).val();
        if (val == "") {
            $('.shop > li').show();
        } else {
            $('.shop > li').hide();
            $(".shop > li:contains('" + val + "')").show();
        }
    });

    //준비중 공지
    $(".bar p:gt(1)").on("click", function () {
        $(".shop").css({
            "justify-content": "unset",
            gap: "5vw"
        });

        $(".caution").css({
            display: "none",
            "flex-direction": "unset",
            gap: "unset"
        });
        $(".caution").addClass('none')


        $(".shop h2").css({
            "font-family": "Yanone Kaffeesatz",
            "font-size": "100px",
            "font-weight": "bold",
        });

    });


    $(".bar p:lt(2)").click(function () {
        // $(".shop").css("justify-content", "space-around");
        $(".shop").css({
            "justify-content": "space-around",
            gap: "5vw"
        });

        $(".caution").css({
            display: "none",
            "flex-direction": "unset",
            gap: "unset"
        });
        $(".caution").addClass('none')
        // $(".caution").attr('style', 'display: none !important');

    });

    $('.bar p:nth-of-type(5)').on("click", function () {
        $(".shop").css({
            "justify-content": "center",
            gap: "unset"
        });

        $(".caution").removeClass('none')

        $(".caution").css({
            display: "flex",
            "flex-direction": "column",
            gap: "30px"
        });

        $(".shop h2").css({
            "font-family": "Yanone Kaffeesatz",
            "font-size": "clamp(35px, 6vw, 100px)",
            "font-weight": "bold",
        });
    });

});

$(window).resize(function () {
    //헤더와 메뉴바 상단 위치 값 맞춤
    var hheight = $('header').height();
    $('.product').css('margin-top', hheight);

    if (window.innerWidth > 821) {  // 다바이스 크기가 640이상

        $('header > img').on("mouseenter", (function () {
            $('.sideBar').animate({ left: 0 }, "slow", "swing");
            $(this).css("opacity", 0);
        }));
        $(document).on('click', function (e) {
            var container = $(".sideBar");
            if (!$(e.target).closest(container).length) {
                $(".sideBar").animate({ left: "-320" }, "slow", "swing");
            }
            $('header > img').css("opacity", "unset")
    
        });
    
    
    } else {
        $('nav').prepend(`<img src="/sub/img/close.svg" alt="close">`);
        $('nav > img:gt(0)').remove();
        
        $('nav > img').css({
            height: 60,
            "position": "absolute",
            "top": 30,
            "right": 30,
            "transform": "rotate(0)",
            "transition": "all 1s",
            "cursor": "pointer"
        });
    
    
            $('header > img').on("click", (function () {
                $('.sideBar').stop().animate({ left: 0 }, "slow", "swing");
                $(this).css("opacity", 0)
                $('.sideBar').css({
                    width: "100vw",
                    height: "100vh"
                });
            }));
            $('nav > img').click(function () {
                $(this).css({
                "transform": "rotate(360)",
                "transition": "all 1s"
                })
                $(".sideBar").stop().animate({ left: "-110vw" }, "slow", "swing");
                $('header > img').css("opacity", "unset");
            })
    
    };


}).resize();



//ajax 삽입 상품에 이벤트
setTimeout(function () {
    var str = 'undefined';
    $(".shop ul li span p").each(function () {
        if (str == $(this).text()) {
            $(this).parent().siblings().remove();
            $(this).remove();
        }
    });

    filterMenuInit();

    //장바구니 카운트
    let count = 0;
    const value = document.querySelector(".basket"); //contents 숫자표시
    const md = document.querySelectorAll(".shop>li>a span img, .gr>li>a span img");
    const confirm = document.querySelector("header");


    md.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            count++;

            value.style.display = "flex"
            value.style.scale = 1
            value.innerHTML = count

            // confirm.classList.remove("scroll")
            // setTimeout(function () {
            //     confirm.classList.add("scroll")
            // }, 1000);
            // var hh = $('header').attr("class");
            // console.log(hh);

            var under = document.querySelector('#hd');
            // console.log(gk.className);



            if (under.className == 'scroll') { //올라간상태
                confirm.classList.remove("scroll")
                setTimeout(function () {
                    confirm.classList.add("scroll")
                }, 1000);
            };



        });
    });
}, 500);

//메뉴에 따라 상품 필터링
const filterMenuInit = () => {
    const filters = document.querySelectorAll('[data-filter-id]');

    filters.forEach(filter => {
        const filterBtns = [...filter.querySelectorAll('[data-filter]')].filter(el => el.nodeName === 'P');
        const filterLists = [...filter.querySelectorAll('[data-filter]')].filter(el => el.nodeName === 'LI');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.getAttribute('data-filter');
                filterLists.forEach(list => {
                    if (filterType === '0') {
                        list.style.display = 'list-item';
                        return;
                    }
                    list.style.display = list.getAttribute('data-filter') === "4" ? 'flex'
                        : list.getAttribute('data-filter') === filterType ? 'list-item'
                            : 'none';

                })
            })
        })
    })
};

