function AJAXRequest(n){var r=[],p=this,c=AJAXRequest.__pool__||(AJAXRequest.__pool__=[]);(function(v){var u=function(){};v=v?v:{};var w=["url","content","method","async","encode","timeout","ontimeout","onrequeststart","onrequestend","oncomplete","onexception"];var s=["","","GET",true,k("UTF-8"),3600000,u,u,u,u,u];var t=w.length;while(t--){p[w[t]]=h(v[w[t]],s[t])}if(!l()){return false}})(n);function h(s,t){return s!=undefined?s:t}function l(){var v,s=[window.XMLHttpRequest,"MSXML2.XMLHTTP","Microsoft.XMLHTTP"];var t;for(t=0;t<c.length;t+=1){if(c[t].readyState===0||c[t].readyState===4){return c[t]}}for(t=0;t<s.length;t+=1){try{v=(s[t]&&typeof(s[t])=="function"?new s[t]:new ActiveXObject(s[t]));break}catch(u){v=false;continue}}if(!v){throw"Cannot init XMLHttpRequest object!"}else{c[c.length]=v;return v}}function d(s){return document.getElementById(s)}function m(s){var t=s*1;return(isNaN(t)?0:t)}function b(s){return(typeof(s)=="string"?(s=d(s))?s:false:s)}function o(){return((new Date)*1)}function e(t,s){r[t+""]=s}function i(s){return(r[s+""])}function f(u,s,v){return(function t(x){x=u(x);for(var w=0,y=s.length;w<y;w+=1){x=x.replace(s[w],v[w])}return(x)})}function k(s){if(s.toUpperCase()=="UTF-8"){return(encodeURIComponent)}else{return(f(escape,[/\+/g],["%2B"]))}}function a(u,s){if(!u.nodeName){return}var v="|"+u.nodeName.toUpperCase()+"|";if("|INPUT|TEXTAREA|OPTION|".indexOf(v)>-1){u.value=s}else{try{u.innerHTML=s}catch(t){}}}function q(s){if(typeof(s)=="function"){return s}else{s=b(s);if(s){return(function(t){a(s,t.responseText)})}else{return p.oncomplete}}}function j(s,x,u){var t=0,w=[];while(t<s.length){w[t]=s[t]?(u[t]?u[t](s[t]):s[t]):x[t];t+=1}while(t<x.length){w[t]=x[t];t+=1}return w}function g(){var z,C=false,E=l();var v=j(arguments,[p.url,p.content,p.oncomplete,p.method,p.async,null],[null,null,q,null,null,null]);var u=v[0],A=v[1],D=v[2],t=v[3],x=v[4],w=v[5];var y=t.toUpperCase()=="POST"?true:false;if(!u){throw"url is null"}var B={url:encodeURI(u),content:A,method:t,params:w};if(!y){u+=(u.indexOf("?")>-1?"&":"?")+"timestamp="+o()}E.open(t,u,x);p.onrequeststart(B);if(y){E.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}E.setRequestHeader("X-Request-With","XMLHttpRequest");z=setTimeout(function(){C=true;E.abort()},p.timeout);var s=function(){if(C){p.ontimeout(B);p.onrequestend(B)}else{if(E.readyState==4){clearTimeout(z);B.status=E.status;try{if(E.status==200){setTimeout(function(){D(E,w)},0)}else{p.onexception(B)}}catch(F){p.onexception(B)}p.onrequestend(B)}}};E.onreadystatechange=s;if(y){E.send(A)}else{E.send("")}if(x===false){s()}return true}this.setcharset=function(s){p.encode=k(s)};this.get=function(t,u,s){return g(t,"",u,"GET",p.async,s)};this.update=function(z,w,u,y,s){u=m(u);y=m(y);if(u<1){y=1}else{if(y<1){y=Number.POSITIVE_INFINITY}}var t=function(){g(w,"",z,"GET",p.async,s)};var v=o();var x=function(A){t();A--;if(A>0){e(v,setTimeout(function(){x(A)},u))}};x(y);return v};this.stopupdate=function(s){clearTimeout(i(s))};this.post=function(t,u,v,s){return g(t,u,v,"POST",p.async,s)};this.postf=function(z,E,w){var v=[],y,C,D,B,x,F=arguments.length,u=arguments;z=z?b(z):false;if(!z||z.nodeName!="FORM"){return false}validfoo=z.getAttribute("onvalidate");validfoo=validfoo?(typeof(validfoo)=="string"?new Function(validfoo):validfoo):null;if(validfoo&&!validfoo()){return false}var t=z.getAttribute("action"),s=z.getAttribute("method");var A=p.formToStr(z);if(A.length===0){return false}if(s.toUpperCase()=="POST"){return g(t,A,E,"POST",true,w)}else{t+=(t.indexOf("?")>-1?"&":"?")+A;return g(t,"",E,"GET",true,w)}};this.formToStr=function(z){var u="",y="",t=z.elements,v,A;for(var x=0;x<t.length;++x){v=t[x];if(v.name!==""){A=undefined;switch(v.type){case"select-one":if(v.selectedIndex>-1){A=v.options[v.selectedIndex].value}else{A=""}break;case"select-multiple":var s=v.options;for(var w=0;w<s.length;++w){if(s[w].selected){u+=y+v.name+"="+p.encode(s[w].value);y="&"}}break;case"checkbox":case"radio":if(v.checked){A=v.value}break;default:A=v.value;break}if(A!=undefined){A=p.encode(A);u+=y+v.name+"="+A;y="&"}}}return u}};


	ajaxDealStr = "数据处理中...";
	ajaxLoadStr = "数据读取中...";

// POST表单AJAX处理
function AjaxPostDeal(formName){
	try {
		document.getElementById("loadingStr").innerHTML = "<span style='font-size:14px;'><img src='inc_img/onload.gif' style='margin-right:5px;' />"+ ajaxDealStr +"</span>";
	}catch (e) {}

	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.postf(
		formName,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) {
			eval((obj.responseText).replace(/<\s*(script[^>]*)>(.[^<]*)<\/\s*script>/gi,"$2"));
			try {
				document.getElementById("loadingStr").innerHTML = "";
			}catch (e) {}
		}
	);
	return false;
}


// GET提交AJAX处理
function AjaxGetDeal(urlStr){
	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.get(
		urlStr,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) { eval((obj.responseText).replace(/<\s*(script[^>]*)>(.[^<]*)<\/\s*script>/gi,"$2")); }
	);
	return false;
}


// GET提交AJAX处理
function AjaxGetDealToAlert(urlStr){
	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.get(
		urlStr,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) { alert((obj.responseText).replace(/<\s*(script[^>]*)>(.[^<]*)<\/\s*script>/gi,"$2")); }
	);
	return false;
}


// GET提交AJAX处理
function AjaxGetDealToId(urlStr,outputID){
	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.get(
		urlStr,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) {
			document.getElementById(outputID).innerHTML = obj.responseText;
		}
	);
	return false;
}

// GET提交AJAX处理
function AjaxGetDealToIdNo(urlStr,outputID,badWords){
	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.get(
		urlStr,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) {
			retStr = obj.responseText;
			if (retStr.lastIndexOf(badWords)!=-1){
				eval(retStr.replace(/<\s*(script[^>]*)>(.[^<]*)<\/\s*script>/gi,"$2"));
			}else{
				document.getElementById(outputID).innerHTML = retStr;
			}
		}
	);
	return false;
}

// GET提交AJAX处理（允许执行JS）
function AjaxGetDealToIdJs(urlStr,outputID){
	var ajax=new AJAXRequest();
	ajax.encode = function(str) { 
		return escape(str); 
	} 

	ajax.get(
		urlStr,
		// 回调函数，注意，是回调函数名，不要带括号
		function(obj) {
			set_innerHTML(outputID,obj.responseText);
			try {
				VoteStyle();
			}catch (e) {}
		}
	);
	return false;
}




/* innerhtml.js
 * Copyright Ma Bingyao <andot@ujn.edu.cn>
 * Version: 1.9
 * LastModified: 2006-06-04
 * This library is free.  You can redistribute it and/or modify it.
 */

var global_html_pool = [];
var global_script_pool = [];
var global_script_src_pool = [];
var global_lock_pool = [];
var innerhtml_lock = null;
var document_buffer = "";

// js输出允许执行js脚本，obj_id：innerHTML的ID；html：输出字符串；time：延时多少秒执行，可以忽略
function set_innerHTML(obj_id, html, time){
	if (innerhtml_lock == null) {
		innerhtml_lock = obj_id;
	}
	else if (typeof(time) == "undefined") {
		global_lock_pool[obj_id + "_html"] = html;
		window.setTimeout("set_innerHTML('" + obj_id + "', global_lock_pool['" + obj_id + "_html']);", 10);
		return;
	}
	else if (innerhtml_lock != obj_id) {
		global_lock_pool[obj_id + "_html"] = html;
		window.setTimeout("set_innerHTML('" + obj_id + "', global_lock_pool['" + obj_id + "_html'], " + time + ");", 10);
		return;
	}

	function get_script_id() {
		return "script_" + (new Date()).getTime().toString(36) + Math.floor(Math.random() * 100000000).toString(36);
    }

	document_buffer = "";

	document.write = function (str) {
		document_buffer += str;
	}
	document.writeln = function (str) {
		document_buffer += str + "\n";
	}

	global_html_pool = [];

	var scripts = [];
	html = html.split(/<\/script>/i);
	for (var i = 0; i < html.length; i++) {
		global_html_pool[i] = html[i].replace(/<script[\s\S]*$/ig, "");
		scripts[i] = {text: '', src: '' };
		scripts[i].text = html[i].substr(global_html_pool[i].length);
		scripts[i].src = scripts[i].text.substr(0, scripts[i].text.indexOf('>') + 1);
		scripts[i].src = scripts[i].src.match(/src\s*=\s*(\"([^\"]*)\"|\'([^\']*)\'|([^\s]*)[\s>])/i);
		if (scripts[i].src) {
			if (scripts[i].src[2]) {
				scripts[i].src = scripts[i].src[2];
			}
			else if (scripts[i].src[3]) {
				scripts[i].src = scripts[i].src[3];
			}
			else if (scripts[i].src[4]) {
				scripts[i].src = scripts[i].src[4];
			}
			else {
				scripts[i].src = "";
			}
			scripts[i].text = "";
		}
		else {
			scripts[i].src = "";
			scripts[i].text = scripts[i].text.substr(scripts[i].text.indexOf('>') + 1);
			scripts[i].text = scripts[i].text.replace(/^\s*<\!--\s*/g, "");
		}
	}

	var s;
	if (typeof(time) == "undefined") {
		s = 0;
	}
	else {
		s = time;
	}

	var script, add_script, remove_script;

	for (var i = 0; i < scripts.length; i++) {
		var add_html = "document_buffer += global_html_pool[" + i + "];\n";
		add_html += "document.getElementById('" + obj_id + "').innerHTML = document_buffer;\n";
		script = document.createElement("script");
		if (scripts[i].src) {
			script.src = scripts[i].src;
			if (typeof(global_script_src_pool[script.src]) == "undefined") {
				global_script_src_pool[script.src] = true;
				s += 2000;
			}
			else {
				s += 10;
			}
		}
		else {
			script.text = scripts[i].text;
			s += 10;
		}
		script.defer = true;
		script.type =  "text/javascript";
		script.id = get_script_id();
		global_script_pool[script.id] = script;
		add_script = add_html;
		add_script += "document.getElementsByTagName('head').item(0)";
		add_script += ".appendChild(global_script_pool['" + script.id + "']);\n";
		window.setTimeout(add_script, s);
		remove_script = "document.getElementsByTagName('head').item(0)";
		remove_script += ".removeChild(document.getElementById('" + script.id + "'));\n";
		remove_script += "delete global_script_pool['" + script.id + "'];\n";
		window.setTimeout(remove_script, s + 10000);
	}

	var end_script = "if (document_buffer.match(/<\\/script>/i)) {\n";
	end_script += "set_innerHTML('" + obj_id + "', document_buffer, " + s + ");\n";
	end_script += "}\n";
	end_script += "else {\n";
	end_script += "document.getElementById('" + obj_id + "').innerHTML = document_buffer;\n";
	end_script += "innerhtml_lock = null;\n";
	end_script += "}";
	window.setTimeout(end_script, s);
}