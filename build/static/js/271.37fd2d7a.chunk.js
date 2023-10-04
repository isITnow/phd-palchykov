"use strict";(self.webpackChunkphd_palchykov=self.webpackChunkphd_palchykov||[]).push([[271],{2739:function(e,t,n){var s=n(2426),r=n.n(s);t.Z=function(e){return{postedDate:r()(e.created_at).fromNow(),editedDate:r()(e.updated_at).fromNow(),isEdited:e.updated_at>e.created_at}}},3604:function(e,t){t.Z=function(e){var t="Prof. Dr. Palchykov";return document.title=e?"".concat(e," | ").concat(t):t}},6008:function(e,t,n){var s=n(1413),r=n(9439),a=n(5987),c=n(2506),o=n(9578),i=n(3329),l=["label"];t.Z=function(e){var t=e.label,n=(0,a.Z)(e,l),d=(0,c.U$)(n.name),u=(0,r.Z)(d,2),m=u[0],f=u[1];return(0,i.jsxs)("div",{className:"mb-3",children:[(0,i.jsx)("label",{className:"form-label px-3 text-secondary fw-bold",children:t}),(0,i.jsx)("textarea",(0,s.Z)((0,s.Z)((0,s.Z)({},m),n),{},{className:"form-control"})),f.touched&&f.error&&(0,i.jsx)(o.Z,{children:f.error})]})}},6194:function(e,t,n){n.d(t,{Z:function(){return o}});var s=n(1087),r=n(2739),a="post_hoverEffect__GRfm3",c=n(3329),o=function(e){var t,n=e.post,o=e.single,i=(0,r.Z)(n),l=i.postedDate,d=i.editedDate,u=i.isEdited,m=o?null===n||void 0===n||null===(t=n.comments)||void 0===t?void 0:t.length:null===n||void 0===n?void 0:n.comments,f=o?"card shadow":"".concat(a," card");return(0,c.jsxs)("div",{className:f,children:[(0,c.jsxs)("div",{className:"card-header",children:[(0,c.jsxs)("small",{className:"text-primary fw-bold",children:["posted: ",l]}),u&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"mx-2",children:"|"}),(0,c.jsxs)("small",{className:"text-primary fw-bold",children:["updated: ",d]})]}),!!m&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"mx-2",children:"|"}),(0,c.jsxs)("small",{className:"text-primary fw-bold",children:["comments: ",m]})]})]}),o?(0,c.jsx)("div",{className:"card-body",children:(0,c.jsx)("p",{className:"card-text",children:n.body})}):(0,c.jsx)(s.rU,{to:"/posts/".concat(n.id),style:{color:"inherit"},children:(0,c.jsx)("div",{className:"card-body",children:(0,c.jsx)("p",{className:"card-text text-truncate",children:n.body})})})]})}},5625:function(e,t,n){var s=n(4165),r=n(5861),a=n(2506),c=n(9434),o=n(345),i=n(6008),l=n(7212),d=n(2049),u=n(3329);t.Z=function(e){var t=e.post,n=e.status,m=(0,c.I0)(),f=!t,x=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(n,r){var a,c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.body,(c=new FormData).append("post[body]",a.trim()),t?m((0,o.Dm)({id:t.id,post:c})):(m((0,o.Q_)(c)),r.resetForm());case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return(0,u.jsx)(a.J9,{initialValues:{body:f?"":t.body},validationSchema:d.U.postSchema,onSubmit:x,children:function(e){var t=e.isSubmitting||"pending"===n,s=f?"Create Post":"Update Post";return(0,u.jsxs)(a.l0,{children:[(0,u.jsx)(i.Z,{label:"Post text",name:"body",type:"text",rows:"3"}),(0,u.jsx)("div",{className:"text-end",children:(0,u.jsx)(l.Z,{text:s,disabled:t})})]})}})}},598:function(e,t,n){var s=n(3329);t.Z=function(e){var t=e.children;return(0,s.jsx)("section",{className:"py-4",children:t})}},2271:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var s=n(2791),r=n(9434),a=n(345),c=n(4579),o=n(7193),i=n(8070),l=n(747),d=n(6194),u=n(3791),m=n(2333),f=n(3329),x={initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10}},h=function(e){var t=e.posts;return(0,f.jsx)("ul",{children:(0,f.jsx)(u.M,{children:null===t||void 0===t?void 0:t.map((function(e){return(0,f.jsx)(m.E.li,{className:"mb-3",initial:"initial",animate:"animate",exit:"exit",variants:x,children:(0,f.jsx)(d.Z,{post:e})},e.id)}))})})},p=n(5625),v=n(598),j=n(3604),y=n(4522),b=function(){(0,j.Z)("Blog");var e=(0,r.I0)((0,a.kt)()),t=(0,r.v9)(c.P$),n=(0,r.v9)(c.zh),d=(0,r.v9)(c.mW),u=(0,i.V)(),m=u.alert,x=u.showAlert,b=(0,y.Z)();return(0,s.useEffect)((function(){e((0,a.kt)())}),[e]),(0,s.useEffect)((function(){switch(d){case"rejected":x("".concat(n,". Please contact your administrator!"),"danger");break;case"fulfilled":x("Post created successfully","success");break;case"removed":x("Post deleted successfully","success")}}),[d]),"loading"===d?(0,f.jsx)(l.Z,{}):(0,f.jsxs)(v.Z,{children:[(0,f.jsx)(o.Z,{state:m}),b?(0,f.jsx)("div",{className:"mb-4",children:(0,f.jsx)(p.Z,{})}):(0,f.jsxs)("div",{className:"mb-4",children:[(0,f.jsx)("h3",{className:"text-center text-primary fw-bold",children:"Welcome to my personal Blog"}),(0,f.jsx)("h4",{className:"text-center text-secondary fw-bold",children:"Feel free to leave your comments"})]}),(0,f.jsx)(h,{posts:t})]})}},4579:function(e,t,n){n.d(t,{P$:function(){return s},UL:function(){return o},fc:function(){return r},mW:function(){return c},zh:function(){return a}});var s=function(e){return e.posts.postsList},r=function(e){return e.posts.onePost},a=function(e){return e.posts.error},c=function(e){return e.posts.status},o=function(e){var t;return null===(t=e.posts.onePost)||void 0===t?void 0:t.comments}}}]);
//# sourceMappingURL=271.37fd2d7a.chunk.js.map