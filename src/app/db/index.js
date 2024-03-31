/* eslint-disable unicorn/prefer-add-event-listener */

class DBRequest {
	#request;

	/**
	 * @param {string} databaseName
	 * @param {number} version
	 */
	constructor(databaseName, version) {
		this.#request = indexedDB.open(databaseName, version);
		this.#setHandlers();
	}

	#setHandlers() {
		// error handler
		this.#request.onerror = event => {
			console.error('IndexDBが無効です。');
		};

		// success handler
		this.#request.onsuccess = event => {
			/** @type {IDBDatabase} */
			const db = event.target.result;
			// common error handler
			db.onerror = event => {
				console.error(`IndexedDB error: ${event.target.errorCode}`);
			};
		};

		return this;
	}
}

export class DB {
	#objectStoreNameToFactoryStore = new Map();

	/**
	 * @param {string} name
	 * @param {number} [version]
	 */
	constructor(name, version) {
		const request = new DBRequest(name, version);
		request.onupgradeneeded = event => {
			/** @type {IDBDatabase} */
			const db = event.target.result;

			/**
			 * Step1. Create ObjectStore
			 */

			// 顧客の情報を保存する objectStore を作成します。
			// "ssn" は一意であることが保証されています - 少なくとも、キックオフミーティングで
			// そのように言われました。なので、キーパスとして使用します。
			const objectStore = db.createObjectStore('customers', {keyPath: 'ssn'});

			// 顧客データがどのようなものかを示します
			const customerData = [
				{
					ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com',
				},
				{
					ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org',
				},
			];

			// 顧客を名前で検索するためのインデックスを作成します。
			// 重複する可能性がありますので、一意のインデックスとしては使用できません。
			objectStore.createIndex('name', 'name', {unique: false});

			// 顧客をメールアドレスで検索するためのインデックスを作成します。2 人の顧客が同じメールアドレスを
			// 使用しないようにしたいので、一意のインデックスを使用します。
			objectStore.createIndex('email', 'email', {unique: true});

			// データを追加する前に objectStore の作成を完了させるため、
			// transaction oncomplete を使用します。
			objectStore.transaction.oncomplete = event => {
				/**
				 * Step2. Data Migration
				 */

				// 新たに作成した objectStore に値を保存します。
				const customerObjectStore = db
					.transaction('customers', 'readwrite')
					.objectStore('customers');
				for (const customer of customerData) {
					customerObjectStore.add(customer);
				}
			};
		};
	}
}

export function play() {
	const db = new DB('test', 1);
	console.log(db);
}
