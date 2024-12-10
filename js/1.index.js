//푸터 은행 계좌정보 클릭시 복사
let text = document.getElementById('bank').innerHTML;
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text);
        alert('복사되었습니다.');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

$(document).ready(function () {
//상품 리스트를 swiper 슬라이드로
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
                            elem += `<img src='${this.imgfile1}' alt='${this.title}'>`;
                            elem += `<img src='${this.imgfile2}' alt='${this.title}'>`;
                        elem += `</a>`;
                    elem += `</div>`;
                    elem += `<div class="spec">`;
                        elem += `<a href="${this.link}">${this.title}</a>`;
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

//archive 섹션
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

//스크롤 시 헤더 숨김, 표시
    let lastScrollY = $(window).scrollTop();
    $(window).on("scroll", () => {
        const currentScrollY = $(window).scrollTop()
        if (currentScrollY > lastScrollY) {
            $('header').addClass('scroll'); //숨김
        } else {
            $('header').removeClass('scroll');
        }
    }); //위로 스크롤하면 나타나는것도 업뎃해볼까,,,

//사이드바 열고 닫기 (pc, mobile 구분)
    const user = navigator.userAgent;

    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
    //모바일
        $('nav').prepend(`<span class="material-symbols-outlined">close</span>`); //사이드 바 닫기버튼 생성
        $('nav > img:gt(0)').remove();
        $('nav > .material-symbols-outlined').css({
            // height: 100,
            "font-size": 40,
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
        $('nav > span').click(function () {
            $(".sideBar").stop().animate({ left: "-110vw" }, "slow", "swing");
            $('header > img').css("opacity", "unset");
            $('body').css("position", "unset");
        });
        
    } else {
    //PC
        $('header > img').on("mouseenter", (function () {
            $('.sideBar').stop().animate({ left: 0 }, "slow", "swing");
            $(this).css("opacity", 0);
        }));
        $('section').on('mousedown', function (e) {
            var container = $(".sideBar");
            if (!$(e.target).closest(container).length) {
                $(".sideBar").stop().animate({ left: "-320" }, "slow", "swing");
            };
            $('header > img').css("opacity", "unset")
        });
    };

 //사이드바 하위메뉴 애니메이션
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500);
        $(this).siblings().find('.subMenu').stop().slideUp(500).siblings().find('img').removeClass('active');

        $(this).find('img').toggleClass('active');
    });
 
    $(window).resize(function () {
    //슬라이드 시 지나간 슬라이드를 숨김
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
        }`
        document.head.appendChild(leftSt);
    //width값이 줄어들면 슬라이드 위치가 변경되어 필요없어져 숨김
        if (window.innerWidth < 1449) {
            leftSt.innerHTML = leftSt.innerHTML.replace(
                "display: block",
                "display: none"
            );
            $('.left > div:nth-child(2)').css("display", "none");
        } else {
            $('.left > div:nth-child(2)').css("display", "flex");
        };  
    
    });

});

//sec3과 sec4 애니메이션 구동
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
        };
    });
});


//ajax의 데이터들을 부른 이후 적용해야 하는 이벤트들이라 setTimeout을 사용했습니다.
setTimeout(function () {
//sec2 swiper
    function swiperex() {
        if (window.innerWidth > 820) {  // 디바이스 크기가 820보다 크면 제품 3개 이상 씩 배치
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
        } else { //820보다 작으면 1개씩 배치
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
        $(".swiper-wrapper ~ .swiper-notification").remove();
    }
    swiperex();
    
    window.onresize = function(){
        swiperex();
    };

//제품 json에 있는 데이터를 그대로 끌어와 쓰는 슬라이드라, 갯수를 8개로 제한하였습니다.
    $(".swiper-slide").each(function () {
        if ($(this).index() > 7) {
            $(this).remove();
        };
    });

//할인하지 않는 제품의 가격이 undefined로 뜨지 않기 위한 설정입니다.
    var str = 'undefined';
    $(".per").each(function () {
        if (str == $(this).text()) {
            $(this).siblings().not($(".price")).remove();
            $(this).remove();
        } else {
            $(this).next().empty();
        };
    });

//product json에 있는 데이터에 할인값을 계산하여 넣었습니다.
    var item = document.querySelectorAll('.swiper-slide');
    item.forEach(v => {
        const box = [...v.querySelectorAll('.spec > ul')]; //가격란
        box.forEach(bt => {
            const price = bt.lastChild; //원가
            const per = bt.firstChild; //할인율
            const final = bt.firstChild.nextSibling; //할인가            
            const price_txt = bt.lastChild.textContent;
            const per_txt = bt.firstChild.textContent;

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
                };

                const result = calc(price_txt, 1 - per_txt / 100).toLocaleString() + '원';
                final.append(result);
                node.classList.add("active"); //원가는 line-through 처리
            };
        });
    });


//sec4의 글들과 sec5의 이미지들의 크기를 같게 맞추기 위한 설정입니다.
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

//전체 넓이보다 작은 크기의 윈도우에서 Archive구역을 스크롤바를 사용하지 않고 드래그 할 수 있도록 구현하였습니다.
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
                };
            };

            bindEvents();
        }
    };

    if (window.innerWidth > 850) {
        touchScroll();
    };

}, 500);
