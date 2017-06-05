using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 参保类型表
    /// </summary>
    
    public class TbBenefitplan : Entity
    {


        /// <summary>
        /// 参保类型名称
        /// </summary>
        
        public string ClassName { get; set; }

        /// <summary>
        /// 标志（I：insert，U：update，D：delete）
        /// </summary>
        
        public string Flag { get; set; }

        /// <summary>
        /// 装载时间
        /// </summary>
        
        public DateTime LoadDate { get; set; }
    }
}