/*
    Created by Tomaac (https://github.com/tomaac)
    2019.
*/
var phpUploadFile = 'fileUpload.php'; // location of the php file that will handle uploads


(function(factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function($) {
  // Extends plugins for adding ajaxfileupload.
  //  - plugin is external module for customizing.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'ajaxfileupload': function(context) {
      var self = this;

      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui = $.summernote.ui;
      var uploadedFile = '';

      // add ajaxfileupload button
      context.memo('button.ajaxfileupload', function() {
        // create button
        var button = ui.button({
          contents: '<i class="fa fa-image"/> upload Image',
          tooltip: 'Upload Image',
          click: function() {
            self.$panel.show();
            var $saveBtn = self.$panel.find('#ajaxFileUploadSubmit'); // upload btn
            var $closeBtn = self.$panel.find('#ajaxPanelClose'); // close btn (x)

            // on close btn press
            $closeBtn.click(function(){
              self.$panel.hide();
            });// close click


            // on save btn press
            $saveBtn.click(function(){
                // send file by ajax
                var formData = new FormData();
                formData.append('file', $('#file')[0].files[0]);
                $.ajax({
                   url : phpUploadFile, // php file location to upload files
                   type : 'POST',
                   data : formData,
                   dataType: 'json',
                   processData: false,
                   contentType: false,
                   success : function(data) {
                       if(data.message=='ok'){
                          // best to add full global path e.g. 'https://domain.com/uploads/'+data.response;
                          // so that it would work in website after adding in admin part for example
                          uploadedFile = data.response; //full path to uploaded picture.

                          // add img html in editor
                          context.invoke('editor.pasteHTML', "<img src='"+uploadedFile+"' style='width: 100%; margin: 10px;' alt='uploaded picture' />");
                          // close upload panel
                          self.$panel.hide();
                       }// if all ok
                       else{
                         alert(data.message); // if not ok, alert error message from php file
                       }// all is not ok
                   }// on success
                });// ajax
            });// save btn click


          }
        });

        // create jQuery object from button instance.
        var $ajaxfileupload = button.render();
        return $ajaxfileupload;
      });


      // This events will be attached when editor is initialized.
      this.events = {
        // This will be called after modules are initialized.
        'summernote.init': function(we, e) {
        },
        // This will be called when user releases a key on editable.
        'summernote.keyup': function(we, e) {}
      };



      // Creates dialog box with upload buttons
      // some basic styling for this is in attached css file.
      this.initialize = function() {
        this.$panel = $('<div class="ajaxfileupload-panel"><div id="ajaxFileUploadInner"><div id="ajaxPanelClose">+</div><div id="fileUploadGroup"><label>Choose image to upload: </label><br /><input type="file" id="file" name="file"  /></div><div id="ajaxFileUploadSubmit">Upload</div></div></div>').css({
          position: 'absolute',
          width: 400,
          height: 200,
          left: '50%',
          top: '20%',
          background: 'white'
        }).hide();

        this.$panel.appendTo('body');
      };


      this.destroy = function() {
        this.$panel.remove();
        this.$panel = null;
      };
    }
  });
}));
