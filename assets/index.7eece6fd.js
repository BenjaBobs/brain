var H=Object.defineProperty;var T=(e,o,t)=>o in e?H(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var _=(e,o,t)=>(T(e,typeof o!="symbol"?o+"":o,t),t);import{T as b,a as w,C as S,G as O,b as k,D as h,A,R as F}from"./vendor.a5397c90.js";const P=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};P();class p{get typename(){return this.__proto__.constructor.name}}class y extends p{constructor(o){super();this.menuItems=o}}var I=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",HoverMenuComponent:y});class u extends p{constructor(){super(...arguments);_(this,"isHovered",!1)}}var j=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",HoverableComponent:u});class M extends p{}const z={query:e=>{const o=e.getComponent(y),t=e.getComponent(u);return!!o&&(t==null?void 0:t.isHovered)},onAdded:e=>{const o=e,t=e.getComponent(y);if(o.addChild){let r=0;for(const n of t.menuItems){const s=R(n.text);s.addComponent(new M),s.interactive=!0,s.on("pointerdown",n.onClick),s.transform.position.x+=20,s.transform.position.y+=s.style.fontSize*++r-t.menuItems.length*s.style.fontSize,o.addChild(s)}}},onRemoved:e=>{const o=e,t=o.children.filter(r=>r.getComponent(M));o.removeChild(...t);for(const r of t)r.destroy()}};function R(e){const o=new w({fontFamily:"Arial",fontSize:12,fontStyle:"italic",fontWeight:"bold",fill:["#ffffff","#00ff99"],stroke:"#4a1850",strokeThickness:5,dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAngle:Math.PI/6,dropShadowDistance:6,wordWrap:!0,wordWrapWidth:440,lineJoin:"round"});return new b(e,o)}var W=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",HoverMenuSystem:z});const L={query:e=>!!e.getComponent(u),onAdded:e=>{e.on("pointerover",()=>{const o=e.getComponent(u);o.isHovered=!0,e.addComponent(o)}),e.on("pointerout",()=>{const o=e.getComponent(u);o.isHovered=!1,e.addComponent(o)})},onRemoved:e=>{e.removeAllListeners("pointerover").removeAllListeners("pointerout")}};var N=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",HoverableSystem:L});class v extends p{}var E=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",PushAwayComponent:v});const x={create(e){var s,i,f;const o=(s=e==null?void 0:e.radius)!=null?s:10,t=new S;t.addComponent(new v),t.addComponent(new u),t.addComponent(new y([{text:"Add note",onClick:()=>console.log("Clicked A")}]));const r=new O;r.beginFill(16777215*Math.random()),r.drawCircle(0,0,o),r.interactive=!0,r.buttonMode=!0,r.on("pointerdown",a=>{console.log("Clicked on ",{x:a.currentTarget.worldTransform.tx.toFixed(0),y:a.currentTarget.worldTransform.ty.toFixed(0),node:t})});const n=new S;return n.hitArea=new k(0,0,o*3),n.interactive=!0,t.interactiveChildren=!0,t.addChild(n),t.addChild(r),t.position.set((i=e==null?void 0:e.x)!=null?i:o,(f=e==null?void 0:e.y)!=null?f:o),t.interactive=!0,t}};var D=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",Node:x});const B={query:e=>!!e.getComponent(v),onAdded:e=>console.log("PushAway added",e.transform._worldID),onRemoved:e=>console.log("PushAway removed",e.transform._worldID),update:(e,o)=>{for(const t of e)for(const r of e){if(t===r)continue;const n=t.position.subtract(r.position);let s=n.magnitudeSquared();if(s<15e3){s===0&&(s=1,n.x+=Math.random(),n.y+=Math.random());const i=10/s;t.x+=n.x*i*o,t.y+=n.y*i*o}}}};var G=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",PushAwaySystem:B});h.prototype.getComponent=function(e){var o;return(o=this.components)==null?void 0:o[e.name]};h.prototype.addComponent=function(e){this.components?this.components[e.typename]=e:this.components={[e.typename]:e},this.onChanged(this)};h.prototype.removeComponent=function(e){var o,t;((o=this.components)==null?void 0:o[e.name])!==void 0&&((t=this.components)==null||delete t[e.name],this.onChanged(this))};h.prototype.onChanged=function(e){var o;(o=this.parent)==null||o.onChanged(e)};function J(e){e.ecs||(e.ecs={queries:{symbolMap:{},caches:{}},systems:{update:[],reactive:[],all:[]}})}A.prototype.addSystem=function(e){var i;if(!this.ecs)throw new Error("remember to init");if(!e.query||!e.update&&!(e.onAdded||e.onRemoved))return;const o=e.query.toString(),t=(i=this.ecs.queries.symbolMap[o])!=null?i:Symbol();this.ecs.queries.symbolMap[o]||(this.ecs.queries.symbolMap[o]=t);const r=e;r.querySymbol=t,this.ecs.queries.caches[t]||(this.ecs.queries.caches[t]={query:e.query,cache:[],reactiveSystems:[]}),this.ecs.systems.all.push(e);const n=r;(n.onAdded||n.onRemoved)&&(this.ecs.systems.reactive.push(n),this.ecs.queries.caches[t].reactiveSystems.push(n));const s=r;s.update!==void 0&&this.ecs.systems.update.push(s)};function $(e){J(e),K(e.stage),e.ticker.add(o=>Q(e,o)),e.stage.onChanged=o=>{var s,i,f;const t=Object.values(e.ecs.queries.symbolMap).map(a=>e.ecs.queries.caches[a]),r=[o];let n=o.parent;for(;n;)r.unshift(n),n=n.parent;q(o,r);for(const a of r)for(const d of t){const m=d.query(a),g=(s=d.cache.includes(a))!=null?s:!1;if(m!==g){if(m&&!g)for(const l of d.reactiveSystems)(i=l.onAdded)==null||i.call(l,a);else if(!m&&g)for(const l of d.reactiveSystems)(f=l.onRemoved)==null||f.call(l,a);m?d.cache.push(a):d.cache.splice(d.cache.indexOf(a),1)}}}}function K(e){const o=e.onChildrenChange,t=function(r){o(r),e.onChanged(e)};e.onChildrenChange=t}function Q(e,o){var t,r;for(const n of(r=(t=e.ecs)==null?void 0:t.systems.update)!=null?r:[]){const s=n.querySymbol,i=e.ecs.queries.caches[s];i.cache.length&&n.update(i.cache,o)}}function q(e,o){var r;const t=e;if((r=t.children)==null?void 0:r.length)for(const n of t.children)o.push(n),q(n,o)}const c=new A({width:window.innerWidth,height:window.innerHeight});$(c);c.ticker.maxFPS=60;console.log(c);for(const[e,o]of Object.entries({"./Features/HoverMenu/HoverMenuComponent.ts":I,"./Features/HoverMenu/HoverMenuSystem.ts":W,"./Features/Hoverable/HoverableComponent.ts":j,"./Features/Hoverable/HoverableSystem.ts":N,"./Features/Nodes/Node.ts":D,"./Features/PushAway/PushAwayComponent.ts":E,"./Features/PushAway/PushAwaySystem.ts":G})){console.log(`Registering features in ${e}`);for(const[t,r]of Object.entries(o))t.endsWith("System")&&(console.log(`  System: ${t}`),c.addSystem(r))}const U=new w({fontFamily:"Arial",fontSize:36,fontStyle:"italic",fontWeight:"bold",fill:["#ffffff","#00ff99"],stroke:"#4a1850",strokeThickness:5,dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAngle:Math.PI/6,dropShadowDistance:6,wordWrap:!0,wordWrapWidth:440,lineJoin:"round"}),C=new b("Click to add circle",U);C.x=10;C.y=10;c.stage.addChild(C);c.stage.interactive=!0;c.stage.hitArea=new F(0,0,c.screen.width,c.screen.height);c.stage.on("pointerdown",e=>{e.target===c.stage&&(console.log("clicked outside",[e.data.global.x,e.data.global.y]),c.stage.addChild(x.create({x:e.data.global.x,y:e.data.global.y})))});document.body.appendChild(c.view);