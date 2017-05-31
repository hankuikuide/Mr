/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/23 16:47:36
 * ***********************************************/

namespace Cis.Mr.Users.Dto
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Abp.Application.Services.Dto;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class QueryUserInput: PagedResultRequestDto
    {
        #region Fields

        public string  Name { get; set; }

        #endregion

        #region Constructors and Destructors

        #endregion

        #region Public Methods and Operators

        #endregion
    }
}
