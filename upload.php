<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$upload_dir = __DIR__ . '/uploads/';

if ( isset($_FILES['files']) ) {
    
    //echo '<pre>' . print_r($_FILES['files'], true) . '</pre>';
    
    foreach($_FILES['files']['name'] as $key => $file_name){
        
        if( $_FILES['files']['error'][$key] == UPLOAD_ERR_OK ){
            
            $file_path = $upload_dir . $file_name;
            
            move_uploaded_file( $_FILES['files']['tmp_name'][$key], $file_path );
            chmod( $file_path, 0777 );
            
            echo '{"success": true}';
            
        }
        
    }
    
} else {
    header('HTTP/1.0 404 Not Found');
}
