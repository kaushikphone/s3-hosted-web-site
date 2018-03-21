var jsData;
var dynamicHeader = [];
var responseDataTable,d,DataTableId;
var columnNumber;
var targets;
var AppendNewQuarterArray;
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
                       apiKey: '2006-03-01',
                     });
                     var today = new Date();
                     var quarter=$("#sel_qtr").find("option:selected").val();
                     //var quarter ="Q"+ Math.floor((today.getMonth() + 3) / 3);
                     YearSelectedValue=parseInt(today.getFullYear()-1);
                     QuarterSelectedValue=quarter;
                     ReportDataBinding(YearSelectedValue,QuarterSelectedValue);
                }
            });
//job report ststus page binding
function ReportDataBinding(YearSelectedValue,QuarterSelectedValue) {
  //alert("Report data");
  //$("#ShowDataBar").trigger("click");
  apigClient.reportGet({SPName:"sp_investment_report",year:YearSelectedValue,qtr:QuarterSelectedValue})
      .then(function(response){
         responseDataTable=response;
         console.log(response);
         DataTableId=$('#kkrReport');
         //columnNumber=[7],
         //columnNumber=[6,7,8,9,10,11,12,13,14,15,16,17];
         targets=[6,7,8,9,10,11,12,13,14,15,16,17];
         DynamicHeader();
         loadDataTable(DataTableId,targets);
         console.log("Before Expire:"+AWS.config.credentials.accessKeyId);
         AWS.config.credentials.expired = true;
         console.log("After Expire:"+AWS.config.credentials.accessKeyId);
      }).catch( function(response){
        console.log(response);
      });
      //dynamic header function
}
//report data onchange ReportDataBinding
function ReportDataOnchangeBinding() {
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  YearSelectedValue=$('#sel_year').find('option:selected').val();
  QuarterSelectedValue=$('#sel_qtr').find('option:selected').val();
  ReportDataBinding(YearSelectedValue,QuarterSelectedValue);
}
//open data load status report
function DynamicHeader(){
	      dynamicHeader.length=0;
        var firstItem = responseDataTable.data[0][0];
        for(key in firstItem) {
          var columns = {};
          //console.log(response);
          columns.data = key;
          key=key.replace(/_/g, '&nbsp');
          columns.title = key;
  				dynamicHeader.push(columns);
	};
}

//logical year Binding
function logicalYearBinding(){
    var today = new Date();
    d = new Date();
    curr_year = d.getFullYear();
    var CurrentQuarter ="Q"+ Math.floor((today.getMonth() + 3) / 3);
    //Quarter one block
    if(CurrentQuarter=="Q1"){
      var QuarterArray=["Q4","Q3","Q2","Q1"];

      for(var i = 0; i < QuarterArray.length; i++)
      {
          document.getElementById('sel_qtr').options[i] = new Option(QuarterArray[i],QuarterArray[i]);
      }

      for(var m = 0; m <= curr_year-2017; m++)
      {
          document.getElementById('sel_year').options[m] = new Option(curr_year-m,curr_year-m);
      }
        $("#sel_year option:eq(1)").attr('selected','selected');
    }

    //Quarter two block
    else if(CurrentQuarter=="Q2"){
      var QuarterArray=["Q1","Q2","Q3","Q4"];
      AppendNewQuarterArray=QuarterArray.length;
      for(var i = 0; i < QuarterArray.length; i++)
      {
          document.getElementById('sel_qtr').options[i] = new Option(QuarterArray[i],QuarterArray[i]);
      }
      for(var m = 0; m <= curr_year-2017; m++)
      {
          document.getElementById('sel_year').options[m] = new Option(curr_year-m,curr_year-m);
      }
      $("#sel_year option:eq(0)").attr('selected','selected');
    }

    //Quarter three block
    else if(CurrentQuarter=="Q3"){
      var QuarterArray=["Q2","Q3","Q4","Q1"];
      for(var i = 0; i < QuarterArray.length; i++)
      {
          document.getElementById('sel_qtr').options[i] = new Option(QuarterArray[i],QuarterArray[i]);
      }
      for(var m = 0; m <= curr_year-2017; m++)
      {
          document.getElementById('sel_year').options[m] = new Option(curr_year-m,curr_year-m);
      }
      $("#sel_year option:eq(0)").attr('selected','selected');
    }

    //Quarter four block
    else if(CurrentQuarter=="Q4"){
      var QuarterArray=["Q3","Q4","Q1","Q2"];
      for(var i = 0; i < QuarterArray.length; i++)
      {
          document.getElementById('sel_qtr').options[i] = new Option(QuarterArray[i],QuarterArray[i]);
      }
      for(var m = 0; m <= curr_year-2017; m++)
      {
          document.getElementById('sel_year').options[m] = new Option(curr_year-m,curr_year-m);
      }

      $("#sel_year option:eq(0)").attr('selected','selected');
    }
}

//dynamic select option binding value
function populateYearSelect(){
   d = new Date();
   curr_year = d.getFullYear();
   var yearArray=[2017,curr_year];
   for(var i = 0; i <= curr_year-2017; i++)
   {
       document.getElementById('sel_year').options[i] = new Option(curr_year-i,curr_year-i);

   }
}
function CurrentQtr(){
  var today = new Date();
  YearSelectedValue=parseInt(today.getFullYear());
  //var vv =Math.floor((today.getMonth() + 3) / 3);
  var vv =Math.floor((today.getMonth() + 3) / 3);
  for(var i = 0; i < 4; i++)
  {
      var quarter =vv+i;
      if(quarter > 4){
        for(var m = 0; m < i-m; m++){
            quarter=1+m;
        }
      }
      var FinalQtr="Q"+(quarter);
      document.getElementById('sel_qtr').options[i] = new Option(FinalQtr,FinalQtr);
  }
}
//Binding dropdown value for data set binding
function ShowDropDownReport(){
  $('.fixedModalbarcolumn,#loadingSymbol').show();
  YearSelectedValue=$('#sel_year').find('option:selected').val();
  QuarterSelectedValue=$('#sel_qtr').find('option:selected').val();
  ReportDataBinding(YearSelectedValue,QuarterSelectedValue);
}
//Trigger button and open one report//

//Trigger button and open one report//
function OpenReport(){
  YearSelectedValue=$('#sel_year').find('option:selected').val();
  QuarterSelectedValue=$('#sel_qtr').find('option:selected').val();
  DataLoadStatusBar(YearSelectedValue,QuarterSelectedValue);
  $('#reportModal').modal('show');
}
//Data table bind from url
function loadDataTable(){
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
			"aaData":responseDataTable.data[1],
			"aoColumnDefs": [
				{"aTargets":  targets,'className':'text-right', "mRender": function (data, type, full) {
     				var formmatedvalue=data.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      			return formmatedvalue
    }}
					//{ "bVisible": true, "aTargets": targets }
			],
			"columns":dynamicHeader,
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
        }
			//'columnDefs':[
				//{
				//'targets':columnNumber,
				//'className':'text-right',
				//'render' : $.fn.dataTable.render.number(',', '.', 2, '')
				//}
			//]
	});
}
//uploaded to s3//
function OpenAmazonS3(){
	$('#awsModal').modal('show');
}
