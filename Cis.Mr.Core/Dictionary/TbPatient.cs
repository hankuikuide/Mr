using Abp.Domain.Entities;
using System;
namespace Cis.Mr.Core
{
    /// <summary>
    /// 
    /// </summary>
    
    public class TbPatient:Entity
    {

        /// <summary>
        /// 姓名
        /// </summary>
        
        public string Name { get; set; }

        /// <summary>
        /// 人员类别编码（参见人员类别字典表）
        /// </summary>
        
        public string BenefitgroupId { get; set; }

        /// <summary>
        /// 缴费地区（参见地区字典表）
        /// </summary>
        
        public string AreaId { get; set; }

        /// <summary>
        /// 性别（参见元数据代码表，性别）
        /// </summary>
        
        public string Gender { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>
        
        public DateTime? Dob { get; set; }

        /// <summary>
        /// 社保号（）
        /// </summary>
        
        public string Bmino { get; set; }

        /// <summary>
        /// 证件类型（参见元数据代码表，证件类型，暂不使用）
        /// </summary>
        
        public string IdType { get; set; }

        /// <summary>
        /// 证件号码
        /// </summary>
        
        public string IdNumber { get; set; }

        /// <summary>
        /// 标志（FLAG）
        /// </summary>
        
        public string Flag { get; set; }

        /// <summary>
        /// 装载时间
        /// </summary>
        
        public DateTime? LoadDate { get; set; }

        /// <summary>
        /// 工作单位
        /// </summary>
        
        public string Company { get; set; }

        /// <summary>
        /// 社保卡号
        /// </summary>
        
        public string SciCardNo { get; set; }

        /// <summary>
        /// 社保卡识别码
        /// </summary>
        
        public string SciCardIdentified { get; set; }
    }
}