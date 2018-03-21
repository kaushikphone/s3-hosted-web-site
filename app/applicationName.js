AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                   apigClient = apigClientFactory.newClient({
                       accessKey: AWS.config.credentials.accessKeyId,
                       secretKey: AWS.config.credentials.secretAccessKey,
											 sessionToken: AWS.config.credentials.sessionToken,
                       apiKey: '2006-03-01'
                     });
										 GetApplicationName();
                     console.log('Successfully logged!');
                }
});

function GetApplicationName(){
  apigClient.getApplicationNameGet()
    .then(function(response){
			responseDataTable=response;
      $('#appnameController').empty();
      $('#appnameController').html('<option value="select">Select Application Name</option>');
       for(var i = 0; i < response.data.length; i++){
         $('#appnameController').append('<option data-startnumber="'+response.data[i].start_column+'" data-endnumber="'+response.data[i].end_column+'"  row-offset="'+response.data[i].row_offset+'" value="'+response.data[i].report_value+'">'+response.data[i].report_text+'</option>')
    }
      //console.log(responseDataTable.data.length);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
