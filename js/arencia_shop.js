$.ajax({
    type: "GET",
    url: "./js/product.json",
    dataType: "json",
    success: function(data) {
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
                        elem += `<p>${this.price}</p>`;
                    elem += `</li>`;
                elem += `</ul>`;
            elem += `</li>`;
        });
        $(".shop").prepend(elem);
    },
    error: function(xhr) {
        console.log(xhr.status + "/" + xhr.errorText);
    }
});


const filterMenuInit = () => {
    const filters = document.querySelectorAll('[data-filter-id]');

    filters.forEach(filter => {
        const filterBtns = [...filter.querySelectorAll('[data-filter]')].filter(el => el.nodeName === 'P');
        const filterLists = [...filter.querySelectorAll('[data-filter]')].filter(el => el.nodeName === 'LI');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.getAttribute('data-filter');

                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');

                filterLists.forEach(list => {
                    if (filterType === '0'){
                        list.style.display = 'list-item';
                        return;
                    }
                    list.style.display = list.getAttribute('data-filter') === filterType ? 'list-item' : 'none';
                })
            });
        })
    })
};


$(document).ready(function () {
// setTimeout('location.reload()', 1000);

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

    //사이드 메뉴 토글
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500)
        // $('.navi li img').toggleClass('active');
        $(this).find('img').toggleClass('active');

    })

    //검색창
    $('header div span').click(function() {
        $('header div input').addClass('active');
        // $(this).css("outline","1px solid")
    });
    $(document).on('click', function(e) {
        var container = $("header div");
        if (!$(e.target).closest(container).length) {
            // container.hide();
            // $(".sideBar").animate({ left: "-320" }, "slow", "swing");
            $('header div input').removeClass('active');
        }
    });
    $('header div input').keyup(function() {
        var val = $(this).val();
        if (val == "") {
            $('.shop > li').show();
        } else {
            $('.shop > li').hide();
            $(".shop > li:contains('"+val+"')").show();
        }
    });

    //준비중 공지
    $('.bar p, .active').not('.pre').on("click", function() {
        $(".shop").css("justify-content", "unset")

        $(".caution").css({
            display: "none",
            "flex-direction": "unset",
            gap: "unset"
        });

        $(".shop h2").css({
            "font-family": "Yanone Kaffeesatz",
            "font-size": "100px",
            "font-weight": "bold",
        });
    
    });
    $('.bar p:nth-of-type(5)').on("click", function() {
        $(".shop").css("justify-content", "center")

        $(".caution").css({
            display: "flex",
            "flex-direction": "column",
            gap: "30px"
        });

        $(".shop h2").css({
            "font-family": "Yanone Kaffeesatz",
            "font-size": "100px",
            "font-weight": "bold",
        });
    });

    //카테고리명 변경
    $('.bar p').click(function() {
        var sync = $(this).text() ;
        $('.bar h1').text(sync);
    });

    //헤더 스크롤
    let lastScrollY = $(window).scrollTop();
    $(window).on("scroll", ()=>{
        const currentScrollY = $(window).scrollTop()
        if (currentScrollY > lastScrollY) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });

});

//ajax 빈칸 해결
setTimeout(function(){
    var str = 'undefined';
    $(".shop ul li span p").each(function() {
        if (str == $(this).text()) {
            $(this).parent().siblings().remove();
            $(this).remove();
        }
    });
    filterMenuInit();
}, 500);

// $(document).onload(function() {
// })