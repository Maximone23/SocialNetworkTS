(this.webpackJsonpsnts=this.webpackJsonpsnts||[]).push([[3],{297:function(t,e,a){"use strict";a.d(e,"a",(function(){return m}));var n=a(36),r=a(37),u=a(39),s=a(38),o=a(0),l=a.n(o),i=a(10),c=a(14),p=function(t){return{isAuth:t.auth.isAuth}},m=function(t){var e=function(e){Object(u.a)(o,e);var a=Object(s.a)(o);function o(){return Object(n.a)(this,o),a.apply(this,arguments)}return Object(r.a)(o,[{key:"render",value:function(){return this.props.isAuth?l.a.createElement(t,this.props):l.a.createElement(i.a,{to:"/login"})}}]),o}(l.a.Component);return Object(c.b)(p)(e)}},299:function(t,e,a){t.exports={descrBlock:"ProfileInfo_descrBlock__ZcaEX",headerImg:"ProfileInfo_headerImg__3d-wI"}},300:function(t,e,a){t.exports={postsBlock:"MyPosts_postsBlock__268xc",posts:"MyPosts_posts__2dTAM"}},301:function(t,e,a){t.exports={item:"Post_item__28apu"}},302:function(t,e,a){"use strict";a.r(e);var n=a(36),r=a(37),u=a(39),s=a(38),o=a(0),l=a.n(o),i=a(299),c=a.n(i),p=a(41);var m=a(96);function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var a=[],n=!0,r=!1,u=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!e||a.length!==e);n=!0);}catch(l){r=!0,u=l}finally{try{n||null==o.return||o.return()}finally{if(r)throw u}}return a}}(t,e)||Object(m.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=l.a.memo((function(t){var e=f(Object(o.useState)(!1),2),a=e[0],n=e[1],r=f(Object(o.useState)(t.status),2),u=r[0],s=r[1];Object(o.useEffect)((function(){s(t.status)}),[t.status]);return l.a.createElement("div",null,!a&&l.a.createElement("div",null,l.a.createElement("span",{onDoubleClick:function(){n(!0)}},t.status||"-----")),a&&l.a.createElement("div",null,l.a.createElement("input",{onChange:function(t){s(t.currentTarget.value)},onBlur:function(){n(!1),t.updateStatus(u)},autoFocus:!0,value:u})))}));var b=function(t){var e=t.profile,a=t.status,n=t.updateStatus;return e?l.a.createElement("div",null,l.a.createElement("div",{className:c.a.descrBlock},l.a.createElement("div",null,e.fullName),l.a.createElement("img",{src:e.photos.large,alt:"ProfilePhoto"}),l.a.createElement("div",null,e.aboutMe),l.a.createElement(d,{status:a,updateStatus:n}))):l.a.createElement(p.a,null)},h=a(95),v=a(300),E=a.n(v),y=a(301),j=a.n(y),O=a(121),g=a.n(O);var S=function(t){return l.a.createElement("div",{className:j.a.item},l.a.createElement("img",{src:g.a,alt:""}),t.message,l.a.createElement("div",null,l.a.createElement("span",null,"like"),t.likesCount))},P=a(87),k=a(132),_=a(84),I=a(33);var A=Object(_.a)(10),w=Object(k.a)({form:"ProfileAddNewPostForm"})((function(t){return l.a.createElement("form",{onSubmit:t.handleSubmit},l.a.createElement("div",null,l.a.createElement(P.a,{name:"newPostText",component:I.b,validate:[_.b,A]})),l.a.createElement("div",null,l.a.createElement("button",null,"Add post")))})),x=function(t){var e=t.posts.map((function(t){return l.a.createElement(S,{message:t.message,likesCount:t.likesCount,id:t.id,key:t.id})}));return l.a.createElement("div",{className:E.a.postsBlock},l.a.createElement("h3",null,"My posts"),l.a.createElement(w,{onSubmit:function(e){t.addPost(e.newPostText)}}),l.a.createElement("div",{className:E.a.posts},e))},B=a(14),C=Object(B.b)((function(t){return{posts:t.profilePage.posts}}),(function(t){return{addPost:function(e){t(Object(h.a)(e))}}}))(x);var M=function(t){return l.a.createElement("div",null,l.a.createElement(b,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),l.a.createElement(C,null))},N=a(10),T=a(297),U=a(9),z=function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){return Object(n.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId;t||(t=this.props.authorizedUserId),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"render",value:function(){return l.a.createElement(M,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus})}}]),a}(l.a.Component);e.default=Object(U.d)(Object(B.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:h.d,getStatus:h.c,updateStatus:h.e}),N.f,T.a)(z)}}]);
//# sourceMappingURL=3.33eba628.chunk.js.map