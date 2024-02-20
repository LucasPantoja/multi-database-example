const { PrismaClient } = require('@prisma-postgres/client')
const ICrud = require('../interfaces/ICrud')

class PostgresStrategy extends ICrud {
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
        return await this.prisma[this.model].findMany({ skip, take, where: { name: item } })
    }

    async update(id, item) {
        return await this.prisma[this.model].update({ where: { id }, data: item })
    }

    async delete(id) {
        if(id === undefined) {
            return this.prisma[this.model].deleteMany({})
        }
        return this.prisma[this.model].delete({where:{id}})
    }
    
}

module.exports = PostgresStrategy