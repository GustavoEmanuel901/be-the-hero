const generateUniqueId = require('../../src/utils/genereteUniqueId')

describe('Generate Unique ID', () =>{
    it('should generate an unique id', () =>{
        const id = generateUniqueId();

        expect(id).toMaveLength(8)
    })
})