(function() {

 var initialScore = "";
 var finalScore = "";
 var CUSTOM_FIELD_ID = 24001886; // for my sandbox
 //var CUSTOM_FIELD_ID = ???;    // for production 

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
          initialScore = this.ticketFields("custom_field_" + CUSTOM_FIELD_ID).options(this.ticket().customField("custom_field_" + CUSTOM_FIELD_ID)).label();
        }
        catch(e)
        {
          //either the Sales Priority score is not defined yet or the label is not correct
          initialScore = '-';
        }      
      }
    },

    ticketSaveHandler: function(data) { // function called when we load
      try {
        finalScore = this.ticketFields("custom_field_" + CUSTOM_FIELD_ID).options(this.ticket().customField("custom_field_" + CUSTOM_FIELD_ID)).label();
      } 
      catch (e) {
        finalScore = '-';
        if (initialScore == '-') {
          // don't need to fail if this was not set initially or we couldn't find the field to check
          return true;
        }
        else {
          return 'You cannot set an empty Sales Priority score for this ticket. Please ensure this value is set correctly before saving.';
        }
      }
      
      console.log("Initial and final SP scores have been checked successfully.");
      console.log("Initial: " + initialScore);
      console.log("Final: " + finalScore);

      return true;   
      
    },    

  };

}());