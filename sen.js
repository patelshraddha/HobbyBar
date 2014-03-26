


Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {path: '/'});
})



if (Meteor.isClient) {
 Meteor.subscribe("messages");
 Meteor.subscribe("userData");
 
 Template.content.firsttimelogin=function(){
       console.log('here');
        var p=Meteor.users.findOne({_id:Meteor.userId()});

    return p.count==1;
}
 




  Template.user_loggedout.events({
  "click #loginfacebook": function(e, tmpl){
         
            Meteor.loginWithFacebook({
                requestPermissions: ['email','basic_info']
            }, function (err) {
                if(err) {
                    
                } else {
                     Meteor.call("incrementcount",Meteor.userId(),function(error, affectedDocs) {
                     if (error) {
                            console.log(error.message);
                     } else {
                         // Do whatever
                            }
                     });
                    //show an alert
                    // alert('logged in');
                }
            });
           
        },
  "click #logingoogle": function(e, tmpl){
            
            Meteor.loginWithGoogle({
                
                requestPermissions: ['email']
                //Meteor.users.update({_id:Meteor.userId()}, {$inc:{count: 1}});
            }, function (err) {
                if(err) {
                        
                } else {
                    Meteor.call("incrementcount",Meteor.userId(),function(error, affectedDocs) {
                     if (error) {
                            console.log(error.message);
                     } else {
                         // Do whatever
                            }
                     });
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

  Meteor.methods({
  incrementcount: function (userId) {
    console.log('Here');
    Meteor.users.update({
      _id: userId
    }, {
      $inc: {
        
        'count' : 1

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  }
});




 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'count':1}});
  } else {
    this.ready();
  }
});

  Meteor.publish("messages", function() {
    return Meteor.users.find();
});
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
        user.count= 0;
        return user;
  }
else if (user.services.facebook !== undefined) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    user.count= 0;
    return user;
}
    
});

}
