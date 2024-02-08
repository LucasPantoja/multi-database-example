const { PrismaClient } = require('@prisma-postgres/client')
const ICrud = require('./interfaces/ICrud')

class PostgresStrategy extends ICrud {
    constructor() {
        super()
        this.prisma = null
    }

    connect() {
        this.prisma = new PrismaClient()
    }

    async isConnected() {
        return await this.prisma.$queryRaw`SELECT 1` ? true: false
    }

    async create(item) {
        return await this.prisma.heroes.create({data: item})
    }

    async read(item = {}) {
        if(typeof item === 'object') {
            return this.prisma.heroes.findMany()
        }
        return await this.prisma.heroes.findMany({
            where: {
                name: item
            }
        })
    }

    async update(id, item) {
        const {itemId, name, power, createdAt} = item
        return await this.prisma.heroes.update({
            where: {
                id
            },
            data: {
                id: itemId,
                name,
                power,
                createdAt
            }
        })
    }

    async delete(id = {}) {
        if(typeof id === 'object') {
            return this.prisma.heroes.deleteMany({})
        }
        return this.prisma.heroes.delete({where:{id}})
        
    }
}

module.exports = PostgresStrategy