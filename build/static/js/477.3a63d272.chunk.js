"use strict";(self.webpackChunkphd_palchykov=self.webpackChunkphd_palchykov||[]).push([[477],{3876:function(e,t,n){n(2791);var r=n(3329);t.Z=function(e){var t=e.requirementsList;return(0,r.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,r.jsx)("p",{className:"mb-2 px-3 text-secondary fw-bolder",children:"required fields:"}),(0,r.jsx)("ul",{className:"list-group list-group-numbered",children:t.map((function(e,t){return(0,r.jsx)("li",{className:"list-group-item",children:e},t)}))})]})}},3764:function(e,t,n){var r=n(3329);t.Z=function(e){var t=e.children;return(0,r.jsx)("h4",{className:"text-center mb-3",children:t})}},8061:function(e,t,n){var r=n(7689),i=n(3329);t.Z=function(e){var t=e.path,n=e.children,a=(0,r.s0)();return(0,i.jsx)("button",{type:"button",className:"btn btn-outline-secondary",onClick:function(){return a(t)},children:n})}},9364:function(e,t,n){var r=n(3329);t.Z=function(e){var t=e.index,n=e.text;return(0,r.jsx)("div",{className:"mb-3",children:(0,r.jsx)("span",{className:"px-3 badge rounded-pill text-bg-secondary ",children:"".concat(n," ").concat(t+1)})})}},598:function(e,t,n){var r=n(3329);t.Z=function(e){var t=e.children;return(0,r.jsx)("section",{className:"py-4",children:t})}},6477:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(2791),i=n(7689),a=n(9434),s=n(4314),l=n(5889),c=n(7193),o=n(8070),u=n(3764),d=n(3876),p=n(4165),m=n(5861),b=n(2506),h=n(2108),x=n(9364),f=n(8061),j=n(6193),v=n(1413),y=n(9439),N=n(5987),Z=n(9578),g=n(3329),_=["label","items"],w=function(e){var t=e.label,n=e.items,r=(0,N.Z)(e,_),i=(0,b.U$)(r.name),a=(0,y.Z)(i,2),s=a[0],l=a[1];return(0,g.jsxs)("div",{className:"mb-3",children:[(0,g.jsx)("label",{className:"form-label px-3 text-secondary fw-bold",children:t}),(0,g.jsxs)("select",(0,v.Z)((0,v.Z)((0,v.Z)({},s),r),{},{className:"form-select",children:[(0,g.jsx)("option",{defaultValue:"Select",children:"Select a value"}),n.map((function(e,t){return(0,g.jsx)("option",{value:e,children:e},t)}))]})),l.touched&&l.error&&(0,g.jsx)(Z.Z,{children:l.error})]})},F=n(7212),S=n(2049),C=function(e,t){return e.find((function(e){return e.id===t}))},k=function(e){var t=e.title.split("-"),n=(0,y.Z)(t,2),r=n[0],i=n[1],a=i;"present"===i&&(a=(new Date).getFullYear());for(var s=[],l=r;a>=l;)s.push(l.toString()),l++;return s},q=function(e){var t=e.publication,n=e.status,r=(0,a.I0)(),s=(0,i.UO)().period_id,c=(0,a.v9)(l.W).periods,o=parseInt(s),u=C(c,o),d=k(u).length?k(u):["no data"],v=!t,y=function(){var e=(0,m.Z)((0,p.Z)().mark((function e(n,i){var a,l,c,o,u,d,m,b,x;return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.title,l=n.year,c=n.sequence_number,o=n.source_url,u=n.source,d=n.cover,m=n.abstract,b=n.authors,(x=new FormData).append("publication[title]",a.trim()),x.append("publication[year]",l),x.append("publication[sequence_number]",c),x.append("publication[title]",a.trim()),x.append("publication[source]",u.trim()),x.append("publication[source_url]",o.trim()),b.length&&b.forEach((function(e){x.append("publication[authors][]",e.trim())})),d&&x.append("publication[cover]",d),m&&x.append("publication[abstract]",m),v?(r((0,h.In)({period_id:s,publication:x})),i.resetForm()):r((0,h.XZ)({period_id:s,publication_id:t.id,publication:x})),window.scrollTo({top:0,behavior:"smooth"});case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return(0,g.jsx)(b.J9,{initialValues:v?{title:"",year:"",sequence_number:0,source_url:"",source:"",cover:"",abstract:"",authors:[""]}:t,validationSchema:S.U.publicationSchema,onSubmit:y,children:function(e){var t=e.isSubmitting||"pending"===n,r=v?"Create Publication":"Update Publication";return(0,g.jsxs)(b.l0,{children:[(0,g.jsxs)("div",{className:"row",children:[(0,g.jsx)("div",{className:"col-6 col-md-8",children:(0,g.jsx)(w,{label:"Publication Year",name:"year",items:d})}),(0,g.jsx)("div",{className:"col-6 col-md-4",children:(0,g.jsx)(j.Z,{label:"Sequence Num",name:"sequence_number",type:"number",bsclass:"mb-3"})})]}),(0,g.jsx)(j.Z,{label:"Publication Title",name:"title",type:"text",bsclass:"mb-3",autoFocus:!0}),(0,g.jsx)(j.Z,{label:"Source",name:"source",type:"text",bsclass:"mb-3"}),(0,g.jsx)(j.Z,{label:"Source URL",name:"source_url",type:"text",bsclass:"mb-3"}),(0,g.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,g.jsx)("label",{htmlFor:"formFile",className:"form-label px-3 text-secondary fw-bold",children:"Cover image"}),(0,g.jsx)("input",{className:"form-control mb-3",id:"formFile",type:"file",onChange:function(t){e.setFieldValue("cover",t.target.files[0])}}),(0,g.jsx)("label",{htmlFor:"formFile",className:"form-label px-3 text-secondary fw-bold",children:"Abstract image"}),(0,g.jsx)("input",{className:"form-control",type:"file",onChange:function(t){e.setFieldValue("abstract",t.target.files[0])}})]}),(0,g.jsx)("div",{children:(0,g.jsx)(b.F2,{name:"authors",children:function(e){var t=e.push,n=e.remove,r=e.form.values.authors;return(0,g.jsx)(g.Fragment,{children:r&&r.length>0?(0,g.jsx)("ul",{className:"list-group",children:r.map((function(e,i){return(0,g.jsxs)("li",{className:"list-group-item border-2 mb-2",children:[r.length>1&&(0,g.jsx)(x.Z,{index:i,text:"author"}),(0,g.jsx)(j.Z,{type:"text",label:"Author",name:"authors.".concat(i),bsclass:"mb-3"}),(0,g.jsx)("div",{className:"text-end",children:(0,g.jsxs)("div",{className:"btn-group",role:"group",children:[(0,g.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-primary",onClick:function(){return n(i)},children:"remove the author"}),(0,g.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-primary",onClick:function(){return t("")},children:"add an author"})]})})]},i)}))}):(0,g.jsx)("div",{className:"text-end",children:(0,g.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-primary",onClick:function(){return t("")},children:"Add an author"})})})}})}),(0,g.jsx)("div",{className:"text-end mt-3",children:(0,g.jsxs)("div",{className:"btn-group",children:[(0,g.jsx)(f.Z,{path:"/periods/".concat(s,"/publications"),children:"Cancel"}),(0,g.jsx)(F.Z,{text:r,disabled:t})]})})]})}})},P=n(598),U=["Publication year","Sequence number","Publication title","Source","SourceURL","Author ( at least one )","Attachment ( required at least one, cover or abstract )"],A=function(e){var t=e.edit,n=(0,o.V)(),p=n.alert,m=n.showAlert,b=(0,a.v9)(s.X),h=b.publications,x=b.error,f=b.status,j=(0,a.v9)(l.W).periods,v=(0,i.UO)(),y=v.period_id,N=v.publication_id,Z=parseInt(y),_=parseInt(N),w=C(j,Z),F=t?"Edit publication [period: ".concat(w.title,"]"):"Create publication [period: ".concat(w.title,"]"),S=null;return t&&(S=h.find((function(e){return e.publication_period_id===Z&&e.id===_}))),(0,r.useEffect)((function(){"rejected"!==f?"fulfilled"!==f||m(t?"Publication updated successfully":"Publication created successfully","success"):m(x,"danger")}),[f]),(0,g.jsxs)(P.Z,{children:[(0,g.jsx)(c.Z,{state:p}),(0,g.jsx)(u.Z,{children:F}),(0,g.jsx)(d.Z,{requirementsList:U}),(0,g.jsx)(q,{publication:t?S:null,status:f})]})}},4314:function(e,t,n){n.d(t,{X:function(){return r}});var r=function(e){return e.publications}}}]);
//# sourceMappingURL=477.3a63d272.chunk.js.map