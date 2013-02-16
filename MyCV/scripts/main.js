 var vm =kendo.observable({
    name: "",
    currentPosition:"",
    basicInfoItems: [],
    experienceItems: [],
    educationItems: [],
    skillsParagraphs: [],
    selectedExperienceItem:{},
    gravatar:"",
    gravatarBig:"",
    gravatarClicked: function(){
        var picModalView = $("#pictureModalView").data("kendoMobileModalView");
        picModalView.open();
    },
     closePicModal: function(){
         var picModalView = $("#pictureModalView").data("kendoMobileModalView");
         picModalView.close();
     },
     listViewClick: function(element){
         var nextElement =element.item.next();
        nextElement.slideToggle(300);
     }
});

var contact=kendo.observable({
    mobilePhone:"",
    mobilephonelink:"",
    homephone:"",
    homephonelink:"",
    email:"",
    emaillink:"",
    address:"",
    addresslink:"",

});
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
var modalView;
// PhoneGap is ready
function onDeviceReady() {
    modalView = $("#modalView").data("kendoMobileModalView");
    modalView.open();
    getCurriculum();
    navigator.splashscreen.hide();   
}

function getCurriculum()
{
    app.showLoading()
    var url =  "http://mywebcv.azurewebsites.net/api/Curricula";   
    var googlemaps="http://maps.google.com/maps?q=";    
    $.getJSON(url + "?callback=?", null, function(cv) {
        vm.set("name", cv.Name);
        vm.set("currentPosition", cv.ExperienceItems[0].JobTitle+" at "+ cv.ExperienceItems[0].CompanyName);
        vm.set("experienceItems", cv.ExperienceItems);
        vm.set("basicInfoItems", cv.BasicInfoItems);
        vm.set("educationItems", cv.EducationItems);
        vm.set("skillsParagraphs", cv.SkillsParagraphs);        
        vm.set("gravatar", cv.Gravatar+"?s=60");
        vm.set("gravatarBig", cv.Gravatar+"?s=300");
        contact.set("mobilephone", cv.BasicInfoItems["Mobile-Phone"]);
        contact.set("mobilephonelink", "tel:"+cv.BasicInfoItems["Mobile-Phone"]);
        contact.set("homephone", cv.BasicInfoItems["Home-Phone"]);
        contact.set("homephonelink", "tel:"+cv.BasicInfoItems["Home-Phone"]);
        contact.set("email", cv.BasicInfoItems["E-Mail"]);
        contact.set("emaillink", "mailto::"+cv.BasicInfoItems["E-Mail"]);
        contact.set("address",cv.BasicInfoItems["Address"]);
        contact.set("addresslink",googlemaps+ encodeURIComponent(cv.BasicInfoItems["Address"]));
        app.hideLoading();
    });
    
}
$("#addressLink").on("click", function(e) {
	var url = $(e.currentTarget).data("url");
	var cb = ChildBrowser.install();
	if(cb != null)
		window.plugins.childBrowser.showWebPage(url);
});

function closeModal(){
    modalView.close();
}
