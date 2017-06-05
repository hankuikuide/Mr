using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 
    /// </summary>
    
    public class TbClaimtype : Entity
    {


        /// <summary>
        /// 就诊类型名称
        /// </summary>
        
        public string ClassName { get; set; }

        /// <summary>
        /// 就诊类型大类标识（参见元数据代码表，就诊类型）
        /// </summary>
        
        public string PId { get; set; }

        /// <summary>
        /// 标志（I：insert，U：update，D：delete）
        /// </summary>
        
        public string Flag { get; set; }

        /// <summary>
        /// 装载时间
        /// </summary>
        
        public DateTime? LoadDate { get; set; }

        /// <summary>
        /// 客户就医类型编码（Class_id把字符去掉保留数字）
        /// </summary>
        
        public string Clientclassid { get; set; }

        /// <summary>
        /// 
        /// </summary>
        
        public decimal? Sort { get; set; }
    }
}