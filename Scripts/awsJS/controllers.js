'use strict';
var s3,d,curr_year,arr,responseDataTable,rowOffset,textArr,startNumber,endNumber;
var controllers = angular.module('controllers', []);
//Display File name inside result div//
function displayTablename(){
    var x = document.getElementById("fileupload");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                var FileType=x.files[i].type;
                var ext = $('#fileupload').val().split(".").pop().toLowerCase();
                if ($.inArray(ext, ["xlsx"]) | (ext, ["xls"]) === -1) {
                    //toastr.error("Please upload xls or .xlsx file(s)!", "File extension mismatch");
                    toastr.error("Please upload only .xlsx file(s)!", "File extension mismatch");
                    $('.fixedModalbarcolumn,#loadingSymbol').hide();
                    return false;
                }
                else{
                    //txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                    var file = x.files[i];
                      if ('name' in file) {
                        txt += "<br><strong>"+file.name+"</strong><br>";
                        //txt += "name: " + file.name + "<br>";
                      }
                      if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                      }
              }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }

    document.getElementById("listedFileName").style.display="block";
    document.getElementById("results").innerHTML = txt;
}
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
  startNumber=[];
  endNumber=[];
  textArr=[];
  $('select').each(function() {
    arr.push($(this).val());
    rowOffset.push($(this).find('option:selected').attr('row-offset'));
    startNumber.push($(this).find('option:selected').attr('data-startnumber'));
    endNumber.push($(this).find('option:selected').attr('data-endnumber'));
    textArr.push($(this).find('option:selected').text());
    //arr.push({'Value':$(this).val(),'rowOffset':$(this).find('option:selected').attr('row-offset')});
  });
  if(arr.indexOf("select") == -1){
     $('#UploadBtnHolder').removeAttr('disabled');
     $('#TriggerJob').removeClass('disabledJob');
     $('#fileupload').removeAttr('disabled');

  } else {
    $('#UploadBtnHolder').attr('disabled','disabled');
    $('#TriggerJob').addClass('disabledJob');
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
    AWS.config.update({region: bucketRegion});
    //const s3 = new AWS.S3({apiVersion: '2006-03-01',params: {Bucket: BucketName}});
    s3 = new AWS.S3({apiVersion: '2006-03-01',params: {Bucket: BucketName}});
    //hash map in javascript object//
    //hash map in javascript object//
    $scope.upload = function() {
       //console.log(arr);
       $('#listedFileBar').empty();
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
            toastr.error("Please upload only .xlsx file(s)!", "File extension mismatch");
            $('.fixedModalbarcolumn,#loadingSymbol').hide();
            return false;
        } else {
           for(var i=0; i<files.length; i++){
            var file = files[i];
            console.log(arr);
            var LastModifiedDate=Date.parse(new Date());
            var rowOffestValue=rowOffset[0];
            var startnumber=startNumber[0];
            var endnumber=endNumber[0];
            var fileName=textArr[0]+'_'+rowOffestValue+'_'+i+'_'+startnumber+'_'+endnumber+'_'+LastModifiedDate+'_'+arr[2]+' '+arr[1]+'.'+ext;
            //alert(fileName);
            if (file) {
                var objKey = arr[0]+fileName;
                var params = {Key: objKey,ContentType: file.type,Body: file};
                console.log(files[i].name);
                //bucket put objects
                s3.putObject(params, function(err, response) {
                    if (err) {
                       toastr.error("Error uploading data: ", err);
                       console.log("Error uploading data: ", err);
                    } else {
                        console.log(response);
                        toastr.success('File Uploaded Successfully');
                        console.log("Successfully uploaded data to myBucket/myKey");
                        $('.fixedModalbarcolumn, #loadingSymbol').addClass('hide');
                        $('#UploadBtnHolder').attr('disabled','disabled');
                        //listObjs();
                    }
                });

            }

            //This function is for listing bucket from aws
            /*function listObjs(){
              listKeys({
                  bucket: BucketName,
                  prefix: 'aws-glue/source-files/excel-source-files/'
              }, function(error, keys) {
                  if (error) {
                      return console.error(error);
                  }
                  else{
                  _.each(keys, function(key) {
                      if (key.indexOf(fileName) > -1) {
                          toastr.error("File already exists . Please rename the file and try again", "Duplicate File Error");
                          $('.fixedModalbarcolumn,#loadingSymbol').hide();
                          returnFromLoop = true;
                          return false;
                          }
                    });
                }
         });
       }*/
        function listObjs() {
            s3.listObjects({
               Prefix: 'aws-glue/source-files/excel-source-files/'
            }, function(err, data) {
                if (err) {
                    results.innerHTML = 'ERROR: ' + err;
                } else {
                    var objKeys = "";
                    data.Contents.forEach(function(obj) {
                        objKeys += obj.Key + "<br>";
                    });
                    results.innerHTML = objKeys;
                }
            });
        }









      }
    }
  };
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
