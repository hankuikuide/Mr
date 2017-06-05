using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 病案主页上传信息
    /// </summary>
    public class TdMrMedical : Entity
    {
        /// <summary>
        /// 定点机构编码
        /// </summary>
        public string HosptialId { get; set; }

        /// <summary>
        /// 住院号
        /// </summary>
        public string AdmissionNo { get; set; }

        /// <summary>
        /// 出院床位号
        /// </summary>
        public string OutBedNum { get; set; }

        /// <summary>
        /// 入院时间
        /// </summary>
        public DateTime AdmissionDate { get; set; }

        /// <summary>
        /// 出院时间
        /// </summary>
        public DateTime DischargeDate { get; set; }

        /// <summary>
        /// 责任医生编码
        /// </summary>
        public string DoctorCode { get; set; }

        /// <summary>
        /// 是否药物过敏（0：否、1：是）
        /// </summary>
        public string IsDrugAllergy { get; set; }

        /// <summary>
        /// 过敏药物编码
        /// </summary>
        public string AllergyDrugCode { get; set; }

        /// <summary>
        /// 过敏药物名称
        /// </summary>
        public string AllergyDrugName { get; set; }

        /// <summary>
        /// 病理号
        /// </summary>
        public string PathologyCode { get; set; }

        /// <summary>
        /// 是否院内感染（0：否、1：是）
        /// </summary>
        public string IsHospitalInfected { get; set; }

        /// <summary>
        /// 院内感染诊断编码
        /// </summary>
        public string HospitalInfectedCode { get; set; }

        /// <summary>
        /// 血型（首位代码）字典表
        /// </summary>
        public string BloodTypeS { get; set; }

        /// <summary>
        /// 血型（末位代码）字典表
        /// </summary>
        public string BloodTypeE { get; set; }

        /// <summary>
        /// 离院方式字典表
        /// </summary>
        public string LeaveHospitalType { get; set; }

        /// <summary>
        /// 身高（CM）
        /// </summary>
        public string Height { get; set; }

        /// <summary>
        /// 体重（KG）
        /// </summary>
        public string Weight { get; set; }

        /// <summary>
        /// 婚姻史（1.未婚 2.已婚 3.丧偶4.离婚 9.其他）
        /// </summary>
        public string Marriage { get; set; }

        /// <summary>
        /// 生育史（孕）
        /// </summary>
        public string BearPregnancy { get; set; }

        /// <summary>
        /// 生育史（产）
        /// </summary>
        public string BearYie { get; set; }

        /// <summary>
        /// 入院诊断编码
        /// </summary>
        public string AdmissionDiseaseId { get; set; }

        /// <summary>
        /// 入院诊断名称
        /// </summary>
        public string AdmissionDiseaseName { get; set; }

        /// <summary>
        /// 出院诊断编码
        /// </summary>
        public string DischargeDiseaseId { get; set; }

        /// <summary>
        /// 出院诊断名称
        /// </summary>
        public string DischargeDiseaseName { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string OperId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OperDate { get; set; }

        /// <summary>
        /// 确认上传标记 0：未上传、1：已上传(对应填报状态：null:未填报，0：填报中，1：填报完成)
        /// </summary>
        public string IsUpload { get; set; }

        /// <summary>
        /// 作废标记：0：未作废、1：已作废
        /// </summary>
        public string IsValid { get; set; }

        /// <summary>
        /// 作废操作人
        /// </summary>
        public string Operator { get; set; }

        /// <summary>
        /// 作废操作时间
        /// </summary>
        
        public DateTime? OperatingDate { get; set; }

        /// <summary>
        /// 特殊病例标识字典表 改名 按床日结算病例
        /// </summary>
        
        public string Tsblbs { get; set; }

        /// <summary>
        /// 入院诊断方位字典表
        /// </summary>
        
        public string DiagnosePosition1 { get; set; }

        /// <summary>
        /// 出院诊断方位字典表
        /// </summary>
        
        public string DiagnosePosition2 { get; set; }

        /// <summary>
        /// 责任医生名称
        /// </summary>
        
        public string DoctorName { get; set; }

        /// <summary>
        /// 是否有病理检查
        /// </summary>
        
        public string IsPathologicalExamination { get; set; }

        /// <summary>
        /// 其它诊断编码1
        /// </summary>
        
        public string DiagnosisCode1 { get; set; }

        /// <summary>
        /// 其它诊断名称1
        /// </summary>
        
        public string DiagnosisName1 { get; set; }

        /// <summary>
        /// 其它诊断编码2
        /// </summary>
        
        public string DiagnosisCode2 { get; set; }

        /// <summary>
        /// 其它诊断名称2
        /// </summary>
        
        public string DiagnosisName2 { get; set; }

        /// <summary>
        /// 其它诊断编码3
        /// </summary>
        
        public string DiagnosisCode3 { get; set; }

        /// <summary>
        /// 其它诊断名称3
        /// </summary>
        
        public string DiagnosisName3 { get; set; }

        /// <summary>
        /// 其它诊断编码4
        /// </summary>
        
        public string DiagnosisCode4 { get; set; }

        /// <summary>
        /// 其它诊断名称4
        /// </summary>
        
        public string DiagnosisName4 { get; set; }

        /// <summary>
        /// 其它诊断编码5
        /// </summary>
        
        public string DiagnosisCode5 { get; set; }

        /// <summary>
        /// 其它诊断名称5
        /// </summary>
        
        public string DiagnosisName5 { get; set; }

        /// <summary>
        /// 其它诊断编码6
        /// </summary>
        
        public string DiagnosisCode6 { get; set; }

        /// <summary>
        /// 其它诊断名称6
        /// </summary>
        
        public string DiagnosisName6 { get; set; }

        /// <summary>
        /// 其它诊断编码7
        /// </summary>
        
        public string DiagnosisCode7 { get; set; }

        /// <summary>
        /// 其它诊断名称7
        /// </summary>
        
        public string DiagnosisName7 { get; set; }

        /// <summary>
        /// 其它诊断编码8
        /// </summary>
        
        public string DiagnosisCode8 { get; set; }

        /// <summary>
        /// 其它诊断名称8
        /// </summary>
        
        public string DiagnosisName8 { get; set; }

        /// <summary>
        /// 其它诊断编码9
        /// </summary>
        
        public string DiagnosisCode9 { get; set; }

        /// <summary>
        /// 其它诊断名称9
        /// </summary>
        
        public string DiagnosisName9 { get; set; }

        /// <summary>
        /// 其它诊断编码10
        /// </summary>
        
        public string DiagnosisCode10 { get; set; }

        /// <summary>
        /// 其它诊断名称10
        /// </summary>
        
        public string DiagnosisName10 { get; set; }

        /// <summary>
        /// 其它诊断编码11
        /// </summary>
        
        public string DiagnosisCode11 { get; set; }

        /// <summary>
        /// 其它诊断名称11
        /// </summary>
        
        public string DiagnosisName11 { get; set; }

        /// <summary>
        /// 其它诊断编码12
        /// </summary>
        
        public string DiagnosisCode12 { get; set; }

        /// <summary>
        /// 其它诊断名称12
        /// </summary>
        
        public string DiagnosisName12 { get; set; }

        /// <summary>
        /// 其它诊断编码13
        /// </summary>
        
        public string DiagnosisCode13 { get; set; }

        /// <summary>
        /// 其它诊断名称13
        /// </summary>
        
        public string DiagnosisName13 { get; set; }

        /// <summary>
        /// 其它诊断编码14
        /// </summary>
        
        public string DiagnosisCode14 { get; set; }

        /// <summary>
        /// 其它诊断名称14
        /// </summary>
        
        public string DiagnosisName14 { get; set; }

        /// <summary>
        /// 其它诊断编码15
        /// </summary>
        
        public string DiagnosisCode15 { get; set; }

        /// <summary>
        /// 其它诊断名称15
        /// </summary>
        
        public string DiagnosisName15 { get; set; }

        /// <summary>
        /// 其它诊断编码16
        /// </summary>
        
        public string DiagnosisCode16 { get; set; }

        /// <summary>
        /// 其它诊断名称16
        /// </summary>
        
        public string DiagnosisName16 { get; set; }

        /// <summary>
        /// 新生儿出生日期
        /// </summary>
        
        public DateTime? NewbornDate { get; set; }

        /// <summary>
        /// 新生儿出生体重 单位 G
        /// </summary>
        
        public decimal? NewbornWeight { get; set; }

        /// <summary>
        /// 新生儿当前体重 单位 G
        /// </summary>
        
        public decimal? NewbornCurrentWeight { get; set; }

        /// <summary>
        /// 已上传时间
        /// </summary>
        
        public DateTime? IsUploadDate { get; set; }

        /// <summary>
        /// 月结分组标记0：未完成、1：已完成
        /// </summary>
        
        public string IsFinalGrouped { get; set; }

        /// <summary>
        /// 是否分组0：未分组、1：已分组
        /// </summary>
        
        public string IsGrouped { get; set; }

        /// <summary>
        /// 个人编号，格式:社保卡号-识别码
        /// </summary>
        
        public string PatientId { get; set; }

        /// <summary>
        /// 数据校验结果详情
        /// </summary>
        
        public string DataValidateRemark { get; set; }

        /// <summary>
        /// 数据项校验结果：违反的规则表的规则的位运算结果若：一个单据违反了2,4 两个规则，此处存储的值为6；若：一个单据违反了2,4,8 两个规则，此处存储的值为14；
        /// </summary>
        
        public decimal DataValidateFlag { get; set; }

        /// <summary>
        /// 输血史备份后目录
        /// </summary>
        
        public string BloodTransHistory { get; set; }

        /// <summary>
        /// 手术史备份后目录
        /// </summary>
        
        public string SurgeryHistory { get; set; }

        /// <summary>
        /// 现病史备份后目录
        /// </summary>
        
        public string MedicalHistory { get; set; }

        /// <summary>
        /// 主诉备份后目录
        /// </summary>
        
        public string ChiefComplaint { get; set; }

        /// <summary>
        /// 是否可以用于分组
        /// </summary>
        
        public string IsGroupAvailable { get; set; }

        /// <summary>
        /// 是否刷新了结算单状态，默认0，未刷新，1：该病案结算单重新上传
        /// </summary>
        
        public string IsSmRefreshed { get; set; }

        /// <summary>
        /// IS_SM_REFRESHED,如果结算单重新上传，记录存储过程更新校验结果时间
        /// </summary>
        
        public DateTime? SmRefreshDate { get; set; }
    }
}