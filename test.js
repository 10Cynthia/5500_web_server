import chai from 'chai';
const expect = chai.expect;
import supertest from 'supertest';
import app from './app.js'; // Assuming your app is in a file named app.js

describe('YouTube-like Web Application', () => {
    let agent; // To persist the session across requests

    // Test Login/Logout functionality
    describe('Login/Logout', () => {
        it('should allow a user to log in with correct credentials', (done) => {
            supertest(app)
                .post('/login')
                .send({ username: 'user1', password: 'password1' })
                .expect(302) // Redirect on successful login
                .end((err, res) => {
                    if (err) return done(err);
                    agent = supertest.agent(app); // Persist the session
                    done();
                });
        });

        it('should reject login with incorrect credentials', (done) => {
            supertest(app)
                .post('/login')
                .send({ username: 'user1', password: 'wrongpassword' })
                .expect(302) // Redirect on failed login
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).to.contain('Incorrect username or password');
                    done();
                });
        });

        it('should allow a user to log out', (done) => {
            agent
                .get('/logout')
                .expect(302) // Redirect on logout
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    // Test User Profile functionality
    describe('User Profile', () => {
        it('should display the user profile page', (done) => {
            agent
                .get('/profile/user1') // Assuming '/profile/:username' is your profile route
                .expect(200) // Assuming a successful response code
                .end((err, res) => {
                    if (err) return done(err);
                    // Add more assertions based on your application's behavior
                    expect(res.text).to.contain('User Profile');
                    done();
                });
        });

        it('should allow users to follow other users', (done) => {
            agent
                .post('/follow/user2') // Assuming '/follow/:username' is your follow route
                .expect(302) // Redirect after following
                .end((err, res) => {
                    if (err) return done(err);
                    // Add more assertions based on your application's behavior
                    expect(res.text).to.contain('You are now following user2');
                    done();
                });
        });
    });

    describe('Video Comment Functionality', () => {
        let agent; // To persist the session across requests
    
        before((done) => {
            // Log in before running the tests
            supertest(app)
                .post('/login')
                .send({ username: 'user1', password: 'password1' })
                .expect(302) // Redirect on successful login
                .end((err, res) => {
                    if (err) return done(err);
                    agent = supertest.agent(app); // Persist the session
                    done();
                });
        });
    
        after((done) => {
            // Log out after running the tests
            agent
                .get('/logout')
                .expect(302) // Redirect on logout
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    
        it('should allow a user to add a video comment', (done) => {
            const videoID = 'testVideoID';
            const newVideoComment = { /* Define your new comment data */ };
    
            agent
                .post(`/api/videos/${videoID}/addcomment`)
                .send(newVideoComment)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).to.contain(/* Add assertions based on your application's behavior */);
                    done();
                });
        });
    
        it('should allow a user to update their video comment', (done) => {
            const cid = 'testCommentID';
            const updatedVideoComment = { /* Define your updated comment data */ };
    
            agent
                .put(`/api/videos/updatecomment/${cid}`)
                .send(updatedVideoComment)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).to.contain(/* Add assertions based on your application's behavior */);
                    done();
                });
        });
    
        it('should allow a user to delete their video comment', (done) => {
            const cid = 'testCommentID';
    
            agent
                .delete(`/api/videos/deletecomment/${cid}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).to.contain(/* Add assertions based on your application's behavior */);
                    done();
                });
        });
    });   
});
