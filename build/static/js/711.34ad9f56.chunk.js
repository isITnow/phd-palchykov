"use strict";(self.webpackChunkphd_palchykov=self.webpackChunkphd_palchykov||[]).push([[711],{3604:function(e,n){n.Z=function(e){var n="Prof. Dr. Palchykov";return document.title=e?"".concat(e," | ").concat(n):n}},598:function(e,n,t){var r=t(3329);n.Z=function(e){var n=e.children;return(0,r.jsx)("section",{className:"py-4",children:n})}},2711:function(e,n,t){t.r(n),t.d(n,{default:function(){return N}});var r=t(2791),s=t(1087),a=t(9434),i=t(5056),c=t(3623),l=t(7193),o=t(8070),d=t(747),u=t(1413),h=t(2333),m=t(4522),f=t(3329),x=function(e){var n=e.research,t=e.index,r=n.id,s=n.title,l=n.illustrations,o=n.sourceList,d=(0,a.v9)(i.T).status,u=(0,a.I0)(),h=(0,m.Z)(),x="pending"===d;return(0,f.jsxs)("div",{id:t,children:[(0,f.jsxs)("div",{className:"d-flex mb-2 justify-content-center",children:[(0,f.jsxs)("span",{className:"me-2 text-secondary fs-5 lh-sm",children:[t,"."]}),(0,f.jsx)("h5",{className:"card-title text-danger",children:s})]}),l.map((function(e){var n=e.id,t=e.schema_url,r=e.description;return(0,f.jsxs)("div",{className:"mb-2",children:[(0,f.jsx)("p",{className:"mb-1",style:{textIndent:"2rem",textAlign:"justify"},children:r}),(0,f.jsx)("div",{className:"p-3 text-center",children:(0,f.jsx)("img",{className:"img-fluid",src:t,alt:"schema"})})]},n)})),(0,f.jsxs)("div",{className:"d-flex justify-content-between align-items-end",children:[(0,f.jsxs)("div",{className:"ms-4",children:[(0,f.jsx)("p",{className:"mb-2",children:"Our relevant works:"}),(0,f.jsx)("ul",{style:{fontSize:"0.75rem"},children:o.map((function(e,n){var t=e.source_url,r=e.source;return(0,f.jsx)("li",{children:(0,f.jsx)("a",{href:t,target:"_blank",rel:"noreferrer noopener",children:(0,f.jsx)("span",{className:"fst-italic",children:r})})},n)}))})]}),h&&(0,f.jsx)("div",{className:"me-4",children:(0,f.jsx)("button",{disabled:x,type:"button",className:"btn btn-sm btn-danger",onClick:function(){u((0,c.SG)(r))},children:"delete"})})]})]})},j="research_hoverEffect__gzvvB",v={initial:{opacity:0,y:-15},animate:{opacity:1,y:0},transition:{duration:.9,delay:.4},exit:{opacity:0,y:-15}},p=function(e){var n=e.researches,t=null;n.length&&(t=n.map((function(e){return(0,u.Z)((0,u.Z)({},e),JSON.parse(e.payload))})));if(t)return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("ul",{children:t.map((function(e,n){var t=e.id,r=e.title;return(0,f.jsx)("li",{className:"text-secondary ".concat(j),onClick:function(){return function(e){var n=document.getElementById(e);n&&n.scrollIntoView({behavior:"smooth"})}(n+1)},children:"# ".concat(r)},t)}))}),(0,f.jsx)("ul",{children:t.map((function(e,n){return(0,f.jsx)(h.E.li,{className:"mb-5 border-2 border-bottom border-secondary pb-3",initial:"initial",animate:"animate",transition:"transition",exit:"exit",variants:v,children:(0,f.jsx)(x,{research:e,index:n+1})},e.id)}))})]})},y=t(598),b=t(3604),N=function(){(0,b.Z)("Research");var e=(0,a.I0)(),n=(0,a.v9)(i.T),t=n.researches,u=n.status,h=n.error,x=(0,o.V)(),j=x.alert,v=x.showAlert,N=(0,m.Z)();return(0,r.useEffect)((function(){e((0,c.Z8)())}),[e]),(0,r.useEffect)((function(){"rejected"!==u||v("".concat(h,". Please contact your administrator!"),"danger")}),[u]),"loading"===u?(0,f.jsx)(d.Z,{}):(0,f.jsxs)(y.Z,{children:[(0,f.jsx)(l.Z,{state:j}),(0,f.jsx)(p,{researches:t}),N&&(0,f.jsx)("div",{className:"text-end",children:(0,f.jsx)(s.rU,{className:"btn btn-primary",to:"/research/new",children:"new research"})})]})}},5056:function(e,n,t){t.d(n,{T:function(){return r}});var r=function(e){return e.researches}}}]);
//# sourceMappingURL=711.34ad9f56.chunk.js.map