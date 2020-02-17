import decode from 'jwt-decode';

class AuthService {
	constructor(domain) {
		this.domain = domain || 'http://localhost:8080';

		this.fetch      = this.fetch.bind(this);
		this.login      = this.login.bind(this);
		this.signup     = this.signup.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.getUserId  = this.getUserId.bind(this);
	}

	/**
	 * Login as user
	 * @param {string} username
	 * @param {string} password
	 */
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
			this.setToken(res.token);
			this.setUserId(res.userId);

			return Promise.resolve(res);
		});
	}

	/**
	 * Sign up
	 * @param {string} username
	 * @param {string} password
	 */
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

	/**
	 * Book a listing as a user
	 * @param {string} userId 
	 * @param {number} listingId 
	 * @param {string} startDate 
	 * @param {string} endDate 
	 */
	book(userId, listingId, startDate, endDate) {
		return this.fetch(`${this.domain}/book`, {
			method: 'POST',
			body: JSON.stringify({
				userId,
				listingId,
				startDate,
				endDate
			})
		}).then(res => {
			return Promise.resolve(res);
		});
	}

	/* Check if user has valid token */
	loggedIn() {
		const token = this.getToken();

		return !!token && !this.isTokenExpired(token);
	}

	/**
	 * Check if token is expired
	 * @param {string} token
	 */
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

	/**
	 * Save user token in local storage
	 * @param {string} idToken
	 */
	setToken(idToken) {
		localStorage.setItem('id_token', idToken);
	}

	/* Retrieves user token from local storage */
	getToken() {
		return localStorage.getItem('id_token');
	}

	setUserId(userId) {
		localStorage.setItem('user_id', userId);
	}

	getUserId() {
		return localStorage.getItem('user_id');
	}

	/* Clear user token and profile data from local storage */
	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('user_id');
	}

	/* Decode token */
	getProfile() {
		return decode(this.getToken());
	}


	/**
	 * Fetch
	 * @param {string} url
	 * @param {object} options
	 */
	fetch(url, options) {
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

	/**
	 * Check response status
	 * @param {object} response
	 */
	_checkStatus(response) {
		// Raise an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(response.statusText);

			error.response = response;

			throw error;
		}
	}
}

export default AuthService;
