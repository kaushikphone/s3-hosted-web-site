var bucketRegion = 'us-east-1';
var poolData = {UserPoolId : 'us-east-1_8gW1C7PWI',ClientId : '78tpfsbdil9292r5hcihusnmia'};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var apigClient;
//var decrypted  = CryptoJS.AES.decrypt(localStorage.getItem("guid"), "Secret Passphrase").toString(CryptoJS.enc.Utf8);
var decrypted  = window.localStorage.getItem("guid");
//var decrypted = decrypt(localStorage.getItem("guid"), password).toString(CryptoJS.enc.Utf8);
AWS.config.region = bucketRegion;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId : 'us-east-1:2a8289cc-4be6-43af-8981-6a431bec245a',
Logins : {'cognito-idp.us-east-1.amazonaws.com/us-east-1_8gW1C7PWI' : decrypted}
});
