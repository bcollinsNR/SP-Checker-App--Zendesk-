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
        try {
          initialScore = this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label();
        }
        catch(e)
        {
          //either it is not defined or the label is incorrect, etc
          initialScore = '-';
        }      
      }
    },

    ticketSaveHandler: function(data) { // function called when we load
      try {
        finalScore = this.ticketFields("custom_field_24001886").options(this.ticket().customField("custom_field_24001886")).label();      
      } 
      catch (e) {
        finalScore = '-';
        if (initialScore == '-') {
          // don't need to fail if this was not set initially
          return true;
        }
        else {
          return 'You cannot set an empty Sales Priority score for this ticket. Please ensure this value is set correctly before saving.';
        }
      }
      
      console.log("Initial and final SP scores have been checked successfully.");
      console.log(initialScore);
      console.log(finalScore);

      return true;   
      
    },    

  };

}());