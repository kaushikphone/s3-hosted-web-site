var jsData;
var dynamicHeader = [];
var responseDataTable,d,DataTableId;
var columnNumber;
var targets;
var PushValue=[];
var newArray=[];
$('.fixedModalbarcolumn,#loadingSymbol').show();
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
				{"mDataProp":"CreatedOn","title":"CreatedOn"},
				{"mDataProp":"LastModifiedOn","title":"LastModifiedOn"}
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
						{"mDataProp":"StartedOn","title":"StartedOn"},
						{"mDataProp":"LastModifiedOn","title":"LastModifiedOn"},
						{"mDataProp":"CompletedOn","title":"CompletedOn"},
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

//uploaded to s3//
$(document).ready(function(){
	DataLoadStatusBar();
	//var table = $('#jobStatusReport').DataTable();
})
