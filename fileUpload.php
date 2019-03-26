<?php
/*
    Created by Tomaac (https://github.com/tomaac)
    2019.
*/

// change this to your location where to store uploaded files. It must be full path if on virtual host
define('UPLOAD_ROOT', '/var/www/vhosts/location/to/your/www/root/uploads/');

// set max file size for uploads in bytes. default = ~30Mb
// this might be limited by php.ini, where default on test servers is 2Mb.
// change upload_max_filesize and post_max_size in php.ini to increase it.
define('MAX_UPLOAD_SIZE', 30000000);

$resp_mes = '';
$resp = '';



// if file is uploaded
if(isset($_FILES["file"]["type"])){

  $validextensions = array("jpeg", "jpg", "png", 'JPG', 'PNG', 'JPEG', 'pdf', 'PDF');
  $temporary = explode(".", $_FILES["file"]["name"]);
  $file_extension = end($temporary);

  // makes sure file format is ok
  if ( (($_FILES["file"]["type"] == "image/png") ||
        ($_FILES["file"]["type"] == "image/jpg") ||
        ($_FILES["file"]["type"] == "image/jpeg"))
  && in_array($file_extension, $validextensions) ){

    // make sure file size is ok
    if($_FILES["file"]["size"] < MAX_UPLOAD_SIZE){

      $sourcePath = $_FILES['file']['tmp_name'];
      $picture = date('YmdHis').rand(1,9999).'.'.$file_extension; // generates file name from time + random
      $targetPath = UPLOAD_ROOT.$picture; // sets target path
      if(move_uploaded_file($sourcePath,$targetPath)){
        $resp = $picture; // gives back image name for editor
        $resp_mes = 'ok';
      }else{
        //echo 'error pic upload';
        $resp_mes = 'Error: Cannot save file. Directory might not be writable.';
      }
    }// if file size is ok
    else{
      $resp_mes = 'Error: Uploaded file is to large.';
    } // file size is not ok
  }else{
    //echo 'Nepareizs attēla formāts';
    $resp_mes = 'Error: Wrong picture format.';
  }//check format

} // if subbmited
else{ $resp_mes = 'Error: Nothing was posted to server.'; } // nothing was posted




echo json_encode(array('response'=>$resp, 'message'=>$resp_mes)); // sends response back to javascript











?>
