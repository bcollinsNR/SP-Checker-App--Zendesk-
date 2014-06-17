(function() {

 var initialScore = "";
 var finalScore = "";

  return { // the entire app goes inside this return block!
    // listen for API events such as the start of our app, when bits of it get clicked on or when AJAX requests complete
    events: {
      'app.activated':                'initialize', 
      'ticket.save':                  'ticketSaveHandler',
    },

    requests: {
    },

    initialize: function(data) {
      if (data.firstLoad) {
        console.log("Sales Priority name is:");
        console.log(this.ticketFields('custom_field_24001886').name());
        console.log("Sales Priority label is:");
        console.log(this.ticketFields('custom_field_24001886').label());
        console.log("Initial Sales Priority selected value is:");
        console.log(this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label());
        initialScore = this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label();       
      }
    },

    ticketSaveHandler: function(data) { // function called when we load
      console.log("Initial Sales Priority selected value is:");
      console.log(this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label());
      
      if (this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")) != 'undefined') 
      {
        finalScore = this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label();        
      }
      else
      {
        finalScore = '-';
      }
      

      console.log("initial and final scores");
      console.log(initialScore);
      console.log(finalScore);

      if (initialScore != '-' && finalScore == '-')
      {

        var msg = '<strong>FAIL!</strong>';
        services.notify(msg, 'alert');
        console.log("You cannot remove the SP score!");
        return false;
      }
      else
      {
        return true;   
      }
    },    

  };

}());