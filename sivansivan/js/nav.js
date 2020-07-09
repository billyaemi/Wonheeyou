//메뉴(내비게이션) 요소 노드 불러오기
var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('nav');
var lineOne = document.querySelector('nav .menu-btn .line--1');
var lineTwo = document.querySelector('nav .menu-btn .line--2');
var lineThree = document.querySelector('nav .menu-btn .line--3');
var link = document.querySelector('nav .nav-links');

//메뉴 버튼을 클릭했을 때,
menuBtn.addEventListener('click', () => {
    //내비게이션 div가 열리며
    nav.classList.toggle('nav-open');
    //메뉴 버튼이 크로스로 변하고
    lineOne.classList.toggle('line-cross');
    //두번째 줄은 사라지고
    lineTwo.classList.toggle('line-fade-out');
    //메뉴 버튼이 크로스로 변하고
    lineThree.classList.toggle('line-cross');
    //내비게이션 상세 메뉴가 보여짐
    link.classList.toggle('fade-in');
})