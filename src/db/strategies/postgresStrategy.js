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

    async create(item, model) {
        return await this.prisma[model].create({data:item})
    }

    async read(item = {}, model) {
        if(typeof item === 'object') {
            return await this.prisma[model].findMany()
        }
        return await this.prisma[model].findMany({
            where: {
                name: item
            }
        })
    }

    async update(id, item, model) {
        if(model === 'heroes') {
            const {itemId, name, power, createdAt} = item
            return await this.prisma[model].update({
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
        return false
    }

    async delete(id = {}, model) {
        if(typeof id === 'object') {
            return this.prisma[model].deleteMany({})
        }
        return this.prisma[model].delete({where:{id}})
        
    }
}

module.exports = PostgresStrategy