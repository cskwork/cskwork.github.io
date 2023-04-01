"use strict";(self.webpackChunkionic_docs=self.webpackChunkionic_docs||[]).push([[3474],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),f=i,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||a;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7917:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var r=n(87462),i=n(63366),a=(n(67294),n(3905)),o=["components"],s={sidebar_label:"FAQ",slug:"/native/faq"},c="Frequently Asked Question",l={unversionedId:"native-faq",id:"native-faq",isDocsHomePage:!1,title:"Frequently Asked Question",description:"What is Capacitor?",source:"@site/docs/native-faq.md",sourceDirName:".",slug:"/native/faq",permalink:"/docs/native/faq",editUrl:"https://github.com/ionic-team/ionic-docs/edit/main/docs/native-faq.md",tags:[],version:"current",frontMatter:{sidebar_label:"FAQ",slug:"/native/faq"},sidebar:"native",previous:{title:"Setup",permalink:"/docs/native/setup"},next:{title:"Action Sheet",permalink:"/docs/native/action-sheet"}},u=[{value:"What is Capacitor?",id:"what-is-capacitor",children:[],level:2},{value:"Permission Issues",id:"permission-issues",children:[],level:2},{value:"Unexpected behaviour",id:"unexpected-behaviour",children:[],level:2}],p={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"frequently-asked-question"},"Frequently Asked Question"),(0,a.kt)("h2",{id:"what-is-capacitor"},"What is Capacitor?"),(0,a.kt)("p",null,"Capacitor a native runtime built by the Ionic team that offers web developers the ability to deploy their web apps to a native device. Capacitor also exposing native device capabilities through JavaScript so developers could access features like native location services, filesystem access, or notifications as if they are interacting with any other JavaScript library. "),(0,a.kt)("h2",{id:"permission-issues"},"Permission Issues"),(0,a.kt)("p",null,"If you're using a plugin, it may require adding additional permissions to your native project after you install the plugin. For instance, the Capacitor Camera plugin requires the following permission for iOS:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"NSCameraUsageDescription")," (",(0,a.kt)("inlineCode",{parentName:"li"},"Privacy - Camera Usage Description"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"NSPhotoLibraryAddUsageDescription")," (",(0,a.kt)("inlineCode",{parentName:"li"},"Privacy - Photo Library Additions Usage Description"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"NSPhotoLibraryUsageDescription")," (",(0,a.kt)("inlineCode",{parentName:"li"},"Privacy - Photo Library Usage Description"),")")),(0,a.kt)("p",null,"You need to manually add those permissions to the ",(0,a.kt)("inlineCode",{parentName:"p"},"info.plist")," in your native project. Otherwise, calls to the native camera API will fail. "),(0,a.kt)("h2",{id:"unexpected-behaviour"},"Unexpected behaviour"),(0,a.kt)("p",null,"If for some reason the plugin does not behave in a way that is unexpected, please ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/ionic-team/capacitor-plugins"},"open an issue on our github repo"),"! Providing a clear issue report along with a reproduction can help get your issue resolved."))}d.isMDXComponent=!0}}]);