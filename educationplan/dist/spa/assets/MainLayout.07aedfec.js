import{c as T,h as M,a as Z,b as ee,Q as te}from"./QBtn.483e7fa1.js";import{c as d,h,r as w,i as K,o as P,a as H,n as G,b as j,g as Q,l as k,d as J,e as _,w as S,f as N,p as X,j as ne,k as R,m as oe,_ as ie,q as le,s as D,t as U,u as $,v as re,x as L,y as ae,S as se}from"./index.230554ec.js";import{g as ue,a as ce,b as de,c as E}from"./scroll.063f982f.js";var fe=T({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:v}){const i=d(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>h("div",{class:i.value},M(v.default))}}),ve=T({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:v}){const i=d(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>h("div",{class:i.value,role:"toolbar"},M(v.default))}});function he(){const e=w(!K.value);return e.value===!1&&P(()=>{e.value=!0}),e}const Y=typeof ResizeObserver!="undefined",A=Y===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var F=T({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:v}){let i=null,t,o={width:-1,height:-1};function a(s){s===!0||e.debounce===0||e.debounce==="0"?u():i===null&&(i=setTimeout(u,e.debounce))}function u(){if(clearTimeout(i),i=null,t){const{offsetWidth:s,offsetHeight:l}=t;(s!==o.width||l!==o.height)&&(o={width:s,height:l},v("resize",o))}}const{proxy:m}=Q();if(Y===!0){let s;const l=g=>{t=m.$el.parentNode,t?(s=new ResizeObserver(a),s.observe(t),u()):g!==!0&&j(()=>{l(!0)})};return P(()=>{l()}),H(()=>{clearTimeout(i),s!==void 0&&(s.disconnect!==void 0?s.disconnect():t&&s.unobserve(t))}),G}else{let g=function(){clearTimeout(i),l!==void 0&&(l.removeEventListener!==void 0&&l.removeEventListener("resize",a,k.passive),l=void 0)},b=function(){g(),t&&t.contentDocument&&(l=t.contentDocument.defaultView,l.addEventListener("resize",a,k.passive),u())};const s=he();let l;return P(()=>{j(()=>{t=m.$el,t&&b()})}),H(g),m.trigger=a,()=>{if(s.value===!0)return h("object",{style:A.style,tabindex:-1,type:"text/html",data:A.url,"aria-hidden":"true",onLoad:b})}}}}),me=T({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:v,emit:i}){const{proxy:{$q:t}}=Q(),o=J(N,_);if(o===_)return console.error("QHeader needs to be child of QLayout"),_;const a=w(parseInt(e.heightHint,10)),u=w(!0),m=d(()=>e.reveal===!0||o.view.value.indexOf("H")>-1||t.platform.is.ios&&o.isContainer.value===!0),s=d(()=>{if(e.modelValue!==!0)return 0;if(m.value===!0)return u.value===!0?a.value:0;const n=a.value-o.scroll.value.position;return n>0?n:0}),l=d(()=>e.modelValue!==!0||m.value===!0&&u.value!==!0),g=d(()=>e.modelValue===!0&&l.value===!0&&e.reveal===!0),b=d(()=>"q-header q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(l.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),z=d(()=>{const n=o.rows.value.top,p={};return n[0]==="l"&&o.left.space===!0&&(p[t.lang.rtl===!0?"right":"left"]=`${o.left.size}px`),n[2]==="r"&&o.right.space===!0&&(p[t.lang.rtl===!0?"left":"right"]=`${o.right.size}px`),p});function c(n,p){o.update("header",n,p)}function y(n,p){n.value!==p&&(n.value=p)}function V({height:n}){y(a,n),c("size",n)}function O(n){g.value===!0&&y(u,!0),i("focusin",n)}S(()=>e.modelValue,n=>{c("space",n),y(u,!0),o.animate()}),S(s,n=>{c("offset",n)}),S(()=>e.reveal,n=>{n===!1&&y(u,e.modelValue)}),S(u,n=>{o.animate(),i("reveal",n)}),S(o.scroll,n=>{e.reveal===!0&&y(u,n.direction==="up"||n.position<=e.revealOffset||n.position-n.inflectionPoint<100)});const q={};return o.instances.header=q,e.modelValue===!0&&c("size",a.value),c("space",e.modelValue),c("offset",s.value),H(()=>{o.instances.header===q&&(o.instances.header=void 0,c("size",0),c("offset",0),c("space",!1))}),()=>{const n=Z(v.default,[]);return e.elevated===!0&&n.push(h("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),n.push(h(F,{debounce:0,onResize:V})),h("header",{class:b.value,style:z.value,onFocusin:O},n)}}}),ge=T({name:"QPageContainer",setup(e,{slots:v}){const{proxy:{$q:i}}=Q(),t=J(N,_);if(t===_)return console.error("QPageContainer needs to be child of QLayout"),_;X(ne,!0);const o=d(()=>{const a={};return t.header.space===!0&&(a.paddingTop=`${t.header.size}px`),t.right.space===!0&&(a[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(a.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(a[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),a});return()=>h("div",{class:"q-page-container",style:o.value},M(v.default))}});const{passive:I}=k,be=["both","horizontal","vertical"];var pe=T({name:"QScrollObserver",props:{axis:{type:String,validator:e=>be.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:v}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,o,a;S(()=>e.scrollTarget,()=>{s(),m()});function u(){t!==null&&t();const b=Math.max(0,ce(o)),z=de(o),c={top:b-i.position.top,left:z-i.position.left};if(e.axis==="vertical"&&c.top===0||e.axis==="horizontal"&&c.left===0)return;const y=Math.abs(c.top)>=Math.abs(c.left)?c.top<0?"up":"down":c.left<0?"left":"right";i.position={top:b,left:z},i.directionChanged=i.direction!==y,i.delta=c,i.directionChanged===!0&&(i.direction=y,i.inflectionPoint=i.position),v("scroll",{...i})}function m(){o=ue(a,e.scrollTarget),o.addEventListener("scroll",l,I),l(!0)}function s(){o!==void 0&&(o.removeEventListener("scroll",l,I),o=void 0)}function l(b){if(b===!0||e.debounce===0||e.debounce==="0")u();else if(t===null){const[z,c]=e.debounce?[setTimeout(u,e.debounce),clearTimeout]:[requestAnimationFrame(u),cancelAnimationFrame];t=()=>{c(z),t=null}}}const{proxy:g}=Q();return P(()=>{a=g.$el.parentNode,m()}),H(()=>{t!==null&&t(),s()}),Object.assign(g,{trigger:l,getPosition:()=>i}),G}}),ye=T({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:v,emit:i}){const{proxy:{$q:t}}=Q(),o=w(null),a=w(t.screen.height),u=w(e.container===!0?0:t.screen.width),m=w({position:0,direction:"down",inflectionPoint:0}),s=w(0),l=w(K.value===!0?0:E()),g=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),b=d(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),z=d(()=>l.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${l.value}px`}:null),c=d(()=>l.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${l.value}px`,width:`calc(100% + ${l.value}px)`}:null);function y(r){if(e.container===!0||document.qScrollPrevented!==!0){const f={position:r.position.top,direction:r.direction,directionChanged:r.directionChanged,inflectionPoint:r.inflectionPoint.top,delta:r.delta.top};m.value=f,e.onScroll!==void 0&&i("scroll",f)}}function V(r){const{height:f,width:x}=r;let C=!1;a.value!==f&&(C=!0,a.value=f,e.onScrollHeight!==void 0&&i("scroll-height",f),q()),u.value!==x&&(C=!0,u.value=x),C===!0&&e.onResize!==void 0&&i("resize",r)}function O({height:r}){s.value!==r&&(s.value=r,q())}function q(){if(e.container===!0){const r=a.value>s.value?E():0;l.value!==r&&(l.value=r)}}let n;const p={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:o,height:a,containerHeight:s,scrollbarWidth:l,totalWidth:d(()=>u.value+l.value),rows:d(()=>{const r=e.view.toLowerCase().split(" ");return{top:r[0].split(""),middle:r[1].split(""),bottom:r[2].split("")}}),header:R({size:0,offset:0,space:!1}),right:R({size:300,offset:0,space:!1}),footer:R({size:0,offset:0,space:!1}),left:R({size:300,offset:0,space:!1}),scroll:m,animate(){n!==void 0?clearTimeout(n):document.body.classList.add("q-body--layout-animate"),n=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),n=void 0},155)},update(r,f,x){p[r][f]=x}};if(X(N,p),E()>0){let x=function(){r=null,f.classList.remove("hide-scrollbar")},C=function(){if(r===null){if(f.scrollHeight>t.screen.height)return;f.classList.add("hide-scrollbar")}else clearTimeout(r);r=setTimeout(x,300)},B=function(W){r!==null&&W==="remove"&&(clearTimeout(r),x()),window[`${W}EventListener`]("resize",C)},r=null;const f=document.body;S(()=>e.container!==!0?"add":"remove",B),e.container!==!0&&B("add"),oe(()=>{B("remove")})}return()=>{const r=ee(v.default,[h(pe,{onScroll:y}),h(F,{onResize:V})]),f=h("div",{class:g.value,style:b.value,ref:e.container===!0?void 0:o,tabindex:-1},r);return e.container===!0?h("div",{class:"q-layout-container overflow-hidden",ref:o},[h(F,{onResize:O}),h("div",{class:"absolute-full",style:z.value},[h("div",{class:"scroll",style:c.value},[f])])]):f}}});const we=le({name:"MainLayout",components:{},setup(){return{}}});function ze(e,v,i,t,o,a){const u=re("router-view");return D(),U(ye,{view:"lHh Lpr lFf"},{default:$(()=>[L(me,{elevated:""},{default:$(()=>[L(ve,null,{default:$(()=>[L(te,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"}),L(fe,null,{default:$(()=>[ae(" \u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0443\u0447\u0438\u0442\u0435\u043B\u044F ")]),_:1})]),_:1})]),_:1}),L(ge,null,{default:$(()=>[(D(),U(se,null,{default:$(()=>[L(u)]),_:1}))]),_:1})]),_:1})}var $e=ie(we,[["render",ze]]);export{$e as default};
