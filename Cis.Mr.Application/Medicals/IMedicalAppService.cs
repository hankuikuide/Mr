using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Cis.Mr.Medicals.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cis.Mr.Medicals
{
    public interface IMedicalAppService: IApplicationService
    {
        /// <summary>
        /// 获取数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagedResultDto<MedicalOutput> GetMedicals(MedicalInput input);
    }
}
