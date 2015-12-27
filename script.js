
/**
 * Image to file + upload
 *
 */

var example = {
    
    options: {
        upload_action: 'upload.php'
    },
    
    getExtension: function( image_src ){
        var arr = image_src.split('.');
        return arr.pop().toLowerCase();
    },

    getFilename: function( file_src ){
        var arr = file_src.replace(/\\/g, '/').split('/');
        var file_name = arr.pop().toLowerCase();
        file_name = file_name.replace( /\s/g, '_' );
        return file_name;
    },
    
    imgSrcToBlob: function( image_src, callback_func ){
        
        var self = this;
        
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', image_src, true );
        xhr.responseType = "arraybuffer";
        xhr.onload = function( e ) {
            
            var contentType = this.getResponseHeader('Content-Type'),
                arrayBufferView = new Uint8Array( this.response );
            var blob = new Blob( [ arrayBufferView ], { type: contentType } );
            //var urlCreator = window.URL || window.webkitURL;
            //var imageUrl = urlCreator.createObjectURL( blob );
            
            if ( typeof callback_func == 'function' ) {
                callback_func(blob);
            }
            
        };
        xhr.send();
        
    },
    
    uploadImage: function( image_src, callback_func ){
        
        var self = this;
        
        this.imgSrcToBlob(image_src, function(blob){
            
            var formData = new FormData(),
                file_name = self.getFilename(image_src);
            formData.append('files[]', blob, file_name);
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', self.options.upload_action);
            xhr.onload = function( e ) {
                if (xhr.status == 200) {
                    if ( typeof callback_func == 'function' ) {
                        callback_func(this.responseText);
                    }
                }
            };
            xhr.send(formData);
            
        });
        
    }
    
};

document.getElementById('button_upload')
    .addEventListener('click', function(e){
        e.preventDefault();
        
        var image_src = document.getElementById( 'image_to_upload' ).innerHTML;
        
        example.uploadImage(image_src, function(res){
            alert(res);
        });
        
    }, false);
