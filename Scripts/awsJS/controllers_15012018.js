'use strict';
var s3,d,curr_year,arr,responseDataTable,rowOffset,textArr;
var controllers = angular.module('controllers', []);
function populateYearSelect(){
   d = new Date();
   curr_year = d.getFullYear();
   for(var i = 0; i < 3; i++)
   {
       if(i==0){
         $("#sel_year").append('<option value="select">Select Year</option>');
         continue;
       }
       document.getElementById('sel_year').options[i] = new Option(curr_year-i+1,curr_year-i+1);
   }
}
function getDefaultOption() {
  var AppNameController = $('#appnameController').find('option:selected').val();
  var selYearController = $('#sel_year').find('option:selected').val();
  var selQtrController =  $('#sel_qtr').find('option:selected').val();
  arr = [];
  rowOffset=[];
  textArr=[];
  $('select').each(function() {
    arr.push($(this).val());
    rowOffset.push($(this).find('option:selected').attr('row-offset'));
    textArr.push($(this).find('option:selected').text());
    //arr.push({'Value':$(this).val(),'rowOffset':$(this).find('option:selected').attr('row-offset')});
  });
  if(arr.indexOf("select") == -1){
     $('#UploadBtnHolder').removeAttr('disabled');
  } else {
    $('#UploadBtnHolder').attr('disabled','disabled');
  }
}
//Trigger job event//
function TiggerJobs(){
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  $('#JobNameIdentity').empty();
  var JobMsgName;
  var JobNameChanges=$('#JobNameIdentity').val();
    apigClient.triggerjobPost({TriggerJob:JobNameChanges})
      .then(function(response){
        $('.fixedModalbarcolumn,#loadingSymbol').hide();
        setTimeout(function(){ $('#TriggerJob').attr('disabled','disabled')}, 3000);
        JobMsgName ="The Job has been Triggered.The User will receive an e-mail notification upon completion.";
        $('#dynamicAlert').addClass('alert-success');
        $('#SuccesMsg').text(JobMsgName);
        $('#JobStatusModal').modal('show');
        console.log(response);
      }).catch( function(result){
          JobMsgName="The job is in progress. Kindly wait for a while for the job to be completed.";
          $('#dynamicAlert').removeClass('alert-success').addClass('alert-danger');
          $('#SuccesMsg').text(JobMsgName);
          $('#JobStatusModal').modal('show');
      });
}
//Trigger job event//
controllers.controller('UploadController', ['$scope', function($scope) {
    var BucketName = 'pwc-kkr-poc';
    var returnFromLoop = false;
    /*var accessKeyId = "AKIAJXTJWEDHX43S2VFA";
    var secretAccessKey = "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";
    var BucketName = 'pwc-kkr-poc';
    var bucketRegion = 'us-east-1';
    var awsCreds = new AWS.Credentials(accessKeyId, secretAccessKey);
    var destfileKeyName;
    var returnFromLoop = false;
    var fileNameExistsInHashMap = false;*/
    AWS.config.update({
        region: bucketRegion
        //,
        //credentials: awsCreds
    });
    //const s3 = new AWS.S3({apiVersion: '2006-03-01',params: {Bucket: BucketName}});
    s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
            Bucket: BucketName
        }
    });
    //hash map in javascript object//
    //hash map in javascript object//
    $scope.upload = function() {
       //console.log(arr);
       $('.fixedModalbarcolumn, #loadingSymbol').removeClass('hide');
        var files = document.getElementById('fileupload').files;
        var pushObject=[];
        var ext = $('#fileupload').val().split(".").pop().toLowerCase();
        //var newdate=
        //bucket listing from s3
        //bucket listing from s3
        if (!files.length) {
            $('.fixedModalbarcolumn, #loadingSymbol').addClass('hide');
            toastr.error('Please choose a file to upload first');
            return;
        }
        if ($.inArray(ext, ["xlsx"]) | (ext, ["xls"]) === -1) {
            toastr.error("Please upload xls or .xlsx file(s)!", "File extension mismatch");
            $('.fixedModalbarcolumn,#loadingSymbol').hide();
            //alert("Please upload a .csv file!");
            return false;
        } else {
           for(var i=0; i<files.length; i++){
            var file = files[i];
            //pushObject.push(file);
            console.log(arr);
            var LastModifiedDate=Date.parse(new Date());
            var rowOffestValue=rowOffset[0];

            //var LastModifiedDate=moment(new Date()).format('MMMM Do YYYY, h:mm:ss ms');
            //var fileName=arr[0]+'_'+LastModifiedDate+'_'+arr[2]+' '+arr[1]+'.'+ext;
            //var fileName=textArr[0]+'_'+rowOffestValue+'_'+LastModifiedDate+'_'+arr[2]+' '+arr[1]+'.'+ext;
            var fileName=textArr[0]+'_'+rowOffestValue+'_'+i+'_'+LastModifiedDate+'_'+arr[2]+' '+arr[1]+'.'+ext;
            //alert(fileName);
            //var fileName = file.name;
            //var modifiedFileName
            listKeys({
                bucket: BucketName,
                prefix: 'aws-glue/source-files/excel-source-files/'
            }, function(error, keys) {
                if (error) {
                    return console.error(error);
                }
                _.each(keys, function(key) {
                    if (key.indexOf(fileName) > -1) {
                        toastr.error("File already exists . Please rename the file and try again", "Duplicate File Error");
                        $('.fixedModalbarcolumn,#loadingSymbol').hide();
                        returnFromLoop = true;
                        return false;
                    }
                });
                if (returnFromLoop) {
                    return false;
              } else {
                    //file key mapping
                    /*fileKeyMap.forEach(function(value, key) {
                        var columns = {};
                        columns.headerModel = key;
                        if (fileName.indexOf(key) > -1) {
                            //console.log(key + ' = ' + value);
                            destfileKeyName = value;
                            fileNameExistsInHashMap = true;
                            return;
                        }
                    });*/

                    /*if (!fileNameExistsInHashMap) {
                        toastr.error("Please upload valid source file(s) name", "File Mapping Mismatch");
                        return false;
                    }*/
                    /*else {*/
                        s3.upload({
                                //Key: destfileKeyName + fileName,
                                Key: arr[0]+fileName,
                                ContentType: file.type,
                                Body:file,
                                ACL: 'public-read'
                            },
                            function(err, response) {
                                if (err) {
                                    toastr.success("Error uploading data: ", err);
                                    console.log("Error uploading data: ", err);
                                } else {
                                   console.log(response);
                                    toastr.success('File Uploaded Successfully');
                                    console.log("Successfully uploaded data to myBucket/myKey");
                                    $('.fixedModalbarcolumn, #loadingSymbol').addClass('hide');
                                }
                            });
                    /*}*/
                    //file key mapping
               }
            });
         }
        }
    }
    $scope.fileSizeLabel = function() {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}]);
