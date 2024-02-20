class notImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception')
    }
}

class ICrud {
    create(item) {
        throw new notImplementedException()
    }
    read(query, skip, take) {
        throw new notImplementedException()
    }
    update(id, item) {
        throw new notImplementedException()
    }
    delete(id) {
        throw new notImplementedException()
    }
    isConnected() {
        throw new notImplementedException()
    }
    connect(model) {
        throw new notImplementedException()
    }
}

module.exports = ICrud