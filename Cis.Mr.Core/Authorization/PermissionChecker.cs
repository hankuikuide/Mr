using Abp.Authorization;
using Cis.Mr.Authorization.Roles;
using Cis.Mr.MultiTenancy;
using Cis.Mr.Users;

namespace Cis.Mr.Authorization
{
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
