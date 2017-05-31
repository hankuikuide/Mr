using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Cis.Mr.Authorization;
using Cis.Mr.Users.Dto;
using Microsoft.AspNet.Identity;
using System.Linq;
using Abp.Linq.Extensions;
using System;

namespace Cis.Mr.Users
{
    /* THIS IS JUST A SAMPLE. */
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : MrAppServiceBase, IUserAppService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IPermissionManager _permissionManager;

        public UserAppService(IRepository<User, long> userRepository, IPermissionManager permissionManager)
        {
            _userRepository = userRepository;
            _permissionManager = permissionManager;
        }

        public async Task ProhibitPermission(ProhibitPermissionInput input)
        {
            var user = await UserManager.GetUserByIdAsync(input.UserId);
            var permission = _permissionManager.GetPermission(input.PermissionName);

            await UserManager.ProhibitPermissionAsync(user, permission);
        }

        //Example for primitive method parameters.
        public async Task RemoveFromRole(long userId, string roleName)
        {
            CheckErrors(await UserManager.RemoveFromRoleAsync(userId, roleName));
        }

        /// <summary>
        /// 获取所有用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public PagedResultDto<UserListDto> GetUsers(QueryUserInput input)
        {
            var query = _userRepository.GetAll();

            query = query.OrderByDescending(t => t.CreationTime);

            var result = query.PageBy(input).ToList();

            return new PagedResultDto<UserListDto>(query.Count(), result.MapTo<List<UserListDto>>());
            //return result.MapTo<List<UserListDto>>();
        }


        public async Task CreateUser(CreateUserInput input)
        {
            var user = input.MapTo<User>();

            user.TenantId = AbpSession.TenantId;
            user.Password = new PasswordHasher().HashPassword(input.Password);
            user.IsEmailConfirmed = true;

            CheckErrors(await UserManager.CreateAsync(user));
        }

        public Task<PagedResultDto<UserListDto>> GetUsersAsync(QueryUserInput input)
        {
            throw new NotImplementedException();
        }
    }
}