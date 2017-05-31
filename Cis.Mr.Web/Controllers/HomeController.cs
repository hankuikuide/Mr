using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using Cis.Mr.Web.Controllers.Results;
using Cis.Mr.Menus;

namespace Cis.Mr.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : MrControllerBase
    {
        private IMenuAppService menuAppService;
        public HomeController(IMenuAppService menuAppService)
        {
            this.menuAppService = menuAppService;
        }
        public ActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml"); //Layout of the angular application.
        }

        public ActionResult GetServerData()
        {
            IndexResult result = new IndexResult();

            result.Datas.Add("Menus", menuAppService.GetMenus());

            return Content(string.Format("CisApp.Server={0}", Newtonsoft.Json.JsonConvert.SerializeObject(result)));
        }

    }
}