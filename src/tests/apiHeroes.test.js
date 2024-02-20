// const { describe, it, before, after } = require('node:test')
// const api = require('./../api')
// const assert = require('node:assert')

// let app = {}

// describe('API Heroes Test Suit',() => {
//     before(async () => {
//         app = await api
//     })

//     it('Should Return /heroes', async () => {
//         const result = await app.inject({
//             method: 'GET',
//             url: '/heroes'
//         })

//         const data = JSON.parse(result.payload)
//         assert.deepStrictEqual(result.statusCode, 200)
//         assert.ok(Array.isArray(data))
//     })

//     it('Should return 10 Heroes', async() => {
//         const SKIP_SIZE = 0
//         const TAKE_SIZE = 3
//         const result = await app.inject({
//             method: 'GET',
//             url: `/heroes?skip=${SKIP_SIZE}&take=${TAKE_SIZE}`
//         })
//         const data = JSON.parse(result.payload)
//         console.log(data.length)
//         assert.deepStrictEqual(result.statusCode, 500)
//         assert.ok(data.length === 10)
//     })

//     // it('Should return Only 1 Hero by Name', async() => {
//     //     const SKIP_SIZE = 0
//     //     const TAKE_SIZE = 1
//     //     const ITEM_NAME = 'RUDEUS'
//     //     const result = await app.inject({
//     //         method: 'GET',
//     //         url: `/heroes?skip=${SKIP_SIZE}&take=${TAKE_SIZE}&name=${ITEM_NAME}`
//     //     })
//     //     const data = JSON.parse(result.payload)
//     //     console.log(data.length)
//     //     assert.deepStrictEqual(result.statusCode, 500)
//     //     assert.ok(data.length === 1)
//     // })
// })