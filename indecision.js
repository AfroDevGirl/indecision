// $(document).ready(function() {

	var CLIENT_ID = "115529283863-n36m9n4rk4mmpo4q5d9jngj2mjolapgj.apps.googleusercontent.com";
	var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
	var API_KEY = "AIzaSyAbY_kPw1zU9tf7qf8-4HGuNoCMDpWtF9s";
	

	function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
    }

	/**
	* Handle response from authorization server.
	*
	* @param {Object} authResult Authorization result.
	*/
	function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
	  // Hide auth UI, then load client library.
	  authorizeDiv.style.display = 'none';
	  loadDriveApi();
	} else {
	  // Show auth UI, allowing the user to initiate authorization by
	  // clicking authorize button.
	  authorizeDiv.style.display = 'inline';
	}
	}

	/**
	* Initiate auth flow in response to user clicking authorize button.
	*
	* @param {Event} event Button click event.
	*/
	function handleAuthClick(event) {
	gapi.auth.authorize(
	  {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	  handleAuthResult);
	return false;
	}

	/**
	* Load Drive API client library.
	*/
	function loadDriveApi() {
	gapi.client.load('drive', 'v3', listFiles);
	}

	/**
	* Print files.
	*/
	function listFiles() {
	var request = gapi.client.drive.files.list({
	    'pageSize': 10,
	    'fields': "nextPageToken, files(id, name)"
	  });

	  request.execute(function(resp) {
	    appendPre('Files:');
	    var files = resp.files;
	    if (files && files.length > 0) {
	      for (var i = 0; i < files.length; i++) {
	        var file = files[i];
	        appendPre(file.name + ' (' + file.id + ')');
	      }
	    } else {
	      appendPre('No files found.');
	    }
	  });
	}

	/**
	* Append a pre element to the body containing the given message
	* as its text node.
	*
	* @param {string} message Text to be placed in pre element.
	*/
	function appendPre(message) {
	var pre = document.getElementById('output');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
	}




	// $("#inputForm").on("submit", function(e){
	// 	e.preventDefault();
	// 	var $form = $(this);
	// 	var docLink = $form.find('input[name="documentInput"]').val();
	// 	var fileId = docLink.match(/(\/d\/)(.+\/)/g);
	// 	fileId = fileId[0].slice(3,-1);

	// 	printFile(fileId);
	// 	function printFile(fileId) {
 //  			$.ajax({
 //  				method: 'GET',
 //  				url: 'https://www.googleapis.com/drive/v3/files/' + fileId
 //  			}).done(function(resp) {
 //    			$('#result').append('Title: ' + resp.title);
 //    			$('#result').append('Description: ' + resp.description);
 //    			$('#result').append('MIME type: ' + resp.mimeType);
 //  			});
	// 	}
	// });
// });