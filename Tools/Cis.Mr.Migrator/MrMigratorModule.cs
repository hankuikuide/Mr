using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Cis.Mr.EntityFramework;

namespace Cis.Mr.Migrator
{
    [DependsOn(typeof(MrDataModule))]
    public class MrMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<MrDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}