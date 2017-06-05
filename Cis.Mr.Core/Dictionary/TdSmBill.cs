using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 
    /// </summary>

    public class TdSmBill : Entity
    {
        /// <summary>
        /// 分区字段
        /// </summary>

        public string AreaCode { get; set; }

        /// <summary>
        /// 主键
        /// </summary>

        public string Hisid { get; set; }

        /// <summary>
        /// 结算日期
        /// </summary>

        public DateTime Billdate { get; set; }

        /// <summary>
        /// 医院编号
        /// </summary>

        public string HospitalId { get; set; }

        /// <summary>
        /// 医院名称
        /// </summary>

        public string HospitalName { get; set; }

        /// <summary>
        /// 费用发生医院编码
        /// </summary>

        public string HospitalFeeId { get; set; }

        /// <summary>
        /// 费用发生医院名称
        /// </summary>

        public string HospitalFeeName { get; set; }

        /// <summary>
        /// 转外医院名称
        /// </summary>

        public string HospitalOutName { get; set; }

        /// <summary>
        /// 参保人编码
        /// </summary>

        public string PatientId { get; set; }

        /// <summary>
        /// 参保人名称
        /// </summary>

        public string PatientName { get; set; }

        /// <summary>
        /// 性别
        /// </summary>

        public string PatientSex { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>

        public DateTime? PatientBirth { get; set; }

        /// <summary>
        /// 参保类型
        /// </summary>

        public string BenefitType { get; set; }

        /// <summary>
        /// 人员类别
        /// </summary>

        public string BenefitGroupId { get; set; }

        /// <summary>
        /// 就医方式
        /// </summary>

        public string ClaimType { get; set; }

        /// <summary>
        /// 是否异地就医
        /// </summary>

        public string UnusualFlag { get; set; }

        /// <summary>
        /// 入院诊断
        /// </summary>

        public string AdmissionDiseaseId { get; set; }

        /// <summary>
        /// 出院诊断
        /// </summary>

        public string DischargeDiseaseId { get; set; }

        /// <summary>
        /// 出院原因
        /// </summary>

        public string DischargeReason { get; set; }

        /// <summary>
        /// 诊断编码一
        /// </summary>

        public string DiseaseId { get; set; }

        /// <summary>
        /// 诊断编码二
        /// </summary>

        public string SecondDiseaseId { get; set; }

        /// <summary>
        /// 诊断编码三
        /// </summary>

        public string ThirdDiseaseId { get; set; }

        /// <summary>
        /// 诊断编码四
        /// </summary>

        public string DiagnosisFour { get; set; }

        /// <summary>
        /// 诊断编码五
        /// </summary>

        public string DiagnosisFive { get; set; }

        /// <summary>
        /// 诊断编码六
        /// </summary>

        public string DiagnosisSix { get; set; }

        /// <summary>
        /// 诊断编码七
        /// </summary>

        public string DiagnosisSeven { get; set; }

        /// <summary>
        /// 诊断编码八
        /// </summary>

        public string DiagnosisEight { get; set; }

        /// <summary>
        /// 诊断编码九
        /// </summary>

        public string DiagnosisNine { get; set; }

        /// <summary>
        /// 诊断编码十
        /// </summary>

        public string DiagnosisTen { get; set; }

        /// <summary>
        /// 诊断编码十一
        /// </summary>

        public string DiagnosisEleven { get; set; }

        /// <summary>
        /// 诊断编码十二
        /// </summary>

        public string DiagnosisTwelve { get; set; }

        /// <summary>
        /// 诊断编码十三
        /// </summary>

        public string DiagnosisThirteen { get; set; }

        /// <summary>
        /// 诊断编码十四
        /// </summary>

        public string DiagnosisFourteen { get; set; }

        /// <summary>
        /// 诊断编码十五
        /// </summary>

        public string DiagnosisFifteen { get; set; }

        /// <summary>
        /// 诊断编码十六
        /// </summary>

        public string DiagnosisSixteen { get; set; }

        /// <summary>
        /// 入院时间
        /// </summary>

        public DateTime? AdmissionDate { get; set; }

        /// <summary>
        /// 出院时间
        /// </summary>

        public DateTime? DischargeDate { get; set; }

        /// <summary>
        /// 就诊时间
        /// </summary>

        public DateTime? FirstDate { get; set; }

        /// <summary>
        /// 是否特病慢病单据标志
        /// </summary>

        public string DiseaseType { get; set; }

        /// <summary>
        /// 慢病特病代码
        /// </summary>

        public string SpecialDiseaseCode { get; set; }

        /// <summary>
        /// 是否怀孕
        /// </summary>

        public string PatientPregnant { get; set; }

        /// <summary>
        /// 是否哺乳期
        /// </summary>

        public string PatientLactating { get; set; }

        /// <summary>
        /// 身高（cm）
        /// </summary>

        public string PatientHeight { get; set; }

        /// <summary>
        /// 体重（kg）
        /// </summary>

        public string PatientWeight { get; set; }

        /// <summary>
        /// 是否转入院
        /// </summary>

        public string InPatientTransferFlag { get; set; }

        /// <summary>
        /// 单据号
        /// </summary>

        public string BillNo { get; set; }

        /// <summary>
        /// 医保审核医保中心代码
        /// </summary>

        public string BmiCode { get; set; }

        /// <summary>
        /// 单据总金额（申报值）
        /// </summary>

        public decimal? TotalAmount { get; set; }

        /// <summary>
        /// 医保内总金额
        /// </summary>

        public decimal? BmiConveredAmount { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string YdBenefitGroupName { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string YdBenefitRegion { get; set; }

        /// <summary>
        /// 交易流水号
        /// </summary>

        public string Tradeno { get; set; }

        /// <summary>
        /// 住院号
        /// </summary>

        public string AdmissionNumber { get; set; }

        /// <summary>
        /// 规定病种名称
        /// </summary>

        public string SpecifiedDiseases { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string Modelworker { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public DateTime? LoginDate { get; set; }

        /// <summary>
        /// 报销金额
        /// </summary>

        public decimal? WipedMoney { get; set; }

        /// <summary>
        /// 现金支付金额
        /// </summary>

        public decimal? CashPay { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string Billym { get; set; }

        /// <summary>
        /// 医保拒付金额
        /// </summary>

        public decimal BmiNopay { get; set; }

        /// <summary>
        /// 按床日标志
        /// </summary>

        public decimal? Longterm { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string Isunijunction { get; set; }

        /// <summary>
        /// 当年基本医疗帐户支付额
        /// </summary>

        public decimal? BaseAccountMonty { get; set; }

        /// <summary>
        /// 当年补助帐户支付额
        /// </summary>

        public decimal? SupplementMoney { get; set; }

        /// <summary>
        /// 历年基本医疗帐户支付额
        /// </summary>

        public decimal? BaseAccountMontyY { get; set; }

        /// <summary>
        /// 历年补助帐户支付额
        /// </summary>

        public decimal? SupplementMoneyY { get; set; }

        /// <summary>
        /// 公补支付金额
        /// </summary>

        public decimal? SupplementPubMoney { get; set; }

        /// <summary>
        /// 大额补充金额
        /// </summary>

        public decimal? LargeAmountMoney { get; set; }

        /// <summary>
        /// 机构ID+住院号+社保卡号+社保卡识别码的MD5值
        /// </summary>

        public string Md5value { get; set; }

        /// <summary>
        /// 出院科室名称
        /// </summary>

        public string Deptname { get; set; }
    }
}