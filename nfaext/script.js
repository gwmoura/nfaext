(function() {
   console.log('NFA runing');
   ChromePopup = function (url, arg, feature) {
      var opFeature = feature.split(";");
      var featuresArray = new Array()
      for (var i = 0; i < opFeature.length - 1; i++) {
          var f = opFeature[i].split(":");
          featuresArray[f[0].toString().trim().toLowerCase()] = f[1].toString().trim();
      }

      var h = "200px", w = "400px", l = "100px",
      t = "100px", r = "no", c = "yes", s = "no";
      if (featuresArray["dialogheight"]) h = featuresArray["dialogheight"];
      if (featuresArray["dialogwidth"]) w = featuresArray["dialogwidth"];
      if (featuresArray["dialogleft"]) l = featuresArray["dialogleft"];
      if (featuresArray["dialogtop"]) t = featuresArray["dialogtop"];
      if (featuresArray["resizable"]) r = featuresArray["resizable"];
      if (featuresArray["center"]) c = featuresArray["center"];
      if (featuresArray["status"]) s = featuresArray["status"];
      var modelFeature = "height = " + h + ",width = " + w + ",left=" + l + ",top=" +
                          t + ",model=yes,alwaysRaised=yes,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no" + ",resizable= " + r + ",celter=" +
                          c + ",status=" + s;
      var model = window.open(url, "", modelFeature, null);
      model.dialogArguments = arg;
   // check the new attribute to refresh parent window or not
      if (window.showModalDialog.refreshParent) {
          reloadPage(model);
      }
      return model;
   }

   var jsCodeInjection = ' ChromePopup = ' + ChromePopup + ';window.showModalDialog = ChromePopup';
   var script = document.createElement('script');
   script.textContent = jsCodeInjection;
   (document.body||document.documentElement).appendChild(script);
   script.remove();
})();
