var IR_BeforeHooks = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
         
          alert("Please login");
          this.render('home');
           this.stop();
        }
    }

    // add more before hooks here
}

// (Global) Before hooks for any route
//Router.before(IR_BeforeHooks.isLoggedIn,{only: ['contact']});


