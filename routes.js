var IR_BeforeHooks = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          alert("Please login");
          this.render('home');
          this.stop();
        }
    },
}



//Router.before(IR_BeforeHooks.isLoggedIn);
//Router.before(IR_BeforeHooks.isContact, {only: ['contact']});