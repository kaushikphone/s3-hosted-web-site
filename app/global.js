var userData,authenticationDetails,cognitoUser,FetchEncryptedData,DataEncrypted,UserNameValue,ForgetPasswordFetchData;
var poolData = {UserPoolId : 'us-east-1_8gW1C7PWI',ClientId : '78tpfsbdil9292r5hcihusnmia'};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var attributeList = [];
//var dataEmail={};
//var dataPhoneNumber={};
var authenticationData={};
var attributeEmail,attributePhoneNumber;
var hello = 'new';
var keySize = 256;
var ivSize = 128;
var iterations = 100;
var password = "Secret Password";
var UpdatedUserList,YearSelectedValue,QuarterSelectedValue;
//var Crypt = new Crypt();