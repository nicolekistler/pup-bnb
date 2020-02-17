import decode from 'jwt-decode';
import HTTPService from './HTTPService';

class AuthService extends HTTPService {
	constructor(domain) {
		super();

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
	 * Save user token in local storage
	 * @param {string} idToken
	 */
	setToken(idToken) {
		localStorage.setItem('id_token', idToken);
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
}

export default AuthService;
