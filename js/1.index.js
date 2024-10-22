$.ajax({
    type: "GET",
    url: "./js/3.product.json",
    dataType: "json",
    success: function(data) {
        var elem = "";
        $.each(data, function(index, obj) {
            elem += `<li class="swiper-slide">`;
                elem += `<div class="pic">`;
                    elem += `<a href="${this.link}">`;
                        elem += `<img src='${this.imgfile1}' alt='${this.link}'>`;
                        elem += `<img src='${this.imgfile2}' alt='${this.link}'>`;
                    elem += `</a>`;
                elem += `</div>`;
                elem += `<div class="spec">`;
                    elem += `<p>${this.title}</p>`;
                    elem += `<ul>`;
                        elem += `<li class="per">${this.per}</li>`;
                        elem += `<li class="final">${this.final}</li>`;
                        elem += `<li class="price">${this.price}</li>`;
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
    url: "./js/3.archive.json",
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

    //헤더 스크롤 시 숨김, 표시
    let lastScrollY = $(window).scrollTop();
    $(window).on("scroll", () => {
        const currentScrollY = $(window).scrollTop()
        if (currentScrollY > lastScrollY) {
            $('header').addClass('scroll'); //숨김
        } else {
            $('header').removeClass('scroll');
        }
    }); //위로 스크롤하면 나타나는것도 업뎃해볼까,,,

    $(".pd > a").prepend(`<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 15.7C3.78333 15.7 3.50417 15.6125 3.2625 15.4375C3.02083 15.2625 2.85833 15.025 2.775 14.725L0.624999 7.15C0.558332 6.93333 0.590249 6.7375 0.720749 6.5625C0.851082 6.3875 1.03583 6.3 1.275 6.3H6.05525L9.45 1.175C9.53333 1.05833 9.62083 0.979167 9.7125 0.9375C9.80417 0.895833 9.90833 0.875 10.025 0.875C10.1417 0.875 10.2458 0.9 10.3375 0.95C10.4292 1 10.5167 1.08333 10.6 1.2L13.95 6.3H18.725C18.9642 6.3 19.1531 6.3875 19.2917 6.5625C19.4306 6.7375 19.4667 6.93333 19.4 7.15L17.175 14.725C17.0917 15.025 16.9292 15.2625 16.6875 15.4375C16.4458 15.6125 16.175 15.7 15.875 15.7H4.1ZM4 15.15H16C16.1833 15.15 16.3417 15.0958 16.475 14.9875C16.6083 14.8792 16.7 14.7333 16.75 14.55L18.9 6.85H1.1L3.25 14.55C3.3 14.7333 3.39167 14.8792 3.525 14.9875C3.65833 15.0958 3.81667 15.15 4 15.15ZM10.0085 11.55C10.1528 11.55 10.2792 11.493 10.3875 11.379C10.4958 11.2652 10.55 11.136 10.55 10.9915C10.55 10.8472 10.493 10.7208 10.379 10.6125C10.2652 10.5042 10.136 10.45 9.9915 10.45C9.84717 10.45 9.72083 10.507 9.6125 10.621C9.50417 10.7348 9.45 10.864 9.45 11.0085C9.45 11.1528 9.507 11.2792 9.621 11.3875C9.73483 11.4958 9.864 11.55 10.0085 11.55ZM6.725 6.3H13.275L10 1.3L6.725 6.3Z"
        fill="#5F6368" />`
    );
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500);
        $(this).siblings().find('.subMenu').stop().slideUp(500).siblings().find('img').removeClass('active');

        $(this).find('img').toggleClass('active');
    })
});

$(window).resize(function () {
    // //헤더와 메뉴바 상단 위치 값 맞춤
    // var hheight = $('header').height();
    // $('section').css('margin-top', hheight);

    let leftSt = document.createElement("style");
    leftSt.innerHTML = `.left::before {
        content: "";
        width: clamp(900px, 60vw, 970px);
        height: 400px;
        background: #D8D8D8;
        position: absolute;
        z-index: -1;
        left: -510px;
        display: block;
        outline: 3px solid red
    }`
    document.head.appendChild(leftSt);

    var width = Number($(".sec2>div").css("width").replace(/[^0-9]/g, ""));
    // console.log(width);

    if (width < 1449) {
        // $(".left::before").css("display", "none");
        // leftst.innerHTML = leftst.innerHTML.replace("display: none");
        leftSt.innerHTML = leftSt.innerHTML.replace(
            "display: block",
            "display: none"
        );
        $('.left > div:nth-child(2)').css("display", "none");
    } else {
        $('.left > div:nth-child(2)').css("display", "flex");
    };


    //사이드바 슬라이드
    if (window.innerWidth > 821) {  // 디바이스 크기가 820 이상
        $('header > img').on("mouseenter", (function () {
            $('.sideBar').stop().animate({ left: 0 }, "slow", "swing");
            $(this).css("opacity", 0);
        }));
        $('section').on('click', function (e) {
            var container = $(".sideBar");
            if (!$(e.target).closest(container).length) {
                $(".sideBar").stop().animate({ left: "-320" }, "slow", "swing");
            }
            $('header > img').css("opacity", "unset")
        });

    } else {// 디바이스 크기가 820 미만
        $('nav').prepend(`<img src="./sub/img/close.svg" alt="close">`); //사이드 바 닫기버튼 생성
        $('nav > img:gt(0)').remove();
        $('nav > img').css({
            height: 60,
            "position": "absolute",
            "top": 30,
            "right": 30,
            "cursor": "pointer"
        });

        $('header > img').on("click", (function () {
            $('.sideBar').stop().animate({ left: 0 }, "slow", "swing");
            $(this).css("opacity", 0)
            $('.sideBar').css({
                width: "100vw",
                height: "100vh"
            });
            $('body').css("position", "fixed");
            $(window).off("scroll"); //확인!
        }));
        $('nav > img').click(function () {
            $(".sideBar").stop().animate({ left: "-110vw" }, "slow", "swing");
            $('header > img').css("opacity", "unset");
            $('body').css("position", "unset");
        })
    };



});


$(document).scroll(function () {
    var scrolltop = $(window).scrollTop();
    $(".sec2").each(function () {
        if (scrolltop > $(this).offset().top) {
            $(".sec3 > img, .sec3 > div").addClass("on");
        }
    });
    $(".sec3").each(function () {
        if (scrolltop > $(this).offset().top + 200) {
            $('.sec4 > div').addClass('on')
        }
    });
});


setTimeout(function () {
    //sec2 swiper

    function swiperex() {
        if (window.innerWidth > 821) {  // 디바이스 크기가 820 이상
            var swiper = new Swiper(".container", {
                slidesPerView: 3.1,
                // autoplay: {
                //     delay: 1500,
                //     // disableOnInteraction: false,
                // },
                // loop: true,
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false,
                    // draggable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        } else {
            var swiper = new Swiper(".container", {
                slidesPerView: 1.1,
                // autoplay: {
                //     delay: 1500,
                //     // disableOnInteraction: false,
                // },
                // loop: true,
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false,
                    // draggable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        };
    }
    swiperex();

    $(window).resize(function () {
        swiperex();
        touchScroll();
    });

    $(".swiper-slide").each(function () {
        if ($(this).index() > 7) {
            $(this).remove();
        }
    });


    var str = 'undefined';
    $(".per").each(function () {
        if (str == $(this).text()) {
            ;
            $(this).siblings().not($(".price")).remove();
            $(this).remove();
        } else {
            $(this).next().empty();
        };
    });

    var item = document.querySelectorAll('.swiper-slide');
    item.forEach(v => {
        const box = [...v.querySelectorAll('.spec > ul')]; //가격란
        box.forEach(bt => {
            // console.log(bt);
            const price = bt.lastChild; //원가
            const per = bt.firstChild; //할인율
            const final = bt.firstChild.nextSibling; //할인가            
            const price_txt = bt.lastChild.textContent;
            const per_txt = bt.firstChild.textContent;
            // const price = bt.lastChild; //원가
            // const final = bt.firstChild; //할인율
            // const per = bt.firstChild.nextSibling; //할인가            
            // const price_txt = bt.lastChild.textContent;
            // console.log(price_txt);
            // console.log(per);
            // const per_txt = bt.firstChild.nextSibling.textContent;

            //원가 원단위 표시
            const form = price_txt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
            const node = document.createElement('li');
            node.classList.add("price");
            node.innerHTML = form;
            price.replaceWith(node);

            //할인제품의 경우 퍼센트와 원가를 계산 후 최종값으로 삽입
            if (bt.querySelector('.per')) {
                per.insertAdjacentText('beforeend', '%') //퍼센트 삽입

                function calc(whole, sale) {
                    return whole *= sale
                }

                const result = calc(price_txt, 1 - per_txt / 100).toLocaleString() + '원';
                final.append(result);
                node.classList.add("active"); //원가는 line-through 처리
            };
        });
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


    function touchScroll() {
        if (window.innerWidth < 1200) {
            // 요소 & 사이즈
            const list = document.querySelector('.sec4>div>div');
            const listScrollWidth = list.scrollWidth;
            const listClientWidth = list.clientWidth;
            // 이벤트마다 갱신될 값
            let startX = 0;
            let nowX = 0;
            let endX = 0;
            let listX = 0;

            const getClientX = (e) => {
                const isTouches = e.touches ? true : false;
                return isTouches ? e.touches[0].clientX : e.clientX;
            };

            const getTranslateX = () => {
                return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
            };

            const setTranslateX = (x) => {
                list.style.transform = `translateX(${x}px)`;
            };

            const bindEvents = () => {
                list.addEventListener('mousedown', onScrollStart);
                list.addEventListener('touchstart', onScrollStart);
                list.addEventListener('click', onClick);
            };


            const onScrollStart = (e) => {
                startX = getClientX(e);
                window.addEventListener('mousemove', onScrollMove);
                window.addEventListener('touchmove', onScrollMove);
                window.addEventListener('mouseup', onScrollEnd);
                window.addEventListener('touchend', onScrollEnd);
            };

            const onScrollMove = (e) => {
                nowX = getClientX(e);
                setTranslateX(listX + nowX - startX);
            };

            const onScrollEnd = (e) => {
                endX = getClientX(e);
                listX = getTranslateX();
                if (listX > 0) {
                    setTranslateX(0);
                    list.style.transition = `all 0.3s ease`;
                    listX = 0;
                } else if (listX < listClientWidth - listScrollWidth) {
                    setTranslateX(listClientWidth - listScrollWidth);
                    list.style.transition = `all 0.3s ease`;
                    listX = listClientWidth - listScrollWidth;
                }

                window.removeEventListener('mousedown', onScrollStart);
                window.removeEventListener('touchstart', onScrollStart);
                window.removeEventListener('mousemove', onScrollMove);
                window.removeEventListener('touchmove', onScrollMove);
                window.removeEventListener('mouseup', onScrollEnd);
                window.removeEventListener('touchend', onScrollEnd);
                window.removeEventListener('click', onClick);

                setTimeout(() => {
                    bindEvents();
                    list.style.transition = '';
                }, 300);
            };

            const onClick = (e) => {
                if (startX - endX !== 0) {
                    e.preventDefault();
                }
            };

            bindEvents();
        }
    };
    touchScroll();






}, 300);
