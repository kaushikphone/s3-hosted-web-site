var jsData;
var dynamicHeader = [];
var responseDataTable,d,DataTableId;
var columnNumber;
var targets;
var PushValue=[];
var newArray=[];
var dynamicThis,FileName,splitFileName,LoadId,SPName,TrLength,TableLength;
var i=0;
$('.fixedModalbarcolumn,#loadingSymbol').show();

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
										 DataLoadStatusBar();
                     SpCreatebtnvisibility();
                     console.log('Successfully logged!');
                }
            });
//open data load status report
function DataLoadStatusBar(){
	apigClient.etljobstatusGet()
    .then(function(response){
			responseDataTable=response.data.Jobs;
			//console.log(responseDataTable);
			//var restponseTable = response.data.jobs.map(i=>(i.Name , i.CreatedOn));
			DataTableId=$('#etljobstatusGet');
			columnNumber=[];
			targets=[];
			//DynamicHeader();
			loadDataTable();
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
//Trigger button and open one report//
//report opening from job status pageSize
function OpenReport(){
  DataLoadStatusApi();
  $('#reportModal').modal('show');
}
//Data Load Status Bar Creation
function DataLoadStatusApi(){
	apigClient.dataloadstatusGet({SPName:'sp_report_count'})
    .then(function(response){
      console.log(response);
			responseDataTable=response;
      TableLength=response.data.length;
			DataTableId=$('#dataLoadStatus');
			columnNumber=[];
			targets=[];
			DynamicHeader();
			loadDataTableApi(DataTableId,columnNumber,targets);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
//dynamic header function
	function DynamicHeader(){
      dynamicHeader.length=0;
      var firstItem = responseDataTable.data[0];
      for(key in firstItem) {
        var columns = {};
        //console.log(response);
        columns.data = key;
        key=key.replace(/_/g, '&nbsp');
        columns.title = key;
        dynamicHeader.push(columns);
      };
}
//Trigger button and open one report//
//Data table bind from url
function loadDataTable(){
	//console.log(responseDataTable.Jobs);
	//dynamic key and value pair
	$('.fixedModalbarcolumn,#loadingSymbol').hide();
	//DataTableId.DataTable().clear().draw();
	$('#jobStatusReport').DataTable({
		"destroy": true,
		"responsive":true,
		"filter":true,
		"orderable":true,
		"binfo":false,
			"dom": 'Bfrtip',
			//"scrollY":"60vh",
			//"bScrollCollapse":true,
			//"sScrollX":"100%",
			'buttons': [
			{ extend: 'csv', className: 'btnsvgbackground' },
			{ extend: 'excel', className: 'btnsvgbackground' },
			{ extend: 'pdfHtml5', className: 'btnsvgbackground', orientation: 'landscape', pageSize: 'A2' }
		],
			"aaData":responseDataTable,
			"aoColumnDefs": [
					{ "bVisible": true, "aTargets": [ 0,1,2 ] }
			],
			"columns":[
				{"mDataProp":"Name","title":"Name"},
				{"mDataProp":"CreatedOn","title":"CreatedOn",
				"render": function (data, type, JsonResultRow, meta) {
					return moment(JsonResultRow.CreatedOn).format('MMMM Do YYYY, h:mm:ss a')
				}
			},
				{"mDataProp":"LastModifiedOn","title":"LastModifiedOn",
				"render": function (data, type, JsonResultRow, meta) {
					return moment(JsonResultRow.LastModifiedOn).format('MMMM Do YYYY, h:mm:ss a')
				}
				}
			],
			'columnDefs':[
				{
				'targets':columnNumber,
				'className':'text-right',
				'render' : $.fn.dataTable.render.number( ',', '.', 2 )
				}
			]
	});

	$('#jobStatusReport tbody').on('click', 'tr', function() {
		$('.fixedModalbarcolumn,#loadingSymbol').show();
		var indexValue = $('#jobStatusReport').DataTable().row( this ).index();
		var JobName = $('#jobStatusReport').DataTable().row(indexValue).data()['Name'];
		getJobRunId(JobName);
});
}
//job status api show charAt
function loadDataTableApi(){
	//dynamic key and value pair
	$('.fixedModalbarcolumn,#loadingSymbol').hide();
  //DataTableId.dataTable().fnClearTable();
	//DataTableId.DataTable().clear().draw();
	DataTableId.DataTable({
		"destroy": true,
		"responsive":true,
		"filter":true,
		"orderable":true,
		"binfo":false,
			"dom": 'Bfrtip',
			"scrollY":"60vh",
			"bScrollCollapse":true,
			"sScrollX":"100%",
			'buttons': [
			{ extend: 'csv', className: 'btnsvgbackground' },
			{ extend: 'excel', className: 'btnsvgbackground' },
			{ extend: 'pdfHtml5', className: 'btnsvgbackground', orientation: 'landscape', pageSize: 'A2' }
		],
			"aaData":responseDataTable.data,
			"aoColumnDefs": [
				{"aTargets":  targets,'className':'text-right', "mRender": function (data, type, full,row) {
     				var formmatedvalue=data.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      			return formmatedvalue
    }}
					//{ "bVisible": true, "aTargets": targets }
			],
			//"columns":dynamicHeader,
      "columns":[
        {"mDataProp":"file_name","title":"File Name"},
        {"mDataProp":"load_time","title":"Load Time"},
        {"mDataProp":"year","title":"Year"},
        {"mDataProp":"quarter","title":"Quarter"},
        {"mDataProp":"number_of_records","title":"Number of records"},
        {"mDataProp":"Show","title":"Show","render": function (data, type, JsonResultRow, meta,row) {return '<a class="table-edit" title="Download" onclick="ExportToExcel(this);"><i class="fa fa-download" aria-hidden="true"></i></a>';}},
        {"mDataProp":"Delete","title":"Delete","render": function (data, type, JsonResultRow, meta,row) {return '<a class="table-edit" title="Delete" data-load-id='+JsonResultRow.load_id+' onclick="DeleteFileName(this);"><i class="fa fa-trash-o" aria-hidden="true"></i></a>';}}
      ],
			"language": {
    "thousands": "'"
  },
			"formatNumber": function ( toFormat ) {
    return toFormat.toString().replace(
      /\B(?=(\d{3})+(?!\d))/g, "'"
    );
  },
			"language": {
            "decimal": ",",
            "thousands": "."
        },
			'columnDefs':[
				{
				'targets':columnNumber,
				'className':'text-right',
				'render' : $.fn.dataTable.render.number(',', '.', 2, '')
				}
			]
	});
}
//onClick data Fetch from TR

function DeleteFileName($this){
  dynamicThis=$this.parentElement.parentElement.sectionRowIndex+1;
  FileName = $('#dataLoadStatus').find('tr:eq('+dynamicThis+')').children('td:eq(0)').text();
  splitFileName=FileName.split('_')[0];
  LoadId=parseInt($this.attributes[2].value);
  SPName='sp_delete_data';
  TrLength= $('#dataLoadStatus').find('tbody').children('tr').length;
  if(TrLength==1){
    alert('Please select at least one column');
    return false;
  }
  else{
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  apigClient.dataloadshowanddeleteGet({
      SPName:SPName,
      file_name:splitFileName,
      load_time:LoadId
  })
    .then(function(response){
      $('.fixedModalbarcolumn,#loadingSymbol').hide();
      DataLoadStatusApi();
      //console.log(response);
    }).catch( function(result){
      console.log("The error is"+result);
    });
  }
}
//Delete Records from UI function
//Delete Records from UI function
//onClick data Fetch from TR
function getJobRunId(JobName){
	apigClient.etljobstatusJobrunstatusGet({jobName:JobName})
    .then(function(response){
			var JobRunDataTable=response.data.JobRuns;
			//responseDataTable=response;
			console.log(response.data);
			$('#jobRun').DataTable({
				"destroy": true,
				"responsive":true,
				"filter":true,
				"pageLength": 4,
				"orderable":true,
				"binfo":false,
					"dom": 'Bfrtip',
					//"scrollY":"60vh",
					//"bScrollCollapse":true,
					//"sScrollX":"100%",
					'buttons': [
					{ extend: 'csv', className: 'btnsvgbackground' },
					{ extend: 'excel', className: 'btnsvgbackground' },
					{ extend: 'pdfHtml5', className: 'btnsvgbackground', orientation: 'landscape', pageSize: 'A2' }
				],
					"aaData":JobRunDataTable,
					"columns":[
						{"mDataProp":"JobName","title":"JobName"},
						{"mDataProp":"StartedOn","title":"StartedOn",
						"render": function (data, type, JsonResultRow, meta) {
							return moment(JsonResultRow.StartedOn).format('MMMM Do YYYY, h:mm:ss a')
						}
					},
						{"mDataProp":"LastModifiedOn","title":"LastModifiedOn",
						"render": function (data, type, JsonResultRow, meta) {
						 return moment(JsonResultRow.LastModifiedOn).format('MMMM Do YYYY, h:mm:ss a')
					 }
					},
						{"mDataProp":"CompletedOn","title":"CompletedOn",
						"render": function (data, type, JsonResultRow, meta) {
						 return moment(JsonResultRow.CompletedOn).format('MMMM Do YYYY, h:mm:ss a')
					 }
					},
						//{"mDataProp":"JobRunState","title":"JobRunState"}
						{           "mDataProp":"JobRunState","title":"JobRunState",
                        "render": function (data, type, JsonResultRow, meta) {
													if(JsonResultRow.JobRunState=="SUCCEEDED")
                            	return '<i class="fa fa-check-circle text-sizer text-center text_green" aria-hidden="true" title='+JsonResultRow.JobRunState+'></i>';
													if(JsonResultRow.JobRunState=="STOPPED")
															return '<i class="fa fa-stop-circle text-sizer text-center" aria-hidden="true" title='+JsonResultRow.JobRunState+'></i>';
													if(JsonResultRow.JobRunState=="FAILED")
														  return '<i class="fa fa-ban text-sizer text-center" aria-hidden="true" title='+JsonResultRow.JobRunState+'></i>';
                        }
											}
					],
					 "order": [[0, "asc"]]
			});
    }).catch( function(result){
      console.log("The error is"+result);
    });
		$('.fixedModalbarcolumn,#loadingSymbol').hide();
}
function ExportToExcel ($this){
    $('.fixedModalbarcolumn,#loadingSymbol').show();
    dynamicThis=$this.parentElement.parentElement.sectionRowIndex+1;
    FileName = $('#dataLoadStatus').find('tr:eq('+dynamicThis+')').children('td:eq(0)').text();
    splitFileName=FileName.split('_')[0];
    LoadId=parseInt($this.attributes[2].value);
    SPName='sp_show_data';
    apigClient.dataloadshowanddeleteGet({
        SPName:SPName,
        file_name:splitFileName,
        load_time:LoadId
    })
      .then(function(response){
        $('.fixedModalbarcolumn,#loadingSymbol').hide();
        DataTableId=$('#dataLoadExportToexcel');
  			columnNumber=[];
  			targets=[];
        responseDataTable=response.data[0];
        dynamicHeader.length=0;
        var firstItem = responseDataTable[0];
        for(key in firstItem) {
          var columns = {};
          columns.data = key;
          //key=key.replace(/_/g, '&nbsp');
          columns.title = key;dynamicHeader.push(columns);
          //console.log(columns.title);
        };
        DataTableId.empty();
        JSONToCSVConvertor(response.data[0], FileName, true);
      }).catch( function(result){
        console.log("The error is"+result);
      });
    //DataTableId.table2excel({name: FileName, filename: FileName,exclude:"display table table-bordered"});
  }
//uploaded to s3//
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //Set Report title in first row or line
    CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    //Generate a file name
    var fileName = FileName;
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;
    parts = fileName.split(".");
    fileName = parts[0];
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//Create New user to s3 upload panel
function CreateNewUser(){
$('#UserModal').modal('show');
}
function SignUpNewUser() {
    var Useremail=$('#Useremail').val();
    var Userpwd=$('#Userpwd').val();
    $('.fixedModalbarcolumn,#loadingSymbol').show();
    var dataEmail = {Name : 'email',Value : Useremail };
    var dataPhoneNumber = {Name : 'phone_number',Value : '9475195958'};
    attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    userPool.signUp(Useremail, Userpwd, attributeList, null, function(err, result){
       if (err) {
                //alert(err);
                toastr.error(err.name, "Wrong Password");
                $('.fixedModalbarcolumn,#loadingSymbol').hide();
                return;
       }
       else{
              $('.fixedModalbarcolumn,#loadingSymbol').hide();
              $('#Useremail').val('');
              $('#Userpwd').val('');
              cognitoUser = result.user;
              toastr.success(cognitoUser.getUsername(),"New User Creation");
              $('#UserValidityForm').hide();
              $('#UserVerifiedId').removeClass('hide');
       }
         //console.log('user name is ' + cognitoUser.getUsername());
   });
    return false;
}

function UserVerification(){
      $('.fixedModalbarcolumn,#loadingSymbol').show();
      var UserName=$('#EmailIdVerfied').val();
      var verificationCode=$('#CodeVerfy').val();
      var userData = {Username : UserName,Pool : userPool };
      cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
                if (err) {
                    toastr.error(err, "Unauthenticated User");
                    return;
                }
                toastr.success(result, "User Registration Confirmed Successfully!");
                if(result=="SUCCESS"){
                    InsertUserDetails(UserName);
                    $('.fixedModalbarcolumn,#loadingSymbol').hide();
                    $('#UserModal').modal('hide');
                }
            });
return false;
}
function InsertUserDetails(UserName){
  var SPName="sp_create_user";
  apigClient.createuserPost({
      SPName:SPName,
      user_name:UserName
  })
    .then(function(response){
      console.log(response);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
function UserList(){
    $('#UserListModel').modal('show');
    $('.fixedModalbarcolumn,#loadingSymbol').show();
    apigClient.spRoleManagementGet({SPName:'sp_role_management'})
      .then(function(response){
        console.log(response);
  			responseDataTable=response;
        TableLength=response.data.length;
  			DataTableId=$('#UserListManagement');
  			columnNumber=[];
  			targets=[];
  			DynamicHeader();
  			UserManagementTable(DataTableId,columnNumber,targets);
      }).catch( function(result){
        console.log("The error is"+result);
      });
}
//User List table Binding data
function UserManagementTable(){
	$('.fixedModalbarcolumn,#loadingSymbol').hide();
	DataTableId.DataTable({
		"destroy": true,
		"responsive":true,
		"filter":true,
		"orderable":true,
		"binfo":false,
			"dom": 'Bfrtip',
			"scrollY":"60vh",
			"bScrollCollapse":true,
			'buttons': [
			{ extend: 'pdfHtml5', className: 'btnsvgbackground', orientation: 'landscape', pageSize: 'A2' }
		],
			"aaData":responseDataTable.data[0],
			//"columns":dynamicHeader,
      "columns":[
        {"mDataProp":"user_name","title":"User Name"},
        {"mDataProp":"role","title":"Role"},
        {"mDataProp":"Delete","title":"Delete","render": function (data, type, JsonResultRow, meta,row) {return '<a class="table-edit" title="Delete" onclick="DeleteUserName(this);"><i class="fa fa-trash-o" aria-hidden="true"></i></a>';}}
      ]
	});
}
//report usage method
function ReportUsage() {
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  $('#ReportUsageModel').modal('show');
  apigClient.reportusagedetailsGet({SPName:'sp_report_usage'})
    .then(function(response){
      console.log(response);
      responseDataTable=response;
      TableLength=response.data.length;
      DataTableId=$('#ReportUserManagement');
      columnNumber=[];
      targets=[];
      DynamicHeader();
      AllUserManagementDetails(DataTableId,columnNumber,targets);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
//All user list spUsageDetailsPost
function AllUserManagementDetails(){
	$('.fixedModalbarcolumn,#loadingSymbol').hide();
	DataTableId.DataTable({
		"destroy": true,
		"responsive":true,
		"filter":true,
		"orderable":true,
		"binfo":false,
			"dom": 'Bfrtip',
			"scrollY":"60vh",
			"bScrollCollapse":true,
			'buttons': [
			{ extend: 'pdfHtml5', className: 'btnsvgbackground', orientation: 'landscape', pageSize: 'A2' }
		],
			"aaData":responseDataTable.data[0],
			//"columns":dynamicHeader,
      "columns":[
        {"mDataProp":"loggedin_user_name","title":"Logged In User Name"},
        {"mDataProp":"last_usage_date","title":"Last Date"}
      ]
	});
}
//btn visibility for user
function SpCreatebtnvisibility(){
  console.log(window.localStorage.getItem("UserRole"));
  apigClient.spcreatebtnvisibilityGet({SPName:'sp_createbtn_Visibility',loggedin_user_name:window.localStorage.getItem("UserRole")})
    .then(function(response){
      if(response.data[0][0].is_superadmin=="X"){
          $('#CreateNewUserId').removeClass('hide');
      }
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
//btn visibility for user
//delete user from database and cognitoUser
function DeleteUserName($this){
   $('.fixedModalbarcolumn,#loadingSymbol').show();
    dynamicThis=$this.parentElement.parentElement.sectionRowIndex+1;
    FileName = $('#UserListManagement').find('tr:eq('+dynamicThis+')').children('td:eq(0)').text();
    //alert(FileName);
    cognitoUserDeleteMethod();
}

//delete method
function cognitoUserDeleteMethod(){
      var attributeList = [];
      attributeList.push(FileName);
      var params = {UserPoolId: 'us-east-1_8gW1C7PWI',Username: FileName};
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
           if (err) {
               toastr.error(err,"Deleted User List");
               return;
           }
           else{
           console.log('call result: ' + data);
           deleteUserFromTable();
         }
       });
}
function deleteUserFromTable(){
  apigClient.spdeleteuserPost({
      SPName:'sp_delete_user',
      user_to_delete:FileName
    })
    .then(function(response){
        UserList();
        $('.fixedModalbarcolumn,#loadingSymbol').hide();
    }).catch( function(result){
      console.log("The error is"+result);
    });
}




    //splitFileName=FileName.split('_')[0];
