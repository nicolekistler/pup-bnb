import HTTPService from './HTTPService';

class AuthService extends HTTPService {
	constructor(domain) {
		super();

		this.domain = domain || 'http://localhost:8080';

		this.fetch = this.fetch.bind(this);
		this.book  = this.book.bind(this);
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
}

export default AuthService;
