import decode from 'jwt-decode';

class AuthService {
	constructor(domain) {
		this.domain = domain || 'http://localhost:8080';

		this.fetch      = this.fetch.bind(this);
		this.login      = this.login.bind(this);
		this.signup     = this.signup.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}

	login(username, password) {
		// Fetch token from server
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(res => {
			// Setting the token in local storage
			this.setToken(res.token)

			return Promise.resolve(res);
		});
	}

	signup(username, password) {
		// Fetch token from server
		return this.fetch(`${this.domain}/signup`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(res => {
			return Promise.resolve(res);
		});
	}

	loggedIn() {
		// Check if there is a saved token and it's still valid
		const token = this.getToken();

		return !!token && !this.isTokenExpired(token);
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);

			// Checking if token is expired
			if (decoded.exp < Date.now() / 1000) {
				return true;
			}
			else
				return false;
		}
		catch (err) {
			return false;
		}
	}

	setToken(idToken) {
		// Save user token to local storage
		localStorage.setItem('id_token', idToken);
	}

	getToken() {
		// Retrieves the user token from local storage
		return localStorage.getItem('id_token');
	}

	logout() {
		// Clear user token and profile data from local storage
		localStorage.removeItem('id_token');
	}

	getProfile() {
		// Using jwt-decode npm package to decode the token
		return decode(this.getToken());
	}


	fetch(url, options) {
		// performs api calls sending the required authentication headers
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		// Set Authorization header
		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken();
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json());
	}

	_checkStatus(response) {
		// Raise an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			var error = new Error(response.statusText);

			error.response = response;

			throw error;
		}
	}
}

export default AuthService;
