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
      // if is compound use & for connect
      const param = "naruto";
      chai.request(app)
        .get(`/api/videos?data=${param}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.items.should.be.a('array');
          response.body.items.length.should.be.eq(12);
        done();
        })
    });

    it('It should NOT GET all videos', (done) => {
      const param = "";
      chai.request(app)
        .get(`/api/videos?data=${param}`)
        .end((err, response) => {
          response.should.have.status(404);
        done();
        })
    })

  })
})