console.log("Script running... (search.js)");

function search (term) { 
    var selectedhostels = hostels.filter(function(hostel) {
      var result = (hostel.address.toLowerCase().search(req.params["term"].toLowerCase())>=0) || 
          (hostel.description.toLowerCase().search(req.params["term"].toLowerCase())>=0);
      return result;
    });
    selectedhostels.length==0 ? res.status(404): res.status(200);
    res.send(selectedhostels);
  }


