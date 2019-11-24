import style from "../css/style.scss";

if (process.env.NODE_ENV === 'development') {
	console.log('Working in development mode');
}

$(function() {
	let $next = $('.js-next-btn'),
		$platform = $('.platform');

	$next.on('click', (e) => {
		$('html, body').animate({
			scrollTop: $platform.offset().top
		}, 300);
	});
});