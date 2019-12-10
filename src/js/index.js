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

let slider = tns({
	container: ".js-similar-list1",
	loop: false,
	responsive: {
		350: {
			items: 3
		},
		500: {
			items: 4
		}
	},
	controlsContainer: '.similar-channels__arrows',
	nav: false,
	gutter: '20',
	swipeAngle: false,
	speed: 300
});

$(function () {

	function Slider(options) {
		this._default = {
			selector: '.slider',
			arrows: {
				selector: '[data-js-arrow]',
				prev: 'disable',
				next: ''
			},
			items: 4,
		};
		Object.assign(this._options = {}, this._default, options);

		this._options.el = document.querySelector(this._options.selector);
		this._options.count = this._options.el.children.length;
		this._options.itemWidth = 100/this._options.count;
		this._options.maxOffset = (this._options.count - this._options.items)* this._options.itemWidth;

		this.setDefault = function() {

			Array.prototype.forEach.call(this._options.el.children, (el) => {
				el.style.width = `${this._options.itemWidth}%`;
				el.style.paddingRight = '20px';
			})

			this._options.el.style.width = `calc(${25 * this._options.count}% + 20px)`;
			this._options.el.style.transform = `translate3d(0%, 0px, 0px)`;
			this._options.arrows.prev = 'disable';
			$('.arrow_prev').addClass('slider__arrow_disable');
		}

		this.checkDisable = function(offset) {
			return !(offset <= 0 || offset >= this._options.maxOffset);
		}

		this.bindEvents = function () {
			Array.prototype.forEach.call(document.querySelectorAll(this._options.arrows.selector), (item) => {
				item.addEventListener('click', (e) => {
					if (e.target.dataset.jsArrow) {
						e.stopPropagation();

						let sign = e.target.dataset.jsArrow;
						if ((this._options.arrows.prev === 'disable' && sign === '1') || (this._options.arrows.next === 'disable' && sign === '-1')) {
							return false;
						}
						let offset = parseInt(this._options.el.style.transform.match(/-?[0-9]\d*%/)[0]) + sign * this._options.itemWidth;
						console.log(`slide: ${offset}`);
						this._options.el.style.transform = `translate3d(${offset}%, 0px, 0px)`;
						document.querySelector("[data-js-arrow='1']").classList.remove('slider__arrow_disable');
						document.querySelector("[data-js-arrow='-1']").classList.remove('slider__arrow_disable');
						this._options.arrows.prev = '';
						this._options.arrows.next = '';
						if (!this.checkDisable(-offset)) {
							let direction = sign === '1' ? 'prev' : 'next';
							this._options.arrows[direction] = 'disable';
							e.target.classList.add('slider__arrow_disable');
						}
					}
				});
			});
		}

		this.init = function () {
			this.setDefault();
			this.bindEvents();
		}

		this.init();
	}

	let slider = new Slider({
		selector: '.js-similar-list'
	});


	// let $slider = $('.js-similar-list');
	// let count = $slider.children().length;
	//
	// let slider = {
	// 	arrows: {
	// 		prev: 'disable',
	// 		next: ''
	// 	},
	// 	items: 4,
	// 	maxOffset: (count - 4) * 20
	//
	// };
	//
	// setDefault();
	//
	// $('[data-js-arrow]').on('click', (e) => {
	// 	let sign = e.target.dataset.jsArrow;
	// 	if ((slider.arrows.prev === 'disable' && sign === '1') || (slider.arrows.next === 'disable' && sign === '-1')) {
	// 		return false;
	// 	}
	// 	let offset = parseInt($slider.get(0).style.transform.match(/-?[0-9]\d*%/)[0]) + sign * 20;
	// 	console.log(`slide: ${offset}`);
	// 	$slider.get(0).style.transform = `translate3d(${offset}%, 0px, 0px)`;
	// 	$('[data-js-arrow]').removeClass('slider__arrow_disable');
	// 	slider.arrows.prev = '';
	// 	slider.arrows.next = '';
	// 	if (!checkDisable(-offset)) {
	// 		if (sign === '1') {
	// 			slider.arrows.prev = 'disable';
	// 		} else {
	// 			slider.arrows.next = 'disable';
	// 		}
	// 		e.target.classList.add('slider__arrow_disable');
	// 	}
	// });
	//
	// function setDefault() {
	// 	$slider.children().each((key, el) => {
	// 		el.style.width = '20%';
	// 		el.style.paddingRight = '20px';
	// 	});
	// 	$slider.get(0).style.width = `calc(${25 * count}% + 20px)`;
	// 	$slider.get(0).style.transform = `translate3d(0%, 0px, 0px)`;
	// 	slider.arrows.prev = 'disable';
	// 	$('.arrow_prev').addClass('slider__arrow_disable');
	// }
	//
	// function checkDisable(offset) {
	// 	return !(offset <= 0 || offset >= slider.maxOffset);
	// }

});