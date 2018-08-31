const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

  describe('#add', () => {
    it('should add two numbers', () => {
      var result = utils.add(33,11);

      expect(result)
      .toBe(44, `Expected 44, but got ${result}`)
      .toBeA('number');

      // if (result !== 44) {
      //   throw new Error(`Expected 44, but got ${result}`);
      // }
    });
  })

  it('should square the number', () => {
    var result = utils.square(7);
      expect(result)
      .toBe(49, `Expected 49, but got ${result}`)
      .toBeA('number');
    // if (result !== 49) {
    //   throw new Error(`Expected 49, but got ${result}`);
    // }
  });

  it('should expect some values', () => {
    //expect(12).toNotBe(11);
    expect({country: 'Canada'}).toEqual({country: 'Canada'});
    expect({country: 'Canada'}).toNotEqual({country: 'canada'});
    expect([2,3,4]).toInclude(3);
    expect([2,3,4]).toExclude(5);
    expect({
      name: 'Udemy',
      course: 'NodeJS',
      lectures: 12
    }).toInclude({
      lectures: 12
    }).toExclude({
      course: 'ReactJS'
    })
  });

  it('should verify first names and last names on set', () => {
    var testUser = { firstName : '', lastName: '' };
    var testUser2 = { age : 37, country: 'Norway' };
    var fullName = 'Jane Doe';
    testUser = utils.setName(testUser,fullName);
    testUser2 = utils.setName(testUser2,fullName);

    expect(testUser)
    .toExist()
    .toBeA('object')
    .toEqual({
      firstName: 'Jane',
      lastName: 'Doe'
    });
    expect(testUser2)
    .toExist()
    .toBeA('object')
    .toInclude({
      firstName: 'Jane',
      lastName: 'Doe'
    });
  });

  describe('Async function test', () => {
    //Mocha will wait until done is called
    it('should async add two numbers', (done) => {
      utils.asyncAdd(4,3, (sum) => {
        expect(sum)
        .toBeA('number')
        .toEqual(7);
        done();
      });
    })

    it('should async square a number', (done) => {
      utils.asyncSquare(8, (square) => {
        expect(square)
        .toBeA('number')
        .toEqual(64);
        done();
      });
    })
  })

})
