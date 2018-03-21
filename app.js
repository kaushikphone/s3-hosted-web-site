var jsData;
var dynamicHeader = [];
var responseDataTable,d,DataTableId;
var columnNumber;
var targets;
$('.fixedModalbarcolumn,#loadingSymbol').show();
//open data load status report
function DataLoadStatusBar(){
	apigClient.dataloadstatusGet()
    .then(function(response){
			responseDataTable=response;
			DataTableId=$('#dataLoadStatus');
			columnNumber=[];
			targets=[];
			DynamicHeader();
			loadDataTable(DataTableId,columnNumber,targets);
    }).catch( function(result){
      console.log("The error is"+result);
    });
}
//Trigger button and open one report//
apigClient.reportGet()
    .then(function(response){
			 responseDataTable=response;
       DataTableId=$('#kkrReport');
			 columnNumber=[6,7,8,9,10,11,12,13,14,15,16,17];
			 targets=[ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ];
			 DynamicHeader();
			 loadDataTable(DataTableId,columnNumber,targets);
    }).catch( function(response){
      console.log(response);
    });
		//dynamic header function
		function DynamicHeader(){
			dynamicHeader.length=0;
			$.each( responseDataTable.data[0], function( key, value ) {
						var columns = {};
						columns.data = key;
						key=key.replace(/_/g, '&nbsp');
						columns.title = key;
						dynamicHeader.push(columns);
			});
		}
//Trigger button and open one report//
function OpenReport(){
  DataLoadStatusBar();
  $('#reportModal').modal('show');
}
//Data table bind from url
function loadDataTable(){
	//dynamic key and value pair
	$('.fixedModalbarcolumn,#loadingSymbol').hide();
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
					{ "bVisible": true, "aTargets": targets }
			],
			"columns":dynamicHeader,
			'columnDefs':[
				{
				'targets':columnNumber,
				'className':'text-right',
				'render' : $.fn.dataTable.render.number( ',', '.', 2 )
				}
			]
	});
}
//uploaded to s3//
function OpenAmazonS3(){
	$('#awsModal').modal('show');
}
