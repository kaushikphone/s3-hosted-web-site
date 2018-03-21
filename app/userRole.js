var fetchUserRole=localStorage.getItem("UserRole");
AWS.config.credentials.clearCachedId();
AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                   apigClient = apigClientFactory.newClient({
                       accessKey: AWS.config.credentials.accessKeyId,
                       secretKey: AWS.config.credentials.secretAccessKey,
											 sessionToken: AWS.config.credentials.sessionToken,
                       apiKey: '2006-03-01'
                     });
                     $('.fixedModalbarcolumn,#loadingSymbol').show();
										 checkRoole();
                     checkClientLoggedInDetails();
                     console.log('Successfully logged!');
                }
            });
function checkRoole(){
apigClient.userroleGet({
    SPName:'sp_user_role',
    user:fetchUserRole
})
  .then(function(response){
    $('.fixedModalbarcolumn,#loadingSymbol').hide();
    var role=response.data[0][0].role;
    console.log(role);
    if(role=="admin"){
      $('#AdministrationBtn').show();
    }
    if(role=="user"){
      $('#AdministrationBtn').hide();
    }
  }).catch( function(result){
    console.log("The error is"+result);
  });
}

// checkClientLoggedInDetails functionality
function checkClientLoggedInDetails() {
  apigClient.spUsageDetailsPost({
      SPName:'sp_usage_details',
      loggedin_user_name:localStorage.getItem("UserRole"),
      last_usage_date:Date(),
  })
    .then(function(response){
      console.log(response);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
