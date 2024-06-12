class wallSimulator{
	monitors = false;
	curMonitor = false;
	kfPixelMm = 1;
	wallWidth = 5000;
	wallHeight = 3000;
	monitorWidth = 0;
	monitorHeight = 0;
	cntGor = 1;
	cntVer = 1;
	htmlObj = {
		'wall': false,
		'wallWidth': false,
		'wallHeight': false,
		'monitorsGor': false,
		'monitorsVer': false,
		'orientation': false,
		'sizeTop':{
			'left': false,
			'center': false,
			'right': false,
			'block': false,
		},
		'sizeRight':{
			'left': false,
			'center': false,
			'right': false,
			'block': false,
		},
		'monitor': false,
		'thick': false,
		'diagonal': false,
	};
	constructor(){
		let self = this;
		self.monitors = [
			{ diagonal: '46', thick: 1, width: 1019, height: 574 },
			{ diagonal: '46', thick: 2, width: 1021, height: 575 },
			{ diagonal: '46', thick: 3, width: 1022, height: 577 },
			{ diagonal: '49', thick: 3, width: 1079, height: 608 },
			{ diagonal: '55', thick: 1, width: 1211, height: 682 },
			{ diagonal: '55', thick: 2, width: 1212, height: 683 },
			{ diagonal: '55', thick: 3, width: 1213, height: 684 },
			{ diagonal: '65', thick: 3, width: 1433, height: 808 },
		];
		self.thicks = [ 1, 2, 3 ];
		self.htmlObj.wall = jQuery('.js-wall-display');
		self.htmlObj.wallWidth = jQuery('.js-wall-simulator-width');
		self.htmlObj.wallHeight = jQuery('.js-wall-simulator-height');
		self.htmlObj.monitorsGor = jQuery('.js-monitor-gor');
		self.htmlObj.monitorsVer = jQuery('.js-monitor-ver');
		self.htmlObj.orientation = jQuery('.js-monitor-orientation');
		self.htmlObj.sizeTop.left = jQuery('.js-wall-top-line .js-size-left');
		self.htmlObj.sizeTop.center = jQuery('.js-wall-top-line .js-size-center');
		self.htmlObj.sizeTop.right = jQuery('.js-wall-top-line .js-size-right');
		self.htmlObj.sizeTop.block = jQuery('.js-wall-top-center-block');
		self.htmlObj.sizeRight.left = jQuery('.js-wall-right-line .js-size-left');
		self.htmlObj.sizeRight.center = jQuery('.js-wall-right-line .js-size-center');
		self.htmlObj.sizeRight.right = jQuery('.js-wall-right-line .js-size-right');
		self.htmlObj.sizeRight.block = jQuery('.js-wall-right-center-block');
		self.htmlObj.monitor = jQuery('.js-display-grid');
		self.htmlObj.thick = jQuery('.js-thick-model');
		self.htmlObj.diagonal = jQuery('.js-diagonal-model');
		
		self.initMonitor();

		jQuery(window).resize(function(){
			if (jQuery('.configurator_videosteny').length > 0) self.initSize();
		});
		jQuery(window).ready(function(){
			if (jQuery('.configurator_videosteny').length > 0) self.initSize();
		});

		jQuery('.js-display-gor-plus').click(function(){
			let v=parseInt(self.htmlObj.monitorsGor.val())+1;
			if(v>99) v=99;
			self.htmlObj.monitorsGor.val(v);
			self.initSize();
			return false;
		});
		jQuery('.js-display-ver-plus').click(function(){
			let v=parseInt(self.htmlObj.monitorsVer.val())+1;
			if(v>99) v=99;
			self.htmlObj.monitorsVer.val(v);
			self.initSize();
			return false;
		});
		jQuery('.js-display-gor-minus').click(function(){
			let v=parseInt(self.htmlObj.monitorsGor.val())-1;
			if(v<1) v=1;
			self.htmlObj.monitorsGor.val(v);
			self.initSize();
			return false;
		});
		jQuery('.js-display-ver-minus').click(function(){
			let v=parseInt(self.htmlObj.monitorsVer.val())-1;
			if(v<1) v=1;
			self.htmlObj.monitorsVer.val(v);
			self.initSize();
			return false;
		});
		
		jQuery.map(jQuery(".js-monitor-ver-values span"), function(e, index) {
			jQuery( e ).click(function(){
				self.setValue(index, 'js-monitor-ver-values', 'js-monitor-ver');
				self.initSize();
				return false;
			});
			return false;
		});
		jQuery.map(jQuery(".js-thick-model-values span"), function(e, index) {
			jQuery( e ).click(function(){
				if (!jQuery( e ).hasClass('inactive')) {
					self.setValue(index, 'js-thick-model-values', 'js-thick-model');
					self.initSize();
				}
				return false;
			});
			return false;
		});
		jQuery.map(jQuery(".js-monitor-gor-values span"), function(e, index) {
			jQuery( e ).click(function(){
				self.setValue(index, 'js-monitor-gor-values', 'js-monitor-gor');
				self.initSize();
				return false;
			});
			return false;
		});
		jQuery.map(jQuery(".js-diagonal-model-values span"), function(e, index) {
			jQuery( e ).click(function(){
				self.setValue(index, 'js-diagonal-model-values', 'js-diagonal-model');
				self.checkThick();
				self.initSize();
				return false;
			});
			return false;
		});
		jQuery.map(jQuery(".js-monitor-orientation-values span"), function(e, index) {
			jQuery( e ).click(function(){
				self.setValue(index, 'js-monitor-orientation-values', 'js-monitor-orientation');
				self.initSize();
				return false;
			});
			return false;
		});

		jQuery('.js-wall-simulator-width, .js-wall-simulator-height').change(function(){
			self.initSize();
			return false;
		});
		jQuery('.js-contactform-submit').click(function(){
			jQuery('.configurator_contactform').toggleClass('active');
			jQuery('.js-contactform-submit').toggleClass('inactive');
			return false;
		});
		jQuery('.js-simulator-submit').click(function(){
			let tel = jQuery('.js-contactform-tel');
			let email = jQuery('.js-contactform-email');
			let thick = jQuery('.js-thick-model-values span[data-value="' + self.htmlObj.thick.val() + '"]');
			let orientation = jQuery('.js-monitor-orientation-values span[data-value="' + self.htmlObj.orientation.val() + '"]');
			
			if (!tel.val()) {
				let error = 'Введите телефон';
				self.showError(error);
				return;
			}
			if (!self.validatePhone(tel.val())) {
				let error = 'Телефон некорректен';
				self.showError(error);
				return;
			}
			if (!email.val()) {
				let error = 'Введите email';
				self.showError(error);
				return;
			}
			if (!self.validateEmail(email.val())) {
				let error = 'Email некорректен';
				self.showError(error);
				return;
			}
			
			let formData = {
				'monitorsGor': self.htmlObj.monitorsGor.val(),
				'monitorsVer': self.htmlObj.monitorsVer.val(),
				'orientation': orientation.html(),
				'thick': thick.html(),
				'diagonal': self.htmlObj.diagonal.val(),
				'tel': tel.val(),
				'email': email.val()
			};
			let url = '/wp-admin/admin-ajax.php?action=configurator_mail';
			jQuery.ajax({
				type: "POST",
				url: url,
				data: formData,
				success: function (data) {
					//console.log(data);
					if(data['error']){
						self.showError(data['error']);
					}else{
						console.log('success');
						window.location.href = new URL('/thank-you', 'https://lcdtop.ru');
					}
				},
				error: function (error) {
					self.showError(error.statusText);
				},
			});
			return false;
		});
		
		let error_mes = '<div class="error"><div class="error-mes"><div class="error-text"></div><span class="mypopup-modal-close mypopup-button-close--location-outside"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 407a24 24 0 11-34 34L256 290 105 441a24 24 0 01-34-34l151-151L71 105a24 24 0 0134-34l151 151L407 71a24 24 0 0134 34L290 256z" fill="currentColor"></path></svg></span></div><div class="modal-background"></div></div>';
		let error = jQuery(jQuery.parseHTML(error_mes));
		jQuery('.site').append(error);
		jQuery(document).on("click touchend", ".error-mes .mypopup-modal-close, .modal-background", function () {
			jQuery('.error-mes').toggleClass('active');
			jQuery('.modal-background').toggleClass('active');
		});
	}
	checkThick(){//проверить толщины шва для диагонали
		let self = this;
		let thick = self.htmlObj.thick.val();
		let diagonal = self.htmlObj.diagonal.val();
		let fa = false;
		let arMon = [];
		let one = true;
		self.monitors.forEach((mon) => {
			if (diagonal.length && mon['diagonal'] == diagonal) {
				if (thick.length && mon['thick'] == thick) fa = true;
				arMon.push(mon['thick']);
			}
		});
		self.thicks.forEach((th) => {
			if (!arMon.includes(th)) {
				if (!jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).hasClass('inactive')) jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).addClass('inactive');
				if (jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).hasClass('active')) jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).removeClass('active');
			} else {
				if (jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).hasClass('inactive')) jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).removeClass('inactive');
				if (!fa && one && !jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).hasClass('active')) {
					jQuery( '.js-thick-model-values span[data-value="' + th + '"]' ).addClass('active');
					jQuery( '.js-thick-model' ).val(th);
					one = false;
				}
			}
		});
	}
	initMonitor(){
		let self = this;
		let thick = self.htmlObj.thick.val();
		let diagonal = self.htmlObj.diagonal.val();
		self.monitors.forEach((mon) => {
			if (diagonal && diagonal.length && mon.diagonal == diagonal && thick && thick.length && mon.thick == thick) self.curMonitor = mon;
		});
	}
	initSize(){
		let self = this;
		self.initMonitor();
		if(jQuery('.js-monitor-gor').val()!=parseInt(jQuery('.js-monitor-gor').val())) jQuery('.js-monitor-gor').val(parseInt(jQuery('.js-monitor-gor').val()));
		if(jQuery('.js-monitor-ver').val()!=parseInt(jQuery('.js-monitor-ver').val())) jQuery('.js-monitor-ver').val(parseInt(jQuery('.js-monitor-ver').val()));
		let error = [];
		let prev = {
			'cntGor': self.cntGor,
			'cntVer': self.cntVer,
			'wallWidth': self.wallWidth,
			'wallHeight': self.wallHeight,
		};
		self.htmlObj.monitor.removeClass('t2 t3');
		self.htmlObj.monitor.addClass('t' + self.htmlObj.thick.val());
		if (self.htmlObj.wallWidth && self.htmlObj.wallWidth.val()) self.wallWidth = parseInt(parseFloat(self.htmlObj.wallWidth.val().replace(',','.')) * 1000);
		if (self.htmlObj.wallHeight && self.htmlObj.wallHeight.val()) self.wallHeight = parseInt(parseFloat(self.htmlObj.wallHeight.val().replace(',','.')) * 1000);

		if(self.wallWidth < 2000 || self.wallHeight < 2000){
			error.push('Минимальный размер стены 2х2');
			self.htmlObj.wallWidth.val(parseInt(prev.wallWidth / 1000) + ' м');
			self.htmlObj.wallHeight.val(parseInt(prev.wallHeight / 1000) + ' м');
		}
		if(error.length <= 0){
			self.cntGor = parseInt(self.htmlObj.monitorsGor.val());
			self.cntVer = parseInt(self.htmlObj.monitorsVer.val());
			self.kfPixelMm = self.wallWidth / self.htmlObj.wall.width();
			self.htmlObj.wall.height(self.wallHeight / self.kfPixelMm);
			self.htmlObj.sizeTop.block.height(self.wallHeight / self.kfPixelMm / 2 + 30);
			self.htmlObj.sizeRight.block.width(self.htmlObj.wall.width() / 2 + 30);
			self.monitorWidth = parseInt(self.curMonitor.width);
			self.monitorHeight = parseInt(self.curMonitor.height);
			if(self.htmlObj.orientation.val() == 'Ver'){
				self.monitorWidth = self.monitorHeight;
				self.monitorHeight = parseInt(self.curMonitor.width);
			}
			let maxMWidth = Math.floor(self.wallWidth / self.monitorWidth);
			let maxMHeight = Math.floor(self.wallHeight / self.monitorHeight);
			if(maxMWidth < self.cntGor || maxMHeight < self.cntVer){
				error.push('Максимальное количество мониторов – ' + maxMWidth + 'x' + maxMHeight);
				if(prev.cntGor > maxMWidth) prev.cntGor = self.cntGor = maxMWidth;
				if(prev.cntVer > maxMHeight) prev.cntVer = self.cntVer = maxMHeight;
				self.htmlObj.monitorsGor.val(prev.cntGor);
				self.htmlObj.monitorsVer.val(prev.cntVer);
			}
			if(error.length <= 0){
				let pxWidth = self.monitorWidth * self.cntGor / self.kfPixelMm;
				let pxHeight = self.monitorHeight * self.cntVer / self.kfPixelMm;
				self.htmlObj.monitor.width(pxWidth);
				self.htmlObj.monitor.height(pxHeight);
				self.htmlObj.sizeTop.block.width(pxWidth - 4);
				self.htmlObj.sizeRight.block.height(pxHeight - 5);

				self.htmlObj.sizeTop.center.html(self.formatMetr(self.monitorWidth * self.cntGor));
				let ost = (self.wallWidth - self.monitorWidth * self.cntGor) / 2;
				let otL = (ost / self.kfPixelMm) / 2;
				ost = self.formatMetr(ost);
				self.htmlObj.sizeTop.left.html(ost);
				self.htmlObj.sizeTop.right.html(ost);
				otL -= self.htmlObj.sizeTop.left.width() / 2 + 7;
				if(otL < 0) otL = 0;
				self.htmlObj.sizeTop.left.css('left',otL);
				self.htmlObj.sizeTop.right.css('right',otL);

				self.htmlObj.sizeRight.center.html(self.formatMetr(self.monitorHeight * self.cntVer));
				ost = (self.wallHeight - self.monitorHeight * self.cntVer) / 2;
				otL = ost / self.kfPixelMm / 2;
				ost = self.formatMetr(ost);
				self.htmlObj.sizeRight.left.html(ost);
				self.htmlObj.sizeRight.right.html(ost);
				otL -= self.htmlObj.sizeRight.left.height() / 2;
				if(otL < 0) otL = 0;
				self.htmlObj.sizeRight.left.css('top',otL);
				self.htmlObj.sizeRight.right.css('bottom',otL);

				self.htmlObj.monitor.find('.tbl').html('');
				for(let tr = 0; tr < self.cntVer; tr++){
					let str = '<div class="tr">';
					for(let td = 0; td < self.cntGor; td++){
						str += '<div class="td"></div>';
					}
					str += '</div>';
					self.htmlObj.monitor.find('.tbl').append(str);
				}
			}
			var diagonalActive = jQuery('.diagonal-model span.active');
			var monitorCost = diagonalActive.data('thick' + self.htmlObj.thick.val()) * self.cntGor * self.cntVer
			if(document.querySelector(".configurator__bottom p span")){
				document.querySelector(".configurator__bottom p span").innerHTML = monitorCost.toLocaleString('ru') + "р."
			}
		}

		if(error.length > 0){
			self.showError(error);
			self.initSize();
			return;
		}
	}
	setValue(item, classItem, classValue) {
		jQuery.map(jQuery('.' + classItem + ' span'), function(e, index) {
			jQuery(e).removeClass('active');
			if (item == index) {
				jQuery('.' + classValue).val(jQuery( e ).attr('data-value'));
				jQuery(e).addClass('active');
			}
			return false;
		});
		return false;
	}
	formatMetr(w){
		let ww = parseFloat(w)/1000;
		ww = ww.toFixed(3).replace('.',',');
		return ww.toString()+'&nbsp;м';
	}
	validateEmail(email) {
		let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		return regex.test(email);
	}
	validatePhone(phone) {
		let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
		return regex.test(phone);
	}
	showError(error){
		jQuery('.error .error-text').html(error);
		jQuery('.error .error-mes').addClass('active');
		jQuery('.error .modal-background').addClass('active');
	}
}
let wallSimulatorObj = false;
jQuery(function(){
	if (jQuery('.configurator_videosteny').length > 0) wallSimulatorObj = new wallSimulator();
	jQuery('.js-plus, .js-minus').each(function(){
		jQuery(this).html('<span>'+jQuery(this).text()+'</span>');
	});
	
	jQuery('.js-plus, .js-minus').click(function(){
	    let th = jQuery(this);
	    let d = th.closest('.js-plm');
	    let k = th.hasClass('js-minus') ? -1 : 1;
	    let v = d.find('input');
	    let currentValue = v.val();
	        let currentNumber = parseFloat(currentValue.match(/\d+/));
	    if (!isNaN(currentNumber)) {
	        k += currentNumber;
	        if (k < 1) k = 1;
	        if (k > 99) k = 99;
	        v.val(currentValue.replace(/\d+/, k)).trigger('change');
	    }
	    return false;
	});

});