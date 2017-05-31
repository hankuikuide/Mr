/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/30 16:53:46 
 * ***********************************************/
Ext.define('CisApp.model.shared.DiagnosisResult', {
    extend: 'Fm.base.Model',
    fields: [
       { name: 'NumRow', type: 'string' },
       { name: 'GenericCode', type: 'string' },
       { name: 'GenericName', type: 'string' },
       {
           name: 'CodeAndName', type: 'string', convert: function (val,model) {
               return model.get('GenericCode') + '>||<' + model.get('GenericName');
           }
       },
       { name: 'MnemonicCode', type: 'string' },
       { name: 'DiseaseClass', type: 'string' },
       { name: 'SpecialCode', type: 'string' },
       { name: 'SpecialName', type: 'string' },
       { name: 'Remark', type: 'string' }
    ],
    validators: {
    }
});