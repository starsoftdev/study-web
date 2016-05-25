<?php
/*
 * Template Name: Patients Details
 */
?>
<?php
if (is_user_logged_in()){
$user_ID = get_current_user_ID();
} else {
wp_redirect(site_url().'/login/', 301);
exit;
}

?>
<?php
// ************************************print csvfile************************
if (isset($_REQUEST['get_csv_file'])) {
    if (PHP_SAPI == 'cli')
        die('This example should only be run from a Web Browser');
    /** Include PHPExcel */
    require_once dirname(__FILE__) . '/Classes/PHPExcel.php';
// Create new PHPExcel object
    $objPHPExcel = new PHPExcel();
// Set document properties
    $objPHPExcel->getProperties()->setCreator("StudyKIK Team")
            ->setLastModifiedBy("StudyKIK Team")
            ->setTitle("Download Patient Report")
            ->setSubject("Download Patient Report")
            ->setDescription("Download Patient Report")
            ->setKeywords("Download Patient Report")
            ->setCategory("Download Patient Report");
// Add some data
    $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A6', 'Patient Status')
            ->setCellValue('B6', 'Name')
            ->setCellValue('C6', 'Email Address')
            ->setCellValue('D6', 'Mobile Number')
            ->setCellValue('E6', 'Sign Up Date')
            ->setCellValue('F6', '     Notes    ');
// Miscellaneous glyphs, UTF-8
    $aaa = $_REQUEST['pid'];
    $study_nom = get_post_meta($aaa, 'study_no', true );
    $post_title = get_the_title($aaa);
    $file = 'StudyKIK_Patient_Report.csv';
    $query2 = ("SELECT * FROM 0gf1ba_subscriber_list where post_id=$aaa");
    $get_results = $wpdb->get_results($query2);
    $total_count = count($get_results);
    $i = 6;
    $len=0;
    foreach ($get_results as $values) {
        $i++;
        $aaa_ID = $values->id;
        $query_notes = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID' ORDER BY id DESC", OBJECT);
        if ($values->row_num == 1) {
            $csv_output = "New Patient";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 2) {
            $csv_output = "Call Attempted";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 3) {
            $csv_output = "Not Qualified / Not Interested";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 4) {
            $csv_output = "Scheduled";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 5) {
            $csv_output = "Consented";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 6) {
            $csv_output = "Randomized";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        if ($values->row_num == 7) {
            $csv_output = "Action Needed";
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $csv_output);
        }
        $ln=strlen($csv_output);
		if($ln > $len){
			$len=$ln;
		}
        $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('B' . $i, $values->name)
                ->setCellValue('C' . $i, $values->email)
                ->setCellValue('D' . $i, format_telephone($values->phone))
                ->setCellValue('E' . $i, $values->date);
        $objPHPExcel->getActiveSheet()->getStyle('A6')->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('A' . $i)->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('B6')->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('B' . $i)->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('C6')->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('C' . $i)->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('D6')->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('D' . $i)->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('E6')->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        $objPHPExcel->getActiveSheet()->getStyle('E' . $i)->getAlignment()->applyFromArray(
                array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                    'rotation' => 0,
                    'wrap' => true
                )
        );
        if ($query_notes) {
            $j = 'E';
            foreach ($query_notes as $results_notes) {
                $j++;
                $date_here = str_replace("?", "", $results_notes->notes_date);
                $fianl_notes = date('m-d-Y h:i:s', strtotime($date_here));
                $notes_ = $fianl_notes . "\n" . $results_notes->notes;

                $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($j . $i, $notes_);
                $objPHPExcel->getActiveSheet()->getStyle($j . $i)->getAlignment()->applyFromArray(
                        array(
                            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                            'rotation' => 0,
                            'wrap' => true
                        )
                );
            }
        }
    }
    $styleArray = array(
        'font' => array(
            'bold' => true,
            'color' => array('rgb' => '000000'),
            'size' => 12
    ));
    $objPHPExcel->getActiveSheet()->getStyle('A6:Z6')->applyFromArray($styleArray);
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('K')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('L')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('M')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('N')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('O')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('P')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('Q')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('R')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('S')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('T')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('U')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('V')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('W')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('X')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('Y')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('Z')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AA')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AB')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AC')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AD')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AE')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AF')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AG')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AJ')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AK')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AL')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AM')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AN')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AO')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AP')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AQ')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AR')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AS')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AT')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AU')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AV')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AW')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AX')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AY')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->getColumnDimension('AZ')->setAutoSize(true);
    $objPHPExcel->getActiveSheet()->mergeCells('A1:A4');
    $objDrawing = new PHPExcel_Worksheet_Drawing();
    $objDrawing->setName('Logo');
    $objDrawing->setDescription('Logo');
    $logo = dirname(__FILE__) . '/images/studylogo.png';
    $objDrawing->setPath($logo);
    $objDrawing->setCoordinates('A1');
    $objDrawing->setHeight(40);
    $objDrawing->setWidth(250);
    $flen=round($len*8.5);
    $off=($flen-250)/2;
    if($off>0){
            $objDrawing->setOffsetX($off);
    }
    $objDrawing->setOffsetY(15);
    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// Rename worksheet
    $objPHPExcel->getActiveSheet()->setTitle('Download Patient Report');
// Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);
    $file = $study_nom.'_StudyKIK_Patient_Report.xlsx';
// Redirect output to a client's web browser (Excel5)
   header('Content-Type: application/vnd.ms-excel');
	header('Content-Disposition: attachment;filename='.$file);
	header('Cache-Control: max-age=0');
	// If you're serving to IE 9, then the following may be needed
	header('Cache-Control: max-age=1');
	// If you're serving to IE over SSL, then the following may be needed
	header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
	header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
	header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
	header ('Pragma: public'); // HTTP/1.0
	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
	$objWriter->save('php://output');
    exit;
}
/* ==================== END ================================ */
?>
<?php get_header('dashboard'); ?>
<!-- Pure Chat Snippet -->
<script type='text/javascript'>
    (function () {
        var done = false;
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript';
        document.getElementsByTagName('HEAD').item(0).appendChild(script);
        script.onreadystatechange = script.onload = function (e) {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                var w = new PCWidget({c: 'bab234e1-3a99-448d-b117-2bb29457f303', f: true});
                done = true;
            }
        };
    })();
</script>
<script type="application/javascript">
    jQuery(document).ready(function( $ ) {
    jQuery(".clear_all").hide();
    jQuery(".loading_imag").hide();
    /*jQuery( ".search_for_patient" ).keyup(function() {
    var dInput = this.value;
    var pidsds = jQuery('#pidsds').val();
    jQuery(".clear_all").show();
    jQuery(".loading_imag").show();
    jQuery('.dhe-example-section-content').hide();
    jQuery.ajax({
    type: "GET",
    url: "<?php bloginfo('url'); ?>/search-patients/",
    data: "search123=" + dInput + "&pidsds="+pidsds,
    success: function (data) {
    jQuery(".loading_imag").hide();
    jQuery('.dhe-example-section-content').html(data);
    jQuery('.dhe-example-section-content').show();
    }
    });
    });*/
    jQuery( ".clear_all" ).click(function() {
    window.location.href = window.location.href;
    });
    });
</script>
<!--<script src="<?php echo get_template_directory_uri();?>/js/jquery-ui.js"></script>
<script src="<?php echo get_template_directory_uri();?>/js/jquery-1.10.2.js"></script>-->
<script src="<?php echo get_template_directory_uri();?>/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri();?>/js/jquery.datetimepicker.full.js"></script>

 
<script>
    jQuery(document).ready(function () {
//Remove the notes functionalit from the popup
        jQuery(".removeNote").click(function () {
            var noteId = $(this).attr('id');
            var noteParentId = 'parent' + $(this).attr('id');
            console.log("To remove Note !");
            parent = $("#" + noteParentId);
            jQuery.ajax({
                type: "GET",
                url: "<?php bloginfo('url'); ?>/jquery-notes/",
                data: "notes_id=" + noteId + "&action=remove_note",
                success: function (data) {
		    var ch=data.split("@@@@");
		    $("#peactaken_"+ch[1]).html("Action Taken: "+ch[0]);
		    $("#actaken_"+ch[1]).html("Action Taken: "+ch[0]);
                    $("#parent" + noteId).remove();
                }
            });
            return false;
        });
        jQuery(".add_button").click(function () {
            jQuery(this).closest('form').addClass("selected_form");
            jQuery('.selected_form .notes_text').css('border-color', 'rgb(169, 169, 169)');
            //var notes_text = jQuery('.selected_form .notes_text').val();
            //var add_p_id = jQuery('.selected_form .add_p_id').val();
            var notes_text = jQuery(this).siblings('.notes_text').val();
            var add_p_id = jQuery(this).siblings('.add_p_id').val();
            var d = new Date();
            var dateTime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ', ' + d.toLocaleTimeString();
            if (notes_text.length > 0) {
                jQuery.ajax({
                    type: "GET",
                    url: "<?php bloginfo('url'); ?>/jquery-notes/",
                    data: "notes_text=" + encodeURIComponent(notes_text) + "&action=new_note&add_p_id=" + add_p_id + "&datetime=" + dateTime,
                    success: function (data) {
                        jQuery('#embed' + add_p_id + ' .notes_right').html(data);
                        jQuery(".notes_text").val('');
			$("#peactaken_"+add_p_id).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
			$("#actaken_"+add_p_id).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
                    }
                });
            }
        });
	
        jQuery(".closepop").click(function () {
            var notes_refresh = 'notes_refresh';
            var notes_id = jQuery(this).attr('id');
            jQuery.ajax({
                type: "GET",
                url: "<?php bloginfo('url'); ?>/jquery-notes/",
                data: "notes_refresh1=" + notes_id,
                success: function (data) {
                    jQuery('.aaaa' + notes_id).attr({"data-tooltip": data});
                }
            });

        });
    });
</script>

<script type="application/javascript">
    jQuery( document ).ready(function() {
    var aaa= jQuery( ".dhe-example-section-content" ).outerHeight();
    jQuery('.sortable-list').css({ 'min-height': aaa });
    jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();
    if (scroll >= 500) {
    jQuery(".aaaaaaaaaaa").addClass("navbar-fixed-top");
    $( "body" ).addClass( "scroll_added" );
    $("#search_btn_form").css({
    'position' : 'fixed',
    'z-index' : '99',
    'top' : '50px',
    'right' : '53px'
    });
    } else {
    jQuery(".aaaaaaaaaaa").removeClass("navbar-fixed-top");
    $( "body" ).removeClass( "scroll_added" );
    $("#search_btn_form").css({
    'position' : 'relative',
    'z-index' : '99',
    'top' : '0px',
    'right' : '0px'
    });
    }
    });
//    jQuery(window).live('resize', function(){
//	var win = jQuery(this);
//	if (win.width() < 600) {jQuery(".aaaaaaaaaaa").addClass("navbar-fixed-top");}
//    });
    });
</script>

<style>
.clinical_trial_connect {
    border-bottom: 1px solid #e7e7e7;
    color: #959ca1;
    float: left;
    font-size: 18px;
    padding-bottom: 8px;
    padding-left: 15px;
    width: 100%;
}
.clinical_trial_connect p {
    font-size:14px;
}
.scroll-area_connect {
    background: #ffffff none repeat scroll 0 0;
    border-radius: 0 4px;
    height: 350px;
    overflow: auto;
    position: relative;
}
.scroll-area_connect dl {
    margin-bottom: 2px;
    margin-top: 0;
}
</style>
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/dragdrop/style.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/dragdrop/devheart-examples.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/patient-table-responsive.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/jquery.datetimepicker.css" media="screen" />
<div id="banner_login">
    <div class="container">
        <div class="row">
            <div class="dashboard_banner">
                <header id="top">
                    <h1><a href="index.html">Kitchy Food</a><img src="<?php bloginfo('template_url'); ?>/images-dashboard/logout_logo.png" alt=""></h1>
                    <nav class="navbar navbar-default">
                        <div class="container-fluid">
                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                            </div>
                            <!-- Collect the nav links, forms, and other content for toggling -->
                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul class="nav navbar-nav">
                                 <li ><a style="margin-top: 12px;" href="<?php echo site_url();?>/dashboard/">HOME</a></li>
            <li><a href="<?php echo site_url();?>/clinical-study-information-dashboard/">LIST A <br>
              NEW STUDY</a></li>
            <li><a style="margin:12px 0 0 0px" href="<?php echo site_url();?>/rewards/">REWARDS</a></li>
            <li style="border:none;"><a  class="midsection" href="<?php echo site_url();?>/refer-listing/">REFER <br>
              A LISTING</a></li>
            <li><a style="margin-top: 12px;" href="<?php echo site_url();?>/proposal/">PROPOSAL</a></li>
            <li><a href="/invoice-receipts/">INVOICE <br />
              RECEIPTS</a></li>
            <li><a href="<?php echo site_url();?>/your-profile/?idp=Profile">MY <br/>
              ACCCOUNT</a></li>
                                </ul>
                            </div>
                            <!-- /.navbar-collapse -->
                            <div class="project_manager">
                                <h5>Stud<small>y</small><cite>KIK</cite> Project Manager: <span><?php echo get_user_meta($user_ID, 'project_manager', true); ?></span> - <span><?php echo get_user_meta($user_ID, 'phone_number', true); ?></span></h5>
                            </div>
                        </div>
                        <!-- /.container-fluid -->
                    </nav>
            </div>
        </div>
<?php
$pid = $_REQUEST['pid'];
global $wpdb;
?>
        <div class="row">
            <section class="container_current">
                <div style="margin-top:15px;">

                <div style="width: 50%; float: left; margin-top: -7px;">
                <span style="font-weight:bold;margin-left:10px;color:#9fcf67">Campaign</span><br>
		<?php
			$sel_val='all';

			if(isset($_REQUEST['campaign'])){
			    $sel_val=$_REQUEST['campaign'];
			}

			?>
			<select class="users" name="users" style="margin-left:10px;width:200px;margin-top:5px;">
			    <option <?php if($sel_val=='all'){echo 'selected="selected"';}?> value="all">All</option>



			<?php $pid = $_REQUEST['pid'];
$query = $wpdb->get_results("SELECT * FROM `0gf1ba_campaigns` WHERE post_id='$pid' order by start_date DESC", OBJECT);
foreach($query as $i => $qry){
    $st_dt=$qry->start_date;
    $en_dt=$qry->end_date;
    $campn=$qry->campaign;
    if($st_dt !=NULL && $en_dt !=NULL){
        $date = date('m/d/Y',strtotime($st_dt));
	$date_en = date('m/d/Y',strtotime($en_dt));
        $cam_dates['sdate']=$date;
	$label=$date." - ".$date_en;
    ?>
    <option <?php if($campn == $sel_val){echo 'selected="selected"';}?> value="<?php echo $campn;?>"><?php echo $label;?></option>

<?php }
}
?>
</select>
        </div>
                <div class="col-xs-4 search_right_patient">
                    <div class="form-search form-inline" id="search_btn_form">


                        <input type="text" placeholder="Search For a Patient" class="search_for_patient" onkeyup="findPatientDetail(this.value);" id="search_btn">
                        <a href="javascript:void(0);" class="clear_all">Clear Search</a>
                        <input type="hidden" value="<?php echo $pid; ?>" id="pidsds" />
                    </div>
                </div>
                </div>
		<div class="col-xs-12">
		    <?php
			$post_pid = get_post($pid);

			?>
			<?php
			if($sel_val=='all'){
			    $query = $wpdb->get_results("SELECT * FROM 0gf1ba_subscriber_list WHERE post_id = '$pid' ORDER BY id DESC", OBJECT);
			}
			else{
			    $query = $wpdb->get_results("SELECT * FROM 0gf1ba_subscriber_list WHERE post_id = '$pid' and campaign ='$sel_val' ORDER BY id DESC", OBJECT);
			}
			$tt_cn=$wpdb->num_rows;
                        $r1=0;
                        $r2=0;
                        $r3=0;
                        $r4=0;
                        $r5=0;
                        $r6=0;
                        $r7=0;
                        $all_queries=array();
                        $all_notes=array();
                        $all_ids=array();
                        $all_modified_qry=array();
                        foreach($query as $i => $qry){
                            $qid=$qry->id;
                            $all_ids[$i]=$qry->id;
                            $all_modified_qry[$qid]['subscriber']=$qry;
                        }
			if(empty($all_ids)){
			    $all_ids[]=-1;
			}
                        //echo "<pre>";
                        $str_all_ids=implode(",",$all_ids);

                        $notes_query = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id IN ( $str_all_ids )", OBJECT);
                        //print_r($notes_query);
                        foreach($notes_query as $ik => $note){
                            $note_id=$note->note_id;
                            $all_modified_qry[$note_id]['all_notes'][$ik]=$note;
                        }
			foreach($all_modified_qry as $i => $qry){
                            $n_row=$qry['subscriber']->row_num;
                            if($n_row==1){
                                $r1+=1;
                                $all_queries[1][$i]=$qry['subscriber'];
                                $all_notes[1][$i]=$qry['all_notes'];
                            }
                            if($n_row==2){
                                $r2+=1;
                                $all_queries[2][$i]=$qry['subscriber'];
                                $all_notes[2][$i]=$qry['all_notes'];
                            }
                            if($n_row==3){
                                $r3+=1;
                                $all_queries[3][$i]=$qry['subscriber'];
                                $all_notes[3][$i]=$qry['all_notes'];
                            }
                            if($n_row==4){
                                $r4+=1;
                                $all_queries[4][$i]=$qry['subscriber'];
                                $all_notes[4][$i]=$qry['all_notes'];
                            }
                            if($n_row==5){
                                $r5+=1;
                                $all_queries[5][$i]=$qry['subscriber'];
                                $all_notes[5][$i]=$qry['all_notes'];
                            }
                            if($n_row==6){
                                $r6+=1;
                                $all_queries[6][$i]=$qry['subscriber'];
                                $all_notes[6][$i]=$qry['all_notes'];
                            }
                            if($n_row==7){
                                $r7+=1;
                                $all_queries[7][$i]=$qry['subscriber'];
                                $all_notes[7][$i]=$qry['all_notes'];
                            }
                        }
                        //print_r($all_queries);
                        //print_r($all_notes);
                        $query=$all_queries[1];
                        $query2=$all_queries[2];
                        $query3=$all_queries[3];
                        $query4=$all_queries[4];
                        $query5=$all_queries[5];
                        $query6=$all_queries[6];
                        $query7=$all_queries[7];
		    ?>
		     
		    <div style="width:100%">
			<div style="width:50%;float:left;text-align:left;">
			    <h2>
				<a href="/dashboard/" class="back_button" style="color: #959ca1 !important;float: left;font-size: 18px;line-height: 28px;">&lt;&lt;-- Return to Current Studies</a>
			    </h2>
			</div>

			<div style="width:50%;float:left;text-align:right;">
			    <p></p>
			    <form action="" method="post">
				<input type="submit" style="border: medium none; float: right;" class="add_btn" value="Download Patient Report" name="get_csv_file">
			    </form>
			    <p></p>
			    <br>
			    <h2>
			    <a class="add_btn" href="javascript:void(0);" onclick="document.getElementById('embed').style.display = 'block';document.getElementById('fade').style.display = 'block'">Add Patient</a></h2>
                            <?php $pr_num=get_post_meta($pid, 'purchased_number', true);
                            //echo $pr_num;
                            if($pr_num !=""){
                             $query9 = mysql_query("SELECT id FROM 0gf1ba_calldata where to_number='$pr_num' order by from_number ASC, created DESC");

                            }
                            $tonum=0;
                            WHILE($rows = mysql_fetch_array($query9)):
                            $tonum=1;
                            break;
                            endwhile;
                            ?>
                            <?php if($tonum!=0){?>
                            <h2 style="float: right; width: 590px;margin-top:10px;">
                            <a class="add_btn callconnt" href="javascript:void(0);">Phone Records</a></h2>
                            <?php }?>
			</div>
		    </div>
		    <div style="width:100%;text-align:center;margin-top:100px;">
			<span style="font-size:24px;color:#9fcf67"><?php echo $post_pid->post_title;?></span><br>
			<span style="color: #f68d20;font: 18px helveticaregular !important;">Total Study Views:
			    <span style="color:#00aff0;">
				<?php
				if($sel_val=='all'){
				    $toal_viws=0;
				    $result = mysql_query("SELECT SUM(meta_value) AS total_views FROM 0gf1ba_postmeta where post_id='$pid' and meta_key LIKE 'views%'");
				    WHILE($rows = mysql_fetch_array($result)):
					$toal_viws=$rows['total_views'];
				    endwhile;
				    echo $toal_viws;
				}
				else if($sel_val==1){
				    echo get_post_meta($pid, 'views', true);
				}
				else{
				    echo get_post_meta($pid, 'views_'.$sel_val, true);
				}
				?>
			    </span>
			</span>
			<br>
			<span style="color: #f68d20;font: 18px helveticaregular !important;">Total Patient Referrals: <span style="color:#00aff0;"><?php echo $tt_cn;?></span></span>
		    </div>
		</div>

                <div id="center-wrapper">
                    <h1 id="updated" style="display: block; font-size: 20px; text-align: center; margin: 0px; padding: 0px; color: rgb(159, 207, 103);"></h1>
                    <div class="dhe-example-section" id="ex-2-3">
                        <div class="loading_imag" style="text-align:center;"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/ajax-loader.gif" /></div>

                        <div class="dhe-example-section-content">
                            <table class="table table-bordered aaaaaaaaaaa">
                                <thead>
                                    <tr bgcolor="#959ca1">
                                        <th><button class="contact" type="button">
                                                <p><span id="newPatients"><?php echo $r1; ?></span> New Patient</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" ><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th><button class="contact" type="button">
                                                <p><span id="callAttempted"><?php echo $r2; ?></span> Call Attempted</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" ><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th class="pad_class"><button class="contact" type="button">
                                                <p><span id="notQualified"><?php echo $r3; ?></span>  Not Qualified /<br  />
                                                    Not Interested</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" ><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th><button class="contact" type="button">
                                                <p><span id="actionNeeded"><?php echo $r7; ?></span> Action Needed</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" ><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th><button class="contact" type="button">
                                                <p><span id="scheduled"><?php echo $r4; ?></span> Scheduled</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" ><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th><button class="contact" type="button">
                                                <p><span id="consented"><?php echo $r5; ?></span> Consented</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" style="line-height: 0; content: none;"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        <th><button class="contact" type="button">
                                                <p><span id="randomized"><?php echo $r6; ?></span> Randomized</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow" style="line-height: 0; content: none;"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                    </tr>
                                </thead>
                            </table>
                            <!-- BEGIN: XHTML for example 2.3 -->
                                  <?php ?>
				 
                            <div id="example-2-3">
                                <div class="column left first">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr bgcolor="#959ca1">
                                                <th><button class="contact" type="button">
                                                        <p>New Patients</p>
                                                    </button>
                                                    <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                            </tr>
                                        </thead>
                                    </table>
              <ul id="nwPatients" spanid="newPatients" class="sortable-list">

                                        <?php
                                        $redirect_num = get_post_meta($pid, 'redirect_number', true);
                                        if ($query) {
                                            foreach ($query as $results) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID = $results->id;
                                                $item = explode(" ", $results->date);
                                                $item2 = explode(" ", $results->last_modify);
                                                if ($item[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item[0]));
                                                } else {
                                                    $sign_dt = $item[0];
                                                }
                                                if ($item2[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item2[0]));
                                                } else {
                                                    $act_dt = $item2[0];
                                                }
						if($results->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results->id . '">';
						echo '<strong id=name'.$results->id.'>' . $results->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results->id.'>' . $results->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results->id.'>' . format_telephone($results->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>


                                           <?php if ($redirect_num != '' && $results->is_front == 1 && $results->no_of_question !=0) { ?>
                                        <?php if ($results->is_callfire_qualified != 1 ){?>
                                               <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                        <?php }else{?>
                                               <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                        <?php }?>
                                                <?php }
						else{
						   if ($results->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results->id; ?>" id="add_not"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>

                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a>
                                                <a data-tooltip="<?php echo isset($query_notes[0]->notes) ? $query_notes[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" class="replacenotes aaaa<?php echo $results->id; ?>" id="add_not"><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                                </li>
                                            <?php
                                        }
                                    }
                                    ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr bgcolor="#959ca1">
                                                <th><button class="contact" type="button">
                                                        <p>Call Attempted</p>
                                                    </button>
                                                    <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                            </tr>
                                        </thead>
                                    </table>
              <ul id="caPatients" spanid="callAttempted" class="sortable-list">
                                        <?php
                                        if ($query2) {
                                            foreach ($query2 as $results2) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results2->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results2->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results2->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID2 = $results2->id;
                                                $item2 = explode(" ", $results2->date);
                                                $item22 = explode(" ", $results2->last_modify);
                                                if ($item2[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item2[0]));
                                                } else {
                                                    $sign_dt = $item2[0];
                                                }
                                                if ($item22[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item22[0]));
                                                } else {
                                                    $act_dt = $item22[0];
                                                }
						if($results2->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results2->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results2->id . '">';
                                                echo '<strong id=name_'.$results2->id.'>' . $results2->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results2->id.'>' . $results2->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results2->id.'>' . format_telephone($results2->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results2->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results2->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results2->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                                <?php if ($redirect_num != '' && $results2->is_front == 1 && $results2->no_of_question !=0) { ?>
                                        <?php if ($results2->is_callfire_qualified != 1 ){?>
                                                  <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results2->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results2->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                        <?php }else{?>
                                                  <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results2->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results2->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                        <?php }?>
                                                      <?php }
						      else{
						   if ($results2->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results2->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results2->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results2->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a> <a data-tooltip="<?php echo isset($query_notes2[0]->notes) ? $query_notes2[0]->notes : 'Add notes'; ?>" data-tooltip-position="top"  onclick="document.getElementById('embed<?php echo $results2->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results2->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results2->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                                </li>
                                                    <?php
                                                }
                                            }
                                            ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr bgcolor="#959ca1">
                                                <th><button class="contact" type="button">
                                                        <p>Not Qualified/<br  />
                                                            Not Interested</p>
                                                    </button>
                                                    <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                            </tr>
                                        </thead>
                                    </table>
              <ul id="nqPatients" spanid="notQualified" class="sortable-list">
                                        <?php
                                        if ($query3) {
                                            foreach ($query3 as $results3) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results3->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results3->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results3->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID3 = $results3->id;
                                                $item3 = explode(" ", $results3->date);
                                                $item23 = explode(" ", $results3->last_modify);
                                                if ($item3[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item3[0]));
                                                } else {
                                                    $sign_dt = $item3[0];
                                                }
                                                if ($item23[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item23[0]));
                                                } else {
                                                    $act_dt = $item23[0];
                                                }
						if($results3->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results3->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results3->id . '">';
                                               echo '<strong id=name_'.$results3->id.'>' . $results3->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results3->id.'>' . $results3->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results3->id.'>' . format_telephone($results3->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results3->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results3->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results3->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                                <?php if ($redirect_num != '' && $results3->is_front == 1 && $results3->no_of_question !=0) { ?>
                                                     <?php if ($results3->is_callfire_qualified != 1 ){?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results3->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results3->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                                     <?php }else{?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results3->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results3->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                                     <?php }?>
                                                <?php }
						else{
						   if ($results3->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results3->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results3->id; ?>" id="add_not"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results3->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a> <a data-tooltip="<?php echo isset($query_notes3[0]->notes) ? $query_notes3[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results3->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results3->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
						    <input type="text" class="patlitext" id="patlii<?php echo $results3->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
						</li>
                                                    <?php
                                                }
                                            }
                                            ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr bgcolor="#959ca1">
                                                <th><button class="contact" type="button">
                                                        <p> Action Needed</p>
                                                    </button>
                                                    <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                            </tr>
                                        </thead>
                                    </table>
              <ul id="anPatients" spanid="actionNeeded" class="sortable-list">
                                        <?php
                                        if ($query7) {
                                            foreach ($query7 as $results7) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results7->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results7->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results7->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID7 = $results7->id;
                                                $item7 = explode(" ", $results7->date);
                                                $item27 = explode(" ", $results7->last_modify);
                                                if ($item7[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item7[0]));
                                                } else {
                                                    $sign_dt = $item7[0];
                                                }
                                                if ($item27[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item27[0]));
                                                } else {
                                                    $act_dt = $item27[0];
                                                }
						if($results7->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results7->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results7->id . '">';
                                              echo '<strong id=name_'.$results7->id.'>' . $results7->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results7->id.'>' . $results7->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results7->id.'>' . format_telephone($results7->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results7->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results7->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results7->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                                <?php if ($redirect_num != '' && $results7->is_front == 1 && $results7->no_of_question !=0) { ?>
                                                 <?php if ($results7->is_callfire_qualified != 1 ){?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results7->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results7->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                                 <?php }else {?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results7->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results7->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                                 <?php }?>
                                                  <?php }
						  else{
						   if ($results7->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results7->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results7->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results7->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a>
                                                <a data-tooltip="<?php echo isset($query_notes7[0]->notes) ? $query_notes7[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results7->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results7->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results7->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                                </li>
                                                    <?php
                                                }
                                            }
                                            ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>
                                        <th><button class="contact" type="button">
                                                <p>Scheduled</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        </tr>
                                        </thead>
                                    </table>
              <ul id="shPatients" spanid="scheduled" class="sortable-list">
                                        <?php
                                        if ($query4) {
                                            foreach ($query4 as $results4) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results4->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results4->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results4->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID4 = $results4->id;
                                                $item4 = explode(" ", $results4->date);
                                                $item24 = explode(" ", $results4->last_modify);
                                                if ($item4[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item4[0]));
                                                } else {
                                                    $sign_dt = $item4[0];
                                                }
                                                if ($item24[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item24[0]));
                                                } else {
                                                    $act_dt = $item24[0];
                                                }
						if($results4->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results4->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results4->id . '">';
                                                 echo '<strong id=name_'.$results4->id.'>' . $results4->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results4->id.'>' . $results4->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results4->id.'>' . format_telephone($results4->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results4->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results4->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results4->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                                    <?php if ($redirect_num != '' && $results4->is_front == 1 && $results4->no_of_question !=0) { ?>
                                                    <?php if ($results4->is_callfire_qualified != 1 ){?>
                                                   <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results4->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results4->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                                    <?php }else {?>
                                                   <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results4->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results4->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                                    <?php }?>
                                                    <?php }
						    else{
						   if ($results4->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results4->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results4->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results4->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a>
                                                <a data-tooltip="<?php echo isset($query_notes4[0]->notes) ? $query_notes4[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results4->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results4->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results4->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                                <li>
                                                        <?php
                                                    }
                                                }
                                                ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr bgcolor="#959ca1">
                                                <th><button class="contact" type="button">
                                                        <p>Consented</p>
                                                    </button>
                                                    <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                            </tr>
                                        </thead>
                                    </table>
              <ul id="cnPatients" spanid="consented" class="sortable-list">
                                        <?php
                                        if ($query5) {
                                            foreach ($query5 as $results5) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results5->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results5->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results5->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID5 = $results5->id;
                                                $item5 = explode(" ", $results5->date);
                                                $item25 = explode(" ", $results5->last_modify);
                                                if ($item5[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item5[0]));
                                                } else {
                                                    $sign_dt = $item5[0];
                                                }
                                                if ($item25[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item25[0]));
                                                } else {
                                                    $act_dt = $item25[0];
                                                }
						if($results5->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results5->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results5->id . '">';
                                              echo '<strong id=name_'.$results5->id.'>' . $results5->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results5->id.'>' . $results5->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results5->id.'>' . format_telephone($results5->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results5->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results5->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results5->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                           <?php if ($redirect_num != '' && $results5->is_front == 1 && $results5->no_of_question !=0) { ?>
                                           <?php if ($results5->is_callfire_qualified != 1 ){?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results5->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results5->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                           <?php } else {?>
                                                    <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results5->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results5->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                           <?php }?>
                                                   <?php }
						   else{
						   if ($results5->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results5->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results5->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results5->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a>
                                                <a data-tooltip="<?php echo isset($query_notes5[0]->notes) ? $query_notes5[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results5->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results5->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results5->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                                </li>
                                                        <?php
                                                    }
                                                }
                                                ?>
                                    </ul>
                                </div>
                                <div class="column left">
                                    <table class="table table-bordered">
                                        <thead>

                                        <th><button class="contact" type="button">
                                                <p>Randomized</p>
                                            </button>
                                            <i class="fa fa-caret-right arrow"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/arrow_img.png" /></i></th>
                                        </tr>
                                        </thead>
                                    </table>
              <ul id="raPatients" spanid="randomized" class="sortable-list">
                                        <?php
                                        if ($query6) {
                                            foreach ($query6 as $results6) { ?>
					    <script type="text/javascript">
						jQuery(function(){
						    jQuery( "#patlii<?php echo $results6->id;?>" ).datetimepicker({
							onSelectTime:function () {
							var dt=jQuery( "#patlii<?php echo $results6->id;?>" ).val();
							//alert(dt);
							update_schedule("<?php echo $results6->id;?>", dt);
							},
							format:'Y-m-d H:i',
							formatTime:'h:i A',
							step:10,
							monthStart:0,
							monthEnd: 11,
						    });
						});
					    </script>
					    <?php
                                                $aaa_ID6 = $results6->id;
                                                $item6 = explode(" ", $results6->date);
                                                $item26 = explode(" ", $results6->last_modify);
                                                if ($item6[0] != "") {
                                                    $sign_dt = date("m-d-Y", strtotime($item6[0]));
                                                } else {
                                                    $sign_dt = $item6[0];
                                                }
                                                if ($item26[0] != "") {
                                                    $act_dt = date("m-d-Y", strtotime($item26[0]));
                                                } else {
                                                    $act_dt = $item26[0];
                                                }
						if($results6->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results6->schedule_time));
						}
						else{
						    $tm="";
						}
                                                echo '<li class="sortable-item" id="' . $results6->id . '">';
                                                echo '<strong id=name_'.$results6->id.'>' . $results6->name;
                                                echo '</strong><br />';
                                                echo '<span id=email_'.$results6->id.'>' . $results6->email;
                                                echo '</span><br />';
                                                echo '<span id=phone_'.$results6->id.'>' . format_telephone($results6->phone);
                                                echo '</span><br />';
                                                echo '<span>Signed Up: ' . $sign_dt;
                                                echo '</span><br />';
                                                echo '<span id=actaken_'.$results6->id.'>Action Taken: ' . $act_dt;
                                                echo '</span><br />';
						echo '<span>Schedule Date: <a id="linkidpg_'.$results6->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results6->id.'">'.$tm.'</a>'  ;
                                                echo '</span><br />';
                                                ?>
                                          <?php if ($redirect_num != '' && $results6->is_front == 1 && $results6->no_of_question !=0) { ?>
                                        <?php if ($results6->is_callfire_qualified != 1 ){?>
                                          <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results6->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results6->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Black.png" /></a>
                                        <?php }else {?>
                                          <a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results6->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results6->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/Green.png" /></a>
                                        <?php }?>
                                           <?php }
					   else{
						   if ($results6->broadcast_id != "" ){ ?>
							<a data-tooltip="Add notes" data-tooltip-position="top" onclick="document.getElementById('patient<?php echo $results6->id; ?>').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0);" style="margin-left: 52px;" class="replacenotes aaaa<?php echo $results6->id; ?>" id="add_not"><img  style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/phone.png" /></a>
						   <?php
						   }
						}
						?>
                                                <a href="<?php echo site_url();?>/patients-details/?pid=<?php echo $pid; ?>&delete=<?php echo $results6->id; ?>" onclick="return confirm('Are you sure you would like to delete contact?')" style="float:right; margin:0 10px;" id="add_not"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/close2.png" /></a> <a data-tooltip="<?php echo isset($query_notes6[0]->notes) ? $query_notes6[0]->notes : 'Add notes'; ?>" data-tooltip-position="top" onclick="document.getElementById('embed<?php echo $results6->id; ?>').style.display = 'block';
                                                        document.getElementById('fade').style.display = 'block'" href="javascript:void(0);" style="float:right;" id="add_not" class="replacenotes aaaa<?php echo $results6->id; ?>" ><img style="width: 22px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
							<input type="text" class="patlitext" id="patlii<?php echo $results6->id;?>" style="width:1px;height:1px;margin-left:-10px;visibility:hidden">
                                            </li>
                                                        <?php
                                                    }
                                                }
                                            ?>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearer">&nbsp;</div>
                    <!-- Notes HTML  -->
                          <?php
                      //   New Patients  li Notes
                            if ($query) {
                                 foreach ($query as $ki =>$results){
                                     if(!empty($all_notes[1][$ki])){
                                        $query_notes =$all_notes[1][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results->date);
                                    $item2 = explode(" ", $results->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results->id;?>"><?php echo 'Name: ' . $results->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results->id;?>"><?php echo 'Email: ' . $results->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results->id;?>"><?php echo 'Phone: ' . format_telephone($results->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results->id;?>"><?php
					    if($results->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results->id.'">'.$tm.'</a>'  ; ?>
					    <?php
					    if($results->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>

                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID = $results->id;
                                                //$query_notes = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes) {
                                                    foreach ($query_notes as $results_notes) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes->id; ?>" noteid="<?php echo $results_notes->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes->notes_date);
                                        echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>

                                    </div>
                                      <div id="savepatient<?php echo $results->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results->id;?>" name="spatient_id" id="patis<?php echo $results->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results->name;?>" required name="spatient_name" id="patnm<?php echo $results->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results->email; ?>" required name="spatient_email" id="patem<?php echo $results->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results->phone); ?>" required name="spatient_phone" id="patph<?php echo $results->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results->id; ?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results->is_front == 1) {
					echo "ooppps"."<br>";
					?>
                                        <div id="patient<?php echo $results->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results->no_of_question == 0 && $results->broadcast_id !="" ) { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">

							<?php if ($results->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>

						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
							</div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>

                                                                  <?php
                      //   New Patients  li Notes
                            if ($query2) {
                                foreach ($query2 as $ki =>$results2) {
                                      if(!empty($all_notes[2][$ki])){
                                        $query_notes =$all_notes[2][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results2->date);
                                    $item2 = explode(" ", $results2->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results2->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results2->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results2->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results2->id;?>"><?php echo 'Name: ' . $results2->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results2->id;?>"><?php echo 'Email: ' . $results2->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results2->id;?>"><?php echo 'Phone: ' . format_telephone($results2->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results2->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results2->id;?>"><?php
					    if($results2->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results2->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results2->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results2->id.'">'.$tm.'</a>'  ; ?>
					    <?php
					    if($results2->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results2->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results2->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results2->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID2 = $results2->id;
                                                $query_notes2 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID2' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes2) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes2) {
                                                    foreach ($query_notes2 as $results_notes2) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes2->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes2->id; ?>" noteid="<?php echo $results_notes2->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes2->notes_date);
                                                              echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes2->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results2->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results2->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                    <div id="savepatient<?php echo $results2->id; ?>" class="white_content2" style="display: none;">
                                     <form action="" method="post" id="savepts">
                                         <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                         <input type="hidden" value="<?php echo $results2->id; ?>" name="spatient_id" id="patis<?php echo $results2->id; ?>" />
                                         <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                         <input  style="width: 100%;" type="text" value="<?php echo $results2->name; ?>" required name="spatient_name" id="patnm<?php echo $results2->id; ?>" />
                                         <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                         <input  style="width: 100%;" type="text" value="<?php echo $results2->email; ?>" required name="spatient_email" id="patem<?php echo $results2->id; ?>" />
                                         <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                         <input style="width: 100%;" type="text" value="<?php echo format_telephone($results2->phone); ?>" required name="spatient_phone" id="patph<?php echo $results2->id; ?>" />
                                         <br />
                                         <input unq_id="<?php echo $results2->id; ?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                     </form>
                                     <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results2->id; ?>').style.display = 'none';
                                document.getElementById('embed<?php echo $results2->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results2->is_front == 1) { ?>
                                        <div id="patient<?php echo $results2->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results2->no_of_question == 0 && $results2->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results2->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results2->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results2->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results2->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results2->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>

						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results2->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results2->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results2->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results2->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results2->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                            <?php if ($results2->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results2->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results2->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results2->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results2->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results2->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results2->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results2->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results2->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results2->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results2->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results2->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results2->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results2->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results2->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>
                                                   <?php
                      //   New Patients  li Notes
                            if ($query3) {
                                foreach ($query3 as $ki =>$results3) {
                                       if(!empty($all_notes[3][$ki])){
                                        $query_notes =$all_notes[3][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results3->date);
                                    $item2 = explode(" ", $results3->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results3->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results3->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results3->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results3->id;?>"><?php echo 'Name: ' . $results3->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results3->id;?>"><?php echo 'Email: ' . $results3->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results3->id;?>"><?php echo 'Phone: ' . format_telephone($results3->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results3->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results3->id;?>"><?php
					    if($results3->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results3->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results3->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results3->id.'">'.$tm.'</a>'  ; ?>
					    <?php
					    if($results3->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results3->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results3->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results3->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID3 = $results3->id;
                                                $query_notes3 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID3' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes3) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes3) {
                                                    foreach ($query_notes3 as $results_notes3) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes3->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes3->id; ?>" noteid="<?php echo $results_notes3->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes3->notes_date);
                                                              echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes3->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results3->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results3->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                    <div id="savepatient<?php echo $results3->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results3->id;?>" name="spatient_id" id="patis<?php echo $results3->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results3->name;?>" required name="spatient_name" id="patnm<?php echo $results3->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results3->email; ?>" required name="spatient_email" id="patem<?php echo $results3->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results3->phone); ?>" required name="spatient_phone" id="patph<?php echo $results3->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results3->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results3->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results3->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results3->is_front == 1) { ?>
                                        <div id="patient<?php echo $results3->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results3->no_of_question == 0 && $results3->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results3->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results3->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results3->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results3->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results3->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>
						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results3->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results3->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results3->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results3->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results3->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                            <?php if ($results3->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results3->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results3->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results3->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results3->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results3->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results3->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results3->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results3->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results3->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results3->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results3->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results3->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results3->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results3->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>


                                              <?php
                      //   New Patients  li Notes
                            if ($query7) {
                                      foreach ($query7 as $ki =>$results7) {
                                       if(!empty($all_notes[7][$ki])){
                                        $query_notes =$all_notes[7][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results7->date);
                                    $item2 = explode(" ", $results7->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results7->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results7->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results7->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results7->id;?>"><?php echo 'Name: ' . $results7->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results7->id;?>"><?php echo 'Email: ' . $results7->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results7->id;?>"><?php echo 'Phone: ' . format_telephone($results7->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results7->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results7->id;?>"><?php
					    if($results7->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results7->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results7->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results7->id.'">'.$tm.'</a>'  ; ?>
					    <?php
					    if($results7->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results7->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results7->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results7->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID7 = $results7->id;
                                                $query_notes7 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID7' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes7) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes7) {
                                                    foreach ($query_notes7 as $results_notes7) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes7->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes7->id; ?>" noteid="<?php echo $results_notes7->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes7->notes_date);
                                                              echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes7->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results7->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results7->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                    <div id="savepatient<?php echo $results7->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results7->id;?>" name="spatient_id" id="patis<?php echo $results7->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results7->name;?>" required name="spatient_name" id="patnm<?php echo $results7->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results7->email; ?>" required name="spatient_email" id="patem<?php echo $results7->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results7->phone); ?>" required name="spatient_phone" id="patph<?php echo $results7->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results7->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results7->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results7->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results7->is_front == 1) { ?>
                                        <div id="patient<?php echo $results7->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results7->no_of_question == 0 && $results7->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results7->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results7->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results7->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results7->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results7->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>
						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results7->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results7->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results7->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results7->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results7->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                            <?php if ($results7->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results7->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results7->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results7->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results7->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results7->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results7->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results7->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results7->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results7->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results7->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results7->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results7->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results7->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results7->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>
                                             <?php
                      //   New Patients  li Notes
                            if ($query4) {
                                      foreach ($query4 as $ki =>$results4) {
                                       if(!empty($all_notes[4][$ki])){
                                        $query_notes =$all_notes[4][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results4->date);
                                    $item2 = explode(" ", $results4->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results4->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results4->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results4->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results4->id;?>"><?php echo 'Name: ' . $results4->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results4->id;?>"><?php echo 'Email: ' . $results4->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results4->id;?>"><?php echo 'Phone: ' . format_telephone($results4->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results4->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results4->id;?>"><?php
					    if($results4->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results4->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results4->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results4->id.'">'.$tm.'</a>'  ; ?>
					    <?php
					    if($results4->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results4->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results4->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results4->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID4 = $results4->id;
                                                $query_notes4 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID4' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes4) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes4) {
                                                    foreach ($query_notes4 as $results_notes4) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes4->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes4->id; ?>" noteid="<?php echo $results_notes4->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes4->notes_date);
                                                              echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes4->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results4->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results4->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                     <div id="savepatient<?php echo $results4->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results4->id;?>" name="spatient_id" id="patis<?php echo $results4->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results4->name;?>" required name="spatient_name" id="patnm<?php echo $results4->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results4->email; ?>" required name="spatient_email" id="patem<?php echo $results4->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results4->phone); ?>" required name="spatient_phone" id="patph<?php echo $results4->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results4->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results4->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results4->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results4->is_front == 1) { ?>
                                        <div id="patient<?php echo $results4->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results4->no_of_question == 0 && $results4->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results4->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results4->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results4->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results4->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results4->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>
						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results4->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results4->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results4->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results4->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results4->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                            <?php if ($results4->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results4->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results4->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results4->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results4->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results4->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results4->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results4->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results4->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results4->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results4->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results4->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results4->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results4->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results4->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>
<?php
                      //   New Patients  li Notes
                            if ($query5) {
                                     foreach ($query5 as $ki =>$results5) {
                                       if(!empty($all_notes[5][$ki])){
                                        $query_notes =$all_notes[5][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results5->date);
                                    $item2 = explode(" ", $results5->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results5->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results5->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results5->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results5->id;?>"><?php echo 'Name: ' . $results5->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results5->id;?>"><?php echo 'Email: ' . $results5->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results5->id;?>"><?php echo 'Phone: ' . format_telephone($results->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results5->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results5->id;?>"><?php
					    if($results5->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results5->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results5->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results5->id.'">'.$tm.'</a>'  ; ?>
					     <?php
					    if($results5->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results5->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results5->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results5->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID5 = $results5->id;
                                                $query_notes5 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID5' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes5) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes5) {
                                                    foreach ($query_notes5 as $results_notes5) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes5->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes5->id; ?>" noteid="<?php echo $results_notes5->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes5->notes_date);
                                        echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes5->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results5->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results5->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                     <div id="savepatient<?php echo $results5->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results5->id;?>" name="spatient_id" id="patis<?php echo $results5->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results5->name;?>" required name="spatient_name" id="patnm<?php echo $results5->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results5->email; ?>" required name="spatient_email" id="patem<?php echo $results5->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results5->phone); ?>" required name="spatient_phone" id="patph<?php echo $results5->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results5->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results5->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results5->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results5->is_front == 1) { ?>
                                        <div id="patient<?php echo $results5->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results5->no_of_question == 0 && $results5->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results5->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results5->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results5->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results5->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results5->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>
						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results5->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                            <?php
                                                            if ($results5->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results5->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results5->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results5->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                            <?php if ($results5->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results5->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results5->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results5->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results5->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results5->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results5->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results5->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results5->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results5->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results5->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results5->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results5->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results5->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results5->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>

                            <!--------------------------------------------->

<?php
                      //   New Patients  li Notes
                            if ($query6) {
                                     foreach ($query6 as $ki =>$results6) {
                                       if(!empty($all_notes[6][$ki])){
                                        $query_notes =$all_notes[6][$ki];
                                       }
                                     else{
                                     $query_notes =array();
                                     }
                                    $item = explode(" ", $results6->date);
                                    $item2 = explode(" ", $results6->last_modify);
                                    if ($item[0] != "") {
                                        $sign_dt = date("m-d-Y", strtotime($item[0]));
                                    } else {
                                        $sign_dt = $item[0];
                                    }
                                    if ($item2[0] != "") {
                                        $act_dt = date("m-d-Y", strtotime($item2[0]));
                                    } else {
                                        $act_dt = $item2[0];
                                    }
                                    ?>
                                    <div id="embed<?php echo $results6->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                        <div class="col-xs-12 col-md-6 notes_left">
                                            <div class="row">
                                                <h2>NOTES</h2>
                                            </div>
                                            <a  style="float: right; margin-right: -17px; margin-top: 10px;" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results6->id; ?>').style.display = 'block';document.getElementById('embed<?php echo $results6->id; ?>').style.display = 'none'"><img style="height:20px;width:20px;" src="<?php bloginfo('template_url'); ?>/images-dashboard/notes_icon.png" /></a>
                                            <div class="scrollNotes" id="pename_<?php echo $results6->id;?>"><?php echo 'Name: ' . $results6->name; ?></div>
                                            <div class="scrollNotes" id="peemail_<?php echo $results6->id;?>"><?php echo 'Email: ' . $results6->email; ?></div>
                                            <div class="scrollNotes" id="pephone_<?php echo $results6->id;?>"><?php echo 'Phone: ' . format_telephone($results->phone); ?></div>
                                            <div class="scrollNotes"><?php echo 'Signed Up: ' . $sign_dt; ?></div>
                                            <div class="scrollNotes" id="peactaken_<?php echo $results6->id;?>"><?php echo 'Action Taken: ' . $act_dt; ?></div>
					    <div class="scrollNotes" id="peschedule_<?php echo $results6->id;?>"><?php
					    if($results6->schedule_time !=""){
						$tm=date("m-d-Y, h:i A", strtotime($results6->schedule_time));
					    }
					    else{
						$tm="";
					    }
					    echo 'Schedule Date: <a id="linkid_'.$results6->id.'" href="javascript://void(0);" class="link_schd" unq_lnk="'.$results6->id.'">'.$tm.'</a>'  ; ?>
					     <?php
					    if($results6->schedule_time !=""){ ?>
						<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch<?php echo $results6->id;?>" href="javascript:void(0);" unq_lnk="<?php echo $results6->id;?>">
						    <img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png">
						</a>
					    <?php } ?>
					    </div>
                                            <form action="" method="post">
                                                <input type="hidden" value="<?php echo $results6->id; ?>" class="add_p_id" name="add_p_id" />
                                                <textarea placeholder="Write your notes in here ..." type="text" value="" class="notes_text" required name="add_notes"></textarea>
                                                <br />
                                                <button style="float: left; margin: 10px 0px;" class="add_button" type="button" value="Save Notes" name="add_notes_db"></button>
                                            </form>
                                        </div>
                                        <div class="col-xs-12 col-md-6 notes_right">
                                            <div class="row">
                                                <h2>UPDATES</h2>
                                            </div>
                                                <?php
                                                $aaa_ID6 = $results6->id;
                                                $query_notes6 = $wpdb->get_results("SELECT * FROM 0gf1ba_client_notes WHERE note_id = '$aaa_ID6' ORDER BY id DESC", OBJECT);
                                                if (count($query_notes6) > 3) {
                                                    ?>
                                                <div id="scrollNotes">Scroll down to view all notes</div>
                                                        <?php }
                                                    ?>
                                            <div data-offset="0" data-target="#myNavbar"  data-spy="scroll" class="scroll-area">
                                                <?php
                                                if ($query_notes6) {
                                                    foreach ($query_notes6 as $results_notes6) {
                                                        ?>
                                                        <dl class="clinical_trial" id="parent<?php echo $results_notes6->id; ?>">
                                                            <a href="javascript:void(0);" id="<?php echo $results_notes6->id; ?>" noteid="<?php echo $results_notes6->note_id; ?>"  style="float:right; margin:0 10px;" class="removeNote"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png" /></a>
                                                            <dt style=" color:#00afef;"><?php $date_here = str_replace("?", "", $results_notes6->notes_date);
                                        echo date('m-d-Y h:i:s', strtotime($date_here)); ?> </dt>
                                                            <dd>
                                                                <p><?php echo $results_notes6->notes; ?></p>
                                                            </dd>
                                                        </dl>
                                                        <?php
                                                        }
                                                    }
                                                    ?>
                                            </div>
                                        </div>
                                        <a class="closepop" id="<?php echo $results6->id; ?>" href="javascript:void(0);" onclick="document.getElementById('embed<?php echo $results6->id; ?>').style.display = 'none';
                                                document.getElementById('fade').style.display = 'none';">Close</a>
                                    </div>
                                    <div id="savepatient<?php echo $results6->id; ?>" class="white_content2" style="display: none;">
                                              <form action="" method="post" id="savepts">
                                        <input type="hidden" value="<?php echo $pid; ?>" name="spatient_postid" />
                                        <input type="hidden" value="<?php echo $results6->id;?>" name="spatient_id" id="patis<?php echo $results6->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results6->name;?>" required name="spatient_name" id="patnm<?php echo $results6->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
                                        <input  style="width: 100%;" type="text" value="<?php echo $results6->email; ?>" required name="spatient_email" id="patem<?php echo $results6->id; ?>" />
                                        <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
                                        <input style="width: 100%;" type="text" value="<?php echo format_telephone($results6->phone); ?>" required name="spatient_phone" id="patph<?php echo $results6->id; ?>" />
                                        <br />
                                        <input unq_id="<?php echo $results6->id;?>" style="float: left; margin: 10px 0px;" class="add_btn savepat" id="spatient_db" type="button" value="Update" name="spatient_db" />
                                    </form>
                                    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient<?php echo $results6->id; ?>').style.display = 'none';
                                            document.getElementById('embed<?php echo $results6->id;?>').style.display = 'block'">Close</a> </div>
                                    <?php if ($redirect_num != '' && $results6->is_front == 1) { ?>
                                        <div id="patient<?php echo $results6->id; ?>" class="white_content" style="cursor: auto; display: none;">
                                            <div class="col-xs-12  notes_right">
                                                <div class="row">
                                                    <h2 style="text-decoration: underline">Call Connect</h2>
                                                </div>
                                                        <?php if ($results6->no_of_question == 0 && $results6->broadcast_id !="") { ?>
                                                    <div style="padding:20px;padding-left:5px;font-size:20px;font-weight:bold;">
							<?php if ($results6->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results6->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results6->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                           <?php if ($results6->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results6->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
							    ?>
						    </div>
                                                        <?php
                                                        } else {
                                                            $num_qust = $results6->no_of_question;
                                                            ?>
                                                    <div style="font-size: 12px;margin-top: 0px;margin-bottom: 5px;">
                                                        <div class="scrollNotes" style="margin-top: -10px;margin-bottom:5px;">
                                                             <?php
                                                            if ($results6->is_callfire_qualified == 1) {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Qualified</span> for this Study.</h3>';
                                                            } else {
                                                                echo '<h3>Patient is <span style="color:#00afef;font-weight: bold;">Not Qualified</span> for this Study.</h3>';
                                                            }
                                                            ?>
							    <?php if ($results6->ivr_time != "") {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">'.date("m-d-Y", strtotime($results6->ivr_time)).'</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">'.date("h:i:s", strtotime($results6->ivr_time)).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Date:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
								echo '<h5><span style="font-weight:bold;">Time:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>

                                                            <?php if ($results6->call_duration != 0) {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">'.gmdate("i:s", $results6->call_duration).'</span></h5>';
                                                            }
                                                            else {
                                                                echo '<h5><span style="font-weight:bold;">Call Duration:</span> <span style="color:#00afef;font-weight: bold;">Not Available</span></h5>';
                                                            }
                                                            ?>
                                                        </div>
                                                <div style="height: 350px; overflow-y: auto;margin-top:20px;">
                                                <?php for ($k = 1; $k <= $num_qust; $k++) { ?>
                                                    <?php if ($k == 1) {
                                                        ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_1; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_1 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results6->answer_1 == 2) {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                 } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 2) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_2; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_2 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_2 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 3) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_3; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_3 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_3 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 4) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_4; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_4 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_4 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 5) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_5; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_5 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_5 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 6) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_6; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_6 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_6 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 7) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_7; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_7 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_7 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                    <?php }
                                            ?>
                                                    <?php if ($k == 8) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_8; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_8 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_8 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 9) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_9; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_9 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_9 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 10) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_10; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_10 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_10 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                               <?php }
                                            ?>
                                                <?php if ($k == 11) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_11; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_11 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_11 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>

					        <?php if ($k == 12) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_12; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_12 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_12 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 13) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_13; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_13 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_13 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 14) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_14; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_14 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_14 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 15) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_15; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_15 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results6->answer_15 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                              } else {
                                                 echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 16) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_16; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_16 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_16 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 17) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_17; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_17 == 1) {
                                             echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                             } else if ($results6->answer_17 == 2) {
                                             echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                               <?php }
                                             ?>
                                                <?php if ($k == 18) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_18; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_18 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_18 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                               <?php }
                                              ?>
                                               <?php if ($k == 19) {
                                                      ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_19; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_19 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_19 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                             } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 20) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_20; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_20 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_20 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                             } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                              <?php }
                                            ?>
                                                <?php if ($k == 21) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_21; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_21 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_21 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                           } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 22) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_22; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_22 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_22 == 2) {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                            echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                              } ?></div>
                                                    <?php }
                                                ?>
                                                    <?php if ($k == 23) {
                                                        ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_23; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_23 == 1) {
                                            echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                           } else if ($results6->answer_23 == 2) {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                          } else {
                                           echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                           } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 24) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_24; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_24 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_24 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php if ($k == 25) {
                                                    ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_25; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_25 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_25 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 26) {
                                                ?>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_26; ?></div>
                                            <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_26 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results6->answer_26 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 27) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_27; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_27 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results6->answer_27 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 28) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_28; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_28 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results6->answer_28 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 29) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_29; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_29 == 1) {
                                                    echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                                } else if ($results6->answer_29 == 2) {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                                } else {
                                                    echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                                } ?></div>
                                                <?php }
                                            ?>
                                            <?php if ($k == 30) {
                                                ?>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:5px;"><?php echo '<span style="font-size:13px;font-weight:bold;">Question ' . $k . ' :</span> ' . $results6->question_30; ?></div>
                                                <div class="scrollNotes" style="font-size: 12px;margin-bottom:10px;"><?php if ($results6->answer_30 == 1) {
                                                echo '<span style="font-size:13px;font-weight:bold;"><span style="font-size:13px;font-weight:bold;">Answer :</span></span> Yes';
                                            } else if ($results6->answer_30 == 2) {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> No';
                                            } else {
                                                echo '<span style="font-size:13px;font-weight:bold;">Answer :</span> Not Available Now';
                                            } ?></div>
                                                <?php }
                                            ?>
                                                <?php } ?>
                                                        </div>
                                                        <?php } ?>
                                                </div>
                                                <a class="closepop" id="pat<?php echo $results6->id; ?>" href="javascript:void(0);" onclick="document.getElementById('patient<?php echo $results6->id; ?>').style.display = 'none';
                                                        document.getElementById('fade').style.display = 'none';">Close</a>
                                            </div>

                                        </div>
                                              <?php }?>
                                        <?php } } ?>

                            <!-- End Of Notes HTML -->

                            <!-- END: XHTML for example 2.3 -->

                        </div>
                    </div>
                    <!-- Example JavaScript files -->
      <!--<script type="text/javascript" src="<?php bloginfo('template_url');?>/dragdrop/jquery-1.4.2.min.js"></script>
      <script type="text/javascript" src="<?php bloginfo('template_url');?>/dragdrop/jquery-ui-1.8.custom.min.js"></script>
      <script type="text/javascript" src="<?php bloginfo('template_url');?>/dragdrop/jquery.cookie.js"></script>
      <script type="text/javascript" src="<?php bloginfo('template_url');?>/dragdrop/jquery.ui.touch-punch.min.js"></script>-->
      <script type="text/javascript" src="<?php bloginfo('template_url');?>/dragdrop/patientdetails.js"></script>
                    <!-- Example jQuery code (JavaScript)  -->

        <!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>

            </section>
        </div>
    </div>

    <div id="embed" class="white_content2" style="display: none;">
        <form action="" method="post">
            <input type="hidden" value="<?php echo $pid; ?>" name="add_p_id" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
            <input  style="width: 100%;" type="text" value="" required name="add_name" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
            <input  style="width: 100%;" type="text" value="" required name="add_email" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
            <input style="width: 100%;" type="text" value="" required name="add_phone" />
            <br />
            <input style="float: left; margin: 10px 0px;" class="add_btn" type="submit" value="Add Patient" name="add_patient_db" />
        </form>
        <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('embed').style.display = 'none';
                document.getElementById('fade').style.display = 'none'">Close</a> </div>

<!--        <div id="savepatient" class="white_content2" style="display: none;">
                  <form action="" method="post">
            <input type="hidden" value="<?php echo $pid; ?>" name="spatient_id" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Name :</h4>
            <input  style="width: 100%;" type="text" value="" required name="spatient_name" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Email :</h4>
            <input  style="width: 100%;" type="text" value="" required name="spatient_email" />
            <h4 style="color: rgb(25, 193, 254); text-transform: uppercase;">Patient Phone Number :</h4>
            <input style="width: 100%;" type="text" value="" required name="spatient_phone" />
            <br />
            <input style="float: left; margin: 10px 0px;" class="add_btn" type="submit" value="Save Note" name="spatient_db" />
        </form>
        <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('savepatient').style.display = 'none';
                document.getElementById('fade').style.display = 'none'">Close</a> </div>-->

</div>
    <div id="embedconnect" class="white_content" style="cursor: auto; display: none;">
    <div class="col-xs-12 col-md-12 notes_left">
        <div class="row">
          <h2>Phone Records</h2>
        </div>
        <div data-offset="0" data-target="#myNavbar" data-spy="scroll" class="scroll-area_connect" id="nts_div">
        </div>
    </div>
    <a class="closepop" href="javascript:void(0);" onclick="document.getElementById('embedconnect').style.display='none';document.getElementById('fade').style.display='none';">Close</a>
</div>
<div style="display: none;border: 1px solid #f78e1e;" class="white_content" id="embedcal">
  <h2 class="heading">
        Thank you
      </h2>
  <p id="cal_popup" style="color: #000; padding: 15px; font-size: 16px; text-align: center;">
        
      </p>
  <p style="color: #000; padding: 15px; font-size: 16px; text-align: center;">
    <input type="button" value="CLOSE" class="close_button" onclick="document.getElementById('embedcal').style.display = 'none';
             document.getElementById('fade').style.display = 'none'" style="">
  </p>
</div>
<script>
		$(document).ready(function() {

   	$("#nwPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nqPatients, #anPatients, #shPatients, #cnPatients, #raPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
				'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				 success: function(html){
					if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}

                  }
			}); // end ajax
		}, // end receive
	}) // end sortable

	$("#caPatients").sortable({ // begin sortable
		connectWith: "#nwPatients, #nqPatients, #anPatients, #shPatients, #cnPatients, #raPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
				'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			}); // end ajax
		} // end receive
	}); // end sortable

	$("#nqPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nwPatients, #anPatients, #shPatients, #cnPatients, #raPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
				'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			}); // end ajax
		} // end receive
	}); // end sortable
	$("#anPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nqPatients, #nwPatients, #shPatients, #cnPatients, #raPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
			   'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			}); // end ajax
		} // end receive
	}); // end sortable
	$("#shPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nqPatients, #anPatients, #nwPatients, #cnPatients, #raPatients",
		receive: function(event, ui) { // begin receive
		    //alert("hiiii");
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			//$("#patlii"+id).attr("type",'text');
			$("#patlii"+id).datetimepicker("show");
			//$("#patlii"+id).css("visibility",'hidden');
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
				'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			}); // end ajax
		} // end receive
	}); // end sortable
	$("#cnPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nqPatients, #anPatients, #shPatients, #nwPatients, #raPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
				'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			});
 			// end ajax
		} // end receive
	}); // end sortable
	$("#raPatients").sortable({ // begin sortable
		connectWith: "#caPatients, #nqPatients, #anPatients, #shPatients, #cnPatients, #nwPatients",
		receive: function(event, ui) { // begin receive
			var id = $(ui.item).attr('id');
			var quantity = this.id;
			$.ajax({ // begin ajax
			   url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
			   type: "GET",
			   data: {
			    'id': id,
				'quantity': quantity,
				'pid':'<?php echo $pid;?>'
				},
				success: function(html){
                 if(html !=""){
						var res = html.split("@@");
						$("#newPatients").html(res[0]);
						$("#callAttempted").html(res[1]);
						$("#notQualified").html(res[2]);
						$("#actionNeeded").html(res[3]);
						$("#scheduled").html(res[4]);
						$("#consented").html(res[5]);
						$("#randomized").html(res[6]);
						$("#peactaken_"+id).html(res[7]);
						$("#actaken_"+id).html(res[7]);
					}
                  }
			}); // end ajax
		} // end receive
	}); // end sortable



});
		$(".users").change(function () {

        var user_id = this.value;
		var url      = window.location.href;
	  if(user_id == "" || user_id == ""){}else{
	  location.search = "pid=<?php echo $pid;?>&campaign="+user_id;
	 }
    });


		</script>
                 <script>
    jQuery(".callconnt").on('click',function(){
	jQuery("#fade").show();
	post_id='<?php echo $pid;?>';
	jQuery("#nts_div").html('<dl class="clinical_trial"><dt style=" color:red; margin-top:10px;">Please wait, Phone records are loading...</dt></dl>');
	jQuery("#embedconnect").show();
	jQuery.ajax({
		async: true,
		url: "<?php bloginfo('wpurl') ?>/wp-admin/admin-ajax.php",
		type:'POST',
		data: "action=dashboard_call_conncet&post_id="+ post_id + '&loop_file=dashboard_callconnects',
		success: function(html){
			jQuery("#nts_div").html(html);
		}
	});
});
</script>
<script>
    jQuery(".savepat").on('click',function(){
        var unid=jQuery(this).attr('unq_id');
        var form=jQuery('#savepts');
	//jQuery("#fade").show();
	var post_id='<?php echo $pid;?>';
        //alert('#patem'+post_id);
        var id=unid;
        var name=jQuery('#patnm'+unid).val();
        var email=jQuery('#patem'+unid).val();
        var phone=jQuery('#patph'+unid).val();
        jQuery('#email_'+unid).html(email);
        jQuery('#name_'+unid).html(name);
        jQuery('#phone_'+unid).html(phone);
        jQuery('#peemail_'+unid).html("Email: "+email);
        jQuery('#pename_'+unid).html("Name: "+name);
        jQuery('#pephone_'+unid).html("Phone: "+phone);

	//jQuery("#nts_div").html('<dl class="clinical_trial"><dt style=" color:red; margin-top:10px;">Please wait, Phone records are loading...</dt></dl>');
	//jQuery("#embedconnect").show();
	jQuery.ajax({
		async: true,
	        url: "<?php bloginfo('wpurl') ?>/wp-admin/admin-ajax.php",
		type:'POST',
                data: "action=dashboard_save_patient&post_id="+post_id+"&id="+id+"&name="+name+"&email="+email+"&phone="+phone,
		success: function(html){
			//jQuery("#nts_div").html(html);
                             jQuery('#savepatient'+unid).hide();
                             jQuery('#embed'+unid).show();
			     $("#peactaken_"+id).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
			    $("#actaken_"+id).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
		}
	});
});
jQuery(".link_schd").on('click',function(){
 
    var unid=jQuery(this).attr('unq_lnk');
    jQuery("#patlii"+unid).datetimepicker("show");
});
    function update_schedule(idd, dtt){
    var dt=dtt+":00";
    $.ajax({ 
	url: "<?php bloginfo('url'); ?>/find-listing-using-jquery/",
	type: "GET",
	data: {
	    'schid': idd,
	    'schtime': dt
	},
	success: function(html){
	    var ht=html.split("@@@@");
	    $("#linkid_"+idd).html(ht[0]);
	    $("#rmv_sch"+idd).remove();
	    var ln='<a class="removeschedule" style="float:right; margin:0 10px;margin-top:-3px;" title="remove" id="rmv_sch'+idd+'" href="javascript:void(0);" unq_lnk="'+idd+'"><img src="<?php bloginfo('template_url'); ?>/images-dashboard/delete.png"></a>';
	    $("#linkid_"+idd).after(ln);
	    $("#linkidpg_"+idd).html(ht[0]);
	    $("#cal_popup").html(ht[1]+" and a Text Reminder will be sent day before!");
	    $("#peactaken_"+idd).html("Action Taken: "+ht[2]);
	    $("#actaken_"+idd).html("Action Taken: "+ht[2]);
	    $("#embedcal").show();
	    
	}
    });
}

$(document).on('click','.removeschedule',function (){
    var unq_lnk = $(this).attr('unq_lnk');
    $.ajax({
	type: "GET",
	url: "<?php bloginfo('url'); ?>/jquery-notes/",
	data: "remove_schedule=" + unq_lnk,
	success: function (data) {
	    $("#rmv_sch"+unq_lnk).remove();
	    $("#linkid_"+unq_lnk).html("");
	    $("#linkidpg_"+unq_lnk).html("");
	    $("#peactaken_"+unq_lnk).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
	    $("#actaken_"+unq_lnk).html("Action Taken: <?php echo date('m-d-Y',strtotime('-4 hours'));?>");
	}
    });
    return false;
});
    
</script>
<div id="fade" class="black_overlay"></div>
<?php
if ($_REQUEST['add_patient_db']) {
    $add_p_id = $_REQUEST['add_p_id'];
    $add_name = $_REQUEST['add_name'];
    $add_email = $_REQUEST['add_email'];
    $add_phone = $_REQUEST['add_phone'];
    if ($add_p_id != "" || $add_name != "" || $add_email != "") {
        global $wpdb;
        $date_sub = date('Y-m-d H:i:s', strtotime('-5 hours'));
	$campaign = get_post_meta( $add_p_id, 'renewed', true );
        $query = mysql_query("INSERT INTO `0gf1ba_subscriber_list`(`id`, `name`, `email`, `phone`, `post_id`, `date`, `row_num`, `order_id`, `campaign`) VALUES (NULL,'$add_name','$add_email','$add_phone','$add_p_id','$date_sub','1','0','$campaign')");
        if ($query) {
$study_no=get_post_meta($pid, 'study_no',true );
$callfire_category=get_post_meta($pid, 'callfire_category',true );
$callfire_cat=$callfire_category;
$callfire_category=$callfire_category.' '.'('.$study_no.')';
$callfire_contact=$_REQUEST['add_phone'];
//$callfire_name=$_REQUEST['add_name'];
/*category addition code*/
if($callfire_category !='' && $callfire_contact !=''){
$wsdl = "http://callfire.com/api/1.1/wsdl/callfire-service-http-soap12.wsdl";
$client = new SoapClient($wsdl, array(
'soap_version' => SOAP_1_2,
'login'        => '41530ff4e2a8',
'password'     => 'a44dd745a81cca3c'));
$contact_no=$callfire_contact;
$query = new stdclass();
$query->MaxResults = 10000; // long
$query->FirstResult = 0; // long
$response = $client->QueryContactLists($query);
//echo "<pre>";
$response = json_decode(json_encode($response), true);
//echo "<pre>";
//print_r($response);
//echo "</pre>";
//$category_name="keshuuu";
$category_name=$callfire_category;
$list_arr=array();
if(isset($response['ContactList'][0])){
    foreach($response['ContactList'] as $cnt){
        if($cnt['Name']==$category_name){
            $list_arr=$cnt;
            break;
        }
    }
}
else{
    if(isset($response['ContactList']['id'])){
        $ct_data=$response['ContactList'];
        $response['ContactList']=array();
        $response['ContactList'][0]=$ct_data;
        foreach($response['ContactList'] as $cnt){
            if($cnt['Name']==$category_name){
                $list_arr=$cnt;
                break;
            }
        }
    }
}
if(empty($list_arr)){
     $result_cat=mysql_query("select * from `0gf1ba_subscriber_list` where post_id='$pid' and phone='$add_phone' and email='$add_email' order by id desc limit 1");

         while($row = mysql_fetch_assoc($result_cat)) {
             //print_r($row);
                $id=$row["id"];
                $fname=$row["name"];
            }

    $request = new stdClass();
    $request->Name =$category_name; // string required
    $request->Validate=false;
    $request->ContactSource = new stdclass(); //  required
    $request->ContactSource->Contact = array(); //required choice
    $request->ContactSource->Contact[0] = new stdClass(); // object
    //$request->ContactSource->Contact[0]->firstName = 'kamala1'; // string
    $request->ContactSource->Contact[0]->firstName = $fname; // string
    $request->ContactSource->Contact[0]->lastName = ''; // string
    $request->ContactSource->Contact[0]->mobilePhone = $callfire_contact; // PhoneNumber
    $response = $client->CreateContactList($request);

}
else{
    //print_r($list_arr);
    $list_id=$list_arr['id'];
    $query = new stdclass();
    $query->MaxResults = 1000; // long
    $query->FirstResult = 0; // long
    $query->Field = 'mobilePhone'; // long
    $query->ContactListId = $list_id; // long
    $query->String = $contact_no; // long
    $response = $client->QueryContacts($query);
    $response = json_decode(json_encode($response), true);
   // print_r($response);
    $is_exist=0;
    if(isset($response['TotalResults'])){
        if($response['TotalResults'] > 0 ){
            $is_exist=1;
        }
    }
    if($is_exist==0){
    //    echo "hii";
         $result_cat=mysql_query("select * from `0gf1ba_subscriber_list` where post_id='$pid' and phone='$add_phone' and email='$add_email' order by id desc limit 1");

         while($row = mysql_fetch_assoc($result_cat)) {
             //print_r($row);
                $id=$row["id"];
                $fname=$row["name"];
            }
        $request = new stdClass();
        $request->ContactListId = $list_id; // long required
        $request->ContactSource = new stdClass(); // required
        $request->ContactSource->Contact = array();
        //$request->ContactSource->Contact[0]['firstName'] = "roshan";
        $request->ContactSource->Contact[0]['firstName'] =$fname;
        $request->ContactSource->Contact[0]['lastName'] = "";
        $request->ContactSource->Contact[0]['mobilePhone'] = $contact_no;
        $client->AddContactsToList($request);

    }
}

            mysql_query("UPDATE 0gf1ba_subscriber_list SET callfire_category='$callfire_category' WHERE id='$id'");
}





            ?>
            <script>
                window.location.href = window.location.href;
            </script>
        <?php }
    }
} ?>
<?php
if ($_REQUEST['delete']) {
    $delete = $_REQUEST['delete'];
    global $wpdb;
    $query_delete = $wpdb->query($wpdb->prepare("DELETE FROM 0gf1ba_subscriber_list WHERE id=$delete"));
    if ($query_delete) {
        ?>
        <script>
            window.location.href = window.location.href;
        </script>
    <?php }
} ?>
<?php get_footer('dashboard'); ?>
<?php
function format_telephone($phone_number) {
    $phone_number = preg_replace('/[^0-9]+/', '', $phone_number); //Strip all non number characters
    return preg_replace("/([0-9]{3})([0-9]{3})([0-9]{4})/", "$1-$2-$3", $phone_number); //Re Format it
}
?>

<style>
    .fa-caret-right:before {
        content: "";
    }

    .fa {
        line-height: 0;
    }
    .xdsoft_datetimepicker{
	left:27% !important;
	top:19% !important;
	position:fixed !important;
    }
    h2.heading {
	background: #f78e1e none repeat scroll 0 0;
	color: #fff;
	font-family: alternate;
	font-size: 44px;
	margin: 0;
	padding: 5px;
	text-align: center;
	text-decoration: none;
    }
    .close_button {
	background: #00afef none repeat scroll 0 0;
	border: medium none;
	color: #fff;
	font-family: alternate;
	font-size: 33px;
	padding: 0 26px;
    }
</style>
