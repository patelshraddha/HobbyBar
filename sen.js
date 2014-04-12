Hobbies = new Meteor.Collection("hobbies");
Posts =new Meteor.Collection("posts");
Videoposts=new Meteor.Collection("videoposts");
Comments=new Meteor.Collection("comments");



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

  this.route('loading');
  

  this.route('user', {
  path: '/user/:userid',
  waitOn:function(){
            var hobbylist=Meteor.subscribe("hobbylist");
             postlist=Meteor.subscribe("userposts",this.params.userid);
             post=Meteor.subscribe("posthobby",0);
        video=Meteor.subscribe("videohobby",0);
             videolist=Meteor.subscribe("uservideos",this.params.userid);
            return [hobbylist,postlist,videolist,post,video];
        },
  data: function (){
    userid=this.params.userid;
     }  });


  this.route('newpost', {
  path: '/:hobbyname/newpost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });

  



  



  this.route('newvideopost', {
  path: '/:hobbyname/newvideopost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });



  this.route('displaypost', {
  path: '/Posts/:postid',
  waitOn:function(){
            postid=this.params.postid;
            postdetails=Meteor.subscribe("displaypost",postid);
            commentdetails=Meteor.subscribe('getcomments',postid);
            return [postdetails,commentdetails];
        },
  data: function (){
    var hobbyid;
    var hobby;
    Posts.find().forEach(function(myDoc) {hobbyid=myDoc.hobbyid}); 
    Hobbies.find({hobbyid:hobbyid}).forEach( function(myDoc) {hobby=myDoc.name} );
    hobbyname=hobby;
    return Posts.findOne(); }  });

  this.route('displayvideo', {
  path: '/VideoPosts/:videoid',
  waitOn:function(){
            videoid=this.params.videoid;
            videodetails=Meteor.subscribe("displayvideo",videoid);
            return [videodetails];
        },
  data: function (){
    var hobbyid;
    var hobby;
    var urler;

    Videoposts.find().forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
    Videoposts.find().forEach(function(myDoc) {urler=myDoc.url}); 
    Hobbies.find({hobbyid:hobbyid}).forEach( function(myDoc) {hobby=myDoc.name} );
    hobbyname=hobby;
    url=urler;
    return Videoposts.findOne(); }  });

 





  this.route('editpost', {
  path: '/Posts/:postid/Editpost',
  waitOn:function(){
            postid=this.params.postid;
            postdetails=Meteor.subscribe("displaypost",postid);
            return [postdetails];
        },
  data: function (){
   
    return Posts.findOne(); }  });

  

  


  this.route('hobbymain', {
  path: '/:hobbyname/main',
  waitOn:function(){
    
    postssuscribed=Meteor.subscribe('getposts', this.params.hobbyname,0);
    videopostssuscribed=Meteor.subscribe('getvideoposts', this.params.hobbyname,0);
    return [Meteor.subscribe('hobbylist')];
        },
  data: function (){
     pageno=0;
    vpageno=0;
    Session.set('pageno',pageno);
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });


  

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
  

  

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: $("html,body").animate({scrollTop: 0},500);
        break;

        case 39: // right
        break;

        /*case 40:  $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');
        break;*/

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    postcount=-1;
    videocount=-1;
    if(hobbyname!=undefined)
    {
      
      
      Meteor.call('getpostpages',hobbyname, function(err, data) {
  if (err)
    console.log(err);
    Session.set('postcount',data);
    if(Session.get('postcount')==0)
     {
        $('#posts').hide();
      }
      else
      {
        $('#posts').show();
      }
      
   });
      Meteor.call('getvideopages',hobbyname, function(err, data) {
  if (err)
    console.log(err);
    videocount=data;
    if(videocount==0)
     {
        $('#videoposts').hide();
      }
      else
      {
        $('#videoposts').show();
      }
   });


    
   if(Session.get('pageno')==0)
{
  alert(Session.get('pageno'));
          $('#previous').hide();
 }
    else
    {
      alert(Session.get('pageno'));
      $('#previous').show();
}
 /*
    if(Session.get('pageno')==(Session.get('postcount')-1))
        $('#next').hide();
    else
      $('#next').show();*/
 
          
    }
    
    





    /*if($('.more').get().length==0)
    {
      console.log('True');
    }
    else
    {
      console.log('False');
    }*/
    /*$('.more').each(function(i, obj) {
      // console.log($(obj).html());
    });*/
    /*if(log.length==1)
    {
    console.log("yes");   
    }
    else
    {
      console.log("false");
    }

    /*var showheading=50;
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
 
    });*/

}




Template.contact.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
}
Template.user.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  count=0;
  countall=0;
  if(userid!=Meteor.userId())
  {
    $('.holo').hide();
  }
  $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
    if(userid!=undefined)
  {
    $('#dropdown').hide();
    $('#dropdownall').hide();
  }

}
  Template.user.helpers({
    diffuser: function() {
         if(this.userid!=undefined)
         {
         return (this.userid==Meteor.userId());
       }
    },
    name: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.name});
           return name;
    },
    timestamp: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.createdAt});
           return name;
    },
    email: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.email});
           return name;
    },
    filterpost: function() {
      
      return Posts.find();

    },
    filtervideopost: function() {
      return Videoposts.find();
         
    },
    subscribed: function() {

       var subscribed;
       Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {subscribed=myDoc.suscribed});
       if(subscribed!=undefined)
       {
       return  Hobbies.find({hobbyid:{$in:subscribed}});
     }
    },
    all: function() {
       return  Hobbies.find();
    },


  })

 Template.user.events({
  "click #profile": function(e, tmpl) {
    $('#profilecontent').show();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
     $('#hobbycontent').hide();
       },
  "click .hobbypage": function(e, tmpl) {
        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        post=Meteor.subscribe("posthobby",this.hobbyid);
        video=Meteor.subscribe("videohobby",this.hobbyid);
        $('#hobbycontent').show();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
     $('#profilecontent').hide();

       },
  "click #drop": function(e, tmpl) {
       if((count%2)==0)
       {
         $('#dropdown').show();
        count++;
       }
       else
       {
         $('#dropdown').hide();
        count--;
       }
       },
  "click #dropall": function(e, tmpl) {
       if((countall%2)==0)
       {
         $('#dropdownall').show();
        countall++;
       }
       else
       {
         $('#dropdownall').hide();
        countall--;
       }
       },
  "click #feedback": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').show();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
       },
  "click #posts": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').hide();
   $('#postcontent').show();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        postlist=Meteor.subscribe("userposts",this.userid);
        videolist=Meteor.subscribe("uservideos",this.userid);
       },
    "click #comments": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').show();
    $('#hobbycontent').hide();
       }, 

   });


Template.displaypost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);


}

Template.displayvideo.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  
  var example = Popcorn.youtube(
           '#video',url );
 
         // add a footnote at 2 seconds, and remove it at 6 seconds
         example.footnote({
           start: 2,
           end: 6,
           text: "Pop!",
           target: "footnotediv"
         });
  

}

Template.editpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);

}


 Template.header.events({
    'click #signin' : function () {
      var boxContentString =$('#modal-content').html();
    bootbox.dialog({message: boxContentString});


    


    
   }
   
  });


Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});

 
 Meteor.subscribe("userData");
 Meteor.subscribe("hobbies");
 Meteor.subscribe("users");
 


  Template.hobbymain.events({
  "click #suscribe": function(e, tmpl) {
    Meteor.call('addhobby',this.hobbyid);
       },
  "click #previous": function(e, tmpl) {
         
            pageno=pageno-1;
            postssuscribed.stop();
            postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
            Session.set('pageno',pageno);
         
         
         
       },
  "click #next": function(e, tmpl) {
      
       pageno=pageno+1; 
       postssuscribed.stop();
       postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
       Session.set('pageno',pageno);
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
  
Template.displaypost.events({            // check this once  -----Roshni
  
  "click #comment": function(e, tmpl){
         var x=$('#data').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No comment added!!!!</h3>", function() {
          });
          
           return false;
         }
        
          if(postid!=undefined)
          {
            $('#data').val("");
          Meteor.call('addcomment',postid,x);

           }

          
        },

    

   });

//---------------------------

  Template.newpost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!</h3>", function() {
          });
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
          bootbox.alert("<h3>You are not subscribed!!!!</h3>", function() {
          });
         
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

  Template.editpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/Posts/'+postid;}   // esc
});

}

  Template.newvideopost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
          
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!!!</h3>", function() {
          });
         
          return false;
        }
        if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
            var url=y;
            if (url.indexOf('youtube.com') > -1) {
            
                   var id = url.split('v=')[1].split('&')[0];
                   
                if (!id) {
                  bootbox.alert("<h3>Not a valid youtube url!!</h3>", function() {
          });
                      
                      return false;
                }
                var m=('http://i1.ytimg.com/vi/'+id+'/hqdefault.jpg');
                Meteor.call('addvideopost',this.hobbyid,x,y,m);
                window.location = '/'+this.name+'/main';
                return true;}
           else
           {
             bootbox.alert("<h3>Not a valid youtube url!!</h3>", function() {
          });
             return false;
           }
          
          
        }
        else
        {
          bootbox.alert("<h3>You are not subscribed!!</h3>", function() {
          });
          
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

  Template.header.helpers({
    userid: function() {
      
       return Meteor.userId();
      
    }


  })





  Template.displaypost.helpers({
    checklike: function() {
      if(Posts.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Posts.findOne().likeusers,Meteor.userId());
       }
    },
    author: function() {
       
         return Meteor.users.find({_id:this.userid});
    },
    creator: function() {
      
         return (this.userid==Meteor.userId());
    },
    comments: function() {
      
      return Comments.find();
    },

  })


  Template.displayvideo.helpers({
    checklike: function() {
      if(Videoposts.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Videoposts.findOne().likeusers,Meteor.userId());
       }
    },
    author: function() {
       
         return Meteor.users.find({_id:this.userid});
    },
    creator: function() {
      
         return (this.userid==Meteor.userId());
    },


  })

  
  Template.displaypost.events({
  "click #unlike": function(e, tmpl) {
   
    Meteor.call('unlike',this._id,Meteor.userId());
       },
  "click #like": function(e, tmpl) {
    Meteor.call('like',this._id,Meteor.userId());
       },
  "click #unlike1": function(e, tmpl) {
   
    Meteor.call('unlike1',this._id,Meteor.userId());
       },
  "click #like1": function(e, tmpl) {
    Meteor.call('like1',this._id,Meteor.userId());
       },
  "click #delete": function(e, tmpl) {
     var answer=confirm("Are you sure you want to delete this post?");
     if(answer==true)
     {
    Meteor.call('deletepost',postid);
    window.location = '/'+hobbyname+'/main';
    //alert('Deleted your post!!');
      }
       }


   });


  Template.displayvideo.events({
  "click #unlike": function(e, tmpl) {
   
    Meteor.call('unlikevideo',this._id,Meteor.userId());
       },
  "click #like": function(e, tmpl) {
    Meteor.call('likevideo',this._id,Meteor.userId());
       },
  "click #delete": function(e, tmpl) {
     var answer=confirm("Are you sure you want to delete this post?");
     if(answer==true)
     {
    Meteor.call('deletevideo',videoid);
    window.location = '/'+hobbyname+'/main';
   // alert('Deleted your post!!');
      }
       }


   });

 Template.editpost.events({
  "click #submit": function(e, tmpl) {
      var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!</h3>", function() {
          });
          
          return false;
        }
       // if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
          Meteor.call("updatepost",postid,x,y); 
          window.location = '/Posts/'+postid;
          return true;
        }
     /*   else
        {
          alert('You are not suscribed!!');
          return false;
        }*/

          

   
     
       }


   });





  Template.header.events({
  "click #logout": function(e, tmpl) {

    Meteor.logout();
       },
   "click #profile": function(e, tmpl) {
        window.location = '/user/'+Meteor.userId();
    
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

           showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
            showChardata=70;
            var c = data.substr(0, showChardata);
            var sdata = c + '...';
           
       
          
    Posts.insert({hobbyid:hobbyid,data:data,stopic:stopic,sdata:sdata,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  },
  updatepost:function(postid,topic,data)
  {
     showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
            showChardata=70;
            var c = data.substr(0, showChardata);
            var sdata = c + '...';
    Posts.update({_id:postid},{$set:{topic:topic,data:data,sdata:sdata,stopic:stopic}});
  },
  deletepost:function(postid){
    Posts.remove({_id:postid});
    //remove the corresponding comments
  },
  deletevideo:function(videoid){
    Videoposts.remove({_id:videoid});
    //remove the corresponding comments
  },
  addvideopost: function (hobbyid,topic,url,picurl) {
    showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
    Videoposts.insert({hobbyid:hobbyid,url:url,stopic:stopic,picurl:picurl,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  },
  unlike: function (postid,userid) {
      Posts.update({
      _id: postid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
  unlikevideo: function (postid,userid) {
      Videoposts.update({
      _id: postid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
  like: function (postid,userid) { 
    Posts.update({
      _id: postid
    }, {
      
      $addToSet: {likeusers:userid},
      $set: { timestamp:new Date()},
      $set: {timeval:((new Date).valueOf())},
      $inc:{likes:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  like1 :function(commentid,userid){     // Roshni
    Comments.update({
      _id:commentid},{
        $addToSet:{likeusers:userid},
        $set: {timestamp:new Date()},
        $set: {timeval: ((new Date).valueOf())},
        $inc: {likes:1}
      },function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  likevideo: function (postid,userid) { 
    Videoposts.update({
      _id: postid
    }, {
      
      $addToSet: {likeusers:userid},
      $set: { timestamp:new Date()},
      $set: {timeval:((new Date).valueOf())},
      $inc:{likes:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  addcomment: function(postid,comment){    
  var pic=0;
  var pictwitter=0;

   Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pic=myDoc.profile.picture});
  /* Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pictwitter=myDoc.services.twitter.profile_image_url});
   if(pic==undefined)
     pic=pictwitter;*/
                  // please check ----Roshni

Comments.insert({postid:postid,comment:comment,userid:Meteor.userId(),pic:pic,likes:0,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  },
  getpostpages: function (hobbyname) { 
    
    var hobbyid;
    Hobbies.find({name:hobbyname}).forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
     return Math.ceil(Posts.find({hobbyid:hobbyid}).count()/8);
  },
  getvideopages: function (hobbyname) { 
    
    var hobbyid;
    Hobbies.find({name:hobbyname}).forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
     return Math.ceil(Videoposts.find({hobbyid:hobbyid}).count()/8);
  },
});

Meteor.publish("users",function(){
   return Meteor.users.find();
});

Meteor.publish("posthobby",function(hobbyid){
   return Posts.find({hobbyid:hobbyid},{sort:{likes: -1}});
});

Meteor.publish("videohobby",function(hobbyid){
   return Videoposts.find({hobbyid:hobbyid},{sort:{likes: -1}});
});

Meteor.publish("userposts",function(userid){
   return Posts.find({userid:userid});
});
Meteor.publish("uservideos",function(userid){
   return Videoposts.find({userid:userid});
});



Meteor.publish("postcount",function(){
   var pages=Posts.count();
   return Math.ceil(pages/8);
});

Meteor.publish("videocount",function(){
   var pages=Videoposts.count();
   return Math.ceil(pages/8);
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




 Meteor.publish("getcomments",function(postid){      //  Roshni

    var data=Comments.find({postid:postid},{sort:{timeval: -1}});
    return data;
 });



 Meteor.publish("hobbies", function () {
  return Hobbies.find();
});

 Meteor.publish("displaypost", function (postid) {
  return Posts.find({_id:postid});
});
 Meteor.publish("displayvideo", function (videoid) {
  return Videoposts.find({_id:videoid});
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
