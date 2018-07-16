var imgs = {
	grass :"./assets/images/grass.png",
	demo:'./assets/images/demo.png',
	humidity:'./assets/images/humidity.png',
	temperature:'./assets/images/temperature.png',
	cInfo:'./assets/images/c-info.png',
	cTag:'./assets/images/c-tag.png',
	infoBg:'./assets/images/info-bg.png',
	line:'./assets/images/line.png',
	logo:'./assets/images/logo.png',
	logo1:'./assets/images/logo1.jpg',
	help:'./assets/images/help.png',
	help1:'./assets/images/help1.png',
	notice:'./assets/images/notice.png',
	scanBtn:'./assets/images/scan-btn.png',
	lifePic:'./assets/images/life-pic.png',
	ncIcon:'./assets/images/nc-icon.png',
	jsIcon:'./assets/images/js-icon.png',
	danganIcon:'./assets/images/dangan-icon.png',
	yqIcon:'./assets/images/yq-icon.png',
	indexBottom:"./assets/images/index-bottom.png",
	cStage:'./assets/images/c-stage.png',
	add:'./assets/images/add.png',
	newGuide: './assets/images/new_guide.png',
	raise:'./assets/images/raise.png',
	sale:'./assets/images/sale.png',
	moneyBg:'./assets/images/money-bg.png',
	cIcon:'./assets/images/c-icon.png',
	eggIcon:'./assets/images/egg-icon.png',
	msg:'./assets/images/msg.png',
	connect:'./assets/images/connect.png',
	user:'./assets/images/user.png',
	pedometer:'./assets/images/pedometer.jpg',
	ped:'./assets/images/ped.jpg',
	gameStage:'./assets/images/game-stage.png',
	gameBg:'./assets/images/game-bg.jpg',
	msgIco:'./assets/images/msg-ico.png',
	settingIco:'./assets/images/setting-ico.png',
	friendIco: './assets/images/friend-ico.png',
	homeIco:'./assets/images/home-ico.png',
	shopIco:'./assets/images/shop-ico.png',

	shopClose:'./assets/images/shop-close.png',
	shopBtnBg:'./assets/images/shop-btn-bg.png',
	shopSure:'./assets/images/shop-sure.png',
	shopCancel:'./assets/images/shop-cancel.png',
	shopTitle: './assets/images/shop-title.png',
	shopHen:'./assets/images/shop-hen.png',
	shopChick: './assets/images/shop-chick.png',

	repertoryTitle: './assets/images/repertory-title.png',
	repertorySend: './assets/images/repertory-send.png',

	settingTitle:'./assets/images/setting-title.png',
	messageTitle:'./assets/images/message-title.png',
	addressIco: './assets/images/address-ico.png',
	fankui:'./assets/images/fankui.png',
	fapiao:'./assets/images/fapiao.png',
	kuaidiquan:'./assets/images/kuaidiquan.png',
	youhuiquan:'./assets/images/youhuiquan.png',
	lipinka:'./assets/images/lipinka.png',
	tanwei:'./assets/images/tanwei.png',
	myOrder:'./assets/images/my-order.png',
	myStore:'./assets/images/my-store.png',
	settingIco1:'./assets/images/setting-ico1.png',
	homeIco1:'./assets/images/home-ico1.png'
}
window.config = {
	baseUrl:'https://api.symbin.cn/v1'
};



(function () {

	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		handleFontSize();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
		}
	}

	function handleFontSize() {
		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', {
			'fontSize': 0
		});
		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function () {
			WeixinJSBridge.invoke('setFontSizeCallback', {
				'fontSize': 0
			});
		});
	}
})();