class notImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception')
    }
}

class ICrud {
    create(model, item) {
        throw new notImplementedException()
    }
    read(model, query) {
        throw new notImplementedException()
    }
    update(model, id, item) {
        throw new notImplementedException()
    }
    delete(model, id) {
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