// 初始化
$(function (){

	// 数据加载
	try {
		if ($id('voteMode').value>0){
			try {
				AjaxGetDealToIdJs(dbPathPart +'news_deal.asp?mudi=vote&dataID='+ $id('infoID').value +'&dbPathPart='+ dbPathPart,'voteBox');
			}catch (e) {}
		}	

		// 评论加载
		LoadReplyList($id('infoID').value);
	}catch (e) {}

//	$('#newsContent img').click(function (){
//		var a=window.open(this.src);
//	});
	$('#newsContent img').each(function (i){
		this.style.margin='5px 0 5px 0';
		if (this.width>665){
			this.width=665;
//			this.alt='点击查看原图';
//			this.style.cursor='pointer';
		}
	});
	$('#newsContent div,#newsContent span').removeClass('clear');

	try {
		CheckSendContent();
		CheckReplyMaxLen();
	}catch (e) {}

});

// 检查是否发送文章内容
function CheckSendContent(){
	if ($id('isUserCheck').value=="1"){
		AjaxGetDealToId(dbPathPart +"news_deal.asp?mudi=contentSend&dataID="+ $id('infoID').value +"&page="+ $id('pageValue').value +"&dbPathPart="+ dbPathPart,"newsContent");
	}
}

// 确定阅读
function CutScoreBtn(){
	AjaxGetDealToId(dbPathPart +"news_deal.asp?mudi=contentSend&dataID="+ $id('infoID').value +"&page="+ $id('pageValue').value +"&dbPathPart="+ dbPathPart +"&isCut=true","newsContent");
}

// 分页链接
function ContentPageHref(modeStr,infoID,pageNum,mode1Url){
	if (modeStr!=""){
		AjaxGetDealToId(dbPathPart +"news_deal.asp?mudi=contentSend&dataID="+ infoID +"&page="+ pageNum +"&dbPathPart="+ dbPathPart, modeStr);
	}else{
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}

// 投票样式
function VoteStyle(){
	// 心情投票
	$(".webBox .d li").hover(function() { 
			$(this).addClass("font2_2 fontB");
		}, function(){
			$(this).removeClass("font2_2 fontB");
	});

	// 顶踩投票
	$(".webBox .d .upDown .up").hover(function() { 
			$(this).addClass("up2");
		}, function(){
			$(this).removeClass("up2");
	});
	$(".webBox .d .upDown .down").hover(function() { 
			$(this).addClass("down2");
		}, function(){
			$(this).removeClass("down2");
	});
}

// 投票点击
var isUseVote=false
function VoteDeal(num){
	if (isUseVote==true){
		alert('您已投票过，请稍后再投.');return false;
	}
	AjaxGetDealToIdNo(dbPathPart +'news_deal.asp?mudi=vote&dataID='+ $id('infoID').value +'&selItem='+ num +'&dbPathPart='+ dbPathPart,'voteBox','验证码禁用');
	isUseVote = true;
}


// 评论回复
function CheckReplyForm(){
	if ($id('replyContent').value==""){
		alert('评价内容不能为空');$id('replyContent').focus();return false;
	}
	if ($id('replyContent').value.length<5){
		alert('评价内容不能少于5字符');$id('replyContent').focus();return false;
	}
	strMaxLen = parseInt($id('replyContentMaxLen').value);
	if (strMaxLen>0 && $id('replyContent').value.length>strMaxLen){
		alert('评价内容超过最大'+ strMaxLen +'字符限制');$id('replyContent').value=$id('replyContent').value.substring(0,strMaxLen);CalcReplyLen();return false;
	}
	if ($id('replyUser').value==""){
		alert('昵称不能为空');$id('replyUser').focus();return false;
	}
	try {
		if ($id('verCode').value==""){
			alert('验证码不能为空');$id('verCode').focus();return false;
		}
	}catch (e) {}
	AjaxPostDeal("replyForm");
	return false;
}


// 读取评论区信息
function LoadReplyList(repID){
	$id("replyList").innerHTML = "<center style='padding:10px;'><img src='"+ dbPathPart +"inc_img/onload.gif' style='margin-right:5px;' />数据加载中...</center>"+ $id("replyList").innerHTML;
	AjaxGetDealToId(dbPathPart +"news_deal.asp?mudi=messageSend&dataID="+ repID +'&dbPathPart='+ dbPathPart,"replyList");
}


// 检测回复内容字符
function CheckReplyMaxLen(){
	try {
		strMaxLen = parseInt($id('replyContentMaxLen').value);
		if (strMaxLen>0){
			$id('conMaxLenBox').innerHTML = "(<span id='conCurrLen'>0</span>/"+ strMaxLen +")&nbsp;";
			$('#replyContent').keyup(function (){
				CalcReplyLen();
			});
		}
	}catch (e) {}
}

// 计算回复内容字符数
function CalcReplyLen(){
	try {
		$id('conCurrLen').innerHTML = $id('replyContent').value.length;
	}catch (e) {}
}