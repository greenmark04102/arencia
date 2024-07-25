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
filterMenuInit();

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


    $('.bar p').not('.pre').on("click", function() {
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
    

    // $(".bar span p").click(function(){
    //     var tabindex = $(this).index();
    //     var yo = $('.shop li').attr('class');

    //     // $(this).addClass('on').siblings().removeClass('on');
    //     // $(".indexBox .conBox").eq(tabindex).addClass('on').siblings().removeClass('on');
    //     // var yo = $('.shop li').className()
    //     if (yo == tabindex) {
    //         $('.shop > li').show();
    //     } else {
    //         $('.shop > li').hide();
    //     }

    // });



    // $(".bar span p").forEach(function(v, i, a) {
    //     // var tabindex = $(".bar span p").index();
    //     console.log(i);

    // })

    // $(".shop ul li span p").each(function() {
    //     if (str == $(this).text()) {
    //         $(this).parent().siblings().remove();
    //         $(this).remove();
    //     }
    // });













    let lastScrollY = $(window).scrollTop();
    $(window).on("scroll", ()=>{
        const currentScrollY = $(window).scrollTop()
    
        if (currentScrollY > lastScrollY) {
            //스크롤 내릴때
            $('header').addClass('scroll');
            // $('#header .eggiscoming-header__left p').addClass('scroll');
        } else {
            //스크롤 올릴때
            $('header').removeClass('scroll');
            // $('#header .eggiscoming-header__left p').removeClass('scroll');
        }
    
        // lastScrollY = currentScrollY;
    });







    // function throttle(delay, callback) {
    //     let isCall = null;
    //     return (...args)=>{
    //         if (isCall)
    //             return;
    //         isCall = setTimeout(()=>{
    //             callback.call(null, ...args);
    //             isCall = null;
    //         }, delay);
    //     }
    // }

});



// $(".bar span p").forEach(function(v, i, a) {
//     // var tabindex = $(".bar span p").index();
//     // console.log(${i});

// })
// $(document).on('forEach', '.bar span p', function(v, i, a) {
//     console.log(`${i}`);

// });




setTimeout(function(){
    var str = 'undefined';
    $(".shop ul li span p").each(function() {
        if (str == $(this).text()) {
            $(this).parent().siblings().remove();
            $(this).remove();
        }
    });


    // var fpd = $('.shop > li').attr('class').filter(function() {
    //     return 1
    // })
    // console.log(fpd);
    // $(".bar span p").click(function(){
    //     var tabindex = $(this).index();
    //     console.log(tabindex);
    //     $('.shop > li').attr('class') == tabindex;

    //     $('.shop > li').show();
    //     // .shop li == tabindex
    //     // var yo = $(this).attr('class');
    //     // if ($('.shop li').attr('class') === tabindex) {
    //     //     tabindex === $('.shop li').attr('class').show();
    //     // } else {
    //     //     // $('.shop li').hide();
    //     // }
    // });

    // $(".shop li").click(function(){
    //     console.log($(this).attr('class'));
    // });



    
}, 100);

