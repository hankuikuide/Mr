using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;

namespace Cis.Mr.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : MrControllerBase
    {
        public ActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml"); //Layout of the angular application.
        }
	}
}