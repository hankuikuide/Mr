/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/6/5 9:54:19
 * ***********************************************/

namespace Cis.Mr.Medicals.Dto
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class MedicalOutput
    {
        public string Id { get; set; }

        public string DataValidateFlag { get; set; }

        public string DataValidateRemark { get; set; }

        public string LeaveId { get; set; }

        public string IsUpload { get; set; }

        public string PatientId { get; set; }

        public string ScicarDNo { get; set; }

        public string Name { get; set; }

        public string BenefitType { get; set; }

        public string ClassName { get; set; }

        public string BenefitgroupId { get; set; }

        public string BillDate { get; set; }

        public string BmiconveredAmount { get; set; }

        public string TotalAmount { get; set; }

        public string HospitalId { get; set; }

        public string AdmissionNumber { get; set; }

        public string AdmissionDate { get; set; }

        public string DischargeDate { get; set; }

        public string TradeNo { get; set; }

        public string AdmissionDiseaseId { get; set; }

        public string DischargeDiseaseId { get; set; }

    }
}
