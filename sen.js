Hobbies = new Meteor.Collection("hobbies");
Posts =new Meteor.Collection("posts");
Videoposts=new Meteor.Collection("videoposts");


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  after: function () {
        Session.set('hash', this.params.hash);
    },
});




Router.map(function() {
  this.route('home', {path: '/'});
  this.route('home');
  this.route('contact');
  this.route('test');
  this.route('editpost');
  this.route('pagepost');
  this.route('newpost', {
  path: '/:hobbyname/newpost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });

  this.route('posts');


  this.route('newvideopost', {
  path: '/:hobbyname/newvideopost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });




  this.route('hobbymain', {
  path: '/:hobbyname/main',
  waitOn:function(){
    pageno=0;
    vpageno=0;
    postssuscribed=Meteor.subscribe('getposts', this.params.hobbyname,pageno);
    videopostssuscribed=Meteor.subscribe('getvideoposts', this.params.hobbyname,vpageno);
    return [Meteor.subscribe('hobbylist'),postssuscribed,videopostssuscribed];
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });


  this.route('user', {
  path: '/user/:userid',
  data: function (){
    userid  = this.params.userid;
    templateData = {
      userid: userid,
        };
    return templateData;  },  });

  this.route('notFound', {
  path: '*'
});

})



if (Meteor.isClient) {
 
   Meteor.startup(function () {
    
  });

   
   
   Meteor.methods({
     showsignin: function () {
    var boxContentString ="Please sign in to continue";
   boxer=bootbox.dialog(boxContentString);
  }
});






Template.hobbymain.rendered = function() {
   
   



    $("html,body").animate({scrollTop: 0},500);
   /* var example = Popcorn.youtube(
           '#video',
           'http://www.youtube.com/watch?v=CxvgCLgwdNk' );
 
         // add a footnote at 2 seconds, and remove it at 6 seconds
         example.footnote({
           start: 2,
           end: 6,
           text: "Pop!",
           target: "footnotediv"
         });
 
         // play the video right away*/
        




    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: $("html,body").animate({scrollTop: 0},500);
        break;

        case 39: // right
        break;

        case 40:  $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    var showheading=50;
    var showChar = 100;
    var ellipsestext = "...";
    $('.more').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar-1, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext;
            $(this).html(html);
        }
 
    });
    $(".headermore").each(function() {

        var content = $(this).html();
 
        if(content.length > showheading) {
            
            var c = content.substr(0, showheading);
            var h = content.substr(showheading-1, content.length - showheading);
            var html = c + '<span class="moreellipses">' + ellipsestext;
            $(this).html(html);
        }
 
    });

}
Template.contact.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
}
Template.user.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
}




 Template.header.events({
    'click #signin' : function () {
     
  
  var boxContentString =$('#modal-content').html();
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




 
 Meteor.subscribe("userData");
 Meteor.subscribe("hobbies");
 


  Template.hobbymain.events({
  "click #suscribe": function(e, tmpl) {
    Meteor.call('addhobby',this.hobbyid);
       },
  "click #previous": function(e, tmpl) {
         

         if(pageno!=0)
         {
            pageno=pageno-1;
            postssuscribed.stop();
            postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
         }
         
         
         
       },
  "click #next": function(e, tmpl) {
       
       //$('#previous').show();
       pageno=pageno+1;
       
       postssuscribed.stop();
       postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
       
       },
  "click #vprevious": function(e, tmpl) {
         

         if(vpageno!=0)
         {
            vpageno=vpageno-1;
            videopostssuscribed.stop();
            videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
         }
         
         
         
       },
  "click #vnext": function(e, tmpl) {
       
       //$('#previous').show();
       vpageno=vpageno+1;
       
       videopostssuscribed.stop();
       videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
       
       },




  "click #unsuscribe": function(e, tmpl) {
     
     
    Meteor.call('removehobby',this.hobbyid);
       },
  "click #navigator": function(e, tmpl){
         $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');

          
        },

    

   });


 Template.newvideopost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/'+hobbyname+'/main';}   // esc
});
}
  
  Template.newpost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
           alert("No heading of post found!!!!");
           return false;
         }
         if(y==null || y=="")
        {
          alert("No url found");
          return false;
        }
        if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
          
          
          Meteor.call('addpost',this.hobbyid,x,y);
          window.location = '/'+this.name+'/main';
          return true;
        }
        else
        {
          alert('You are not suscribed!!');
          return false;
        }

          
        },

    

   });






  Template.newpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/'+hobbyname+'/main';}   // esc
});
}

  Template.newvideopost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
           alert("No heading of post found!!!!");
           return false;
         }
         if(y==null || y=="")
        {
          alert("No data found :(");
          return false;
        }
        if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
            var url=y;
            if (url.indexOf('youtube.com') > -1) {
            
                   var id = url.split('v=')[1].split('&')[0];
                if (!id) {
                      alert("Not a valid youtube url");
                      return false;
                }
                var m=('http://i1.ytimg.com/vi/'+id+'/hqdefault.jpg');
                Meteor.call('addvideopost',this.hobbyid,x,y,m);
                window.location = '/'+this.name+'/main';
                return true;}
           else
           {
             alert("Not a valid youtube url");
             return false;
           }
          
          
        }
        else
        {
          alert('You are not suscribed!!');
          return false;
        }

          
        },

    

   });   




  Template.hobbymain.helpers({
    checkhobby: function() {
      if(this.hobbyid==undefined)
        return false;
      else
       return !_.contains(Meteor.user().suscribed,this.hobbyid);
      
    },
    filterpost: function() {
      
         return Posts.find();
    },
    filtervideopost: function() {
      
         return Videoposts.find();
    },


  })

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

  $("html,body").animate({scrollTop: 0},1000);
  $(document).keydown(function(e) {
    switch(e.which) {
        /*case 37: // left
        break;*/

        case 38: $("html,body").animate({scrollTop: 0},500);
        break;

      /*  case 39: // right
        break;

        case 40:  $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');
        break;*/

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    }); 
  
 
  
   
  $(".dropdown-menu li a").mousedown(function() {
    var dropdown = $(this).parents('.dropdown');
    var link = dropdown.children(':first-child');
    link.css('background-color', "#2E3436");
    link.css('color', 'white');
  });
 
  $('.carousel').carousel({
      interval: 4000
   });
};

 



  Template.test.events({
  "click #hi": function(e, tmpl){
          /* alert("you clicked");
            $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
    $("#div3").fadeIn("slow");*/
         $('html, body').animate({
        scrollTop: $("#div5").offset().top+230
    }, 1000);
          
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
  },
  addhobby: function (hobbyid) {
    
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $addToSet: {
        
        suscribed : hobbyid

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  removehobby: function (hobbyid) {
    
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $pull: {
        
        suscribed : hobbyid

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  addpost: function (hobbyid,topic,data) {
    Posts.insert({hobbyid:hobbyid,data:data,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  },
  addvideopost: function (hobbyid,topic,url,picurl) {
    Videoposts.insert({hobbyid:hobbyid,url:url,picurl:picurl,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  }








});

 Meteor.publish("getposts",function(hobbyname,pageNumber){
    var raceCursor = Hobbies.find({name:hobbyname});
var races = raceCursor.fetch();
 var hobbyid;
for (var i=0; i<races.length; i++) {
    console.log( races[i].raceName );
    hobbyid=races[i].hobbyid;
}
    var returnCursor=Posts.find({hobbyid:hobbyid},{sort:{timeval: -1},limit:8,skip:(pageNumber*8)});
    return returnCursor;
 });

 Meteor.publish("getvideoposts",function(hobbyname,pageNumber){
    var raceCursor = Hobbies.find({name:hobbyname});
var races = raceCursor.fetch();
 var hobbyid;
for (var i=0; i<races.length; i++) {
    console.log( races[i].raceName );
    hobbyid=races[i].hobbyid;
}
    var returnCursor=Videoposts.find({hobbyid:hobbyid},{sort:{timeval: -1},limit:8,skip:(pageNumber*8)});
    return returnCursor;
 });








 Meteor.publish("hobbies", function () {
  return Hobbies.find();
});



 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'count':1}});
  } else {
    this.ready();
  }
});

  Meteor.publish("hobbylist", function() {
    if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'suscribed':1}});
  } else {
    this.ready();
  }
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
        user.suscribed=[];
        user.count= 0;
        return user;
  }
else if (user.services.facebook !== undefined) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
        
    }
    user.suscribed=[];
    user.count= 0;
    return user;
}
else if (user.services.twitter !== undefined) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.suscribed=[];
    user.count= 0;
    return user;
}
    
});

}
