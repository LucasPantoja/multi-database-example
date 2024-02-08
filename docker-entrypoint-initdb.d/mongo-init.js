console.log('Creating User')
db = db.getSiblingDB("admin")
db.createUser(
    {
        user: 'johndoe',
        pwd: 'password',
        roles: [
            {
                role: 'readWrite',
                db: 'heroes'
            }
        ]
    }
)