import Fetcher from 'core/fetcher.js';
import { User, Login, Logout } from 'core/FA.js';

export function Switcheroo(selector = '#switcheroo', options = {}) {
	this.selector = selector;

	var defaults = {
  		logo: '',
  		confirm: true,
  		explore: false,
  		formAutocomplete: 'off',
  		classBlock: 'switcheroo__',
  		deleteIcon: `×`,
  		addIcon: `+`,
  		errorMsg: 'Une erreur est surviendue lors du Switcheroo.',
  		confirmMsg: 'Confirmer le Switcheroo de personnage ?',
  		modal: {}
  	};

	// extend default
	if(options && typeof options == "object") {
		this.options = Object.assign({}, defaults, options);
	} else {
		this.options = defaults;
	}

	this.init();
}

Switcheroo.prototype.init = function() {
	this.credentials();
	this.build();
};

Switcheroo.prototype.credentials = function() {
	if (!localStorage.hasOwnProperty('switcheroo')) {
		localStorage.setItem('switcheroo', "[]");
	}
	this.credentials = this.getCredentials();
};

Switcheroo.prototype.getCredentials = function() {
	return JSON.parse(localStorage.getItem('switcheroo'));
};

Switcheroo.prototype.build = function() {
	var c = this.options.classBlock;

	let docFrag = document.createDocumentFragment();

	// wrapper
	let wrapper = document.createElement('ul');
	wrapper.classList.add(c + 'squircles');

	const divider = document.createElement('li');
	divider.classList.add(c + 'divider');

	// if logo given
	if (this.options.logo) {
		let logo = document.createElement('a');
		logo.classList.add(c + 'squircle', c + 'logo');
		logo.href = '/';
		logo.innerHTML = this.options.logo;
		logo.appendChild(this.createTooltip('Accueil'));
		wrapper.appendChild(logo);
		wrapper.appendChild(divider);
	}

	this.credentials.forEach(el => {
		// create list item
		let list = document.createElement("li");
		list.classList.add(c + 'squircle');
		list.dataset.action = 'switcheroo';
		list.dataset.id = el.id;
		list.classList.toggle('active', (el.id == User().id()));

		// create avatar
		let avatar = document.createElement("div")
		avatar.classList.add(c + 'avatar');
		avatar.innerHTML = el.avatar.replace(/\\"/g, '"');
		list.appendChild(avatar);

		// create tooltip
		list.appendChild(this.createTooltip(el.username));

		// create delete
		let del = document.createElement('div');
		del.classList.add(c + 'delete');
		del.innerHTML = this.options.deleteIcon;
		list.appendChild(del);		

		wrapper.appendChild(list);
	});

	docFrag.appendChild(wrapper);

	document.querySelector(this.selector).appendChild(docFrag);

};

Switcheroo.prototype.createTooltip = function(tooltip) {
	let c = this.options.classBlock;
	// create popper
	let popper = document.createElement("div");
	popper.classList.add(c + 'popper');
	// create popper text
	let textNode = document.createElement("div");
	textNode.classList.add(c + 'popper-text');
	textNode.innerHTML = tooltip;
	popper.appendChild(textNode);
	return popper;
};