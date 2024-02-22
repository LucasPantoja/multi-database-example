class HeroesService {
    constructor(repository) {
        this._database = repository
    }

    create(item) {
        return this._database.create(item)
    }
    read(query, skip, take) {
        return this._database.read(query, skip, take)
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
    connect(model) {
        return this._database.connect(model)
    }
    disconnect() {
        return this._database.disconnect()
    }
}

module.exports = HeroesService