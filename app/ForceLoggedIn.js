/*
$(document).ready(function(){
	//alert(localStorage.getItem("taffy_dataEncrypted"));
	//var FetchEncryptedData =DataEncrypted().first().dataEncrypted;
	//var decrypted = CryptoJS.AES.decrypt(sessionStorage.getItem("guid"), "Secret");
		if(sessionStorage.getItem("guid") == null)
		{
			window.location.replace("user_authentication.html");
		}

	});
*/
var cognitoUser = userPool.getCurrentUser();
if (cognitoUser != null)
{
	cognitoUser.getSession(function(err, session) {
            if (err)
						{
								window.location.replace("user_authentication.html");
            }
					});
}
else {
	window.location.replace("user_authentication.html");
}

function LogOutScreen(){
  var cognitoUser = userPool.getCurrentUser();
	cognitoUser.signOut();
	window.location.href="user_authentication.html";
}
//function autoRefresh(){
		//if(AWS.config.credentials.expired==true){cognitoUser.signOut()}
//}
//autoRefresh();
