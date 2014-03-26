if (Meteor.isClient) {
  Template.user_loggedout.events({
  "click #loginfacebook": function(e, tmpl){
            Meteor.loginWithFacebook({
                requestPermissions: ['email','basic_info']
            }, function (err) {
                if(err) {
                    
                } else {
                    //show an alert
                    // alert('logged in');
                }
            });
        },
  "click #logingoogle": function(e, tmpl){
            Meteor.loginWithGoogle({
                requestPermissions: ['email']
            }, function (err) {
                if(err) {
                    
                } else {
                    //show an alert
                    // alert('logged in');
                }
            });
        },
});

Template.user_loggedin.events({
  "click #logout": function(e, tmpl) {
    Meteor.logout(function(err) {
      if(err) {
        //sow err message
      } else {
        //show alert that says logged out
        //alert('logged out');
      }
    });
  }
});
}

if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    if (user.services.google !== undefined) {
      var accessToken = user.services.google.accessToken,
            result,
            profile;

        result = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {"User-Agent": "Meteor/1.0"},

            params: {
                access_token: accessToken
            }
        });

        if (result.error)
            throw result.error;

        profile = _.pick(result.data,
            "name",
            "given_name",
            "family_name",
            "profile",
            "picture",
            "email",
            "email_verified",
            "birthdate",
            "gender",
            "locale",
            "hd");

        // console.log(profile);
        user.profile = profile;

        return user;
  }
else if (user.services.facebook !== undefined) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
}

});

}
