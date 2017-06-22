/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/6/5 9:49:48
 * ***********************************************/

namespace Cis.Mr.Medicals
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Dto;
    using Abp.Application.Services.Dto;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class MedicalAppService : MrAppServiceBase, IMedicalAppService
    {
        public ISqlExecuter SqlExecuter { get;set;}

        public PagedResultDto<MedicalOutput> GetMedicals(MedicalInput input)
        {
            string sql = @" SELECT tmm.id,
                   ifnull(tmm.DataValidateFlag, -1) DataValidateFlag,
                   ifnull(tmm.DataValidateRemark, ' ') DataValidateRemark,
                   ifnull(tmlh.id, -1) leaveId ,
                   ifnull(tmm.IsUpload, -1) isupload,
                   tsb.patientid,
                   tp.SCICARDNO , #社保卡号
                   tp.name ,#参保人
                   tsb.benefittype, #参保类型
                   tbfl.classname  ,
                   tsb.benefitgroupid, #人员类别
                   tbgi.classname ,
                   tsb.billdate, #结算日期
                   tsb.bmiconveredamount, #医保内总金额
                   tsb.totalamount, #总金额
                   tsb.hospitalid,
                   thos.name ,
                   tsb.admissionnumber ,
                   tsb.admissiondate ,
                   tsb.dischargedate,
                   tsb.tradeno,
                   tsb.admissiondiseaseid ,
                   tsb.dischargediseaseid 
            FROM
                tdsmbills tsb
                    LEFT JOIN
                tbclaimtypes c ON tsb.claimtype = c.id AND c.pid = '1'
                    left JOIN
                tbbenefitgroups tbgi ON tbgi.Id = tsb.benefitgroupid
                    left JOIN
                tbbenefitplans tbfl ON tbfl.id = tsb.benefittype
                    LEFT JOIN
                tbhospitals thos ON thos.id = tsb.hospitalid
                    LEFT JOIN
                tdmrmedicals tmm ON tsb.hospitalid = tmm.hosptialid
                    AND tsb.admissionnumber = tmm.AdmissionNo
                    AND tmm.isvalid = '0'
                    LEFT JOIN
                tbpatients tp ON tsb.patientid = tp.id
                    LEFT JOIN
                TDMRLEAVEHOSPITALs tmlh ON tmlh.medicalid = tmm.id";

            var query = SqlExecuter.SqlQuery<MedicalOutput>(sql);


            var result = new PagedResultDto<MedicalOutput>(query.Count(), query.ToList());

            return result;

        }
    }
}
