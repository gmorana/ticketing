(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{NCUz:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tickets/[ticketId]",function(){return r("QfjS")}])},QfjS:function(e,t,r){"use strict";r.r(t);var n=r("o0o1"),c=r.n(n),a=r("q1tI"),o=r.n(a),s=r("nOHt"),u=r.n(s),i=r("qYya"),l=o.a.createElement,p=function(e){var t=e.ticket,r=Object(i.a)({url:"/api/orders",method:"post",body:{ticketId:t.id},onSuccess:function(e){return u.a.push("/orders/[orderId]","/orders/".concat(e.id))}}),n=r.doRequest,c=r.errors;return l("div",{className:"container"},l("h1",null,t.title),l("h4",null,t.price),c,l("button",{onClick:function(){return n()},className:"btn btn-primary"},"Purchase"))};p.getInitialProps=function(e,t){var r,n,a;return c.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return r=e.query.ticketId,o.next=3,c.a.awrap(t.get("/api/tickets/".concat(r)));case 3:return n=o.sent,a=n.data,o.abrupt("return",{ticket:a});case 6:case"end":return o.stop()}}),null,null,null,Promise)},t.default=p},qYya:function(e,t,r){"use strict";var n=r("o0o1"),c=r.n(n),a=r("rePB"),o=r("q1tI"),s=r.n(o),u=r("vDqi"),i=r.n(u),l=s.a.createElement;function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.a=function(e){var t=e.url,r=e.method,n=e.body,a=e.onSuccess,s=Object(o.useState)(null),u=s[0],p=s[1];return{doRequest:function(){var e,o,s=arguments;return c.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return e=s.length>0&&void 0!==s[0]?s[0]:{},u.prev=1,p(null),u.next=5,c.a.awrap(i.a[r](t,d({},n,{},e),n));case 5:return o=u.sent,a&&a(o.data),u.abrupt("return",o.data);case 10:u.prev=10,u.t0=u.catch(1),p(l("div",{className:"alert alert-danger"},l("h4",null,"Ooops...."),l("ul",{className:"my-0"},u.t0.response.data.errors.map((function(e){return l("li",{key:e.message},e.message)})))));case 13:case"end":return u.stop()}}),null,null,[[1,10]],Promise)},errors:u}}}},[["NCUz",0,2,1,3,4]]]);