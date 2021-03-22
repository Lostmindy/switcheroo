(function(global) {

	global.monomer = global.monomer || new MONOMER();

	function Switcheroo(selector = '#switcheroo', options = {}) {
		this.selector = selector;

	  	var defaults = {
	  		logo: '',
	  		confirm: true,
	  		explore: false,
	  		formAutocomplete: 'off',
	  		blockClass: 'switcheroo',
	  		exploreIcon: `more`,
	  		deleteIcon: `×`,
	  		addIcon: `+`,
	  		errorMsg: 'Une erreur est surviendue lors du Switcheroo.',
	  		confirmMsg: 'Confirmer le Switcheroo de personnage ?',
	  		modal: {}
	  	};

		if(arguments[1] && typeof arguments[1] == "object") {
			this.options = Object.assign({}, defaults, options);
		} else {
			this.options = defaults;
		}

		this.createFormModal(this.options.modal);

		this.elements = {
			loginButton: document.querySelector('[data-action="open-login"]'),
			loginFormID: 'fa-login-form',
			classPrefix: '.' + this.options.blockClass,
			deleteButtonClass: '.' + this.options.blockClass + '__delete'
		};

		if (!localStorage.hasOwnProperty('switcheroo')) {
			localStorage.setItem('switcheroo', "[]");
		}

		this.buildSwitcheroo();

		this.bindEvents();
	}

	Switcheroo.prototype.bindEvents = function() {
		let t = this;
  		document.delegateEventListener('click', '[data-action="open-login"]', e => {
  			this.loginModal.open();
  		});

  		document.delegateEventListener('click', '[data-action="switcheroo"]', function(e) {
  			if(t.isCloseButton(e)) {
  				t.deleteRecord(this.dataset.id);
  			}
  		});

  		document.delegateEventListener('click', '[data-action="switcheroo"]:not(.active)', function(e) {
  			if(!t.isCloseButton(e)){
  				if(t.options.confirm) {
	  				var r = confirm(t.options.confirmMsg);
					if (r == true) {
				  		t.switch(this);
					}
				} else {
					t.switch(this);
				}
			}
  		});

	};

	Switcheroo.prototype.add = function(form) {
		let fields = monomer.getFormData(form);
		let credentials = (({ username, password }) => ({ username, password: monomer.cipher(password) }))(fields);

		if(!monomer.user().logged()) {

			this.login(credentials, (data) => {
				credentials = Object.assign({}, credentials, this.updateCredentials(data));
				this.update(credentials);
				monomer.reload();
			}, () => {
				this.errorAlert();
			});

		} else {

			this.logout(() => {
				this.login(credentials, (data) => {
					credentials = Object.assign({}, credentials, this.updateCredentials(data));
					this.update(credentials);
					monomer.reload();
				}, () => {
					this.errorAlert();
				});
			});

		}
	}

	Switcheroo.prototype.switch = function(user) {
		let id = user.dataset.id;
		let switcheroo = this.findSwitcheroo(id);
		if(!monomer.user().logged()) {
			if(switcheroo) {
				this.login(switcheroo, monomer.reload, () => {
					this.errorAlert();
				});
			}
		} else {
			if(switcheroo) {
				this.logout(() => {
					this.login(switcheroo, monomer.reload, () => {
						this.errorAlert();
					});
				});
			}
		}
	}

	Switcheroo.prototype.login = function(credentials, success, error) {
		monomer.login(credentials['username'], monomer.decipher(credentials['password']))
		.then(res => {
			this.statusCallbacks(res, success, error);
		});
	};

	Switcheroo.prototype.logout = function(success, error) {
		let t = this;
		monomer.logout().then(res => {
			this.statusCallbacks(res, success, error);
		});
	};

	Switcheroo.prototype.statusCallbacks = function(res, success, error) {
		if(res.status) {
			if(success) success(res.data);
		} else {
			if (error) error(res.data);
		}
	};

	Switcheroo.prototype.errorAlert = function() {
		alert(this.options.errorMsg);
	};

	Switcheroo.prototype.update = function(credentials) {
		if(!this.credentialsExists(credentials['id'])) {
			this.switcherooCredentials.push(credentials);
			this.updateStorage();
		}
	};

	Switcheroo.prototype.findSwitcheroo = function(id) {
		return this.switcherooCredentials.find(x => x.id === id);
	}

	Switcheroo.prototype.deleteSwitcheroo = function(id) {
		this.switcherooCredentials = this.switcherooCredentials.filter(function(obj) {
	  		return obj.id !== id;
		});
	};

	Switcheroo.prototype.updateCredentials = function(data) {
		// make sure everything is formatted for localstorage
		return {
			id: this.catchID(data),
			avatar: this.catchAvatar(data),
			username: this.catchUsername(data)
		}
	};

	Switcheroo.prototype.credentialsExists = function(id) {
		return this.switcherooCredentials.some(function(el) {
		    return el.id === id;
	  	});
	};

	Switcheroo.prototype.deleteRecord = function(id) {
		this.deleteSwitcheroo(id);
		this.updateStorage();
		monomer.reload();
	};

	Switcheroo.prototype.updateStorage = function() {
		localStorage.setItem('switcheroo', JSON.stringify(this.switcherooCredentials));
	};

	Switcheroo.prototype.isCloseButton = function(e) {
		var el = e.target;
		return el.matches(this.elements.deleteButtonClass);
	};

	Switcheroo.prototype.catchAvatar = function(data) {
		let pattern = new RegExp(/_userdata\["avatar"\] = "(.+)";/, "gm");
		return pattern.exec(data)[1];
	}

	Switcheroo.prototype.catchID = function(data) {
		let pattern = new RegExp(/_userdata\["user_id"\] = (\d+);/, "gm");
		return pattern.exec(data)[1];
	};

	Switcheroo.prototype.catchUsername = function(data) {
		let pattern = new RegExp(/_userdata\["username"\] = "(.+)";/, "gm");
		return pattern.exec(data)[1];
	};

	Switcheroo.prototype.buildSwitcheroo = function() {
		var c = this.options.blockClass;
		this.switcherooCredentials = JSON.parse(localStorage.getItem('switcheroo'));

		let docFrag = document.createDocumentFragment();

		// wrapper
		let wrapper = document.createElement('ul');
		wrapper.classList.add(c + '__squircles');

		const divider = document.createElement('li');
		divider.classList.add(c + '__divider');

		// if logo given
		if (this.options.logo) {
			let logo = document.createElement('a');
			logo.classList.add(c + '__squircle', c + '__logo');
			logo.href = '/';
			logo.innerHTML = this.options.logo;
			logo.appendChild(this.createTooltip('Accueil'));
			wrapper.appendChild(logo);
			wrapper.appendChild(divider);
		}
		
		this.switcherooCredentials.forEach(el => {
			// create list item
			let list = document.createElement("li");
			list.classList.add(c + '__squircle');
			list.dataset.action = 'switcheroo';
			list.dataset.id = el.id;
			list.classList.toggle('active', (el.id == monomer.user().id()));

			// create avatar
			let avatar = document.createElement("div")
			avatar.classList.add(c + '__avatar');
			avatar.innerHTML = el.avatar.replace(/\\"/g, '"');
			list.appendChild(avatar);

			// create popper
			list.appendChild(this.createTooltip(el.username));

			// create delete
			let del = document.createElement('div');
			del.classList.add(c + '__delete');
			del.innerHTML = this.options.deleteIcon;
			list.appendChild(del);		

			wrapper.appendChild(list);
			
		});

		/* options */
		const login = document.createElement('li');
		login.classList.add(c + '__squircle', c + '__squircle--button');
		login.dataset.action = 'open-login';
		login.innerHTML = this.options.addIcon;
		login.appendChild(this.createTooltip('Associer un personnage'))
		wrapper.appendChild(login);

		if (this.options.explore) {
			const explore = document.createElement('a');
			explore.classList.add(c + '__squircle', c + '__squircle--button');
			explore.href = '/memberlist';
			explore.innerHTML = this.options.exploreIcon;
			explore.appendChild(this.createTooltip('Explorer les personnages'));
			wrapper.appendChild(explore);
		}

		docFrag.appendChild(wrapper);
		document.querySelector(this.selector).appendChild(docFrag);
		
	};

	Switcheroo.prototype.createTooltip = function(tooltip) {
		let c = this.options.blockClass;
		// create popper
		let popper = document.createElement("div");
		popper.classList.add(c + '__popper');
		// create popper text
		let textNode = document.createElement("div");
		textNode.classList.add(c + '__popper-text');
		textNode.innerHTML = tooltip;
		popper.appendChild(textNode);
		return popper;
	}

	Switcheroo.prototype.createFormModal = function(options) {
		let t = this;
		const form = document.createDocumentFragment();
		const c = 'switcheroo';

		const vdom = VD.h('form', { 
			className: c + '__form', 
			name: 'form_login',
			method: 'post',
			action: '/login',
			autocomplete: this.options.formAutocomplete,
			onSubmit: (e) => {
	          	e.preventDefault();
	          	this.add(e.target);
			}
		},
			VD.h('div', {
				className: c + '__form-row'
			},
				VD.h('label', {
					for: c + '-username',
					className: c + '__form-label'
				}, "Nom d'utilisateur"),
				VD.h('input', {
					type: 'text',
					className: c + '__form-input',
					id: c + '-username',
					name: 'username',
					required: true,
					maxlength: '40',
					autocomplete: this.options.formAutocomplete
				}),
			),
			VD.h('div', {
				className: c + '__form-row'
			},
				VD.h('label', {
					for: c + '-password',
					className: c + '__form-label'
				}, "Mot de passe"),
				VD.h('input', {
					className: c + '__form-input',
					type: 'password',
					id: c + '-password',
					name: 'password',
					required: true,
					maxlength: '32',
					autocomplete: this.options.formAutocomplete
				})
			),
			VD.h('input', {
				type: 'checkbox',
				style: 'display: none;',
				name: 'autologin',
				checked: true
			}),
			VD.h('div', {
				className: c + '__form-row'
			},
				VD.h('button', {
					name: 'login',
					className: c + '__form-button'
				}, 'Connexion')
			)
		);

		form.appendChild(VD.createElement(vdom));

		this.loginModal = monomer.modal({
	  		content: VD.createElement(vdom),
	  		maxWidth: 400
	  	});
	};

	global.Switcheroo = Switcheroo;
})(window);	
