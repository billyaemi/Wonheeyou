//커서의 요소 노드 불러오기

//html내 에서 커서를 적용할 클래스 불러오기
var cursorDotEl = document.querySelector("#cursor-dot");
    cursorBGEl = document.querySelector("#cursor-bg"),
    progressEl = document.querySelector("#progress"),
    listEl = document.querySelector(".list"),
    btnListEls = listEl.querySelectorAll("li");

    btnListEls = Array.prototype.slice.call(btnListEls);

//마우스가 움직일 때, 커서 이벤트 발생
function OnMouseMove(e){
    //포지션 설정
    var posX = e.clientX, posY = e.clientY;

    //특정 트윈 죽이기
    gsap.killTweensOf(cursorDotEl);
    gsap.killTweensOf(cursorBGEl);
    gsap.killTweensOf(progressEl);

    //커서 요소 노드마다 위치와 발생 시간 지정
    gsap.to(cursorDotEl, {
        "top": posY,
        "left": posX,
        //실행 후, 적당한 값 지정
        //"duration" : 0.1, 
        "duration" : 0.5, 
        "ease" : "sine.out" 
    });
    gsap.to(cursorBGEl, {
        "top": posY,
        "left": posX,
        //"duration" : 0.1, 
        "duration" : 0.3, 
        "ease" : "sine.out" 
    })
    gsap.to(progressEl, {
        "top": posY,
        "left": posX,
        //"duration" : 0.1, 
        "duration" : 0.25,
        "ease" : "sine.out" 
    })
}

//마우스의 입력을 받았을 때 이벤트 실행
function onMouseEnterList(e){
    console.log("enter");
    if(!cursorBGEl.classList.contains("active")){
        cursorBGEl.classList.add("active");
    }
    if(!progressEl.classList.contains("active")){
        progressEl.classList.add("active");
    }
}

//마우스를 뗐을 때 이벤트 실행
function OnMouseLeaveList(e){
    console.log("leave");
    if(cursorBGEl.classList.contains("active")){
        cursorBGEl.classList.remove("active");
    }
    if(progressEl.classList.contains("active")){
        progressEl.classList.remove("active");
    }
}

//window로 이벤트 실행 적용
window.addEventListener("mousemove", OnMouseMove);
for(var i = 0; i < btnListEls.length; i++){
    btnListEls[i].addEventListener("mouseenter", onMouseEnterList);
    btnListEls[i].addEventListener("mouseleave", OnMouseLeaveList);
}