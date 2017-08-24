$(function () {
	$('.js-modal-open').click(function () {
		$('body').append('<div class="l-modal-overlay"></div>');
		$('.l-modal-overlay').fadeIn(200);
		var modal = '#' + $(this).attr('data-target');
		modalResize();
		if($('#pdfIframe')) $('#pdfIframe').hide();
		$(modal).fadeIn(200);

		$('.l-modal-overlay, .js-modal-close').off().click(function () {
			$(modal).fadeOut(200);
			if($('#pdfIframe')) $('#pdfIframe').show();
			$('.l-modal-overlay').fadeOut(200, function () {
				$('.l-modal-overlay').remove();
			});
		});
		$(window).on('resize', function () {
			modalResize();
		});

		function modalResize() {
			var w = $(window).width();
			var h = $(window).height();
			var x = (w - $(modal).outerWidth(true)) / 2;
			var y = (h - $(modal).outerHeight(true)) / 2;
			$(modal).css({
				'left': x + 'px',
				'top': y + 'px'
			});
		}
	});
});
