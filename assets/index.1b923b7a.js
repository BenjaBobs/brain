import{T as g,a as w,D as p,A as C,C as v,G as A,b as q,R as M}from"./vendor.a5397c90.js";const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}};x();const h="HoverMenuComponent",S={_type:"_menuItem"},P={query:e=>{var t,o;return(o=(t=e.getComponent(h))==null?void 0:t.active)!=null?o:!1},onAdded:e=>{const t=e.getComponent(h);if(e.addChild){const o=e;let r=0;for(const n of t.menuItems){const s=T(n);s.addComponent(S),s.transform.position.x+=20,s.transform.position.y+=s.style.fontSize*++r+-70,o.addChild(s)}}},onRemoved:e=>{const t=e,o=t.children.filter(r=>r.getComponent(S._type));t.removeChild(...o)}};function T(e){const t=new w({fontFamily:"Arial",fontSize:12,fontStyle:"italic",fontWeight:"bold",fill:["#ffffff","#00ff99"],stroke:"#4a1850",strokeThickness:5,dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAngle:Math.PI/6,dropShadowDistance:6,wordWrap:!0,wordWrapWidth:440,lineJoin:"round"});return new g(e,t)}var k=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",HoverMenuSystem:P});const b={_type:"pushAway"},O={query:e=>!!e.getComponent(b._type),onAdded:e=>console.log("PushAway added",e.transform._worldID),onRemoved:e=>console.log("PushAway removed",e.transform._worldID),update:(e,t)=>{for(const o of e)for(const r of e){if(o===r)continue;const n=o.position.subtract(r.position);let s=n.magnitude();if(s<100){s===0&&(s=1,n.x+=Math.random(),n.y+=Math.random());const i=1/s;o.x+=n.x*i*t,o.y+=n.y*i*t}}}};var I=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",PushAwaySystem:O});p.prototype.getComponent=function(e){var t;return(t=this.components)==null?void 0:t[e]};p.prototype.addComponent=function(e){this.components?this.components[e._type]=e:this.components={[e._type]:e},this.onChanged(this)};p.prototype.removeComponent=function(e){var t,o;((t=this.components)==null?void 0:t[e])!==void 0&&((o=this.components)==null||delete o[e],this.onChanged(this))};p.prototype.onChanged=function(e){var t;(t=this.parent)==null||t.onChanged(e)};function F(e){e.ecs||(e.ecs={queries:{symbolMap:{},caches:{}},systems:{update:[],reactive:[],all:[]}})}C.prototype.addSystem=function(e){var i;if(!this.ecs)throw new Error("remember to init");if(!e.query||!e.update&&!(e.onAdded||e.onRemoved))return;const t=e.query.toString(),o=(i=this.ecs.queries.symbolMap[t])!=null?i:Symbol();this.ecs.queries.symbolMap[t]||(this.ecs.queries.symbolMap[t]=o);const r=e;r.querySymbol=o,this.ecs.queries.caches[o]||(this.ecs.queries.caches[o]={query:e.query,cache:[],reactiveSystems:[]}),this.ecs.systems.all.push(e);const n=r;(n.onAdded||n.onRemoved)&&(this.ecs.systems.reactive.push(n),this.ecs.queries.caches[o].reactiveSystems.push(n));const s=r;s.update!==void 0&&this.ecs.systems.update.push(s)};function W(e){F(e),j(e.stage),e.ticker.add(t=>R(e,t)),e.stage.onChanged=t=>{var s,i,u;const o=Object.values(e.ecs.queries.symbolMap).map(c=>e.ecs.queries.caches[c]),r=[t];let n=t.parent;for(;n;)r.unshift(n),n=n.parent;_(t,r);for(const c of r)for(const a of o){const f=a.query(c),m=(s=a.cache.includes(c))!=null?s:!1;if(f!==m){if(f&&!m)for(const l of a.reactiveSystems)(i=l.onAdded)==null||i.call(l,c);else if(!f&&m)for(const l of a.reactiveSystems)(u=l.onRemoved)==null||u.call(l,c);f?a.cache.push(c):a.cache.splice(a.cache.indexOf(c),1)}}}}function j(e){const t=e.onChildrenChange,o=function(r){t(r),e.onChanged(e)};e.onChildrenChange=o}function R(e,t){var o,r;for(const n of(r=(o=e.ecs)==null?void 0:o.systems.update)!=null?r:[]){const s=n.querySymbol,i=e.ecs.queries.caches[s];i.cache.length&&n.update(i.cache,t)}}function _(e,t){var r;const o=e;if((r=o.children)==null?void 0:r.length)for(const n of o.children)t.push(n),_(n,t)}const H={create(e){var s,i,u;const t=(s=e==null?void 0:e.radius)!=null?s:10,o=new v;o.addComponent(b),o.addComponent({_type:h,active:!1,menuItems:["A","B"]});const r=new A;r.beginFill(16777215*Math.random()),r.drawCircle(0,0,t),r.interactive=!0,r.buttonMode=!0,r.on("pointerdown",c=>{console.log("Clicked on ",{x:c.currentTarget.worldTransform.tx.toFixed(0),y:c.currentTarget.worldTransform.ty.toFixed(0),node:o})});const n=new v;return n.hitArea=new q(0,0,t*7),n.interactive=!0,n.on("pointerover",c=>{const a=o.getComponent(h);a.active=!0,o.addComponent(a)}),n.on("pointerout",c=>{const a=o.getComponent(h);a.active=!1,o.addComponent(a)}),o.interactiveChildren=!0,o.addChild(n),o.addChild(r),o.position.set((i=e==null?void 0:e.x)!=null?i:t,(u=e==null?void 0:e.y)!=null?u:t),o.interactive=!0,o}},d=new C({width:window.innerWidth,height:window.innerHeight});W(d);d.ticker.maxFPS=60;console.log(d);for(const e of Object.values({"./Features/HoverMenu/HoverMenuSystem.ts":k,"./Features/PushAway/PushAwaySystem.ts":I})){const t=Object.keys(e)[0];console.log(`System added: ${t}`);const o=Object.values(e);d.addSystem(o[0])}const D=new w({fontFamily:"Arial",fontSize:36,fontStyle:"italic",fontWeight:"bold",fill:["#ffffff","#00ff99"],stroke:"#4a1850",strokeThickness:5,dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAngle:Math.PI/6,dropShadowDistance:6,wordWrap:!0,wordWrapWidth:440,lineJoin:"round"}),y=new g("Click to add circle",D);y.x=10;y.y=10;d.stage.addChild(y);d.stage.interactive=!0;d.stage.hitArea=new M(0,0,d.screen.width,d.screen.height);d.stage.on("pointerdown",e=>{e.target===d.stage&&(console.log("clicked outside",[e.data.global.x,e.data.global.y]),d.stage.addChild(H.create({x:e.data.global.x,y:e.data.global.y})))});document.body.appendChild(d.view);
