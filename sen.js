Hobbies = new Meteor.Collection("hobbies");
Posts =new Meteor.Collection("posts");
Videoposts=new Meteor.Collection("videoposts");
Comments=new Meteor.Collection("comments");
Videocomments=new Meteor.Collection("videocomments");
Notifier=new Meteor.Collection("notifier");
Tags=new Meteor.Collection("tags");


Words = new Meteor.Collection(null);
['2g1c','2 girls 1 cup','acrotomophilia','anal','anilingus','anus','arsehole','ass','asshole','assmunch','auto erotic','autoerotic','babeland','baby batter','ball gag','ball gravy','ball kicking','ball licking','ball sack','ball sucking','bangbros','bareback','barely legal','barenaked','bastardo','bastinado','bbw','bdsm','beaver cleaver','beaver lips','bestiality','bi curious','big black','big breasts','big knockers','big tits','bimbos','birdlock','bitch','black cock','blonde action','blonde on blonde action','blow j','blow your l','blue waffle','blumpkin','bollocks','bondage','boner','boob','boobs','booty call','brown showers','brunette action','bukkake','bulldyke','bullet vibe','bung hole','bunghole','busty','butt','buttcheeks','butthole','camel toe','camgirl','camslut','camwhore','carpet muncher','carpetmuncher','chocolate rosebuds','circlejerk','cleveland steamer','clit','clitoris','clover clamps','clusterfuck','cock','cocks','coprolagnia','coprophilia','cornhole','cum','cumming','cunnilingus','cunt','darkie','date rape','daterape','deep throat','deepthroat','dick','dildo','dirty pillows','dirty sanchez','doggie style','doggiestyle','doggy style','doggystyle','dog style','dolcett','domination','dominatrix','dommes','donkey punch','double dong','double penetration','dp action','eat my ass','ecchi','ejaculation','erotic','erotism','escort','ethical slut','eunuch','faggot','fecal','felch','fellatio','feltch','female squirting','femdom','figging','fingering','fisting','foot fetish','footjob','frotting','fuck','fuck buttons','fudge packer','fudgepacker','futanari','gang bang','gay sex','genitals','giant cock','girl on','girl on top','girls gone wild','goatcx','goatse','gokkun','golden shower','goodpoop','goo girl','goregasm','grope','group sex','g-spot','guro','hand job','handjob','hard core','hardcore','hentai','homoerotic','honkey','hooker','hot chick','how to kill','how to murder','huge fat','humping','incest','intercourse','jack off','jail bait','jailbait','jerk off','jigaboo','jiggaboo','jiggerboo','jizz','juggs','kike','kinbaku','kinkster','kinky','knobbing','leather restraint','leather straight jacket','lemon party','lolita','lovemaking','make me come','male squirting','masturbate','menage a trois','milf','missionary position','motherfucker','mound of venus','mr hands','muff diver','muffdiving','nambla','nawashi','negro','neonazi','nigga','nigger','nig nog','nimphomania','nipple','nipples','nsfw images','nude','nudity','nympho','nymphomania','octopussy','omorashi','one cup two girls','one guy one jar','orgasm','orgy','paedophile','panties','panty','pedobear','pedophile','pegging','penis','phone sex','piece of shit','pissing','piss pig','pisspig','playboy','pleasure chest','pole smoker','ponyplay','poof','poop chute','poopchute','porn','porno','pornography','prince albert piercing','pthc','pubes','pussy','queaf','raghead','raging boner','rape','raping','rapist','rectum','reverse cowgirl','rimjob','rimming','rosy palm','rosy palm and her 5 sisters','rusty trombone','sadism','scat','schlong','scissoring','semen','sex','sexo','sexy','shaved beaver','shaved pussy','shemale','shibari','shit','shota','shrimping','slanteye','slut','s&m','smut','snatch','snowballing','sodomize','sodomy','spic','spooge','spread legs','strap on','strapon','strappado','strip club','style doggy','suck','sucks','suicide girls','sultry women','swastika','swinger','tainted love','taste my','tea bagging','threesome','throating','tied up','tight white','tit','tits','titties','titty','tongue in a','topless','tosser','towelhead','tranny','tribadism','tub girl','tubgirl','tushy','twat','twink','twinkie','two girls one cup','undressing','upskirt','urethra play','urophilia','vagina','venus mound','vibrator','violet blue','violet wand','vorarephilia','voyeur','vulva','wank','wetback','wet dream','white power','women rapping','wrapping men','wrinkled starfish','xx','xxx','yaoi','yellow showers','yiffy','zoophilia'].forEach(function (word) {
  Words.insert({type: word})
});





if (Meteor.isClient) {
 
   Meteor.startup(function () {
    
  });

   
   
   Meteor.methods({
     showsignin: function () {
    var boxContentString ="Please sign in to continue";
   boxer=bootbox.dialog(boxContentString);
  }
});


Template.admin.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  count=0;
  countall=0;
  Session.set('deleteid','');
  Session.set('deletehobby','');
  
   if(Meteor.user())
  {
    
    $('#hobbycontent').hide();
    $('#usercontent').hide();
    $('#userdetails').hide();
    $('#hobbydetails').hide();
  }

}


Template.admin.usersettings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [

    
    
    {
      token: '',
      collection: Meteor.users,  // Meteor.Collection object means client-side collection
      field: 'profile.name',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.details,
      callback: function(doc) {Session.set('deleteid',doc._id);$('#userdetails').show();return;}
    },
    {
      token: '@',
      collection: Meteor.users,  // Meteor.Collection object means client-side collection
      field: 'profile.username',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.details,
      callback: function(doc) {Session.set('deleteid',doc._id);$('#userdetails').show();return;}
    }
  ]
};


Template.admin.hobbysettings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [
    {
      token: '',
      collection: Hobbies,  
      field: 'name',
      template: Template.hobby,
      callback: function(doc) {Session.set('deletehobby',doc.hobbyid);$('#hobbydetails').show();return;}
    }
  ]
};










Template.admin.helpers({
    totalusers: function() {
         return Meteor.users.find().count();
    },

    week: function() {
         var count=0;
         var today = new Date();
         var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
         Meteor.users.find({}).forEach(function(myDoc) {if(myDoc.createdAt>lastWeek)count++;});
           

         return count;
    },
    month: function() {
         var count=0;
         var today = new Date();
         var lastWeek = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
         Meteor.users.find({}).forEach(function(myDoc) {if(myDoc.createdAt>lastWeek)count++;});
           

         return count;
    },
    year: function() {
         var count=0;
         var today = new Date();
         var lastWeek = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
         Meteor.users.find({}).forEach(function(myDoc) {if(myDoc.createdAt>lastWeek)count++;});
           

         return count;
    },
    today: function() {
         var count=0;
         var today = new Date();
         var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
         Meteor.users.find({}).forEach(function(myDoc) {if(myDoc.createdAt>lastWeek)count++;});
           

         return count;
    },
    hobbydetails: function() {
         return Hobbies.find();
    },
    postscount: function() {
         return Posts.find({hobbyid:this.hobbyid}).count();
    },
    videoscount: function() {
         return Videoposts.find({hobbyid:this.hobbyid}).count();
    },
    subusers: function() {
         var count=0;
         var id=this.hobbyid;
         
          Meteor.users.find().forEach(function(myDoc) {if(_.contains(myDoc.suscribed,id))count++});
          
         return count;
    },

    name: function() {
         var name='';
         
           if(Session.get('deleteid')!='')
             Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.profile.name});
          
           return name;
    },
    username: function() {
          var name='';
          if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
    },
     userposts: function() {
          
          if(Session.get('deleteid')!='')
          {
           return Posts.find({userid:Session.get('deleteid')}).count();
           
         }
         else
          return 0;
    },
    uservideos: function() {
          
          if(Session.get('deleteid')!='')
          {
          return Videoposts.find({userid:Session.get('deleteid')}).count();
           
         }
         else
          return 0;
    },
     usercomments: function() {
          
          if(Session.get('deleteid')!='')
          {
          return Comments.find({userid:Session.get('deleteid')}).count()+Videocomments.find({userid:Session.get('deleteid')}).count();
           
         }
         else
          return 0;
    },

    timestamp: function() {
          var name='';
          if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.createdAt});
           return name;
    },
    imagesrc: function() {
         var name='';
         if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.profile.picture});
           return name;
    },
    
    email: function() {
          var name='';
          if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.profile.email});
           return name;
    },
    count: function() {
          var name='';
          if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.count});
           return name;
    },
    lastloggedin: function() {
          var name='';
          if(Session.get('deleteid')!='')
           Meteor.users.find({_id:Session.get('deleteid')}).forEach(function(myDoc) {name=myDoc.lastlogged});
           return name;
    },

    hobbyname: function() {
         var name='';
         
           if(Session.get('deletehobby')!='')
             Hobbies.find({hobbyid:Session.get('deletehobby')}).forEach(function(myDoc) {name=myDoc.name});
          
           return name;
    },
    
    hobbyimagesrc: function() {
         var name='';
         if(Session.get('deletehobby')!='')
          Hobbies.find({hobbyid:Session.get('deletehobby')}).forEach(function(myDoc) {name=myDoc.imagesrc});
        return name;
    },

    hobbyid: function() {
         var name='';
         
           if(Session.get('deletehobby')!='')
             name=Session.get('deletehobby');
          
           return 'Hobbyid     '+name;
    },

    


  });



Template.admin.events({
  "click #trends": function(e, tmpl) {
    $("html,body").animate({scrollTop: 0},500);
    $('#trendcontent').show();
       $('#hobbycontent').hide();
   $('#usercontent').hide();
   
       },
  "click #edithobby": function(e, tmpl) {
    $("html,body").animate({scrollTop: 0},500);
    $('#trendcontent').hide();
       $('#hobbycontent').show();
   $('#usercontent').hide();
   $('#hobbydetails').hide();
       },
  "click #edituser": function(e, tmpl) {
    $("html,body").animate({scrollTop: 0},500);
    $('#trendcontent').hide();
       $('#hobbycontent').hide();
   $('#usercontent').show();
   $('#userdetails').hide();
   
       },
  "click #deleteuser": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete the user?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deleteuser',Session.get('deleteid'));
      }
    }
  }
});
       },

       "click #deletehobby": function(e, tmpl) {
        var hobbyname='';
        Hobbies.find({hobbyid:Session.get('deletehobby')}).forEach(function(myDoc) {hobbyname=myDoc.name});
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this hobby?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deletehobby',hobbyname);
         window.location = '/admin/main';
      }
    }
  }
});
       },


  "change #pic": function(event, template) {
      FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
       
       });
      });
    },


  "click #post": function(e, tmpl) {
    e.preventDefault();
    
    var x1=$('#newhobbyid').val();
    var x2=$('#newhobbyname').val();
    var x3=$('#hobbydes').val();

        if (x1==null || x1=="")
         {
          bootbox.alert("<h3>No ID of hobby found!!</h3>", function() {
          });
           return false;
         }

         if (Hobbies.find({hobbyid:x1}).count()!=0)
         {
          bootbox.alert("<h3>Hobby with this id already exits!!</h3>", function() {
          });
           return false;
         }

         if (Hobbies.find({name:x2}).count()!=0)
         {
          bootbox.alert("<h3>Hobby with this name already exits!!</h3>", function() {
          });
           return false;
         }

         if(x2==null || x2=="")
        {
          bootbox.alert("<h3>No hobby name found!!</h3>", function() {
          });
          
          return false;
        }
        if(x3==null || x3=="")
        {
          bootbox.alert("<h3>No description found!!</h3>", function() {
          });
          
          return false;
        }

          Meteor.call("createnewhobby",x1,x2,x3); 
          window.location = '/admin/main';
          return true;

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
   postcount=data;
    if(postcount==0)
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

  }
    
}


Template.newpost.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [
    {
      token: '#',
      collection: Tags,  // Meteor.Collection object means client-side collection
      field: 'tag',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.hash,
      callback: function(doc) {
        var i=allhashtags.length;
      allhashtags[i]=doc.tag;}
    }
  ]
};

Template.newvideopost.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [
    {
      token: '#',
      collection: Tags,  // Meteor.Collection object means client-side collection
      field: 'tag',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.hash,
      callback: function(doc) {
        var i=allhashtags.length;
      allhashtags[i]=doc.tag;}
    }
  ]
};



Template.header.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [

    
    {
      token: '#',
      collection: Tags,  // Meteor.Collection object means client-side collection
      field: 'tag',
      template: Template.hash,
      callback: function(doc) { window.location = '/tag/'+doc.tag;}
    },
    {
      token: '@',
      collection: Meteor.users,  // Meteor.Collection object means client-side collection
      field: 'profile.name',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.details,
      callback: function(doc) { window.location = '/user/'+doc._id;}
    }
  ]
};


Template.displaypost.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [

    {
      token: '@',
      collection: Meteor.users,  // Meteor.Collection object means client-side collection
      field: 'profile.username',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.details,
     callback:function(doc) {
       var p=usertags.length;
       usertags[p]=doc._id;
      },
        
      
    }
  ]
};

Template.displayvideo.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [
    {
      token: '@',
      collection: Meteor.users,  // Meteor.Collection object means client-side collection
      field: 'profile.username',
      // set to true to search anywhere in the field, which cannot use an index.
       // 'ba' will match 'bar' and 'baz' first, then 'abacus'
      template: Template.details,
     callback:function(doc) {
       var p=usertags.length;
       usertags[p]=doc._id;
      },
        
      
    }
  ]
};



Template.contact.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
}


Template.header.rendered = function() {
  count=0;

  Meteor.subscribe("hashtags");

   $('#bubble').hide();
 

  Meteor.subscribe("notifications",Meteor.userId());

}

Template.noti.rendered = function() {
  Meteor.subscribe("notifications",Meteor.userId());

}


Template.user.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  count=0;
  countall=0;
  box=undefined;
  

  Deps.autorun(function(){
    if(Meteor.user())
    {
       console.log(Meteor.user().profile.username);
  if(Meteor.user().profile.username==null)
  {
   
    if(box==undefined)
    {
        box=  bootbox.dialog({
        message: "<form id='infos' action=''>    Username:   <input name='usernameInput' id='username'/></form>",
        title: "Please enter your username.",
        buttons: {
          success: {
            label: "Save",
            className: "btn-success",
            callback: function() {
              var x=$('#username').val();
              
              if(Meteor.users.find({'profile.username':x}).count()==0)
                  Meteor.call('addusername',$('#username').val(),Meteor.userId());
              else
              {
                 bootbox.alert("<h3>Username already exists!!</h3>", function() {
          });
              return false;
              }
            }
          }
        }
    });

    
  }
  }
}
});
   


    if(Meteor.user())
  {
    if(this.userid)
    {
    if(this.userid!=Meteor.userId())
    {
     $('.holo').hide();
   }
 }
    $('#dropdown').hide();
    $('#dropdownall').hide();
    $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
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
    username: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
    },
    timestamp: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.createdAt});
           return name;
    },
    imagesrc: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.picture});
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
    
    
    


  });
  
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
   
  "click #delete": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete the user?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deleteuser',this.userid);
         window.location = '/admin/main';
      }
    }
  }
});
       },

  "click #report": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to report this user?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        var p=Meteor.call('reportuser',this.userid);
        var name;
        Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.name});
           Notifications.warn('Reported user','You have reported '+name+'.Trying to report again will not report the user.');
         return true;
      }
    }
  }
});
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
  usertags=[];
  }


Template.comment.rendered = function() {

 $('.commentr').each( function() {
        
        var name;
        var content=$(this).text();
        //alert(this.parent._id);
         
       content=content.replace(/@([^ ]+)/g, '<a href="/username/$1" onClick="Meteor.users.find({_id:$1})"><b>@$1</b></a>');
        
        $(this).html(content);
      
    }); 
 

}

Template.displaytext.rendered = function() {
 
 $('.data').each( function() {
        
        var name;
        var content=$(this).text();
        //alert(this.parent._id);
         
       content=content.replace(/#([^ ]+)/g, '<a href="/tag/$1" onClick="Meteor.users.find({_id:$1})"><b>#$1</b></a>');
        
        $(this).html(content);
      
    }); 
}

 Template.displayvideodata.rendered = function() {
 
 $('.data').each( function() {
        
        var name;
        var content=$(this).text();
        //alert(this.parent._id);
         
       content=content.replace(/#([^ ]+)/g, '<a href="/tag/$1" onClick="Meteor.users.find({_id:$1})"><b>#$1</b></a>');
        
        $(this).html(content);
      
    }); 
 
}

Template.videocomment.rendered = function() {
 var i=1;
 $('.commentr').each( function() {
        
        var name;
        var content=$(this).text();
        //alert(this.parent._id);
         
       content=content.replace(/@([^ ]+)/g, '<a href="/username/$1" onClick="Meteor.users.find({_id:$1})"><b>@$1</b></a>');
        
        $(this).html(content);
      
    }); 
 

}


Template.displayvideo.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
   usertags=[];
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


    


    
   },

   'click #notification' : function() {
    if(count%2==0){
    $('#notifier').show();
    count++;
  }
    else{
       $('#notifier').hide();
        count++;
      }

   }
   
  });


Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});
Handlebars.registerHelper("isadmin", function(timestamp) {
  var admin;
  Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {admin=myDoc.admin});
                    
                    
    return admin;
});

 
 Meteor.subscribe("userData");
 Meteor.subscribe("hobbies");
 Meteor.subscribe("users");
 
 


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
            else
            {
              bootbox.alert("<h3>Already on the first page!!</h3>", function() {
          });
              
            }
          
        },

  "click #deletehobby": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this hobby?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deletehobby',this.hobbyname);
         window.location = '/admin/main';
      }
    }
  }
});
       },

  "click #next": function(e, tmpl) {
    
        if((pageno+1)<postcount)
      {
       pageno=pageno+1; 
       postssuscribed.stop();
       postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
       }
       else
       { 
         bootbox.alert("<h3>No more pages to show!!</h3>", function() {
          });
          
       }
       },
  "click #vprevious": function(e, tmpl) {
         

         if(vpageno!=0)
         {
            vpageno=vpageno-1;
            videopostssuscribed.stop();
            videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
         }
         else
            {
             bootbox.alert("<h3>Already on the first page!!</h3>", function() {
          });
            }
         
         
         
       },
  "click #vnext": function(e, tmpl) {
       
       if((vpageno+1)<videocount)
      {
       vpageno=vpageno+1;
       
       videopostssuscribed.stop();
       videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
       }
       else
       {
          bootbox.alert("<h3>No more pages to show!!</h3>", function() {
          });
          
       }
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
  allhashtags=[];
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/'+hobbyname+'/main';}   // esc
});
}
  
Template.displaypost.events({            // check this once  -----Roshni
  
  "click #comment": function(e, tmpl){
         var x=$('#data').val();
         var t;
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No comment added!!!!</h3>", function() {
          });
          
           return false;
         }
        
          if(postid!=undefined)          
          {
            $('#data').val("");
            var s=x.split(' ');
            var k=0;
            console.log(s.length);
            for (var i = 0; i <s.length; i++) 
              { 
                   if((Words.findOne({type:s[i]})))
                      { k=1;
                        break;
                      }
              }
          if(k==0)
          {
             Meteor.call('addcomment',postid,x,usertags);
             
              if(_.contains(usertags,Meteor.userId()))
            Notifications.success(this.stopic,Meteor.user().profile.name+'  has tagged you in a comment.');
           
            usertags=[];
          }
           else
              bootbox.alert("<h3>The site prohibits you from using Foul language!!!!</h3>", function() {
          });


           }  
         },
          "click #deletepost": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this post?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deletepost',this.postid);
         window.location = '/admin/main';
      }
    }
  }
});
       },
       "click #deletecomment": function(e, tmpl) {
        var id=this._id;
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this comment?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
       
        Meteor.call('deletepostcomment',id);
         return true;
         //window.location = '/admin/main';
      }
    }
  }
});
       },


   });

Template.displayvideo.events({ 
 "click #deletevideo": function(e, tmpl) {
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this videopost?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        Meteor.call('deletevideo',this.videoid);
         window.location = '/admin/main';
      }
    }
  }
});
       },           // check this once  -----Roshni
  
  "click #comment": function(e, tmpl){
         var x=$('#vdata').val();
         
         if (x==null || x=="")
         {
           alert("No comment added!!!!");
           return false;
         }
        
          if(videoid!=undefined)
          {
          $('#vdata').val("");

          Meteor.call('addvidcomment',videoid,x,usertags);
          usertags=[];
           }

          
        },

  "click #deletecomment": function(e, tmpl) {
        var id=this._id;
       bootbox.dialog({
  message: "<h3>Are you sure you want to delete this comment?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
       
        Meteor.call('deletevideocomment',id);
         return true;
         //window.location = '/admin/main';
      }
    }
  }
});
       },

    

   });

//-------------------------------------------

  
 

  Template.home.helpers({
   
    hobbies: function() {
      return Hobbies.find();
    
    }
  })
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
          Meteor.call('addpost',this.hobbyid,x,y,allhashtags);
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

  allhashtags=[];
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
                Meteor.call('addvideopost',this.hobbyid,x,y,m,allhashtags);
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
      
    },
    
     
     
    cnt: function() {
      if(Notifier.find({seen:false}).count()==0)
          $('#bubble').hide();

       return Notifier.find({seen:false}).count();
      },
      count: function(){
      if(this.unchecked==0)
          return this.checked;
      else
        return this.unchecked;

      },
   username: function() {
      
       var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
 }, 
 notifylike:function(){
  return Notifier.find({like:true});
 },
 notifycomment:function(){
  return Notifier.find({comment:true});
 },
 notifyreportuser:function(){
  return Notifier.find({report:true});
 },
 notifyreportpost:function(){
  return Notifier.find({reportpost:true});
 },
 notifyreportvideo:function(){
  return Notifier.find({reportvideo:true});
 },
 reportedusername:function(){
  var name='';
  Meteor.users.find({_id:this.reportuserid}).forEach(function(myDoc) {name=myDoc.profile.name});
          
  return name;
 },


  })
Template.noti.helpers({
   
  count: function(){
      if(this.unchecked==0)
          return this.checked;
      else
        return this.unchecked;

      },
   username: function() {
      
       var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
 }, 
 notifylike:function(){
  return Notifier.find({like:true});
 },
 notifycomment:function(){
  return Notifier.find({comment:true});
 },
 notifyreportuser:function(){
  return Notifier.find({report:true});
 },
 reportedusername:function(){
  var name='';
  Meteor.users.find({_id:this.reportuserid}).forEach(function(myDoc) {name=myDoc.profile.name});
          
  return name;
 },


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
    username: function() {
      
       var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
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
    checklike1: function() {
      if(Comments.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Comments.findOne().likeusers,Meteor.userId());
       }
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
    username: function() {
      
       var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.username});
           return name;
    }, 
    author: function() {
       
         return Meteor.users.find({_id:this.userid});
    },
    creator: function() {
      
         return (this.userid==Meteor.userId());
    },
    vidcomments : function(){

      return Videocomments.find();
    },
        checklike1: function() {
      if(Videocomments.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Videocomments.findOne().likeusers,Meteor.userId());
       }
    },

  })


  Template.hashpage.helpers({
    
    posts: function() {
      return Posts.find();
    },
    videoposts: function() {
      return Videoposts.find();
    },
    gettag: function() {
      return tag;
    },
  })






  
  Template.displaypost.events({
   "click #report": function(e, tmpl) {
      
      
       bootbox.dialog({
  message: "<h3>Are you sure you want to report this post?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        var p=Meteor.call('reportpost',postid);
        
        
           Notifications.warn('Reported post','You have reported this post.Trying to report again will not report the post.');
         return true;
      }
    }
  }
});
       },
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
    "click #report": function(e, tmpl) {
      
      
       bootbox.dialog({
  message: "<h3>Are you sure you want to report this video?</h3>",
  buttons: {
    success: {
      label: "No",
      className: "btn-success",
      callback: function() {
        return true;
      }
    },
    danger: {
      label: "Yes",
      className: "btn-danger",
      callback: function() {
        var p=Meteor.call('reportvideo',videoid);
        
        
           Notifications.warn('Reported post','You have reported this video.Trying to report again will not report the post.');
         return true;
      }
    }
  }
});
       },
  "click #unlike": function(e, tmpl) {
   
    Meteor.call('unlikevideo',this._id,Meteor.userId());
       },
  "click #like": function(e, tmpl) {
    Meteor.call('likevideo',this._id,Meteor.userId());
       },
    "click #unlike1": function(e, tmpl) {
   
    Meteor.call('unlikevideocomment',this._id,Meteor.userId());
       },
  "click #like1": function(e, tmpl) {
    Meteor.call('likevideocomment',this._id,Meteor.userId());
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
        var admin;
                    Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {admin=myDoc.admin});
                    
                    if(admin==false)
                    window.location.href = '/user/'+Meteor.userId();
                    else
                    window.location.href = '/admin/main';
    
       },
    "click .clicked": function(e, tmpl) {

    Meteor.call("updatenotification",this._id,true,this.unchecked);
    if(this.post==true)
        window.location = '/Posts/'+this.postid;

    else if(this.video==true)
      window.location = '/Videopost/'+this.postid;
    else if(this.report==true)
      window.location = '/user/'+this.reportuserid;
    else if(this.reportpost==true)
      window.location = '/Posts/'+this.reportpostid;
    else if(this.reportvideo==true)
      window.location = '/Videopost/'+this.reportpostid;
    },  

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

 



 
    

 


}

