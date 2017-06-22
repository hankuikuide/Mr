/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/6/5 9:53:12
 * ***********************************************/

namespace Cis.Mr.Medicals.Dto
{
    using Abp.Application.Services.Dto;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class MedicalInput: EntityDto<string>
    {
        public string AdmissionDateS { get; set; }

        public string AdmissionDateE { get; set; }

        public string HospitalId { get; set; }

        public string Name { get; set; }
    }
}
