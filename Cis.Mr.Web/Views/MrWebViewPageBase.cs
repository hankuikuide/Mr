using Abp.Web.Mvc.Views;

namespace Cis.Mr.Web.Views
{
    public abstract class MrWebViewPageBase : MrWebViewPageBase<dynamic>
    {

    }

    public abstract class MrWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected MrWebViewPageBase()
        {
            LocalizationSourceName = MrConsts.LocalizationSourceName;
        }
    }
}