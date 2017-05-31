using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Cis.Mr.Users.Dto;
using System.Collections.Generic;

namespace Cis.Mr.Users
{
    public interface IUserAppService : IApplicationService
    {
        Task ProhibitPermission(ProhibitPermissionInput input);

        Task RemoveFromRole(long userId, string roleName);

        PagedResultDto<UserListDto> GetUsers(QueryUserInput input);

        Task<PagedResultDto<UserListDto>> GetUsersAsync(QueryUserInput input);

        Task CreateUser(CreateUserInput input);
    }
}