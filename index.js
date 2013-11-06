var template = require('./template');

$digger.directive('aceEditor', function($http, $safeApply, AsyncScriptLoader){

  var ace_editor_url = '<script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js"></script>';

	return {
    restrict:'EA',
    template:template,
    replace:true,
    controller:function($scope){
      if($scope.field){
        $scope.height = $scope.field.height || '400px';  
      }
      else{
        $scope.height = '400px';
      }
      
    },

    link:function($scope, elem, $attrs){

      var lang = $scope.field.lang || 'html';
      var theme = $scope.field.theme || 'twilight';

      function setup_editor(){
        setTimeout(function(){
          $safeApply($scope, function(){

            var editor = ace.edit(elem.children().get(0), {
              initialContent:'hello'
            });
  
            editor.setTheme("ace/theme/" + theme);
            editor.getSession().setMode("ace/mode/" + lang);
            editor.setShowPrintMargin(false);
            editor.commands.addCommand({
              name: 'save',
              bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
              exec: function(editor) {
                
              },
              readOnly: true
            });

            editor.getSession().on('change', function(){
              var value = editor.getSession().getValue();

              $scope.model[$scope.fieldname] = value;

              console.dir($scope.model);
            });
          })
          

        }, 100)
        
      }

      if(!ace){
        AsyncScriptLoader.load(javascript_src).then(function(){
          setup_editor();
        })
      }
      else{
        setup_editor();
      }
      
    }
  }
})

module.exports = '<ace-editor />';
