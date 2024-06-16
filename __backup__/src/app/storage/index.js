
class StorageConfig {
	dataPath = null;
}

class Storage {
	config = new StorageConfig();

	/**
	 * @param {string} dataPath
	 */
	constructor(dataPath) {
		this.config.dataPath = dataPath;
	}

	/**
	 * @param {StorageConfig} config
	 */
	configure(config = {}) {
		Object.assign(this.config, config);
		return this.config;
	}

	async query() {}

	async get() {}

	async create() {}

	async update() {}

	async delete() {}
}

const storage = new Storage();

export {storage};
export default storage;
