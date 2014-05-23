webshims.register("form-shim-extend",function(a,b,c,d,e,f){"use strict";b.inputTypes=b.inputTypes||{};var g=b.cfg.forms,h=b.bugs,i=b.inputTypes,j={radio:1,checkbox:1},k=function(a){return(a.getAttribute("type")||a.type||"").toLowerCase()};!function(){if("querySelector"in d){try{h.findRequired=!a('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /></form>')[0].querySelector("select:required")}catch(b){h.findRequired=!1}(h.bustedValidity||h.findRequired)&&!function(){var b=a.find,c=a.find.matchesSelector,e=/(\:valid|\:invalid|\:optional|\:required)(?=[\s\[\~\.\+\>\:\#*]|$)/gi,f=function(a){return a+"-element"};a.find=function(){var a=Array.prototype.slice,c=function(c){var d=arguments;return d=a.call(d,1,d.length),d.unshift(c.replace(e,f)),b.apply(this,d)};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}(),(!Modernizr.prefixed||Modernizr.prefixed("matchesSelector",d.documentElement))&&(a.find.matchesSelector=function(a,b){return b=b.replace(e,f),c.call(this,a,b)})}()}}(),b.addInputType=function(a,b){i[a]=b};var l={customError:!1,typeMismatch:!1,badInput:!1,rangeUnderflow:!1,rangeOverflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,patternMismatch:!1,valueMissing:!1,valid:!0},m=function(b){if("select-one"==b.type&&b.size<2){var c=a("> option:first-child",b);return!!c.prop("selected")}return!1},n=a([]),o=function(b){b=a(b);var c,e,f=n;return"radio"==b[0].type&&(c=b[0].name,c?(e=b.prop("form"),f=a(d.getElementsByName(c)).filter(function(){return"radio"==this.type&&this.name==c&&a.prop(this,"form")==e})):f=b),f},p={url:1,email:1,text:1,search:1,tel:1,password:1},q=a.extend({textarea:1},p),r={valueMissing:function(a,b,c){if(!a.prop("required"))return!1;var d=!1;return"type"in c||(c.type=k(a[0])),d="select"==c.nodeName?!b&&(a[0].selectedIndex<0||m(a[0])):j[c.type]?"checkbox"==c.type?!a.is(":checked"):!o(a).filter(":checked")[0]:!b},patternMismatch:function(a,c,d){if(""===c||"select"==d.nodeName)return!1;if("type"in d||(d.type=k(a[0])),!p[d.type])return!1;var e=a.attr("pattern");if(!e)return!1;try{e=new RegExp("^(?:"+e+")$")}catch(f){b.error('invalid pattern value: "'+e+'" | '+f),e=!1}return e?!e.test(c):!1}};a.each({tooShort:["minLength",-1],tooLong:["maxLength",1]},function(a,b){r[a]=function(a,c,d){if("select"==d.nodeName||a.prop("defaultValue")==c)return!1;if("type"in d||(d.type=k(a[0])),!q[d.type])return!1;var e=a.prop(b[0]);return e>0&&e*b[1]<c.length*b[1]}}),a.each({typeMismatch:"mismatch",badInput:"bad"},function(a,b){r[a]=function(c,d,e){if(""===d||"select"==e.nodeName)return!1;var f=!1;return"type"in e||(e.type=k(c[0])),i[e.type]&&i[e.type][b]?f=i[e.type][b](d,c):"validity"in c[0]&&"name"in c[0].validity&&(f=c[0].validity[a]||!1),f}}),b.addValidityRule=function(a,b){r[a]=b},a.event.special.invalid={add:function(){a.event.special.invalid.setup.call(this.form||this)},setup:function(){var c=this.form||this;return a.data(c,"invalidEventShim")?void(c=null):(a(c).data("invalidEventShim",!0).on("submit",a.event.special.invalid.handler),b.moveToFirstEvent(c,"submit"),b.bugs.bustedValidity&&a.nodeName(c,"form")&&!function(){var a=c.getAttribute("novalidate");c.setAttribute("novalidate","novalidate"),b.data(c,"bustedNoValidate",null==a?null:a)}(),void(c=null))},teardown:a.noop,handler:function(b){if("submit"==b.type&&!b.testedValidity&&b.originalEvent&&a.nodeName(b.target,"form")&&!a.prop(b.target,"noValidate")){b.testedValidity=!0;var c=!a(b.target).callProp("reportValidity");return c?(b.stopImmediatePropagation(),f.noFormInvalid||a(b.target).trigger("invalid"),!1):void 0}}},a.event.special.submit=a.event.special.submit||{setup:function(){return!1}};var s=a.event.special.submit.setup;a.extend(a.event.special.submit,{setup:function(){return a.nodeName(this,"form")?a(this).on("invalid",a.noop):a("form",this).on("invalid",a.noop),s.apply(this,arguments)}}),b.ready("form-shim-extend2 WINDOWLOAD",function(){a(c).on("invalid",a.noop)}),b.addInputType("email",{mismatch:function(){var b=g.emailReg||/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,c=/\s*,\s*/g;return function(d,e){var f=!1;d=a(e).prop("multiple")?d.split(c):[d];for(var g=0;g<d.length;g++)if(!b.test(d[g])){f=!0;break}return f}}()}),b.addInputType("url",{mismatch:function(){var a=g.urlReg||/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;return function(b){return!a.test(b)}}()}),b.defineNodeNameProperty("input","type",{prop:{get:function(){var a=this,c=(a.getAttribute("type")||"").toLowerCase();return b.inputTypes[c]?c:a.type}}}),b.defineNodeNamesProperties(["button","fieldset","output"],{checkValidity:{value:function(){return!0}},reportValidity:{value:function(){return!0}},willValidate:{value:!1},setCustomValidity:{value:a.noop},validity:{writeable:!1,get:function(){return a.extend({},l)}}},"prop");var t=function(c,d){var e,f=a.prop(c,"validity");if(!f)return!0;if(a.data(c,"cachedValidity",f),!f.valid){e=a.Event("invalid");var g=a(c).trigger(e);"reportValidity"!=d||t.unhandledInvalids||e.isDefaultPrevented()||(b.validityAlert.showFor(g),t.unhandledInvalids=!0)}return a.removeData(c,"cachedValidity"),f.valid},u=/^(?:select|textarea|input)/i;["checkValidity","reportValidity"].forEach(function(c){b.defineNodeNameProperty("form",c,{prop:{value:function(){var d=!0,e=a(a.prop(this,"elements")).filter(function(){if(!u.test(this.nodeName))return!1;var a=b.data(this,"shadowData");return!a||!a.nativeElement||a.nativeElement===this});t.unhandledInvalids=!1;for(var f=0,g=e.length;g>f;f++)t(e[f],c)||(d=!1);return d}}})}),["input","textarea","select"].forEach(function(c){var d={setCustomValidity:{value:function(c){a.removeData(this,"cachedValidity"),b.data(this,"customvalidationMessage",""+c),h.bustedValidity&&d.setCustomValidity.prop._supvalue&&d.setCustomValidity.prop._supvalue.apply(this,arguments)}},willValidate:{writeable:!1,get:function(){var b={button:1,reset:1,hidden:1,image:1};return function(){var c=a(this).getNativeElement()[0];return!(c.readOnly||b[c.type]||a(c).is(":disabled"))}}()},validity:{writeable:!1,get:function(){var c=a(this).getNativeElement(),d=c[0],e=a.data(d,"cachedValidity");if(e)return e;if(e=a.extend({},l),!a.prop(d,"willValidate")||"submit"==d.type)return e;var f=c.val(),g={nodeName:d.nodeName.toLowerCase()};return e.customError=!!b.data(d,"customvalidationMessage"),e.customError&&(e.valid=!1),a.each(r,function(a,b){b(c,f,g)&&(e[a]=!0,e.valid=!1)}),a(this).getShadowFocusElement().attr("aria-invalid",e.valid?"false":"true"),c=null,d=null,e}}};["checkValidity","reportValidity"].forEach(function(b){d[b]={value:function(){return t.unhandledInvalids=!1,t(a(this).getNativeElement()[0],b)}}}),b.defineNodeNameProperties(c,d,"prop")}),b.defineNodeNamesBooleanProperty(["input","textarea","select"],"required",{set:function(b){a(this).getShadowFocusElement().attr("aria-required",!!b+"")},initAttr:!0}),b.defineNodeNamesBooleanProperty(["input"],"multiple"),h.bustedValidity&&(b.defineNodeNameProperty("form","novalidate",{attr:{set:function(a){b.data(this,"bustedNoValidate",""+a)},get:function(){var a=b.data(this,"bustedNoValidate");return null==a?e:a}},removeAttr:{value:function(){b.data(this,"bustedNoValidate",null)}}}),a.each(["rangeUnderflow","rangeOverflow","stepMismatch"],function(a,b){r[b]=function(a){return(a[0].validity||{})[b]||!1}})),b.defineNodeNameProperty("form","noValidate",{prop:{set:function(b){b=!!b,b?a.attr(this,"novalidate","novalidate"):a(this).removeAttr("novalidate")},get:function(){return null!=a.attr(this,"novalidate")}}}),["minlength","minLength"].forEach(function(a){b.defineNodeNamesProperty(["input","textarea"],a,{prop:{set:function(a){if(a*=1,0>a)throw"INDEX_SIZE_ERR";this.setAttribute("minlength",a||0)},get:function(){var a=this.getAttribute("minlength");return null==a?-1:1*a||0}}})}),Modernizr.inputtypes.date&&/webkit/i.test(navigator.userAgent)&&!function(){var b={updateInput:1,input:1},c={date:1,time:1,month:1,week:1,"datetime-local":1},e={focusout:1,blur:1},f={updateInput:1,change:1},g=function(a){var c,d,g=!0,h=a.prop("value"),i=h,j=function(c){if(a){var d=a.prop("value");d!==h&&(h=d,c&&b[c.type]||a.trigger("input")),c&&f[c.type]&&(i=d),g||d===i||a.trigger("change")}},k=function(){clearTimeout(d),d=setTimeout(j,9)},l=function(b){clearInterval(c),setTimeout(function(){b&&e[b.type]&&(g=!1),a&&(a.off("focusout blur",l).off("input change updateInput",j),j()),a=null},1)};clearInterval(c),c=setInterval(j,160),k(),a.off({"focusout blur":l,"input change updateInput":j}).on({"focusout blur":l,"input updateInput change":j})};a(d).on("focusin",function(b){b.target&&c[b.target.type]&&!b.target.readOnly&&!b.target.disabled&&g(a(b.target))})}(),b.addReady(function(b,c){var e;a("form",b).add(c.filter("form")).on("invalid",a.noop);try{b!=d||"form"in(d.activeElement||{})||(e=a(b.querySelector("input[autofocus], select[autofocus], textarea[autofocus]")).eq(0).getShadowFocusElement()[0],e&&e.offsetHeight&&e.offsetWidth&&e.focus())}catch(f){}}),Modernizr.input.list||b.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c,d=this,e=a("select",d);return e[0]?c=a.makeArray(e[0].options||[]):(c=d.getElementsByTagName("option"),c.length&&b.warn("you should wrap your option-elements for a datalist in a select element to support IE and other old browsers.")),c}}});var v={submit:1,button:1,image:1},w={};[{name:"enctype",limitedTo:{"application/x-www-form-urlencoded":1,"multipart/form-data":1,"text/plain":1},defaultProp:"application/x-www-form-urlencoded",proptype:"enum"},{name:"method",limitedTo:{get:1,post:1},defaultProp:"get",proptype:"enum"},{name:"action",proptype:"url"},{name:"target"},{name:"novalidate",propName:"noValidate",proptype:"boolean"}].forEach(function(b){var c="form"+(b.propName||b.name).replace(/^[a-z]/,function(a){return a.toUpperCase()}),e="form"+b.name,f=b.name,g="click.webshimssubmittermutate"+f,h=function(){var d=this;if("form"in d&&v[d.type]){var g=a.prop(d,"form");if(g){var h=a.attr(d,e);if(null!=h&&(!b.limitedTo||h.toLowerCase()===a.prop(d,c))){var i=a.attr(g,f);a.attr(g,f,h),setTimeout(function(){if(null!=i)a.attr(g,f,i);else try{a(g).removeAttr(f)}catch(b){g.removeAttribute(f)}},9)}}}};switch(b.proptype){case"url":var i=d.createElement("form");w[c]={prop:{set:function(b){a.attr(this,e,b)},get:function(){var b=a.attr(this,e);return null==b?"":(i.setAttribute("action",b),i.action)}}};break;case"boolean":w[c]={prop:{set:function(b){b=!!b,b?a.attr(this,"formnovalidate","formnovalidate"):a(this).removeAttr("formnovalidate")},get:function(){return null!=a.attr(this,"formnovalidate")}}};break;case"enum":w[c]={prop:{set:function(b){a.attr(this,e,b)},get:function(){var c=a.attr(this,e);return!c||(c=c.toLowerCase())&&!b.limitedTo[c]?b.defaultProp:c}}};break;default:w[c]={prop:{set:function(b){a.attr(this,e,b)},get:function(){var b=a.attr(this,e);return null!=b?b:""}}}}w[e]||(w[e]={}),w[e].attr={set:function(b){w[e].attr._supset.call(this,b),a(this).off(g).on(g,h)},get:function(){return w[e].attr._supget.call(this)}},w[e].initAttr=!0,w[e].removeAttr={value:function(){a(this).off(g),w[e].removeAttr._supvalue.call(this)}}}),b.defineNodeNamesProperties(["input","button"],w)});