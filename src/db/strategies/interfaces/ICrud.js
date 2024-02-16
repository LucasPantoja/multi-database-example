class notImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception')
    }
}

class ICrud {
    create(item, model) {
        throw new notImplementedException()
    }
    read(query, model) {
        throw new notImplementedException()
    }
    update(id, item, model) {
        throw new notImplementedException()
    }
    delete(id, model) {
        throw new notImplementedException()
    }
    isConnected() {
        throw new notImplementedException()
    }
    connect() {
        throw new notImplementedException()
    }
}

module.exports = ICrud