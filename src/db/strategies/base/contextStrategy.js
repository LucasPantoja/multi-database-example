class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }
    read(query) {
        return this._database.read(query)
    }
    update(id, item) {
        return this._database.update(id, item)
    }
    delete(id) {
        return this._database.delete(id)
    }
    isConnected() {
        return this._database.isConnected()
    }
    connect() {
        return this._database.connect()
    }
    disconnect() {
        return this._database.disconnect()
    }
}

module.exports = ContextStrategy