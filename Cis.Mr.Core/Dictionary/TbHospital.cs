using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 定点医疗机构表
    /// </summary>
    
    public class TbHospital : Entity
    {


        /// <summary>
        /// 名称
        /// </summary>
        
        public string Name { get; set; }

        /// <summary>
        /// 级别（参见元数据代码表，医院级别）
        /// </summary>
        
        public string PLevel { get; set; }

        /// <summary>
        /// 类型（参见元数据代码表，医院类型）
        /// </summary>
        
        public string Type { get; set; }

        /// <summary>
        /// 所属地区（参见字典表）
        /// </summary>
        
        public string AreaId { get; set; }

        /// <summary>
        /// 标志（I：insert，U：update，D：delete）
        /// </summary>
        
        public string Flag { get; set; }

        /// <summary>
        /// 装载时间
        /// </summary>
        
        public DateTime LoadDate { get; set; }

        /// <summary>
        /// (绍兴)定点机构基层类型(0:非基层 1：基层)
        /// </summary>
        
        public decimal? HType { get; set; }
    }
}