//상품 삽입
$.ajax({
    type: "GET",
    url: "./js/3.product.json",
    dataType: "json",
    success: function (data) {
        var elem = "";
        $.each(data, function() {
            elem += `<li id="item" class="item" data-filter="${this.index}">`;
                elem += `<span>`;
                    elem += `<img src='${this.imgfile1}' alt='${this.title}'>`;
                    elem += `<span class="it_basket"><img src='./sub/img/basket.svg' alt='장바구니'></span>`;
                elem += `</span>`;
                elem += `<ul>`;
                    elem += `<a href="${this.link}"><p>${this.title}</p></a>`;
                    elem += `<li>`;
                        elem += `<p class="per">${this.per}</p>`;
                        elem += `<p class="final">${this.final}</p>`;
                        elem += `<p class="price">${this.price}</p>`;
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

    //사이드바 2차 메뉴 토글
    $(".navi>li:eq(1), .navi>li:eq(2)").click(function () {
        $(this).find('.subMenu').stop().slideToggle(500);
        $(this).siblings().find('.subMenu').stop().slideUp(500).siblings().find('img').removeClass('active');

        $(this).find('img').toggleClass('active');
    })

    //돋보기 아이콘 클릭시 검색창 표시
    $('header > div > span').click(function () {
        $('header div input').toggleClass('active');
    });
    $(document).on('click', function (e) {
        var container = $("header div");
        if (!$(e.target).closest(container).length) {
            $('header div input').removeClass('active');
        }
    });
    //검색창에서 키워드 입력시 상품 필터링
    $('header > div > input').keyup(function () {
        $(".shop").css("justify-content", "unset");

        const val = $(this).val();
        if (val == "") {
            $('.shop > li').show();
        } else {
            $('.shop > li').hide();
            $(".shop > li:contains('" + val + "')").show();
        };
        if (!$(this).val()) {
            $(".shop").css("justify-content", "space-around")
        };

    }); //이거공부....

    //Life Style 메뉴 클릭시 공지 
    function update() {
        $(".update").css({
            display: "none",
            "flex-direction": "unset",
            gap: "unset"
        });
        $(".update").addClass('none')
    }

    $(".bar p").click(function () {
        if ($("p").index(this) <= 1) {
            $(".shop").css({
                "justify-content": "space-around",
                gap: "5vw"
            });
            update();
        }else if ($("p").index(this) == 4) {
            $(".shop").css({
                "justify-content": "center",
                gap: "unset"
            });
            $(".update").removeClass('none')
            $(".update").css({
                display: "flex",
                "flex-direction": "column",
                gap: "30px"
            });
        }else {
            $(".shop").css({
                "justify-content": "unset",
                gap: "5vw"
            });
            update();
        };
    });

});

$(window).resize(function () {
    //헤더와 메뉴바 상단 위치 값 맞춤
    var hheight = $('header').height();
    $('section').css('margin-top', hheight);

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

}).resize();

//ajax 삽입 상품에 이벤트
setTimeout(function () {
    //json에서 할당되지 않아 표시 할 수 없는 값 숨김
    //each foreach 차이 뭐지...📍
    var str = 'undefined';
    $(".per").each(function () {
        if (str == $(this).text()) {;
            $(this).siblings().not($(".price")).remove();
            $(this).remove();
        }else {
            $(this).next().empty();
        };
    });

    //제품 가격 형식 설정, 계산 기능
    var item = document.querySelectorAll('.item');
    item.forEach(v => {
        const box = [...v.querySelectorAll('.item > ul > li')]; //가격란
        box.forEach(bt => {
            const price = bt.lastChild; //원가
            const per = bt.firstChild; //할인율
            const final = bt.firstChild.nextSibling; //할인가            
            const price_txt = bt.lastChild.textContent;
            const per_txt = bt.firstChild.textContent;

            //원가 원단위 표시
            const form = price_txt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
            const node = document.createElement('p');
            node.classList.add("price");
            node.innerHTML = form;
            price.replaceWith(node);

            //할인제품의 경우 퍼센트와 원가를 계산 후 최종값으로 삽입
            if (bt.querySelector('.per')) {
                per.insertAdjacentText('beforeend','%') //퍼센트 삽입

                function calc(whole, sale) {
                    return whole *= sale
                }

                const result = calc(price_txt, 1 - per_txt / 100).toLocaleString() + '원';
                final.append(result);
                node.classList.add("active"); //원가는 line-through 처리
            };
        });
    });;

    //장바구니 카운트
    let count = 0;
    const value = document.querySelector(".basket"); // 카운트 표시 위치
    const item_ck = document.querySelectorAll(".it_basket img");
    const header = document.querySelector("header");

    item_ck.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            count++;

            value.innerHTML = count
            value.style.display = "flex"
            value.style.scale = 1

            //스크롤을 내린 상태에서 클릭시 헤더가 내려오면서 장바구니 확인
            if (header.className == 'scroll') {
                header.classList.remove("scroll")
                setTimeout(function () {
                    header.classList.add("scroll")
                }, 1000);
            };

        });
    });

    filterMenuInit(); //↓필터링 함수 실행

}, 50);

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

