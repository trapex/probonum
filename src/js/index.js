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

// slider

// let slider = tns({
// 	container: ".js-similar-list",
// 	loop: false,
// 	responsive: {
// 		350: {
// 			items: 3
// 		},
// 		500: {
// 			items: 4
// 		}
// 	},
// 	controlsContainer: '.similar-channels__arrows',
// 	nav: false,
// 	gutter: '20',
// 	swipeAngle: false,
// 	speed: 300
// });

$(function () {
	let $slider = $('.js-slider');
	let count = $slider.children().length;
	let el = $slider.children().get(0);
	let style = el.currentStyle || window.getComputedStyle(el);
	let elWidth = el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

	$slider.get(0).style.width = `${elWidth * count}px`;

	var regex = /\d+/g;
	var string = "you can enter maximum -500 choices";
	var matches = string.match(regex);  // creates array from matches

	console.log(matches);

	$('.js-slider-prev').on('click', (e) => {
		let offset = ($slider.get(0).style.transform ? parseInt($slider.get(0).style.transform.match(/\d+/g)[0]) : 0) + elWidth;
		console.log(offset);
		$slider.get(0).style.transform = `translateX(${offset}px)`;
	});

	$('.js-slider-next').on('click', (e) => {
		let offset = ($slider.get(0).style.transform ? parseInt($slider.get(0).style.transform.match(/\d+/g)[0]) : 0) - elWidth;
		console.log(offset);
		$slider.get(0).style.transform = `translateX(${offset}px)`;
	});

});