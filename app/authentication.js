  /*password Capitalization and validation*/
  /*authenticateUser list*/
function signUP(){
  userPool.signUp(UserEmail, UserPassWord, attributeList, null, function(err, result){
       if (err) {
           alert(err);
           return;
       }
       cognitoUser = result.user;
       console.log('user name is ' + cognitoUser.getUsername());
   });
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);

}
function getGUID()
{
  var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  return guid;
}

//encryptiion function
 function signIn() {
   $('.fixedModalbarcolumn,#loadingSymbol').show();
    var UserEmail=$('#username').val();
    var UserPassWord=$('#password').val();
    UpdatedUserList = $('#FirstTimeUserDataStore').val(UserEmail);
    authenticationData = {Username : UserEmail,Password : UserPassWord};

   userData = {Username : UserEmail, password : UserPassWord, Pool : userPool};
   authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
   cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);


   cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              //console.log('access token + ' + result.getAccessToken().getJwtToken());
              //push the GUID into the sessionToken
              //var encryptedValue = encrypt(hello, result.getAccessToken().getJwtToken());
            var encryptedValue = CryptoJS.AES.encrypt(result.getAccessToken().getJwtToken(), "Secret Passphrase");
              //POTENTIAL: Region needs to be set if not already set previously elsewhere.


            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:2a8289cc-4be6-43af-8981-6a431bec245a', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_8gW1C7PWI' : result.getIdToken().getJwtToken()
                }
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                       console.log('Successfully logged!');
                }
            });


              //insert taffy db for data fetching
              //DataEncrypted = TAFFY([{"ddn": encryptedValue}]);
              //fetch taffy db for data fetching
              //FetchEncryptedData =DataEncrypted().first().dataEncrypted;
              //FetchEncryptedData =DataEncrypted.store("ddn");
              //localStorage.setItem("guid", encryptedValue);
              $('.fixedModalbarcolumn,#loadingSymbol').hide();
              window.localStorage.setItem("guid", result.getIdToken().getJwtToken());
              var windowLocationUrl =window.location.pathname;
              var arr = windowLocationUrl.split("/");
              window.localStorage.setItem("UserRole",UserEmail);
              //alert(arr);
              var Location_url="index.html";
              window.location.href=Location_url;
          },

          onFailure: function(err) {
              //alert(err);
              toastr.error(err, "Wrong Password");
              $('#username').val('');
              $('#password').val('');
              $('.fixedModalbarcolumn,#loadingSymbol').hide();
          },
      });
    return false;
   //user authentication with validation

 //user authentication with validation
}
//forget password link
function ForgetPassword(){
  $('.card').toggleClass('flipped');
  $('.front').hide();
  $('.back').removeClass('hide');
  $('.showController').addClass('hide');
  $('.hideController').removeClass('hide');
  $('.fgPassToken').text('Forgot your password?');
  $('.EnterPromtMsg').text('Enter your Email below and we will send a message to reset your password');
}
function ChangePassword(){
  $('.card').toggleClass('flipped');
  $('.front').hide();
  $('.back').removeClass('hide');
  $('.showController').removeClass('hide');
  $('.hideController').addClass('hide');
  $('.fgPassToken').text('Change your password?');
  $('.EnterPromtMsg').text('Enter your Old Password below and we will send a message to renew your password');
}
function flip() {
    $('.card').toggleClass('flipped');
}
function BackToFront(){
    $('.card').toggleClass('flipped');
    $('.front').show();
    $('.back').addClass('hide');
}
//support only numeric numbers
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
//support only numeric numbers
var cognitoUser;
//forget paasword Verifcation
function forgetPassAuthentication() {
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  UserNameValue=$('#FgPasswordUsername').val();
  var userData = {
        Username : UserNameValue,
        Pool : userPool
    };

  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  //var cognitoUser = userPool.getCurrentUser();
  cognitoUser.forgotPassword({
        onSuccess: function (data) {
            // successfully initiated reset password request
            toastr.success("Password reset successfully","Password Reset");
	          console.log('CodeDeliveryData from forgotPassword: ' + data);
            $('#codeSent').removeClass('hide');
            $('#forgetPassword').addClass('hide');
            ForgetPasswordFetchData=data;
            $('#userEmailText').text(ForgetPasswordFetchData.CodeDeliveryDetails.Destination);
            $('.fixedModalbarcolumn,#loadingSymbol').hide();
        },
        onFailure: function(err) {
            toastr.error(err,"Mismatch Password");
            $('#FgPasswordUsername').val('');
            $('.fixedModalbarcolumn,#loadingSymbol').hide();
        }
    });
    return false;
}

function VerificationUser() {
    var verificationCode = $('#verification_code').val();
    var passMatch="Password Match Successfully";
    var passConf="Password confirmed!";
    var passNotMatch="Password Does Not Match";
    if($('#new_password').val()==$('#confirmPassword').val()){
        $('.fixedModalbarcolumn,#loadingSymbol').show();
        var newPassword = $('#confirmPassword').val();
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
                toastr.success(passMatch, passConf);
                console.log('Password confirmed!');
                $('#verification_code').val('');
                $('#new_password').val('');
                $('#confirm_password').val('');
                $('.fixedModalbarcolumn,#loadingSymbol').hide();
                setTimeout(function () {
                    BackToFront();
                }, 100);
            },
            onFailure(err) {
                toastr.error(err.message,"Password not confirmed!");
                console.log('Password not confirmed!');
                $('#verification_code').val('');
                $('#new_password').val('');
                $('#confirm_password').val('');
                $('.fixedModalbarcolumn,#loadingSymbol').hide();
            }
        });
    }
    else{
      toastr.error('New Password and Confirm Password not confirmed',"Confirmed Password");
    }
    return false;
}
//change my password
function ChangePassAuthentication(){
  var UserName=$('#User_Name_details').val();
  var userData = {
        Username : UserName,
        Pool : userPool
    };
  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  var oldPassword = $('#old_password').val();
  var newPassword = $('#new_password_hidden').val();
  cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
        if (err) {
            $('.fixedModalbarcolumn,#loadingSymbol').hide();
            alert(err);
            return;
        }
        $('.fixedModalbarcolumn,#loadingSymbol').hide();
        console.log('call result: ' + result);
    });
  return false;
}
