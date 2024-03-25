const { PrismaClient } = require('@prisma-postgres/client')
const IHeroes = require('../interfaces/IBase')

class PostgresRepository extends IHeroes {
    constructor() {
        super()
        this.prisma = null
        this.model = null
    }

    connect(model) {
        this.prisma = new PrismaClient({errorFormat: 'pretty'})
        this.model = model
    }

    async isConnected() {
        return await this.prisma.$queryRaw`SELECT 1` ? true: false
    }

    async create(item) {
        return await this.prisma[this.model].create({data:item})
    }

    async read(item, skip = 0, take = 10) {
        if(this.model === 'heroes')
            return await this.prisma[this.model].findMany({ skip, take, where: { name: item } })
        return await this.prisma[this.model].findUnique({ where: { username: item } })
    }

    async update(id, item, upsert = false) {
        if(!upsert)
            return await this.prisma[this.model].update({ where: { id }, data: item })
        return await this.prisma[this.model].upsert({
                                                where: { username: item.username }, 
                                                update: { username: item.username, password : item.password },
                                                create: { username: item.username, password : item.password }})
    }

    async delete(id) {
        if(id === undefined) {
            return this.prisma[this.model].deleteMany({})
        }
        return this.prisma[this.model].delete({where:{id}})
    }
    
}

module.exports = PostgresRepository