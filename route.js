var IR_BeforeHooks = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          this.redirect('/');
          bootbox.alert("Please sign in to continue.", function() {
          });
           this.stop();
        }
    }

    // add more before hooks here
}

// (Global) Before hooks for any route
Router.before(IR_BeforeHooks.isLoggedIn,{except: ['contact','home']});


