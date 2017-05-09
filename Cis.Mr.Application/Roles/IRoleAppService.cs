using System.Threading.Tasks;
using Abp.Application.Services;
using Cis.Mr.Roles.Dto;

namespace Cis.Mr.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
    }
}
