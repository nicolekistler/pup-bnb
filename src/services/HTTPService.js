import decode from 'jwt-decode';

class HTTPService {
	constructor(domain) {
		this.domain = domain || 'http://localhost:8080';

		this.fetch = this.fetch.bind(this);
	}

	/* Retrieves user token from local storage */
	getToken() {
		return localStorage.getItem('id_token');
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

	/* Check if user has valid token */
	loggedIn() {
		const token = this.getToken();

		return !!token && !this.isTokenExpired(token);
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
			headers['Authorization'] = `Bearer ${this.getToken()}`;
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

export default HTTPService;
