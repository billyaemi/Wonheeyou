//이미지 슬라이더 생성
new previewSlider({
	container: '.preview-slider',
    content: true,
    //화살표 생성
	arrowLeft: '.arrow-left',
    arrowRight: '.arrow-right',
    //크기 지정
    scale: 0.4,
    //스크롤스피드 지정
	scrollSpeed: 4
});

//미리보기 슬라이더 불러오기
function previewSlider(obj) {
    //생성자 함수 this 사용
    //컨테이너 오류 = obj를 안붙혔다.
    //this.container = document.querySelector(container);
    this.container = document.querySelector(obj.container);
    //슬라이더 안에 들어갈 이미지 불러오기
    this.images = this.container.querySelectorAll('.slider-item');
    this.wrapper = document.querySelector('.slider-wrapper');

    //화살표 설정하기
    this.left = document.querySelector(obj.arrowLeft);
    this.right = document.querySelector(obj.arrowRight);

    //컨테이너 내부 width 설정
    this.width = window.innerWidth;
    this.pos = 0;
    this.scale = obj.scale === undefined ? 0.4 : obj.scale;
    this.scrollSpeed = obj.scrollSpeed === undefined ? 4 : obj.scrollSpeed;
    this.content = obj.content === undefined ? false : obj.content;

    const previewAnimationTime = 2000;

    //지정해둔 슬라이더 요소 노드 불러오기
    var slider = this;
    var activeSlide = 0;
    //바보같이 true로 했더니 오류 발생..
    //var isAnimate = true;
    var isAnimate = false;

    //이미지에 트랜스폼 이벤트 추가
    this.wrapper.style.transform = 'translate3d(0, 0, 0)';
    //왼쪽 화살표를 누를 경우, 안보이도록 설정하기
    this.left.classList.add('hide');

    //슬라이더 내 이미지 콘텐츠 불러오기
    if (!slider.content) {
        //for 반복문 사용
        for (var i = 0; i < this.images.length; i++) {
            this.container.removeChild(this.images[i]);
            //슬라이더 아이템을 담을 div를 불러오고
            var newSlide = document.createElement('div');
            //그 안에 슬라이더 아이템을 추가하기
            newSlide.classList.add('slider-item');
            //배경이미지 설정
            newSlide.style.backgroundImage = 'url(' + this.images[i].getAttribute('src') + ')';
            this.wrapper.appendChild(newSlide);
        }
    }

    //다음 슬라이드 이미지 불러오기

    //오류 발생
    //else if를 추가하여 슬라이더 콘텐츠 이미지에 순서 번호 부여
    // this.slideNext = function (e) {
    //     if (slider.pos <= ((slider.images.length - 1) * slider.width) * -1) {
    //         e.preventDefault();
    //         this.right.classList.add('hide');
    //     } else (slider.pos <= ((slider.images.length - 2) * slider.width) * -1) {
    //         slider.pos -= slider.width;
    //         slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
    //         activeSlide++;
    //         slider.leftPreview();
    //         this.right.classList.add('hide');
    //     }
    // }

    this.slideNext = function (e) {
        if (slider.pos <= ((slider.images.length - 1) * slider.width) * -1) {
            e.preventDefault();
            this.right.classList.add('hide');
        } else if (slider.pos <= ((slider.images.length - 2) * slider.width) * -1) {
            slider.pos -= slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide++;
            slider.leftPreview();
            this.right.classList.add('hide');
        } else {
            slider.pos -= slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide++;
            this.left.classList.remove('hide');
            this.right.classList.remove('hide');
            slider.leftPreview();
            slider.rightPreview();
        }

        isAnimate = false;
        //오른쪽 화살표를 눌렀을 때, 다음 이미지 보여지기
        slider.right.classList.remove('show');
    }

    //이전 이미지 불러오기
    this.slidePrev = function (e) {
        if (slider.pos === 0) {
            e.preventDefault();
            this.left.classList.add('hide');
        } else if (activeSlide === 1) {
            slider.pos += slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide--;
            this.left.classList.add('hide');
            slider.rightPreview();
        } else {
            slider.pos += slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide--;
            this.right.classList.remove('hide');
            this.left.classList.remove('hide');
            slider.leftPreview();
            slider.rightPreview();
        }

        isAnimate = false;
        //왼쪽 화살표를 눌렀을 때, 다음 이미지 보여지기
        slider.left.classList.remove('show');
    }

    this.leftPreview = function () {
        if (activeSlide > 0) {
            var arrow = slider.left.querySelector('.preview');
            var src = slider.images[activeSlide-1].getAttribute('style').match(/url\(["']?([^"']*)["']?\)/)[1];
            arrow.setAttribute('style', 'background-image: url(' + src + ')');
        }        
    }

    this.rightPreview = function () {
        if (activeSlide < slider.images.length - 1) {
            var arrow = slider.right.querySelector('.preview');
            var src = slider.images[activeSlide+1].getAttribute('style').match(/url\(["']?([^"']*)["']?\)/)[1];
            arrow.setAttribute('style', 'background-image: url(' + src + ')');
        }
    }

    //미리보기 이미지를 만들고 그 위에 타이머 설정
    this.previewAnimate = function (e, arrow, direction) {
        arrow.classList.add('animate');
        arrow.classList.add('show');
        isAnimate = true;

        if (direction === 'right') {
            //타이머 설정
            //오른쪽 설정
            slider.startCounting(counterRight);
            setTimeout(function () {
                slider.slideNext(e);
                arrow.classList.remove('animate');
            }, previewAnimationTime);
        } else {
            //왼쪽 설정
            slider.startCounting(counterLeft);
            setTimeout(function () {
                slider.slidePrev(e);
                arrow.classList.remove('animate');
            }, previewAnimationTime);
        }
    }

    //타이머 시간 설정 함수
    //100에 도달하면 다음, 이전 슬라이드로 넘어가도록 설정
    this.startCounting = function (counter) {
        //count에 0 지정
        var count = 0;
        var countdown = setInterval(function () {
            //1씩 증가하도록 설정
            count++;
            counter.innerHTML = count;
            if (count === 100) {
                clearInterval(countdown);
                counter.innerHTML = 0;
            }
        }, previewAnimationTime / 100);
    }

    //creatElement로 div 생성 
    var gridLeft = document.createElement('div');
    var gridRight = document.createElement('div');
    gridLeft.innerHTML = '<span>See all<br>slides</span>';
    gridRight.innerHTML= '<span>See all<br>slides</span>';
    gridLeft.classList.add('grid');
    gridRight.classList.add('grid');
    //appendChild로 선택한 함수 내 자식 요소 추가하기
    this.left.appendChild(gridLeft);
    this.right.appendChild(gridRight);

    //creatElement로 div 생성 
    var previewLeft = document.createElement('div');
    var previewRight = document.createElement('div');
    //클래스 이름 추가
    previewLeft.classList.add('preview');
    previewRight.classList.add('preview');
    //appendChild로 선택한 함수 내 자식 요소 추가하기
    this.left.appendChild(previewLeft);
    this.right.appendChild(previewRight);

    //creatElement로 div 생성 
    var nextLeft = document.createElement('div');
    var nextRight = document.createElement('div');
    nextLeft.innerHTML= 'Prev<br>Slide';
    nextRight.innerHTML = 'Next<br>Slide';
    //클래스 이름 추가
    nextLeft.classList.add('arrow-link');
    nextRight.classList.add('arrow-link');
    //appendChild로 선택한 함수 내 자식 요소 추가하기
    this.left.appendChild(nextLeft);
    this.right.appendChild(nextRight);

    //creatElement로 div 생성 
    var counterLeft = document.createElement('div');
    var counterRight = document.createElement('div');
    //counter요소에 포함되어 있는  HTML 0 설정
    counterLeft.innerHTML= '0';
    counterRight.innerHTML = '0';
    //클래스 이름 추가
    counterLeft.classList.add('counter');
    counterRight.classList.add('counter');
    //appendChild로 선택한 함수 내 자식 요소 추가하기
    this.left.appendChild(counterLeft);
    this.right.appendChild(counterRight);

    //오른쪽 미리보기
    this.rightPreview();
    //클릭시, 이벤트가 발생하도록 설정

    //오른쪽
    previewRight.addEventListener('click', function (e) {
        slider.previewAnimate(e, slider.right, 'right');
    })
    //왼쪽
    previewLeft.addEventListener('click', function (e) {
        slider.previewAnimate(e, slider.left, 'left');
    })
    //오른쪽에 마우스 클릭 후 마우스를 뗐을 때 이벤트 발생
    this.right.addEventListener('mouseleave', function (e) {
        if (!isAnimate) {
            this.classList.remove('show');
        }
    })
    //왼쪽에 마우스 클릭 후 마우스를 뗐을 때 이벤트 발생
    this.left.addEventListener('mouseleave', function (e) {
        if (!isAnimate) {
            this.classList.remove('show');
        }
    })
    //모든 grid 요소 노드를 얻기위해 설정
    //눌렀을때, 모든 grid가 보이도록 하기 위해 함수 실행
    var grids = document.querySelectorAll('.grid');
    var trigger = true;
    var intervalRight = null;
    var intervalLeft = null;

    //작은 그리드를 클릭하면, 슬라이더가 늘어나면서 문구가 보여짐
    for (var i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', function () {
            if (!isAnimate) {
                slider.left.classList.add('hide');
                slider.right.classList.add('hide');
                if (slider.pos === 0) {
                    slider.wrapper.style.transformOrigin = '0'
                } else {
                    slider.pos = slider.pos / (slider.scale * 10);
                }

                //translate3d로 위치 크기 변화 지정
                slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';
                slider.wrapper.classList.add('zoom');

                //일정한 시간이 지난 후에 다음 슬라이드로 넘어갈 수 있도록 설정
                setTimeout(function () {
                    function findObjectCoords(mouseEvent) {
                        var obj = slider.wrapper;
                        var obj_left = 0;
                        var obj_top = 0;
                        var xpos;

                        while (obj.offsetParent) {
                            obj_left += obj.offsetLeft;
                            obj_top += obj.offsetTop;
                            obj = obj.offsetParent;
                        }
                        if (mouseEvent) {
                            xpos = mouseEvent.pageX;
                            ypos = mouseEvent.pageY;
                        } else {
                            //지정해놓은 슬라이드 번호로 이동하도록 설정
                            xpos = window.event.x + document.body.scrollLeft - 2;
                            ypos = window.event.y + document.body.scrollTop - 2;
                        }

                        xpos -= obj_left;
                        ypos -= obj_top;

                        if (xpos >= slider.width - 100) {
                            if (Math.abs(slider.wrapper.getBoundingClientRect().left) != ((slider.images.length * slider.width) * slider.scale) - slider.width) {
                                slider.slideRight(trigger);
                                trigger = false;
                            }                            
                        } else if (xpos <= 100) {
                            if (slider.wrapper.getBoundingClientRect().left != 0) {
                                slider.slideLeft(trigger);
                                trigger = false;
                            }                            
                        } else {
                            //실행한 함수가 목표점에 도달할 경우 중지될 수 있도록 clearInterval 사용
                            clearInterval(intervalRight);
                            clearInterval(intervalLeft);
                            trigger = true;
                        }
                    }
                    //함수 실행
                    slider.wrapper.onmousemove = findObjectCoords;
                }, 1000);
            }
        })
    }
    //줌을 위한 이벤트 함수 설정
    //특정 위치 도달 시 간격 활성화
    this.slideRight = function (trigger) {
        if (trigger && slider.wrapper.classList.contains('zoom')) {
            slider.wrapper.style.transition = 'none';
            //일정 간격을 두고 이벤트 발생을 위하여 setInterval 사용
            intervalRight = setInterval(function () {
                slider.pos -= slider.scrollSpeed;
                slider.wrapper.style.transform = 'translate3d(' +  slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';
                //앞에서 적용한 setInterval을 중지할 수 있도록 새로 코드 작성 후 적용
                if (Math.abs(slider.wrapper.getBoundingClientRect().left) === ((slider.images.length * slider.width) * slider.scale) - slider.width) {
                    clearInterval(intervalRight);
                }
            }, 1);
        }
    }
    //특정 위치 도달 시 간격 활성화
    this.slideLeft = function (trigger) {
        if (trigger && slider.wrapper.classList.contains('zoom')) {
            slider.wrapper.style.transition = 'none';
            //일정 간격을 두고 이벤트 발생을 위하여 setInterval 사용
            intervalLeft = setInterval(function () {
                slider.pos += slider.scrollSpeed;
                slider.wrapper.style.transform = 'translate3d(' +  slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';
                //앞에서 적용한 setInterval을 중지할 수 있도록 새로 코드 작성 후 적용
                if (slider.wrapper.getBoundingClientRect().left === 0) {
                    clearInterval(intervalLeft);
                }
            }, 1);
        }
    }

    for (var i = 0; i < this.images.length; i++) {
        (function(index){
            //이미지를 클릭하면 줌인되는 이벤트 설정
            slider.images[i].addEventListener('click', function () {
                if (slider.wrapper.classList.contains('zoom')) {
                    //천천히 변화할 수 있도록 함
                    slider.wrapper.style.transition = 'all 1s ease-in-out';
                    slider.wrapper.classList.remove('zoom');
                    slider.pos = (index * slider.width) * -1;
                    activeSlide = index;
                    slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
                    if (index === 0) {
                        slider.right.classList.remove('hide');
                    } else if (index === slider.images.length - 1) {
                        slider.left.classList.remove('hide');
                    } else {
                        slider.right.classList.remove('hide');
                        slider.left.classList.remove('hide');
                    }
                    slider.leftPreview();
                    slider.rightPreview();
                }
            });
        })(i);
    }
}