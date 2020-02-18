import HTTPService from './HTTPService';

class BookingService extends HTTPService {
	constructor(domain) {
		super();

		this.domain = domain || 'http://localhost:8080';

		this.fetch = this.fetch.bind(this);
		this.book = this.book.bind(this);
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

	/**
	 * Book a listing as a user
	 * @param {string} userId 
	 * @param {number} listingId 
	 * @param {string} startDate 
	 * @param {string} endDate 
	 */
	getBookings() {
		let headers;

		// Set Authorization header
		if (this.loggedIn()) {
			headers = {
				'Authorization' : `Bearer ${this.getToken()}`
			}
		}

		return fetch(`${this.domain}/bookings`, {
			headers
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				this.setBookings(response.bookings);

				return response;
			});
	}

	setBookings(bookings = []) {
		return this.bookings = bookings;
	}
}

export default BookingService;
