class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item, model) {
        return this._database.create(item, model)
    }
    read(query, model) {
        return this._database.read(query, model)
    }
    update(id, item, model) {
        return this._database.update(id, item, model)
    }
    delete(id, model) {
        return this._database.delete(id, model)
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