const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  describe('/GET all user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/user')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });

  let access_token = ''
  let user_id = ''
  let userData = {
    emailAddress: 'test@nomail.com',
    password: 'test',
    userName: 'testUser',
    accountNumber: 'account-777',
    identityNumber: 'identity-777',
  }

  describe('/POST register', () => {
      it('it should be able to register a user', (done) => {
        chai.request(server)
            .post('/user')
            .send(userData)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

  describe('/POST login', () => {
      it('it should be able to login with created user', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({
              emailAddress: userData.emailAddress,
              password: userData.password,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              access_token = res.body.access_token
              done();
            });
      });
  });

  describe('/GET user by username', () => {
      it('it should GET the user by username', (done) => {
        chai.request(server)
            .get(`/user/${userData.userName}?findBy=userName`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('emailAddress');
              res.body.should.have.property('userName');
              res.body.should.have.property('accountNumber');
              res.body.should.have.property('identityNumber');
              res.body.should.have.property('_id');
              user_id = res.body._id
              done();
            });
      });
  });
  describe('/GET user by account number', () => {
      it('it should GET the user by account number', (done) => {
        chai.request(server)
            .get(`/user/${userData.accountNumber}?findBy=accountNumber`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('emailAddress');
              res.body.should.have.property('userName');
              res.body.should.have.property('accountNumber');
              res.body.should.have.property('identityNumber');
              res.body.should.have.property('_id');
              done();
            });
      });
  });
  describe('/GET user by identity number', () => {
      it('it should GET the user by identity number', (done) => {
        chai.request(server)
            .get(`/user/${userData.identityNumber}?findBy=identityNumber`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('emailAddress');
              res.body.should.have.property('userName');
              res.body.should.have.property('accountNumber');
              res.body.should.have.property('identityNumber');
              res.body.should.have.property('_id');
              done();
            });
      });
  });

  describe('/PUT user', () => {
      it('it should update the user', (done) => {
        chai.request(server)
            .put(`/user/${user_id}`)
            .set('access_token', access_token)
            .send({
              accountNumber: 'ac-777'
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('msg');
              res.body.msg.should.eq('User Updated!');
              done();
            });
      });
  });

  describe('/delete user', () => {
      it('it should delete the user', (done) => {
        chai.request(server)
            .delete(`/user/${user_id}`)
            .set('access_token', access_token)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('msg');
              res.body.msg.should.eq('User Removed!');
              done();
            });
      });
  });

  
  
});