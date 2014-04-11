var IR_BeforeHooks = {
  
    isLoggedIn: function() {
    	
        if (!(Meteor.loggingIn() || Meteor.user())) {
          this.redirect('/');
            bootbox.alert("<h3>Please sign in to continue</h3>", function() {
          });
           this.stop();
        }
    }

    // add more before hooks here
}

// (Global) Before hooks for any route
Router.before(IR_BeforeHooks.isLoggedIn,{except: ['contact','home','notFound']});



