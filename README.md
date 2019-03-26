# summernote-ajaxfileupload
Ajax image upload plugin for summernote WYSIWYG editor

<b>Installation</b>

1) Add stylesheet and js files after summernote ones.

        <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.css" rel="stylesheet">
        <link href="/assets/css/summernote-ajaxfileupload.css" rel="stylesheet">  

        <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.js"></script>
        <script src="/path/to/js/summernote-ext-ajaxfileupload.js"></script>


2) Add 'ajaxfileupload' button to summernote editor init. 

        $('.example_class').summernote({
          toolbar: [
            [list of button]]
            ['style', ['style','bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', [ 'ajaxfileupload', 'link', 'video', 'table']],
            ['misc', ['codeview']]
          ],
          dialogsInBody: true
        });

3) Edit PHP file to upload files in the right directory for you

        define('UPLOAD_ROOT', '/var/www/vhosts/location/to/your/www/root/uploads/');

4) (optional) Edit location of PHP upload file in summernote-ext-ajaxfileupload.js, if you need it in different location than js plugin file


       var phpUploadFile = 'fileUpload.php';
