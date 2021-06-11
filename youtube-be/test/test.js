let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');

// Assertion
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {
  // GET VIDEOS TEST
  describe("GET /api/videos", () => {
    it('It should GET all videos', (done) => {
      chai.request(app)
        .get("/api/videos?data=naruto&shippuden")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.items.should.be.a('array');
          response.body.items.length.should.be.eq(12);
        done();
        })
    });

    it('It should NOT GET all videos', (done) => {
      chai.request(app)
        .get("/api/videos?data=")
        .end((err, response) => {
          response.should.have.status(404);
        done();
        })
    })

  })
})