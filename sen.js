Hobbies = new Meteor.Collection("hobbies");
 

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('home');
  this.route('contact');
})



if (Meteor.isClient) {
 
   Meteor.startup(function () {
   Session.set('data','<html><head><script type="text/javascript">function init(){var button = document.getElementById("twitterbutton");if(button.addEventListener){button.addEventListener("click", function() {Meteor.loginWithTwitter({equestPermissions: ["email"]}, function (err) {if(err) {} else {Meteor.call("incrementcount",Meteor.userId(),function(error, affectedDocs) {if (error) {console.log(error.message);} else {}});}});}, false);}else if(button.attachEvent){button.attachEvent("onclick", function() { alert("alert");});}};if(window.addEventListener){window.addEventListener("load", init, false);}else if(window.attachEvent){window.attachEvent("onload", init);} else{document.addEventListener("load", init, false);}</script></head><body><h4><i class="icon-thumbs-up"></i> Sign in with third party account</h4><ul class="signin-with-list"><li><a class="btn-twitter" id="twitterbutton"><i class="icon-twitter icon-large"></i>Signin with Twitter</a></li></body></html>');
 });





 Template.header.events({
    'click #signin' : function () {
     
  
  var boxContentString =$('#modal-body').html();
   box=bootbox.dialog(boxContentString/*,[
     
    {
        "label" : "login with twitter",
        "class" : "icon-twitter icon-large",
        "callback": function(e){
           Meteor.loginWithTwitter({
                
                requestPermissions: ['email']

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
            //do stuff
        }   
    },
    {
        "label" : "Button 2",
        "callback": function(e){
            //do stuff
        }
    }
]*/

);

    Session.set('box',r);
   }
   
  });




 Meteor.subscribe("messages");
 Meteor.subscribe("userData");
  Template.header.events({
  "click #logout": function(e, tmpl) {
    Meteor.logout();
       }
   });
  
  Template.home.helpers({
   resthobbies: function() {
      return Hobbies.find( { first : { $exists : false } } );
    
    },
    hobbies: function() {
      return Hobbies.find();
    
    },
    firsthobby: function() {
      return Hobbies.find( { first : { $exists : true } } );
    
    },
    checkfirst:function(){
      if(carouselIndex==0)
      {
        carouselIndex==1;
        return true;
      }
      else
        return false;
    }
  })
 /*Template.home.firsttimelogin=function(){
       console.log('here');
        var p=Meteor.users.findOne({_id:Meteor.userId()});

    return p.count==1; 
      });
*/

 


  Template.home.rendered = function () {

  Session.set('data',Template.signin.data);
  console.log(Template.signin.data);
   
  $("document").ready(function() {
 
  
   
  $(".dropdown-menu li a").mousedown(function() {
    var dropdown = $(this).parents('.dropdown');
    var link = dropdown.children(':first-child');
    link.css('background-color', "#2E3436");
    link.css('color', 'white');
  });
 
  $('.carousel').carousel({
      interval: 4000
   });
   $('.left carousel-control').click();  


});
};

 



  Template.test.events({
  "click #hi": function(e, tmpl){
           alert("you clicked");
            $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
    $("#div3").fadeIn("slow");
          
        },

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
else if (user.services.twitter !== undefined) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.count= 0;
    return user;
}
    
});

}
