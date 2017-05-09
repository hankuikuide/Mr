using Cis.Mr.EntityFramework;
using EntityFramework.DynamicFilters;

namespace Cis.Mr.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly MrDbContext _context;

        public InitialHostDbBuilder(MrDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
        }
    }
}
