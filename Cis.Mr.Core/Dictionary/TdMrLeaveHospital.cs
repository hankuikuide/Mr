using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 出院小结上传信息
    /// </summary>
    public class TdMrLeaveHospital : Entity
    {


        /// <summary>
        /// 病案主页ID
        /// </summary>
        public string MedicalId { get; set; }

        /// <summary>
        /// 1-治愈/2-好转/3-未治愈/4-死亡/5-其它
        /// </summary>
        public string DischargeOutcome { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string OperId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OperDate { get; set; }

        /// <summary>
        /// 出院情况备份后目录
        /// </summary>
        public string LeaveHospitalStatus { get; set; }

        /// <summary>
        /// 诊疗过程备份后目录
        /// </summary>
        public string DtProcess { get; set; }

        /// <summary>
        /// 入院情况备份后目录
        /// </summary>
        public string HospitalizationSituation { get; set; }

        /// <summary>
        /// 出院诊断备份后目录
        /// </summary>
        public string LeaveDoctorAdvice { get; set; }
    }
}