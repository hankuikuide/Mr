/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-手术信息 model
 * history:  created by 单梦琪 2016/5/11 11:06:39 
 * ***********************************************/
Ext.define('CisApp.model.shared.OperationInfo', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'MId' },
        { name: 'TradeNo' },
        { name: 'OrgCode' },
        { name: 'PatientId' },
        { name: 'AdmissionNo' },
        { name: 'OutBedNum' },
        { name: 'AdmissionDate', type: 'date' },
        { name: 'DischargeDate', type: 'date' },
        { name: 'OperationId' },
        { name: 'OperationNo' },
        { name: 'MajorIden' },
        { name: 'IsIatrogenic' },
        { name: 'OperationCode' },
        { name: 'OperationName' },
        { name: 'OperationLevel' },
        { name: 'OperationIncisionClass' },
        { name: 'OperationHealClass' },
        { name: 'OperationDoctorCode' },
        { name: 'OperationDoctorName' },
        { name: 'FirstOperDoctorCode' },
        { name: 'FirstOperDoctorName' },
        { name: 'SecondOperDoctorCode' },
        { name: 'SecondOperDoctorName' },
        { name: 'AnaesthesiaType' },
        { name: 'AnesthesiologistCode' },
        { name: 'AnesthesiologistName' },
        { name: 'OperationDate', type: 'date' },
        { name: 'ComplicationCode' },
        { name: 'ComplicationName' },
        { name: 'RecordDoctorCode' },
        { name: 'RecordDoctorName' },
        { name: 'OperationRecord' },
        { name: 'OperationHealClassName' },
        { name: 'OperationIncisionClassName' },
        { name: 'AnaesthesiaTypeName' },
        { name: 'DiagnosePosition' },
        { name: 'OperationRecordNo', type: 'string' },
        { name: 'OperationFinishDate', type: 'date' }
    ],
    validators: {
    }
});