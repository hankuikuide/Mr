using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 
    /// </summary>
    
    public class TbBenefitgroup:Entity
    {

        /// <summary>
        /// 人员类别名称
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

        /// <summary>
        /// 父类别编码
        /// </summary>
        
        public string ParentClassId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        
        public decimal? Sort { get; set; }
    }
}