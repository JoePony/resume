define(function(require,exports,module){function SlideJQ(ele,options){var optsDefault={initialIndex:1,speed:300,animate:{type:"slide",className:""},aniamtionType:"swing",autoPlay:!0,duration:2500,mouseType:"click mouseover",titleHidden:!1,navHidden:!1,remainNav:!1};this.opts=$.extend({},!0,optsDefault,options);var opts=this.opts;if(!ele)throw new Error("Please specify contaner element");if(this.slideWrap=$(ele),!opts.slideList)throw new Error("Please specify slide list element");if(this.slideList=$(ele).find(opts.slideList),this.slideListItems=this.slideList.children(),this.slideListItemsNum=this.slideListItems.length,this.lastIndex=this.slideListItemsNum-1,this.slideItemWidth=this.slideList.children().outerWidth(!0),this.titleList=opts.titleList?$(ele).find(opts.titleList):null,this.titleHidden=opts.titleHidden,this.arrowHide=opts.arrowHide,this.navHidden=opts.navHidden,this.remainNav=opts.remainNav,opts.navList){if(this.navList=opts.navList.ele?$(ele).find(opts.navList.ele):null,!(this.navList.children().length>0))throw new Error("Need at least one navigation list item");this.navListItems=this.navList.children()}if(this.navList){if(!opts.navList.activeClass)throw new Error("Please specify navigation button highlight class name");this.navListItemActiveClass=opts.navList.activeClass}if(opts.initialIndex>this.slideListItemsNum||opts.initialIndex<1)throw new Error("initialIndex:"+this.initialIndex+" over range");this.initialIndex=opts.initialIndex-1,this.activeIndex=this.initialIndex,this.aniamtionType=opts.aniamtionType,this.arrowPrev=$(ele).find(opts.arrowPrev),this.arrowNext=$(ele).find(opts.arrowNext),this.duration=opts.duration,this.animateType=opts.animate.type,this.animateClassName=opts.animate.className?opts.animate.className:"",this.speed=opts.speed,this.autoPlay=opts.autoPlay,this.mouseType=opts.mouseType,this.fnInit()}function calculateTerminalIndex(param){var _this=param._this,e=param.e,terminalIndex=void 0!==e.terminalIndex?e.terminalIndex:null,slideStep=(void 0!==e.justMove&&e.justMove,void 0!==e.slideStep?e.slideStep:null);return null!==slideStep&&(terminalIndex=slideStep>0&&0==_this.activeIndex?_this.lastIndex:slideStep<0&&_this.activeIndex==_this.lastIndex?0:_this.activeIndex-slideStep),terminalIndex}SlideJQ.prototype.fnInit=function(){this.fnBinding(),this.slideListItemsNum>0&&this.fnInitPosition(),this.navList&&this.navListItems&&this.fnCreateNavs(),this.titleList&&this.fnTitleSwitch(),this.autoPlay&&this.fnAutoPlay()},SlideJQ.prototype.fnCreateNavs=function(){var _this=this;if(!_this.remainNav){for(var fragment=document.createDocumentFragment(),i=0,len=_this.slideListItemsNum;i<len;i++)_this.navListItems.first().clone(!0).removeClass(_this.navListItemActiveClass).appendTo(fragment);_this.navList.empty().append(fragment)}this.fnShowActive({index:this.initialIndex})},SlideJQ.prototype.fnShowActive=function(){var _this=this;_this.navList.children()[_this.initialIndex].classList.add(_this.navListItemActiveClass)},SlideJQ.prototype.fnAutoPlay=function(){var _this=this;_this.timer=setTimeout(function(){_this.fnAnimate({slideStep:-1}),_this.navList&&_this.fnNavSwitch(_this.activeIndex),_this.titleList&&_this.fnTitleSwitch(_this.activeIndex),_this.fnAutoPlay()},_this.duration)},SlideJQ.prototype.fnBinding=function(){var _this=this;_this.arrowNext.on("click",function(){_this.slideList.is(":animated")||(_this.fnAnimate({slideStep:-1}),_this.navList&&_this.fnNavSwitch(_this.activeIndex),_this.titleList&&_this.fnTitleSwitch(_this.activeIndex))}),_this.arrowPrev.on("click",function(){_this.slideList.is(":animated")||(_this.fnAnimate({slideStep:1}),_this.navList&&_this.fnNavSwitch(_this.activeIndex),_this.titleList&&_this.fnTitleSwitch(_this.activeIndex))}),_this.navList&&_this.navList.on(_this.mouseType,function(e){for(var k in this.children)if(e.target===this.children[k]&&!e.target.classList.contains(_this.navListItemActiveClass)){var clickedNavIndex=$(e.target).index();_this.activeIndex;_this.fnAnimate({justMove:!0,terminalIndex:clickedNavIndex}),_this.navList&&_this.fnNavSwitch(clickedNavIndex),_this.titleList&&_this.fnTitleSwitch(clickedNavIndex);break}}),_this.slideList[0].addEventListener("touchstart",function(e){_this.slideList.is(":animated")||_this.fnTouchStart({e:e,ele:this})}),_this.slideList[0].addEventListener("touchmove",function(e){_this.slideList.is(":animated")||_this.fnTouchMove({e:e,ele:this})}),_this.slideList[0].addEventListener("touchend",function(e){_this.slideList.is(":animated")||_this.fnTouchEnd({e:e,ele:this})}),_this.autoPlay&&(_this.slideWrap.on("mouseenter touchstart touchmove",function(){clearInterval(_this.timer)}),_this.slideWrap.on("mouseleave touchend",function(){_this.fnAutoPlay()})),_this.titleHidden&&_this.slideWrap.hover(function(){_this.titleList.slideDown("fast")},function(){_this.titleList.slideUp(0)}),_this.navHidden&&_this.slideWrap.hover(function(){_this.navList.slideDown("fast")},function(){_this.navList.slideUp(0)})},SlideJQ.prototype.fnTitleSwitch=function(index){this.titleList.children().eq(index).stop(!0,!0).fadeIn(300).siblings().hide(0)},SlideJQ.prototype.fnNavSwitch=function(index){var _this=this;_this.navList.children().eq(index).siblings().removeClass(_this.navListItemActiveClass).end().addClass(_this.navListItemActiveClass)},SlideJQ.prototype.fnAnimate=function(e){var _this=this;switch(_this.animateType){case"slide":_this.fnSlide(e);break;case"carrousel":_this.fnSlideCarrousel(e);break;case"fade":case"blur":case"scale":case"rotate":_this.fnSlideWithOtherAnimate(e);break;default:_this.fnSlideWithDefault(e)}},SlideJQ.prototype.fnSlideCarrousel=function(e){var _this=this,direction=(e.data?e.data.slideStep:e.slideStep)>0?"right":"left";_this.activeIndex,_this.activeIndex,_this.lastIndex,!!e.justMove&&e.justMove,void 0!==e.terminalIndex&&e.terminalIndex;"left"==direction?_this.slideList.animate({right:"+="+_this.slideItemWidth},_this.speed,function(){$(this).animate({right:"-="+_this.slideItemWidth},0).append($(this).children()[0])}):"right"==direction&&_this.slideList.prepend(_this.slideList.children().last()).animate({right:"+="+_this.slideItemWidth},0,function(){$(this).animate({right:"-="+_this.slideItemWidth},_this.speed)})},SlideJQ.prototype.fnSlide=function(e){var slideDistence,_this=this,slideStep=e.data?e.data.slideStep:e.slideStep,direction=slideStep>0?"right":"left",toLeftEdge=0==_this.activeIndex,toRightEdge=_this.activeIndex==_this.lastIndex,justMove=!!e.justMove&&e.justMove,terminalIndex=void 0!==e.terminalIndex?e.terminalIndex:null;if(justMove)slideDistence=_this.slideItemWidth*(terminalIndex-_this.activeIndex),_this.slideList.stop(!0,!0).animate({right:"+="+slideDistence},_this.speed,_this.aniamtionType),_this.activeIndex=terminalIndex;else{if(_this.slideList.is(":animated"))return;if(slideDistence=Math.abs(_this.slideItemWidth*slideStep),"left"==direction)if(toRightEdge){clone=_this.slideList.children().first().clone(!0);_this.slideList.append(clone).animate({width:"+="+_this.slideItemWidth},0).animate({right:"+="+_this.slideItemWidth},_this.speed,function(){this.removeChild(this.lastElementChild),this.style.right="0px"}).animate({width:"-="+_this.slideItemWidth},0),_this.activeIndex=0}else _this.slideList.animate({right:"+="+slideDistence},_this.speed),_this.activeIndex++;else if("right"==direction)if(toLeftEdge){var clone=_this.slideList.children().last().clone(!0);_this.slideList.prepend(clone).animate({width:"+="+_this.slideItemWidth},0).animate({right:"+="+_this.slideItemWidth},0).animate({right:"-="+_this.slideItemWidth},_this.speed,function(){this.removeChild(this.firstElementChild),this.style.right=_this.slideItemWidth*(_this.slideListItemsNum-1)+"px"}).animate({width:"-="+_this.slideItemWidth},0),_this.activeIndex=_this.lastIndex}else _this.slideList.animate({right:"-="+slideDistence},_this.speed),_this.activeIndex--}},SlideJQ.prototype.fnTouchStart=function(e){var _this=this,slideList=e.ele,event=e.e;_this.touchStartX=event.touches[0].clientX,_this.positionRight=parseInt(slideList.style.right),_this.toLeftEdge=0==_this.activeIndex,_this.toRightEdge=_this.activeIndex==_this.lastIndex},SlideJQ.prototype.fnTouchMove=function(e){var _this=_this||this,slideList=slideList||e.ele,event=event||e.e,touches=touches||event.touches[0],right=right||_this.positionRight,startX=startX||_this.touchStartX;touches.clientX-startX>0?_this.toLeftEdge?slideList.style.right=right-25+"px":slideList.style.right=right-(touches.clientX-startX)+"px":_this.toRightEdge?slideList.style.right=right+25+"px":slideList.style.right=right+(startX-touches.clientX)+"px",_this.touchMovingX=parseInt(slideList.style.right)-right},SlideJQ.prototype.fnTouchEnd=function(e){var terminal,terminalIndex,_this=this,slideList=e.ele,right=(e.e,_this.positionRight);terminalIndex=(terminal=_this.touchMovingX>0?_this.toRightEdge?right:Math.abs(_this.touchMovingX)>_this.slideItemWidth/2?right+_this.slideItemWidth:right:_this.toLeftEdge?right:Math.abs(_this.touchMovingX)>_this.slideItemWidth/2?right-_this.slideItemWidth:right)/_this.slideItemWidth,_this.activeIndex=terminalIndex,$(slideList).animate({right:terminal},100),_this.navList&&_this.fnNavSwitch(terminalIndex),_this.titleList&&_this.fnTitleSwitch(terminalIndex)},SlideJQ.prototype.fnSlideWithOtherAnimate=function(e){var _this=this,terminalIndex=calculateTerminalIndex({e:e,_this:_this});_this.slideList.children().eq(terminalIndex).show(0).addClass(_this.animateClassName).siblings().removeClass(_this.animateClassName).hide(0),_this.activeIndex=terminalIndex},SlideJQ.prototype.fnSlideWithDefault=function(e){var _this=this,terminalIndex=calculateTerminalIndex({e:e,_this:_this});_this.slideList.children().eq(terminalIndex).show(0).siblings().hide(0),_this.activeIndex=terminalIndex},SlideJQ.prototype.fnInitPosition=function(num){var _this=this;-1!==["slide","carrousel"].indexOf(_this.animateType)&&(_this.slideTotalWidth=this.slideItemWidth*(num||this.slideListItemsNum),_this.slideList.css({position:"relative",width:_this.slideTotalWidth,right:this.slideItemWidth*(num||this.initialIndex)})),-1!==["fade","scale","blur","rotate","default"].indexOf(_this.animateType)&&Array.prototype.forEach.call(_this.slideList[0].children,function(e){_this.slideList[0].children[_this.initialIndex]!==e&&(e.style.display="none")}),_this.titleList&&(_this.titleList.css("position",function(){var position=window.getComputedStyle(this,null).position;return"static"==position?"relative":position}).children().css({position:"absolute",display:"none"}),_this.fnTitleSwitch(this.initialIndex)),_this.titleHidden&&_this.titleList.hide(),_this.navHidden&&_this.navList.hide()},function($){$.fn.extend({slideJQ:function(opts){return this.each(function(){new SlideJQ(this,opts)}),this}})}(jQuery),module.exports=SlideJQ});