/**
 * Server implemented by Node.js.
 */

var express = require("express"),
    logging = require("node-logentries"),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    api     = require("./services/users"),
    booking     = require("./services/booking"),
    pt = require("./services/pt"),
    email   = require("./services/email"),
    sms     = require("./services/sms"),
    calendar = require("./services/calendar"),
    config = require('./services/config');

var calendarTest = require('./services/calendarTest');

/* express obj */
var app = module.exports = express();
app.configure(function(){
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});


var log = logging.logger({
    token:'31b1c7f2-baca-4425-9014-4cf66a08fbd8'
});


/**
 * Passport authentication framework for Google Calendar.
 */

passport.use(new GoogleStrategy({
        clientID: config.consumer_key,
        clientSecret: config.consumer_secret,
        callbackURL: "http://codebuilders.herokuapp.com/auth/callback",
        scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
    },
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        return done(null, profile);
    }
));


/* Calendar authentication services. */
app.get('/auth',
    passport.authenticate('google', { session: false }));

app.get('/auth/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    function(req, res) {
        req.session.access_token = req.user.accessToken;
        // Gets the email from request.
        var userEmail = req.user._json.email;
        // If user email is not the valid gmail, go to the index
        // and display the alert information.
        if (userEmail != 'codebuilders112@gmail.com') {
            res.redirect("/#/alert");
        } else {
            // Is a valid therapist, go to therapist page.
            res.redirect('/#/pt');
        }
    });


/* Calendar services test. */
app.get("/calendar/insert", calendarTest.add);

app.get("/calendar/remove", calendarTest.remove);


/* REST routes for User CRUD Service */
app.get("/api/users", api.users);
app.get("/api/users/:id", api.user);
app.post("/api/users", api.createUser);
app.put("/api/users/:id", api.updateUser);
app.delete("/api/users/:id", api.destroyUser);

/* PT confirms a request */
app.post("/pt/confirmRequest/:request_id", pt.confirmRequest);
app.get("/pt/confirmRequest/:request_id", pt.confirmRequest);
app.get("/pt/getPendingRequests/:date", pt.getPendingRequests);
app.get("/pt/getPTSlotsInfo/:date", pt.getPTSlotsInfo);


/* PT declines a request */
app.post("/pt/declineRequest/:request_id", pt.declineRequest);


/* REST routes for booking Service */
app.get("/booking/available_slots/:date", booking.getBookedSlots);
app.post("/booking/make_appointment", booking.makeAppointment);

/* Email Service */
app.post("/api/email", email.send);

/* Text Service */
app.post("/api/sms", sms.send);

/* Calendar Service */
app.get('/auth',
    passport.authenticate('google', {session: false }));

app.get('/auth/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    function(req, res) {
        req.session.access_token = req.user.accessToken;
        res.redirect(req.session.redirectTo);
});

/* Start the server */
app.listen(process.env.PORT || 8000, function(){
    console.log("App started listening on port %d in %s mode", this.address().port, app.settings.env);
    log.info("Server restarted: "+new Date());
});
